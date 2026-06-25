type GoogleMapEmbedProps = {
  className?: string;
  src?: string;
};

const DEFAULT_URL = "https://www.google.com/maps?q=1000+5th+Ave,+New+York,+NY+10028&output=embed";

export default function GoogleMapEmbed({ className, src = DEFAULT_URL }: GoogleMapEmbedProps) {
  return (
    <div className={className}>
      <iframe
        title="Google Map"
        src={src}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
