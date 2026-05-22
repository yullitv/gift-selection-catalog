export function formatTagLabel(tag: string): string {
  if (!tag) return tag;
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}