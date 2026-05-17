import CategoryGridSection from "@/components/landing/CategoryGridSection";
import HeroSection from "@/components/landing/HeroSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoryGridSection />
    </div>
  );
}