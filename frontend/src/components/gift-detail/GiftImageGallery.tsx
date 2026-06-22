import { cn } from "@/lib/utils";

type GiftImageGalleryProps = {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  alt: string;
};

export default function GiftImageGallery({
  images,
  selectedIndex,
  onSelect,
  alt,
}: GiftImageGalleryProps) {
  const mainSrc = images[selectedIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm">
        <img
          src={mainSrc}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => onSelect(index)}
              className={cn(
                "size-16 overflow-hidden rounded-lg border-2 bg-muted transition-colors",
                index === selectedIndex
                  ? "border-brand-gold"
                  : "border-transparent opacity-80 hover:opacity-100",
              )}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === selectedIndex}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}