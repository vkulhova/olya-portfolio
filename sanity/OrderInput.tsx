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
      const rows: Row[] = await client.fetch(
        `*[_type == "illustration"] | order(order asc, _createdAt asc){ _id, order }`
      );

      // Pull this one out, then drop it back in at the requested position.
      const others = rows.filter((r) => r._id !== publishedId);
      const index = Math.min(Math.max(Math.round(target) - 1, 0), others.length);
      const ordered = others
        .slice(0, index)
        .concat([{ _id: publishedId, order: target }], others.slice(index));

      const tx = client.transaction();
      let changed = 0;
      ordered.forEach((row, i) => {
        const next = i + 1;
        const before = rows.find((r) => r._id === row._id)?.order ?? null;
        // The edited document always gets written, so its new position lands on
        // the published copy rather than waiting in a draft.
        if (before !== next || row._id === publishedId) {
          tx.patch(row._id, { set: { order: next } });
          if (before !== next) changed++;
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
