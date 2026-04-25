import GalleryGrid from "@/features/gallery/components/GalleryGrid";

export default function GalleryPage() {
  return (
    <div className="pt-20">
      <div className="py-20 px-6 bg-white text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Take a look at some of our finest installations across various residential and commercial properties.
        </p>
      </div>
      <GalleryGrid />
    </div>
  );
}
