import { useCallback, useEffect, useState } from "react";
import { useClient } from "sanity";
import { Box, Card, Flex, Spinner, Stack, Text, useToast } from "@sanity/ui";
import { DragHandleIcon } from "@sanity/icons";

const API_VERSION = "2024-01-01";

type Raw = { _id: string; title: string | null; order: number | null; imageUrl: string | null };

/** One gallery entry. A document with unpublished edits exists twice, as
 *  `drafts.x` and `x`; both ids move together and take a single position. */
type Row = {
  key: string;
  ids: string[];
  title: string | null;
  order: number | null;
  imageUrl: string | null;
};

const QUERY = `*[_type == "illustration"]{
  _id, title, order, "imageUrl": image.asset->url
}`;

function group(raws: Raw[]): Row[] {
  const map = new Map<string, Row>();
  raws.forEach((raw) => {
    const key = raw._id.replace(/^drafts\./, "");
    const isDraft = raw._id.startsWith("drafts.");
    const existing = map.get(key);
    if (!existing) {
      map.set(key, {
        key,
        ids: [raw._id],
        title: raw.title,
        order: raw.order ?? null,
        imageUrl: raw.imageUrl,
      });
      return;
    }
    existing.ids.push(raw._id);
    // The draft is the newer of the two, so its values win.
    if (isDraft) {
      existing.title = raw.title ?? existing.title;
      existing.order = raw.order ?? existing.order;
      existing.imageUrl = raw.imageUrl ?? existing.imageUrl;
    }
  });
  return Array.from(map.values()).sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)
  );
}

/**
 * Drag the rows to set the gallery order.
 *
 * A drop writes the whole list as 1..n rather than nudging the two rows that
 * swapped — the numbers can arrive with gaps or duplicates, and only a full
 * rewrite is guaranteed to clear them.
 */
export default function ReorderTool() {
  const client = useClient({ apiVersion: API_VERSION });
  const toast = useToast();

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Raw, so unpublished illustrations keep their place in the sequence.
      const raws: Raw[] = await client
        .withConfig({ perspective: "raw" })
        .fetch(QUERY);
      setRows(group(raws));
    } catch (err) {
      toast.push({
        status: "error",
        title: "Could not load the gallery",
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  }, [client, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const persist = useCallback(
    async (next: Row[]) => {
      setSaving(true);
      try {
        const tx = client.transaction();
        next.forEach((row, i) => {
          const position = i + 1;
          if (row.order !== position) {
            // Every id for the entry, so publishing a draft never moves it.
            row.ids.forEach((id) => tx.patch(id, { set: { order: position } }));
          }
        });
        await tx.commit();
        setRows(next.map((row, i) => ({ ...row, order: i + 1 })));
      } catch (err) {
        toast.push({
          status: "error",
          title: "Order was not saved",
          description: err instanceof Error ? err.message : String(err),
        });
        // Snap back to whatever the dataset actually holds.
        load();
      } finally {
        setSaving(false);
      }
    },
    [client, load, toast]
  );

  const drop = (from: number, to: number) => {
    if (from === to) return;
    const next = rows.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setRows(next.map((row, i) => ({ ...row, order: i + 1 })));
    persist(next);
  };

  if (loading) {
    return (
      <Flex align="center" justify="center" padding={5} style={{ height: "100%" }}>
        <Spinner muted />
      </Flex>
    );
  }

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={2} weight="semibold">
            Gallery order
          </Text>
          <Text size={1} muted>
            Drag a row to move it. The list is saved as you drop, renumbered 1…n.
            Unpublished illustrations keep a position here but stay off the site
            until they are published.
          </Text>
        </Stack>

        {saving && (
          <Text size={1} muted>
            Saving…
          </Text>
        )}

        {rows.length === 0 ? (
          <Card padding={4} radius={2} tone="transparent">
            <Text size={1} muted>
              No illustrations in the dataset.
            </Text>
          </Card>
        ) : (
          <Stack space={2}>
            {rows.map((row, i) => (
              <Card
                key={row.key}
                padding={2}
                radius={2}
                shadow={dragging === i ? 3 : 1}
                tone={over === i && dragging !== i ? "primary" : "default"}
                draggable
                onDragStart={() => setDragging(i)}
                onDragEnd={() => {
                  setDragging(null);
                  setOver(null);
                }}
                onDragOver={(e: React.DragEvent) => {
                  e.preventDefault();
                  setOver(i);
                }}
                onDrop={(e: React.DragEvent) => {
                  e.preventDefault();
                  if (dragging !== null) drop(dragging, i);
                  setDragging(null);
                  setOver(null);
                }}
                style={{ cursor: "grab", opacity: dragging === i ? 0.4 : 1 }}
              >
                <Flex align="center" gap={3}>
                  <Box paddingX={2}>
                    <Text size={2} muted>
                      <DragHandleIcon />
                    </Text>
                  </Box>
                  <Box style={{ width: 32 }}>
                    <Text size={1} weight="semibold">
                      {i + 1}
                    </Text>
                  </Box>
                  {row.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${row.imageUrl}?w=96&h=96&fit=crop&auto=format`}
                      alt=""
                      style={{
                        width: 48,
                        height: 48,
                        objectFit: "cover",
                        borderRadius: 3,
                        display: "block",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <Box flex={1}>
                    <Text size={1} textOverflow="ellipsis">
                      {row.title || "(untitled)"}
                    </Text>
                  </Box>
                  {row.ids.some((id) => id.startsWith("drafts.")) && (
                    <Text size={0} muted>
                      unpublished
                    </Text>
                  )}
                </Flex>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
