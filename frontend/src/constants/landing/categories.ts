import type { GiftAudience } from "@/types/gift";

export type LandingCategory = {
  id: string;
  title: string;
  heading: string;
  description: string;
  cta: string;
  targetAudience: GiftAudience;
  imageSrc: string;
};

export const LANDING_CATEGORIES: LandingCategory[] = [
  {
    id: "for-her",
    title: "For Her",
    heading: "FOR HER",
    description: "Elegant emotional luxury gift",
    cta: "Spoil her",
    targetAudience: "WOMAN",
    imageSrc: "/images/home/categories/for-her-category-givheart.png",
  },
  {
    id: "for-him",
    title: "For Him",
    heading: "FOR HIM",
    description: "Thoughtful gifts he will love",
    cta: "Surprise him",
    targetAudience: "MAN",
    imageSrc: "/images/home/categories/for-him-category-givheart.png",
  },
  {
    id: "for-couples",
    title: "For Couples",
    heading: "FOR COUPLES",
    description: "Romantic ideas for two",
    cta: "Date night ready",
    targetAudience: "COUPLE",
    imageSrc: "/images/home/categories/for-couples-category-givheart.png",
  },
  {
    id: "for-kids",
    title: "For Kids",
    heading: "FOR KIDS",
    description: "Joyful surprises for little ones",
    cta: "Make them smile",
    targetAudience: "CHILD",
    imageSrc: "/images/home/categories/for-kids-category-givheart.png",
  },
];
