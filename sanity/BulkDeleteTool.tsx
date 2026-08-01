import { useCallback, useEffect, useState } from "react";
import { useClient } from "sanity";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@sanity/ui";
import { TrashIcon } from "@sanity/icons";

type Row = {
  _id: string;
  title: string | null;
  order: number | null;
  imageUrl: string | null;
};

const QUERY = `*[_type == "illustration"] | order(order asc, _createdAt desc){
  _id, title, order, "imageUrl": image.asset->url
}`;

export default function BulkDeleteTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const toast = useToast();

  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await client.fetch<Row[]>(QUERY));
      setSelected(new Set());
    } catch (err) {
      toast.push({
        status: "error",
        title: "Could not load illustrations",
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setLoading(false);
    }
  }, [client, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const toggleAll = () =>
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r._id)));

  const deleteSelected = async () => {
    setBusy(true);
    try {
      const tx = client.transaction();
      // Array.from rather than iterating the Set directly — the project's
      // TypeScript target predates for...of over Sets.
      Array.from(selected).forEach((id) => {
        const published = id.replace(/^drafts\./, "");
        // Delete the draft as well — an unpublished copy would otherwise keep
        // the document alive and it would reappear in the list.
        tx.delete(published);
        tx.delete(`drafts.${published}`);
      });
      await tx.commit();
      toast.push({
        status: "success",
        title: `Deleted ${selected.size} illustration${selected.size === 1 ? "" : "s"}`,
      });
      await load();
    } catch (err) {
      toast.push({
        status: "error",
        title: "Nothing was deleted",
        description: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setBusy(false);
      setConfirming(false);
    }
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
            Bulk delete illustrations
          </Text>
          <Text size={1} muted>
            Removes the selected entries from the portfolio gallery. The image files
            themselves stay in Sanity, so anything deleted here can be rebuilt later.
          </Text>
        </Stack>

        <Flex align="center" gap={3} wrap="wrap">
          <Button
            mode="ghost"
            text={allSelected ? "Deselect all" : `Select all (${rows.length})`}
            onClick={toggleAll}
            disabled={rows.length === 0}
          />
          <Button
            tone="critical"
            icon={TrashIcon}
            text={
              confirming
                ? `Yes, delete ${selected.size}`
                : `Delete selected${selected.size ? ` (${selected.size})` : ""}`
            }
            onClick={confirming ? deleteSelected : () => setConfirming(true)}
            disabled={selected.size === 0 || busy}
            loading={busy}
          />
          {confirming && (
            <Button mode="bleed" text="Cancel" onClick={() => setConfirming(false)} />
          )}
          {confirming && (
            <Text size={1} muted>
              This cannot be undone.
            </Text>
          )}
        </Flex>

        {rows.length === 0 ? (
          <Card padding={4} radius={2} tone="transparent">
            <Text size={1} muted>
              No illustrations in the dataset.
            </Text>
          </Card>
        ) : (
          <Grid columns={[1, 2, 3, 4]} gap={3}>
            {rows.map((row) => {
              const checked = selected.has(row._id);
              return (
                <Card
                  key={row._id}
                  padding={3}
                  radius={2}
                  shadow={1}
                  tone={checked ? "critical" : "default"}
                  onClick={() => toggle(row._id)}
                  style={{ cursor: "pointer" }}
                >
                  <Stack space={3}>
                    <Flex align="center" gap={3}>
                      {/* Display only. A read-only checkbox swallows its own
                          click without toggling, so hits on the box itself did
                          nothing; letting them fall through to the card means
                          the whole tile is one target. */}
                      <Box style={{ pointerEvents: "none" }}>
                        <Checkbox checked={checked} readOnly />
                      </Box>
                      <Box flex={1}>
                        <Text size={1} weight="medium" textOverflow="ellipsis">
                          {row.title || "(untitled)"}
                        </Text>
                      </Box>
                      <Text size={0} muted>
                        #{row.order ?? "—"}
                      </Text>
                    </Flex>
                    {row.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`${row.imageUrl}?w=300&h=200&fit=crop&auto=format`}
                        alt={row.title || ""}
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 4,
                          display: "block",
                        }}
                      />
                    )}
                  </Stack>
                </Card>
              );
            })}
          </Grid>
        )}
      </Stack>
    </Box>
  );
}
