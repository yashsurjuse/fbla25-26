type OpenStreetMapProps = {
  className?: string;
};

const OSM_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=-73.9687%2C40.7762%2C-73.9574%2C40.7837&layer=mapnik&marker=40.7794%2C-73.9632";

export default function OpenStreetMap({ className }: OpenStreetMapProps) {
  return (
    <div className={className}>
      <iframe
        title="OpenStreetMap showing The Met Fifth Avenue"
        src={OSM_EMBED_URL}
        className="h-full w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
