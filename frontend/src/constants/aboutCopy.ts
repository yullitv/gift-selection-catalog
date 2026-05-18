export const ABOUT_COPY = {
  title: 'We turned "I don\'t know" into "I got this".',
  paragraphs: [
    "Searching for the perfect present often ends with a last-minute generic purchase. The Gift Catalog was born to change that.",
    "We've analyzed thousands of reviews to curate a catalog of gifts that actually bring joy—not clutter.",
    "Whether you need gift ideas in Ukraine or a gift for a picky colleague, our smart filters (interest, budget, occasion) deliver the right options in seconds. No more guesswork. Just the look of genuine surprise on their face.",
  ],
  stats: [
    {
      id: "recipients",
      lines: ["2,341 happy", "recipients"],
    },
    {
      id: "match-rate",
      lines: ["98% gift", "match rate"],
    },
    {
      id: "inspiration",
      lines: ["Free inspiration", "(no registration required)"],
    },
  ],
} as const;

export type AboutStat = (typeof ABOUT_COPY.stats)[number];