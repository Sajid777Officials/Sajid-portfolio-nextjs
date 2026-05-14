// Hero split — Graphic Design (left) / Web Development (right)
const { ArrowOut } = window.PortfolioIcons;

const GRAPHIC_SERVICES = [
  "Packaging", "Flyer Design", "Vector Art", "Vector Tracing", "Poster Design",
  "File Conversion", "Embroidery Digitizing", "Business Cards", "Social Media", "Presentations",
];

const WEBDEV_SERVICES = [
  "Website Design", "Web Development", "Landing Pages", "Portfolio Sites", "Business Websites",
  "E-commerce", "App Development", "UI / UX", "Frontend", "Backend",
];

function Hero({ hovered, setHovered, expanded, onExpand }) {
  const isLeftFull = expanded === "graphic";
  const isRightFull = expanded === "webdev";
  const isExpanded = !!expanded;

  return (
    <div className={"hero" + (isExpanded ? " expanded" : "")}>
      {/* LEFT: Graphic Design */}
      <div
        className={
          "hero-panel panel-graphic" +
          (isLeftFull ? " full" : "") +
          (isRightFull ? " hidden" : "") +
          (!isExpanded && hovered === "graphic" ? " boost" : "") +
          (!isExpanded && hovered === "webdev" ? " dim" : "")
        }
        onMouseEnter={() => !isExpanded && setHovered("graphic")}
        onMouseLeave={() => !isExpanded && setHovered(null)}
        onClick={() => !isExpanded && onExpand("graphic")}
      >
        <div className="hero-inner">
          <div>
            <div className="panel-eyebrow">
              <span className="bar"></span>
              01 — Discipline · A
            </div>
            <h1 className="panel-title">
              <span className="stack">Graphic</span>
              <span className="stack"><em>design</em>.</span>
            </h1>
            <p className="panel-sub">
              Identity, print, packaging and editorial work for founders who want
              their brand to look like it means business.
            </p>
            <div className="tag-cloud">
              {GRAPHIC_SERVICES.map(s => (
                <span key={s} className="tag-red">{s}</span>
              ))}
            </div>
          </div>
          <div className="panel-foot">
            <button className="panel-cta" onClick={(e) => { e.stopPropagation(); onExpand("graphic"); }}>
              Enter Graphic Studio
              <span className="arrow"><ArrowOut size={20} sw={2} /></span>
            </button>
            <div className="panel-meta">
              <div className="stat">
                <div className="stat-num">120<span style={{ color: "var(--red)" }}>+</span></div>
                <div className="stat-label">Brands shipped</div>
              </div>
              <div className="stat">
                <div className="stat-num">06<span style={{ color: "var(--red)" }}>y</span></div>
                <div className="stat-label">In practice</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hover-tag"><span className="pulse"></span>Click to enter</div>
      </div>

      {/* CENTER DIVIDER */}
      <div className="hero-divider">
        <span className="vs">/</span>
      </div>

      {/* RIGHT: Web Development */}
      <div
        className={
          "hero-panel panel-webdev" +
          (isRightFull ? " full" : "") +
          (isLeftFull ? " hidden" : "") +
          (!isExpanded && hovered === "webdev" ? " boost" : "") +
          (!isExpanded && hovered === "graphic" ? " dim" : "")
        }
        onMouseEnter={() => !isExpanded && setHovered("webdev")}
        onMouseLeave={() => !isExpanded && setHovered(null)}
        onClick={() => !isExpanded && onExpand("webdev")}
      >
        <div className="hero-inner">
          <div>
            <div className="panel-eyebrow">
              <span className="bar"></span>
              02 — Discipline · B
            </div>
            <h1 className="panel-title">
              <span className="stack">Web &amp;</span>
              <span className="stack"><em>development</em>.</span>
            </h1>
            <p className="panel-sub">
              Engineered websites, web apps and storefronts. Type-safe, fast,
              search-friendly — built to convert and built to last.
            </p>
            <div className="tag-cloud">
              {WEBDEV_SERVICES.map(s => (
                <span key={s} className="tag-line">{s}</span>
              ))}
            </div>
          </div>
          <div className="panel-foot">
            <button className="panel-cta" onClick={(e) => { e.stopPropagation(); onExpand("webdev"); }}>
              Enter Web Studio
              <span className="arrow"><ArrowOut size={20} sw={2} /></span>
            </button>
            <div className="panel-meta">
              <div className="stat">
                <div className="stat-num">84<span style={{ color: "var(--amber)" }}>+</span></div>
                <div className="stat-label">Sites launched</div>
              </div>
              <div className="stat">
                <div className="stat-num">99<span style={{ color: "var(--amber)" }}>%</span></div>
                <div className="stat-label">Lighthouse avg.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hover-tag"><span className="pulse"></span>Click to enter</div>
      </div>
    </div>
  );
}

window.PortfolioHero = Hero;
