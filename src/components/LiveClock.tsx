import { useEffect, useState } from "react";

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour12: false });
}

export default function LiveClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero__clock">
      <span className="hero__clock-icon" aria-hidden="true">
        &#9789;
      </span>
      <span>
        NOWHERE, EARTH &middot; {time} &middot; SIGNAL LOST
      </span>
    </div>
  );
}
