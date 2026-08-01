import { useCallback, useRef, useState } from "react";
import { useClient } from "sanity";
import { Box, Button, Card, Flex, Stack, Text, useToast } from "@sanity/ui";
import { UploadIcon } from "@sanity/icons";

const API_VERSION = "2024-01-01";

type Job = {
  name: string;
  status: "waiting" | "uploading" | "done" | "error";
  detail?: string;
  position?: number;
};

/**
 * Uploads several images at once and turns each into an illustration.
 *
 * Studio can only add one document at a time, so a batch of new work meant
 * repeating upload, title, position by hand for every file.
 */
export default function ImportTool() {
  const client = useClient({ apiVersion: API_VERSION });
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [busy, setBusy] = useState(false);

  const run = useCallback(
    async (files: File[]) => {
      setBusy(true);
      setJobs(files.map((f) => ({ name: f.name, status: "waiting" })));

      let created = 0;
      let failed = 0;

      try {
        // Raw, so an unpublished illustration's position is not handed out again.
        const highest: number | null = await client
          .withConfig({ perspective: "raw" })
          .fetch(`math::max(*[_type == "illustration"].order)`);
        let next = (highest ?? 0) + 1;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setJobs((prev) =>
            prev.map((j, k) => (k === i ? { ...j, status: "uploading" } : j))
          );
          try {
            // One at a time: a dozen parallel uploads of full-size artwork is a
            // reliable way to have some of them time out.
            const asset = await client.assets.upload("image", file, {
              filename: file.name,
            });
            const position = next++;
            await client.create({
              _type: "illustration",
              title: file.name.replace(/\.[^.]+$/, ""),
              image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
              order: position,
            });
            created++;
            setJobs((prev) =>
              prev.map((j, k) => (k === i ? { ...j, status: "done", position } : j))
            );
          } catch (err) {
            failed++;
            setJobs((prev) =>
              prev.map((j, k) =>
                k === i
                  ? {
                      ...j,
                      status: "error",
                      detail: err instanceof Error ? err.message : String(err),
                    }
                  : j
              )
            );
          }
        }

        toast.push({
          status: failed ? "warning" : "success",
          title: `Imported ${created} of ${files.length}`,
          description: failed
            ? `${failed} failed — the rest were added`
            : "Added to the end of the gallery",
        });
      } catch (err) {
        toast.push({
          status: "error",
          title: "Import could not start",
          description: err instanceof Error ? err.message : String(err),
        });
      } finally {
        setBusy(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [client, toast]
  );

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) run(files);
  };

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Stack space={2}>
          <Text size={2} weight="semibold">
            Import images
          </Text>
          <Text size={1} muted>
            Each file becomes an illustration, titled after the filename and placed
            at the end of the gallery in the order picked. Existing work is not
            touched.
          </Text>
        </Stack>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onPick}
          style={{ display: "none" }}
        />

        <Flex gap={3} align="center">
          <Button
            icon={UploadIcon}
            text={busy ? "Importing…" : "Choose images"}
            tone="primary"
            disabled={busy}
            loading={busy}
            onClick={() => inputRef.current?.click()}
          />
          {jobs.length > 0 && !busy && (
            <Button mode="bleed" text="Clear list" onClick={() => setJobs([])} />
          )}
        </Flex>

        {jobs.length > 0 && (
          <Stack space={2}>
            {jobs.map((job, i) => (
              <Card
                key={`${job.name}-${i}`}
                padding={3}
                radius={2}
                tone={
                  job.status === "error"
                    ? "critical"
                    : job.status === "done"
                      ? "positive"
                      : "transparent"
                }
              >
                <Flex align="center" gap={3}>
                  <Box flex={1}>
                    <Text size={1} textOverflow="ellipsis">
                      {job.name}
                    </Text>
                  </Box>
                  <Text size={1} muted>
                    {job.status === "waiting" && "waiting"}
                    {job.status === "uploading" && "uploading…"}
                    {job.status === "done" && `position ${job.position}`}
                    {job.status === "error" && (job.detail || "failed")}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
