type GoogleMapEmbedProps = {
  className?: string;
};

const GOOGLE_MAP_EMBED_URL =
  "https://www.google.com/maps?q=1000+5th+Ave,+New+York,+NY+10028&output=embed";

export default function GoogleMapEmbed({ className }: GoogleMapEmbedProps) {
  return (
    <div className={className}>
      <iframe
        title="Google Map showing The Met Fifth Avenue"
        src={GOOGLE_MAP_EMBED_URL}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
