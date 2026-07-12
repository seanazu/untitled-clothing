import FadeContent from "../components/reactbits/FadeContent";
import "../styles/about.css";

const FAQ = [
  {
    q: "Do your product descriptions mean anything?",
    a: "No. Hopefully you remember what you ordered — we don't write descriptions.",
  },
  {
    q: "What's the sizing like?",
    a: "Runs true to size, mostly. Some pieces run big on purpose. Check the fit note on the product if we remembered to write one.",
  },
  {
    q: 'Is this a "real" brand?',
    a: "As real as any of them. UNTITLED is clothing, made and sold, worn by people. That's the whole definition.",
  },
  {
    q: "Can I return something?",
    a: "Within 30 days, unworn, tags on. Email us — we reply eventually.",
  },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero__title">
          About Nothing
          <br />
          in Particular
        </h1>
        <p className="page-hero__subtitle">no meaning. just energy.</p>
      </section>

      <FadeContent duration={500}>
        <section className="manifesto">
          <div className="manifesto__text">
            <p>
              <em>UNTITLED</em> doesn't stand for anything. There's no origin
              story, no founder photo in a denim jacket, no three-word brand
              pillars.
            </p>
            <p>
              It started because making clothes was more fun than not making
              clothes. That's the whole pitch.
            </p>
            <p>
              <em>Stop trying to define it. It's for fun.</em>
            </p>
          </div>
          <img
            className="manifesto__doodle"
            src="/brand/doodle.png"
            alt="hand-written notes: hopefully you remember what you ordered cause I don't write description. stop trying to define, it's for fun. no meaning, just energy."
          />
        </section>

        <section className="faq">
          {FAQ.map((item) => (
            <div className="faq__item" key={item.q}>
              <h3 className="faq__q">{item.q}</h3>
              <p className="faq__a">{item.a}</p>
            </div>
          ))}
        </section>
      </FadeContent>
    </>
  );
}
