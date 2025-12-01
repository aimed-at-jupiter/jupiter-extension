export function getTitle(name: string): {
  title?: string;
  nameWithoutTitle: string;
} {
  if (!name) return { nameWithoutTitle: "" };

  const titles = ["mr", "ms", "mrs", "mx", "miss", "dr", "prof"];

  const parts = name.trim().split(/\s+/);
  const firstPart = parts[0].replace(".", "").toLowerCase();

  if (titles.includes(firstPart)) {
    return {
      title: firstPart[0].toUpperCase() + firstPart.slice(1),
      nameWithoutTitle: parts.slice(1).join(" "),
    };
  }
  return { nameWithoutTitle: name };
}
