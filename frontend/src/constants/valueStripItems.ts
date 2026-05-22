export type ValueStripItem = {
  id: string;
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
};

export const VALUE_STRIP_ITEMS: ValueStripItem[] = [
  {
    id: "selection",
    iconSrc: "/images/home/whyUs/icons/clock.png",
    iconAlt: "Clock — fast gift selection",
    title: "5-minute selection",
    description: "Filters by interest, budget, and occasion.",
  },
  {
    id: "proven",
    iconSrc: "/images/home/whyUs/icons/star.png",
    iconAlt: "Star — proven gift ideas",
    title: "Proven ideas",
    description: "Only gifts with a 4.5+ rating from real recipients.",
  },
  {
    id: "impress",
    iconSrc: "/images/home/whyUs/icons/gift.png",
    iconAlt: "Gift box — ready to impress",
    title: "Ready to impress",
    description: "Elegant packaging & fast delivery across USA.",
  },
];