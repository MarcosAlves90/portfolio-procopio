import { useMemo } from "react";

type DescriptionBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; heading: string; items: string[] };

export default function ProjectDescription({
  description,
}: {
  description?: string | null;
}) {
  // Memoize parsing para manter hooks na mesma ordem
  const blocks = useMemo((): DescriptionBlock[] => {
    if (!description || typeof description !== "string") return [];

    const sentences = description
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const result: DescriptionBlock[] = [];

    for (const s of sentences) {
      if (s.includes(">")) {
        const parts = s
          .split(">")
          .map((p) => p.trim())
          .filter(Boolean);

        if (s.startsWith(">")) {
          const last = result[result.length - 1];
          if (last && last.type === "list") {
            last.items.push(...parts);
          } else {
            result.push({ type: "list", heading: "", items: parts });
          }
        } else {
          if (parts.length >= 2) {
            const heading = parts.shift() || "";
            result.push({ type: "list", heading, items: parts });
          } else {
            result.push({ type: "paragraph", text: s });
          }
        }
      } else {
        result.push({ type: "paragraph", text: s });
      }
    }

    return result;
  }, [description]);

  if (blocks.length === 0) return null;

  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "paragraph") {
          return (
            <p
              key={`p-${i}`}
              className="text-lg xl:text-xl font-light mb-4 last:mb-0"
            >
              {b.text}
            </p>
          );
        }

        return (
          <div key={`l-${i}`} className="mb-4">
            {b.heading && (
              <p className="text-lg xl:text-xl font-light mb-4">{b.heading}</p>
            )}
            {b.items.length > 0 && (
              <ul className="list-disc ml-6 space-y-1">
                {b.items.map((item, idx) => (
                  <li key={idx} className="text-lg xl:text-xl font-light">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
}
