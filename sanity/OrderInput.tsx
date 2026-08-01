import { useCallback, useRef, useState } from "react";
import { useClient, useFormValue, type NumberInputProps } from "sanity";
import { Box, Button, Card, Flex, Stack, Text, useToast } from "@sanity/ui";

type Row = { _id: string; order: number | null };

const API_VERSION = "2024-01-01";

/**
 * Number input for `order` that also renumbers the rest of the gallery.
 *
 * Typing a position and pressing Apply moves this illustration there and pushes
 * everything from that position onwards one step down, then rewrites the whole
 * sequence as a clean 1..n. Renumbering everything rather than nudging
 * neighbours is what keeps the list free of gaps and duplicates, however the
 * numbers looked beforehand.
 */
export default function OrderInput(props: NumberInputProps) {
  const client = useClient({ apiVersion: API_VERSION });
  const toast = useToast();

  const docId = String(useFormValue(["_id"]) ?? "");
  const publishedId = docId.replace(/^drafts\./, "");

  const [busy, setBusy] = useState(false);
  const lastApplied = useRef<number | null>(null);

  const target = typeof props.value === "number" ? props.value : null;
  const canApply = target !== null && target >= 1 && !busy && lastApplied.current !== target;

  const apply = useCallback(async () => {
    if (target === null) return;
    setBusy(true);
    try {
      // Raw, so unpublished illustrations keep their place in the sequence
      // instead of having their number handed to someone else.
      const rows: Row[] = await client
        .withConfig({ perspective: "raw" })
        .fetch(`*[_type == "illustration"]{ _id, order }`);

      // A document with unpublished edits shows up twice, as `drafts.x` and `x`.
      // Group them so the pair takes one position, and let the draft's own value
      // decide where that is — it is the newer of the two.
      const groups = new Map<string, { ids: string[]; order: number | null }>();
      rows.forEach((row) => {
        const key = row._id.replace(/^drafts\./, "");
        const isDraft = row._id.startsWith("drafts.");
        const existing = groups.get(key);
        if (!existing) {
          groups.set(key, { ids: [row._id], order: row.order ?? null });
        } else {
          existing.ids.push(row._id);
          if (isDraft) existing.order = row.order ?? existing.order;
        }
      });

      const sorted = Array.from(groups.entries()).sort(
        (a, b) => (a[1].order ?? Infinity) - (b[1].order ?? Infinity)
      );

      // The document being edited may never have been published, in which case
      // only `drafts.x` exists and patching the bare id fails the whole
      // transaction. Patch the id the form is actually on, plus the published
      // copy only when the query proves it exists.
      const self = sorted.find(([key]) => key === publishedId);
      const selfIds = [docId].concat(
        (self?.[1].ids ?? []).filter((id) => id !== docId)
      );
      const selfEntry: [string, { ids: string[]; order: number | null }] = [
        publishedId,
        { ids: selfIds, order: self?.[1].order ?? null },
      ];

      // Pull this one out, then drop it back in at the requested position.
      const others = sorted.filter(([key]) => key !== publishedId);
      const index = Math.min(Math.max(Math.round(target) - 1, 0), others.length);
      const ordered = others.slice(0, index).concat([selfEntry], others.slice(index));

      const tx = client.transaction();
      let changed = 0;
      ordered.forEach(([key, group], i) => {
        const next = i + 1;
        if (group.order !== next || key === publishedId) {
          // Both copies get the number, so publishing a draft never moves it.
          group.ids.forEach((id) => tx.patch(id, { set: { order: next } }));
          if (group.order !== next) changed++;
        }
      });

      await tx.commit();
      lastApplied.current = target;
      toast.push({
        status: "success",
        title: `Moved to position ${Math.min(index + 1, ordered.length)}`,
        description:
          changed > 1
            ? `${changed - 1} other illustration${changed - 1 === 1 ? "" : "s"} shifted`
            : "Nothing else needed moving",
      });
    } catch (err) {
      toast.push({
        status: "error",
        title: "Could not reorder",
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
    }
  }, [client, publishedId, target, toast]);

  return (
    <Stack space={3}>
      {props.renderDefault(props)}

      <Card padding={3} radius={2} tone="primary" border>
        <Stack space={3}>
          <Text size={1}>
            Set the position, then apply — everything from there on moves one step
            down and the whole list is renumbered 1…n.
          </Text>
          <Flex align="center" gap={3}>
            <Button
              text={busy ? "Applying…" : "Apply position"}
              tone="primary"
              disabled={!canApply}
              loading={busy}
              onClick={apply}
            />
            <Box flex={1}>
              <Text size={1} muted>
                {target === null
                  ? "Enter a position first"
                  : lastApplied.current === target
                    ? "Applied"
                    : `Will place this illustration at ${Math.round(target)}`}
              </Text>
            </Box>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
}
