import AboutSection from "@/components/landing/AboutSection";
import CategoryGridSection from "@/components/landing/CategoryGridSection";
import FeaturedGiftsSection from "@/components/landing/FeaturedGiftsSection";
import HeroSection from "@/components/landing/HeroSection";
import ValueStripSection from "@/components/landing/ValueStripSection";


export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ValueStripSection />
      <CategoryGridSection />
      <FeaturedGiftsSection />
      <AboutSection />
    </div>
  );
}