// Main App
const { useState, useEffect } = React;
const { Nav } = window.PortfolioShared;
const Hero = window.PortfolioHero;
const GraphicPage = window.PortfolioGraphic;
const WebDevPage = window.PortfolioWebdev;
const CaseSheet = window.PortfolioCaseSheet;
const { TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle, TweakSelect } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "red": "#E63946",
  "navy": "#0B1B3A",
  "accent": "#F4B400",
  "displayFont": "Space Grotesk",
  "bodyFont": "Manrope",
  "showAccent": true,
  "redTagStyle": "fill"
}/*EDITMODE-END*/;

function App() {
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(null); // null | 'graphic' | 'webdev'
  const [caseId, setCaseId] = useState(null);
  const [scale, setScale] = useState(1);

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--red", tweaks.red);
    root.style.setProperty("--navy", tweaks.navy);
    root.style.setProperty("--amber", tweaks.showAccent ? tweaks.accent : tweaks.red);
    root.style.setProperty("--font-display", `"${tweaks.displayFont}", system-ui, sans-serif`);
    root.style.setProperty("--font-body", `"${tweaks.bodyFont}", system-ui, sans-serif`);
  }, [tweaks]);

  // Scale stage to viewport
  useEffect(() => {
    const update = () => {
      const sx = window.innerWidth / 1920;
      const sy = window.innerHeight / 1080;
      setScale(Math.min(sx, sy));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Keyboard back
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (caseId) setCaseId(null);
        else if (expanded) setExpanded(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [caseId, expanded]);

  const goHome = () => { setCaseId(null); setExpanded(null); };
  const openCase = (work) => setCaseId(work.id);

  const onSplit = !expanded;
  const onDark = expanded === "webdev";

  return (
    <div className="stage-wrap">
      <div
        className="stage"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <Nav
          onDark={onDark}
          onSplit={onSplit}
          onHome={goHome}
          onContact={() => {}}
        />

        <Hero
          hovered={hovered}
          setHovered={setHovered}
          expanded={expanded}
          onExpand={setExpanded}
        />

        <GraphicPage
          visible={expanded === "graphic"}
          onBack={() => setExpanded(null)}
          onOpenCase={openCase}
        />

        <WebDevPage
          visible={expanded === "webdev"}
          onBack={() => setExpanded(null)}
          onOpenCase={openCase}
        />

        <CaseSheet caseId={caseId} onClose={() => setCaseId(null)} />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette">
          <TweakColor
            label="Graphic Design red"
            value={tweaks.red}
            onChange={(v) => setTweak("red", v)}
            options={["#E63946", "#DC2626", "#FF3B30", "#C8102E"]}
          />
          <TweakColor
            label="Web Dev navy"
            value={tweaks.navy}
            onChange={(v) => setTweak("navy", v)}
            options={["#0B1B3A", "#102A43", "#050E22", "#1E3A8A"]}
          />
          <TweakToggle
            label="Yellow accent"
            value={tweaks.showAccent}
            onChange={(v) => setTweak("showAccent", v)}
          />
          {tweaks.showAccent && (
            <TweakColor
              label="Accent"
              value={tweaks.accent}
              onChange={(v) => setTweak("accent", v)}
              options={["#F4B400", "#FF7A1A", "#FFD23F", "#FF9F1C"]}
            />
          )}
        </TweakSection>

        <TweakSection label="Typography">
          <TweakSelect
            label="Display font"
            value={tweaks.displayFont}
            onChange={(v) => setTweak("displayFont", v)}
            options={["Space Grotesk", "Archivo", "Bricolage Grotesque", "Instrument Serif"]}
          />
          <TweakSelect
            label="Body font"
            value={tweaks.bodyFont}
            onChange={(v) => setTweak("bodyFont", v)}
            options={["Manrope", "Inter Tight", "DM Sans", "IBM Plex Sans"]}
          />
        </TweakSection>

        <TweakSection label="Jump to view">
          <TweakRadio
            label=""
            value={expanded || "hero"}
            onChange={(v) => { setCaseId(null); setExpanded(v === "hero" ? null : v); }}
            options={[
              { value: "hero", label: "Hero" },
              { value: "graphic", label: "Graphic" },
              { value: "webdev", label: "Web Dev" },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
