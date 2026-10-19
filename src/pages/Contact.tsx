import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import FadeContent from "../components/reactbits/FadeContent";
import { asset } from "../utils/asset";
import "../styles/contact.css";

const TOPICS = [
  "Order Status & Tracking",
  "Size & Fit Advice",
  "Returns & Exchanges",
  "Wholesale & Stockists",
  "Press / Stylist Pull",
  "Something Undefined",
];

const STUDIO_SHOTS = [
  {
    src: asset("/images/editorial-bags.webp"),
    tag: "01 · BUNKER DISPATCH",
    title: "Custom-Stamped Kraft Packaging",
    sub: "Every shirt ships in heavyweight UNTITLED kraft bags within 24–48 hours.",
  },
  {
    src: asset("/images/editorial-mailer.webp"),
    tag: "02 · WEATHERPROOF MAILERS",
    title: "Custom Printed Poly-Mailers",
    sub: "340gsm jersey sealed with full care instructions printed directly on the bag.",
  },
  {
    src: asset("/images/editorial-rack.webp"),
    tag: "03 · STYLIST & PRESS PULLS",
    title: "Full 10-Piece Studio Rack",
    sub: "Available for editorial pulls, showroom appointments & wholesale inquiries.",
  },
];

export default function Contact() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [message, setMessage] = useState("");
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ticket = `UNT-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(ticket);
  };

  return (
    <>
      <section className="page-hero">
        <p className="contact-eyebrow">DIRECT LINE &middot; SUPPORT &amp; PRESS</p>
        <h1 className="page-hero__title">Contact Us</h1>
        <p className="page-hero__subtitle">
          we don't explain the clothes, but we do answer emails.
        </p>
      </section>

      <FadeContent duration={500}>
        <section className="contact-layout">
          {/* Left: Form */}
          <div className="contact-panel">
            {submittedRef ? (
              <div className="contact-success">
                <p className="contact-success__code">
                  TRANSMISSION RECEIVED &middot; #{submittedRef}
                </p>
                <h2 className="contact-success__title">
                  We got your message.
                </h2>
                <p className="contact-success__body">
                  Logged under <strong>{topic}</strong> for{" "}
                  <strong>{email}</strong>. Our studio team replies within 24–48
                  hours (Sunday–Thursday).
                </p>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setSubmittedRef(null);
                    setMessage("");
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__group">
                  <label className="contact-form__label">Inquiry Topic</label>
                  <div className="contact-topics">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        className={
                          "contact-topic" + (topic === t ? " is-active" : "")
                        }
                        onClick={() => setTopic(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label htmlFor="contact-name" className="contact-form__label">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Daniel / Crew"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="contact-form__input"
                    />
                  </div>
                  <div className="contact-form__group">
                    <label
                      htmlFor="contact-email"
                      className="contact-form__label"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="contact-form__input"
                    />
                  </div>
                </div>

                <div className="contact-form__group">
                  <label htmlFor="contact-order" className="contact-form__label">
                    Order Number / SKU (Optional)
                  </label>
                  <input
                    id="contact-order"
                    type="text"
                    placeholder="e.g. #UNT-1042 or UNT-003-SIG-BLK-L"
                    value={orderRef}
                    onChange={(e) => setOrderRef(e.target.value)}
                    className="contact-form__input"
                  />
                </div>

                <div className="contact-form__group">
                  <label
                    htmlFor="contact-message"
                    className="contact-form__label"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    placeholder="Tell us what you need..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="contact-form__textarea"
                  />
                </div>

                <button type="submit" className="btn btn--primary contact-submit">
                  Send Transmission &rarr;
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Business Channels + Dual Model/Product Visual Card */}
          <aside className="contact-sidebar">
            <div className="contact-card">
              <p className="contact-card__eyebrow">01 &middot; Direct Channels</p>
              <div className="contact-channel">
                <span>Customer Care &amp; Orders</span>
                <a href="mailto:orders@untitled-label.com">
                  orders@untitled-label.com
                </a>
              </div>
              <div className="contact-channel">
                <span>Wholesale, Press &amp; Pulls</span>
                <a href="mailto:studio@untitled-label.com">
                  studio@untitled-label.com
                </a>
              </div>
              <div className="contact-channel">
                <span>Instagram</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  @untitled.label &nearr;
                </a>
              </div>
              <div className="contact-channel">
                <span>Dispatch Studio</span>
                <p>
                  Tel Aviv &middot; Underground Dispatch
                  <br />
                  Sun–Thu &middot; 10:00–19:00 IST
                </p>
              </div>
            </div>

            <div className="contact-card contact-card--visual-duo">
              <div className="contact-card__visual-pair">
                <img
                  src={asset("/images/editorial-bags.webp")}
                  alt="UNTITLED model with custom stamped kraft bag"
                  loading="lazy"
                />
                <img
                  src={asset("/images/editorial-mailer.webp")}
                  alt="UNTITLED custom poly-mailer and heavyweight tee"
                  loading="lazy"
                />
              </div>
              <div className="contact-card__caption">
                <span>PACKAGING &amp; DISPATCH</span>
                <p>
                  All orders dispatch within 24–48h in custom-stamped UNTITLED
                  kraft bags and weatherproof poly-mailers. Free shipping over
                  $110.
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* Bottom Packaging, Studio & Model Showcase Strip */}
        <section className="contact-showcase" aria-label="Studio and packaging">
          <div className="contact-showcase__head">
            <div>
              <p className="contact-eyebrow">PACKAGING &amp; SHOWROOM ARCHIVE</p>
              <h2 className="contact-showcase__title">
                From The Bunker To Your Door
              </h2>
            </div>
            <Link to="/products" className="btn">
              Shop All 10 Shirts &rarr;
            </Link>
          </div>

          <div className="contact-showcase__grid">
            {STUDIO_SHOTS.map((shot) => (
              <article key={shot.tag} className="contact-showcase__card">
                <div className="contact-showcase__img-wrap">
                  <img src={shot.src} alt={shot.title} loading="lazy" />
                  <span className="contact-showcase__tag">{shot.tag}</span>
                </div>
                <div className="contact-showcase__body">
                  <h3>{shot.title}</h3>
                  <p>{shot.sub}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </FadeContent>
    </>
  );
}
