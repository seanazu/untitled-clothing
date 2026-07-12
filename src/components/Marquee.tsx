import "./Marquee.css";

const ITEMS = [
  "Don't try to define it",
  "No meaning, just energy",
  "New drop: Void",
  "Untitled",
];

export default function Marquee() {
  // Track is rendered twice; the animation translates -50% for a seamless loop.
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <span className="marquee__dot">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
