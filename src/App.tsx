//@ts-nocheck
import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";

// ============================================================
// ACCENT COLOR CONTEXT
// ============================================================
const AccentContext = createContext("#00fff7");
const useAccent = (hackerMode) => {
  const ctx = useContext(AccentContext);
  return hackerMode ? "#39ff14" : ctx;
};

// ============================================================
// TYPES & CONSTANTS
// ============================================================
const APPS = {
  about: { id: "about", title: "About Me", icon: "◉", color: "#00fff7" },
  terminal: { id: "terminal", title: "Terminal", icon: "⌨", color: "#39ff14" },
  projects: { id: "projects", title: "Projects", icon: "◈", color: "#bf00ff" },
  vscode: { id: "vscode", title: "Internship", icon: "⟨⟩", color: "#007acc" },
  sih: { id: "sih", title: "SIH Project", icon: "⚔", color: "#ff6b35" },
  blockchain: { id: "blockchain", title: "Web3", icon: "⬡", color: "#f7931a" },
  gallery: { id: "gallery", title: "Gallery", icon: "⊞", color: "#ff2d78" },
  certs: { id: "certs", title: "Certificates", icon: "✦", color: "#ffd700" },
  resume: { id: "resume", title: "Resume", icon: "📄", color: "#a8ff78" },
  skills: { id: "skills", title: "Skills", icon: "◎", color: "#00e5ff" },
  github: { id: "github", title: "GitHub", icon: "◉", color: "#6e40c9" },
  music: { id: "music", title: "Music", icon: "♫", color: "#ff2d78" },
  chat: { id: "chat", title: "AI Chat", icon: "⟁", color: "#00ff88" },
  contact: { id: "contact", title: "Contact", icon: "✉", color: "#00d4ff" },
  settings: { id: "settings", title: "Settings", icon: "⚙", color: "#888" },
};

const DOCK_APPS = ["about","terminal","projects","vscode","sih","blockchain","gallery","certs","resume","skills","github","music","chat","contact"];

const COMMANDS = {
  help: () => `╔══════════════════════════════════════╗\n║         HARSHOS COMMAND HELP          ║\n╚══════════════════════════════════════╝\n\n  about          → System info\n  whoami          → Identity\n  skills          → Tech stack\n  projects        → Projects list\n  internship      → Internship details\n  sih             → SIH finalist project\n  blockchain      → Web3 projects\n  certificates    → Achievements\n  contact         → Get in touch\n  ls              → List directory\n  wpm             → Typing speed stats\n  open [app]      → Open window\n  theme hacker    → Enable hacker mode\n  theme default   → Disable hacker mode\n  clear           → Clear terminal\n  exit            → Close terminal`,
  whoami: () => `┌─────────────────────────────────────┐\n│  USER: harsh_kumar_verma            │\n│  ROLE: AI Security Engineer         │\n│  CLEARANCE: CLASSIFIED ████████     │\n│  STATUS: ACTIVE                     │\n│  LOCATION: Bhopal, MP, India        │\n└─────────────────────────────────────┘`,
  about: () => `[SYS] Loading profile...\n\n  Name    : Harsh Kumar Verma\n  Degree  : B.Tech CSE — CPI 8.11\n  Focus   : AI Security + Defence Tech\n  Status  : SIH Finalist | Defence Tech Intern\n  Mission : Building AI systems for national-scale security\n\n[SYS] Profile loaded successfully.`,
  skills: () => `[SCAN] Analyzing skill matrix...\n\n  ⬡ AI/ML       → PyTorch, TensorFlow, Scikit-learn, GNN\n  ⬡ Security    → Firmware Analysis, Malware Detection\n  ⬡ Backend     → FastAPI, Node.js, Flask, Python\n  ⬡ Frontend    → React, TypeScript, TailwindCSS\n  ⬡ Blockchain  → Solidity, Web3.js, Smart Contracts\n  ⬡ DevOps      → Docker, Git, Linux, Hardhat\n  ⬡ Crypto      → ZKP, Cryptographic Primitives, PKI\n\n[SCAN] 50+ skills detected. Threat level: EXPERT`,
  projects: () => `[DIR] /home/harsh/projects/\n\n  ── BLOCKCHAIN ──────────────────────\n  01 → AgroChain/            [SUPPLY CHAIN]\n  02 → ZKProofSystem/        [ZERO KNOWLEDGE]\n  03 → PeerLedWorkshops/     [REWARD SYSTEM]\n\n  ── HACKATHONS ──────────────────────\n  04 → malware_gnn_sih2025/  [AI/SECURITY]\n  05 → campaign_sentinel/    [MICROSOFT HKN]\n  06 → climate_guard/        [HACK WITH INDIA]\n  07 → phishing_detector/    [CHROME EXT]\n  08 → healthkey/            [HEALTH TECH]\n\n  ── PYTHON ──────────────────────────\n  09 → volvex_3d_gestures/   [COMPUTER VISION]\n  10 → dr_strange_gestures/  [GESTURE AI]\n\n  ── FINTECH ─────────────────────────\n  11 → stock_ai_platform/    [NEXT.JS]\n\n  ── WEB DEV ─────────────────────────\n  12 → codeconnect/          [SOCIAL CODING]\n  13 → macos_portfolio/      [THIS SITE]\n  14 → hospital_dashboard/   [FULLSTACK]\n  15 → timetable_gen/        [AI SCHEDULER]\n\n  15 projects found.`,
  blockchain: () => `[CHAIN] Loading Web3 projects...\n\n  01 → AgroChain\n       Farm-to-consumer QR tracking on Ethereum\n       Tech: Solidity, Web3, QR Code, React\n\n  02 → ZKProofSystem\n       Privacy-preserving ZK proof verification\n       Tech: Solidity, keccak256, Remix/Hardhat\n\n  03 → PeerLedWorkshops\n       Blockchain peer learning reward system\n       Tech: Solidity, MetaMask, Ethereum\n\n[CHAIN] 3 smart contracts deployed.`,
  internship: () => `[GOV] Accessing internship records...\n\n  ██ 01 — MINISTRY OF DEFENCE, INDIA (CURRENT) ██\n  Role    : AI Security Systems Intern\n  Period  : 2024 – Present (6 Months)\n  Work    : AI threat detection, GNN malware analysis\n            Firmware security, national-level systems\n  Level   : National (Classified)\n\n  ── 02 — DELOITTE TECHNOLOGY ────────────────\n  Role    : Software Engineering Simulation\n  Period  : July 2025\n  Work    : Debugged software modules\n            Reduced bugs by 30%\n  Cert ID : x8mcYfoiFmxSZp37m\n\n  ── 03 — AWS APAC SOLUTIONS ARCHITECTURE ────\n  Role    : Cloud Architecture Simulation\n  Period  : September 2025\n  Work    : Deployed Elastic Beanstalk architecture\n            40% faster · 10K+ users · zero downtime\n  Cert ID : 99RQY2zcfPrGGzhvt\n\n[GOV] 3 internships loaded.`,
  sih: () => `[INTEL] Loading SIH 2025 mission data...\n\n  ██ PROJECT: AI-Driven GNN Firmware Analyzer ██\n  Event     : Smart India Hackathon 2025\n  Status    : FINALIST\n  Problem   : AI/ML Malware & Firmware Graph Analysis\n              using Graph Neural Networks\n  Tech      : PyTorch, GIN+GraphSAGE, Radare2\n              Capstone, FastAPI, CUDA GPU\n  Features  : Binary→CFG conversion, Zero-day detection\n              Multi-arch support (x86/ARM/MIPS)\n  Impact    : National Cybersecurity Level\n\n[INTEL] Classified details redacted.`,
  certificates: () => `[VAULT] Loading achievement records...\n\n  ✦ SIH 2025 Finalist\n  ✦ Defence Tech Internship — Ministry of Defence\n  ✦ Microsoft Hackathon Participant\n  ✦ Hack with India Participant\n  ✦ AI/ML Specialization — Coursera\n  ✦ Cybersecurity Professional Cert — CISCO\n  ✦ Web3 & Blockchain Developer — Alchemy\n  ✦ Hackathon Winner x3\n\n[VAULT] 8 achievements verified.`,
  contact: () => `[NET] Establishing secure channel...\n\n  ► Email   : harsh9760verma@gmail.com\n  ► GitHub  : github.com/Harsh-lab-art\n  ► LinkedIn: linkedin.com/in/harsh-kumar-verma-850636336\n  ► LeetCode: leetcode.com/u/Harshspidey12\n  ► Location: Bhopal, MP, India\n\n[NET] Encryption: AES-256 ✓`,
  ls: () => `drwxr-xr-x  blockchain/\ndrwxr-xr-x  hackathons/\ndrwxr-xr-x  python_projects/\ndrwxr-xr-x  web_dev/\ndrwxr-xr-x  internship/\n-rw-r--r--  resume.pdf\n-rw-r--r--  portfolio.tar.gz\n-rwxr-xr-x  deploy.sh\n-rw-------  classified.enc`,
  exit: () => `[SYS] Closing terminal session...\nGoodbye, agent.`,
  clear: () => "CLEAR",
};

// ============================================================
// WALLPAPER COMPONENT — real images + matrix rain overlay
// ============================================================
function Wallpaper({ hackerMode }) {
  const matrixRef = useRef(null);
  const animRef   = useRef(null);

  // Matrix rain canvas — only runs in hacker mode
  useEffect(() => {
    if (!hackerMode) {
      cancelAnimationFrame(animRef.current);
      return;
    }
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const cols  = Math.floor(W / 18);
    const drops = Array(cols).fill(1);
    const chars = "アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "14px monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        // Bright-green head, dimmer tail handled by fade above
        const bright = drops[i] % 8 === 0;
        ctx.fillStyle = bright
          ? `rgba(180,255,180,${Math.random() * 0.4 + 0.6})`
          : `rgba(57,255,20,${Math.random() * 0.6 + 0.2})`;
        ctx.fillText(ch, i * 18, drops[i] * 18);
        if (drops[i] * 18 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      // Clear canvas when leaving hacker mode so no ghost frame remains
      ctx.clearRect(0, 0, W, H);
    };
  }, [hackerMode]);

  return (
    <>
      {/* ── Colorful macOS Big Sur wallpaper (default) ── */}
      <img
        src="macos-big-sur.jpg"
        alt="wallpaper"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          width: "100vw", height: "100vh",
          objectFit: "cover", objectPosition: "center center", zIndex: 0,
          opacity: hackerMode ? 0 : 1,
          transition: "opacity 0.8s ease",
          pointerEvents: "none", display: "block",
        }}
      />

      {/* ── Dark Apple-brick wallpaper (hacker mode) ── */}
      <img
        src="mac-dark.jpg"
        alt="hacker wallpaper"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          width: "100vw", height: "100vh",
          objectFit: "cover", objectPosition: "center center", zIndex: 0,
          opacity: hackerMode ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none", display: "block",
        }}
      />

      {/* ── Matrix rain overlay (only visible in hacker mode) ── */}
      <canvas
        ref={matrixRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          width: "100vw", height: "100vh",
          zIndex: 1,
          opacity: hackerMode ? 1 : 0,
          transition: "opacity 0.8s ease",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

// ============================================================
// MOUSE GLOW
// ============================================================
function MouseGlow({ hackerMode }) {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const h = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div className="fixed pointer-events-none" style={{
      left: pos.x-150, top: pos.y-150, width: 300, height: 300,
      background: `radial-gradient(circle, ${hackerMode ? "rgba(57,255,20,0.08)" : "rgba(0,255,247,0.06)"} 0%, transparent 70%)`,
      zIndex: 2, transition: "left 0.05s, top 0.05s",
    }} />
  );
}

// ============================================================
// BOOT SCREEN
// ============================================================
function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);
  const bootLines = [
    "HarshOS v2.0 — Initializing...",
    "Loading kernel modules...",
    "Mounting encrypted volumes... [OK]",
    "Starting AI security daemon... [OK]",
    "Establishing secure channel... [OK]",
    "Verifying clearance level... [GRANTED]",
    "Loading neural frameworks... [OK]",
    "Loading GNN modules... [OK]",
    "Boot sequence complete.",
    "",
    "Welcome, Agent. Access Granted.",
  ];
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i];
        if (line !== undefined) setLines(prev => [...prev, line]);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setDone(true), 800);
        setTimeout(onComplete, 2000);
      }
    }, 180);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center" style={{
      background: "#000", zIndex: 9999,
      opacity: done ? 0 : 1, transition: "opacity 0.8s ease",
      pointerEvents: done ? "none" : "all",
      fontFamily: "'JetBrains Mono', 'Courier New', monospace",
    }}>
      <div className="mb-8 text-5xl font-bold" style={{ color: "#00fff7", fontFamily: "Orbitron, monospace", textShadow: "0 0 30px #00fff7" }}>
        HarshOS
      </div>
      <div className="w-96 space-y-1">
        {lines.map((l, i) => {
          const s = typeof l === "string" ? l : "";
          return (
            <div key={i} style={{
              color: s.includes("GRANTED") || s.includes("Welcome") ? "#39ff14"
                   : s.includes("OK") ? "#00fff7"
                   : "#aaa",
              fontSize: 13, minHeight: 20,
            }}>
              {s}
            </div>
          );
        })}
      </div>
      <div className="mt-8 w-64 h-0.5 bg-gray-800 rounded overflow-hidden">
        <div className="h-full rounded" style={{
          background: "linear-gradient(90deg, #00fff7, #bf00ff)",
          width: `${(lines.length / bootLines.length) * 100}%`,
          transition: "width 0.18s ease", boxShadow: "0 0 10px #00fff7",
        }} />
      </div>
    </div>
  );
}

// ============================================================
// WINDOW MANAGER
// ============================================================
let nextZIndex = 10;

function Window({ id, title, children, onClose, onMinimize, hackerMode, initialPos, initialSize }) {
  const [pos, setPos] = useState(initialPos || { x: 80 + Math.random() * 200, y: 60 + Math.random() * 100 });
  const [size, setSize] = useState(initialSize || { w: 820, h: 560 });
  const [maximized, setMaximized] = useState(false);
  const [prevState, setPrevState] = useState(null);
  const [zIndex, setZIndex] = useState(nextZIndex++);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [tlHover, setTlHover] = useState(false);
  const dragOffset = useRef({});
  const resizeStart = useRef({});
  const winRef = useRef(null);

  const bringToFront = () => setZIndex(nextZIndex++);

  const startDrag = e => {
    if (maximized) return;
    bringToFront(); setIsDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  };

  const startResize = e => {
    if (maximized) return;
    bringToFront(); setIsResizing(true);
    resizeStart.current = { mx: e.clientX, my: e.clientY, w: size.w, h: size.h };
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = e => {
      if (isDragging) setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
      if (isResizing) {
        const dx = e.clientX - resizeStart.current.mx, dy = e.clientY - resizeStart.current.my;
        setSize({ w: Math.max(500, resizeStart.current.w + dx), h: Math.max(350, resizeStart.current.h + dy) });
      }
    };
    const onUp = () => { setIsDragging(false); setIsResizing(false); };
    window.addEventListener("mousemove", onMove); window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [isDragging, isResizing]);

  const toggleMax = () => {
    if (maximized) {
      setMaximized(false);
      if (prevState) { setPos(prevState.pos); setSize(prevState.size); }
    } else {
      setPrevState({ pos, size });
      setMaximized(true);
    }
  };

  const handleClose = e => { e.stopPropagation(); e.preventDefault(); onClose(); };
  const handleMinimize = e => { e.stopPropagation(); e.preventDefault(); onMinimize(); };
  const handleMaximize = e => { e.stopPropagation(); e.preventDefault(); toggleMax(); };

  const accent = useAccent(hackerMode);
  const style = maximized
    ? { position: "fixed", left: 0, top: 28, width: "100vw", height: "calc(100vh - 28px)", zIndex }
    : { position: "fixed", left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex };

  const tlBtnStyle = (color) => ({
    width: 13, height: 13, borderRadius: "50%", border: "none", padding: 0,
    background: color, boxShadow: `0 0 6px ${color}`,
    cursor: "pointer", flexShrink: 0, position: "relative",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "filter 0.15s",
  });

  return (
    <div ref={winRef} style={{
      ...style, borderRadius: maximized ? 0 : 12,
      background: "rgba(10,10,20,0.88)", backdropFilter: "blur(24px) saturate(160%)",
      border: `1px solid ${accent}22`,
      boxShadow: `0 0 0 1px ${accent}11, 0 8px 60px rgba(0,0,0,0.8), 0 0 30px ${accent}18`,
      display: "flex", flexDirection: "column", overflow: "hidden",
      fontFamily: "'JetBrains Mono', monospace",
    }} onMouseDown={bringToFront}>

      {/* ── Title bar ── */}
      <div
        onMouseDown={startDrag}
        style={{
          height: 38, background: "rgba(255,255,255,0.04)", borderBottom: `1px solid ${accent}18`,
          display: "flex", alignItems: "center", gap: 8, padding: "0 14px",
          cursor: isDragging ? "grabbing" : "grab", userSelect: "none", flexShrink: 0,
        }}
      >
        {/* Traffic lights — hover group */}
        <div
          style={{ display: "flex", gap: 7, alignItems: "center" }}
          onMouseEnter={() => setTlHover(true)}
          onMouseLeave={() => setTlHover(false)}
        >
          {/* Red — Close */}
          <button
            onClick={handleClose}
            onMouseDown={e => e.stopPropagation()}
            title="Close"
            style={tlBtnStyle("#ff5f57")}
          >
            {tlHover && (
              <span style={{ fontSize: 8, color: "#7a0000", fontWeight: 900, lineHeight: 1, pointerEvents: "none" }}>✕</span>
            )}
          </button>

          {/* Yellow — Minimize */}
          <button
            onClick={handleMinimize}
            onMouseDown={e => e.stopPropagation()}
            title="Minimize"
            style={tlBtnStyle("#febc2e")}
          >
            {tlHover && (
              <span style={{ fontSize: 9, color: "#7a4800", fontWeight: 900, lineHeight: 1, pointerEvents: "none", marginTop: -1 }}>−</span>
            )}
          </button>

          {/* Green — Maximize */}
          <button
            onClick={handleMaximize}
            onMouseDown={e => e.stopPropagation()}
            title={maximized ? "Restore" : "Maximize"}
            style={tlBtnStyle("#28c840")}
          >
            {tlHover && (
              <span style={{ fontSize: 7, color: "#004d00", fontWeight: 900, lineHeight: 1, pointerEvents: "none" }}>
                {maximized ? "⤡" : "⤢"}
              </span>
            )}
          </button>
        </div>

        <span style={{
          flex: 1, textAlign: "center", fontSize: 12, color: accent,
          letterSpacing: 2, textTransform: "uppercase", pointerEvents: "none",
        }}>
          {title}
        </span>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>{children}</div>

      {/* ── Resize handle ── */}
      {!maximized && (
        <div
          onMouseDown={startResize}
          style={{
            position: "absolute", right: 0, bottom: 0, width: 18, height: 18,
            cursor: "se-resize",
            background: `linear-gradient(135deg, transparent 50%, ${accent}33 50%)`,
            borderRadius: "0 0 12px 0",
          }}
        />
      )}
    </div>
  );
}

// ============================================================
// APP COMPONENTS
// ============================================================

function AboutApp({ hackerMode }) {
  const [typed, setTyped] = useState("");
  const [count, setCount] = useState(0);
  const msg = "Building AI systems for national-scale security";
  const accent = useAccent(hackerMode);

  useEffect(() => {
    setTyped(""); setCount(0);
    const t = setInterval(() => {
      setCount(c => {
        if (c >= msg.length) { clearInterval(t); return c; }
        setTyped(msg.slice(0, c + 1)); return c + 1;
      });
    }, 60);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { label: "Projects", value: "15+", icon: "◈" },
    { label: "Hackathons", value: "5+", icon: "⚡" },
    { label: "Certs", value: "8+", icon: "✦" },
    { label: "Internship", value: "MoD", icon: "⚔" },
  ];

  const techStack = [
    { cat: "AI/ML", items: ["PyTorch", "GNN", "Scikit-learn", "CUDA"], color: "#bf00ff" },
    { cat: "Security", items: ["Firmware Analysis", "ZKP", "Malware Detection"], color: "#ff6b35" },
    { cat: "Blockchain", items: ["Solidity", "Ethereum", "Web3.js", "Hardhat"], color: "#f7931a" },
    { cat: "Full-Stack", items: ["React", "Next.js", "TypeScript", "FastAPI"], color: "#00d4ff" },
  ];

  return (
    <div style={{ padding: 18, color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace", overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            border: `2px solid ${accent}`, boxShadow: `0 0 20px ${accent}55`,
            flexShrink: 0, overflow: "hidden",
          }}>
            <img src="mee.jpeg" alt="Harsh Kumar Verma" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "Orbitron, monospace", color: accent, letterSpacing: 1, wordBreak: "break-word" }}>
            Harsh Kumar Verma
          </div>
          <div style={{ marginTop: 6, color: "#bf00ff", fontSize: 13, letterSpacing: 3, textTransform: "uppercase" }}>
            AI Security Engineer · Defence Tech Intern
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: "#888" }}>B.Tech CSE · CPI 8.28 · SIH 2025 Finalist · Bhopal, MP</div>
          <div style={{ marginTop: 16, fontSize: 13, color: accent, fontStyle: "italic", minHeight: 20 }}>
            "{typed}<span style={{ animation: "blink 1s infinite", borderLeft: `2px solid ${accent}` }}>&nbsp;</span>"
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginTop: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}33`,
            borderRadius: 10, padding: "16px 12px", textAlign: "center",
            boxShadow: `0 0 15px ${accent}11`,
          }}>
            <div style={{ fontSize: 24 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: accent, marginTop: 4 }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, background: "rgba(0,255,247,0.04)", borderRadius: 10, padding: 14, border: `1px solid ${accent}22` }}>
        <div style={{ color: accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>// sys.profile</div>
        <p style={{ color: "#bbb", lineHeight: 1.9, fontSize: 13 }}>
          AI Security Engineer specializing in Graph Neural Networks, firmware analysis, and defence-grade cybersecurity systems.
          SIH 2025 Finalist with an AI-driven malware detection framework using GNN. Interned with the Ministry of Defence on national-level AI security.
          Built blockchain systems for supply chain transparency, zero-knowledge verification, and decentralized learning rewards.
          Passionate about building AI that solves real-world, high-stakes problems.
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ color: accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 14 }}>// tech.stack</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
          {techStack.map(tc => (
            <div key={tc.cat} style={{ background: `${tc.color}08`, border: `1px solid ${tc.color}33`, borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: tc.color, fontWeight: 700, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>{tc.cat}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {tc.items.map(item => (
                  <span key={item} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${tc.color}18`, color: tc.color, border: `1px solid ${tc.color}33` }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TerminalApp({ hackerMode, onOpenApp }) {
  const [history, setHistory] = useState([{ type: "system", text: "Initializing HarshOS v2.0...\nBoot sequence complete. Type 'help' for commands." }]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const accent = useAccent(hackerMode);

  // ── WPM tracking ─────────────────────────────────────────
  const [wpm, setWpm] = useState(0);
  const [wpmPeak, setWpmPeak] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [totalCmds, setTotalCmds] = useState(0);
  const keystrokeLog = useRef([]); // timestamps of recent keystrokes

  const trackKeystroke = () => {
    const now = Date.now();
    keystrokeLog.current.push(now);
    // Keep only keystrokes in the last 5 seconds
    keystrokeLog.current = keystrokeLog.current.filter(t => now - t <= 5000);
    // WPM = (keystrokes in last 5s / 5 chars per word) * (60s / 5s window)
    const cps = keystrokeLog.current.length / 5;
    const live = Math.round(cps * 60 / 5);
    setWpm(live);
    setWpmPeak(p => Math.max(p, live));
  };

  // Decay WPM to 0 when not typing
  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now();
      keystrokeLog.current = keystrokeLog.current.filter(t => now - t <= 5000);
      if (keystrokeLog.current.length === 0) setWpm(0);
    }, 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const run = cmd => {
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    setCmdHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setTotalChars(n => n + cmd.length);
    setTotalCmds(n => n + 1);
    let out = "";
    if (c === "clear") { setHistory([]); setInput(""); return; }
    else if (c === "wpm") {
      out = `╔══════════════════════════════════╗\n║         TYPING STATISTICS        ║\n╚══════════════════════════════════╝\n\n  Current WPM  : ${wpm}\n  Peak WPM     : ${wpmPeak}\n  Commands run : ${totalCmds + 1}\n  Chars typed  : ${totalChars + cmd.length}\n\n${wpmPeak >= 80 ? "  ⚡ ELITE HACKER SPEED DETECTED" : wpmPeak >= 50 ? "  ✓ Solid typing speed" : "  ↑ Keep practicing, agent"}`;
    }
    else if (c.startsWith("open ")) {
      const target = c.replace("open ", "");
      const map = { gallery: "gallery", certificates: "certs", certs: "certs", projects: "projects", terminal: "terminal", blockchain: "blockchain", contact: "contact", about: "about" };
      if (map[target]) { onOpenApp(map[target]); out = `[SYS] Opening ${target}...`; }
      else out = `[ERR] Unknown app: ${target}`;
    } else if (c === "theme hacker") {
      out = "[SYS] Hacker mode activated. Matrix incoming...";
    } else if (c === "theme default") {
      out = "[SYS] Default theme restored.";
    } else if (COMMANDS[c]) {
      out = COMMANDS[c]();
    } else {
      out = `[ERR] Command not found: '${cmd}'. Type 'help' for available commands.`;
    }
    setHistory(h => [...h, { type: "cmd", text: cmd }, { type: "out", text: out }]);
    setInput("");
  };

  const onKey = e => {
    if (e.key === "Enter") { run(input); return; }
    if (e.key === "ArrowUp") {
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(idx); if (cmdHistory[idx]) setInput(cmdHistory[idx]);
      return;
    }
    if (e.key === "ArrowDown") {
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx); setInput(idx === -1 ? "" : cmdHistory[idx] || "");
      return;
    }
    // Track all printable keystrokes for WPM
    if (e.key.length === 1) trackKeystroke();
  };

  // WPM color
  const wpmColor = wpm === 0 ? "#333" : wpm >= 80 ? "#39ff14" : wpm >= 50 ? "#ffd700" : accent;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "rgba(0,0,0,0.6)", fontFamily: "'JetBrains Mono', monospace" }}>

      {/* ── WPM status bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "5px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 10, color: "#333", letterSpacing: 2 }}>TERMINAL v2.0</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Live WPM */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 9, color: "#333", letterSpacing: 1 }}>WPM</span>
            <span style={{
              fontSize: 13, fontWeight: 700, color: wpmColor,
              textShadow: wpm > 0 ? `0 0 8px ${wpmColor}` : "none",
              minWidth: 28, textAlign: "right",
              transition: "color 0.3s",
            }}>{wpm}</span>
          </div>
          {/* Peak */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 9, color: "#333", letterSpacing: 1 }}>PEAK</span>
            <span style={{ fontSize: 11, color: wpmPeak >= 80 ? "#39ff14" : "#555", minWidth: 24, textAlign: "right" }}>{wpmPeak}</span>
          </div>
          {/* Cmds */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 9, color: "#333", letterSpacing: 1 }}>CMDS</span>
            <span style={{ fontSize: 11, color: "#555", minWidth: 16, textAlign: "right" }}>{totalCmds}</span>
          </div>
        </div>
      </div>

      {/* ── Terminal output ── */}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{ flex: 1, padding: 16, color: accent, fontSize: 12, lineHeight: 1.7, overflowY: "auto", cursor: "text", wordBreak: "break-word", overflowX: "hidden" }}
      >
        {history.map((h, i) => (
          <div key={i}>
            {h.type === "cmd" && <div style={{ color: "#fff" }}><span style={{ color: accent }}>harsh@harshOS:~$</span> {h.text}</div>}
            {h.type !== "cmd" && <div style={{ color: h.type === "system" ? "#888" : accent, whiteSpace: "pre-wrap" }}>{h.text}</div>}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", marginTop: 4 }}>
          <span style={{ color: accent, marginRight: 8 }}>harsh@harshOS:~$</span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} autoFocus
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontFamily: "inherit", fontSize: 13, caretColor: accent }}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ============================================================
// PROJECTS APP — all 15 projects organized in 5 sections
// ============================================================
function ProjectsApp({ hackerMode }) {
  const accent = useAccent(hackerMode);
  const [activeSection, setActiveSection] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const sections = [
    {
      id: "Blockchain",
      label: "⛓️ Blockchain",
      color: "#f7931a",
      projects: [
        {
          title: "AgroChain",
          subtitle: "Farm-to-Consumer Supply Chain Tracking",
          desc: "Transparent supply chain system using QR codes and Ethereum smart contracts. Each product gets a unique QR code; every stage from farm to consumer is recorded immutably.",
          tech: ["Solidity", "Ethereum", "Web3.js", "QR Code", "React", "Hardhat"],
          features: ["Farm → consumer tracking on-chain", "Unique QR per product", "Tamper-proof blockchain records", "Consumer scan → full history"],
          arch: "Farmer → QR Gen → Blockchain → Supply Updates → Consumer Scan",
          icon: "🌾", color: "#39ff14",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "ZKProofSystem",
          subtitle: "Zero-Knowledge Blockchain Verification",
          desc: "Privacy-preserving verification system on Ethereum using ZKP concepts. Users submit and verify proofs without revealing sensitive data.",
          tech: ["Solidity", "Ethereum", "keccak256", "Remix IDE", "Hardhat", "Web3"],
          features: ["Privacy-preserving proof submission", "Role-based verifier access", "Decentralized proof tracking", "Event logging for transparency"],
          arch: "User → Submit Proof → Smart Contract → Verifier → Result on-chain",
          icon: "🔐", color: "#bf00ff",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "PeerLedWorkshops",
          subtitle: "Blockchain Peer Learning Reward System",
          desc: "Incentivizes peer-to-peer workshop hosting through automated smart contract rewards. Hosts earn ETH per participant, fully transparent and decentralized.",
          tech: ["Solidity", "Ethereum", "MetaMask", "Hardhat", "Web3.js"],
          features: ["Create workshops on-chain", "Auto reward calc per participant", "Secure ETH distribution", "DAO-ready architecture"],
          arch: "Host → Workshop → Owner Verifies → Contract Pays Host",
          icon: "🎓", color: "#00d4ff",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
      ],
    },
    {
      id: "Hackathons",
      label: "🏆 Hackathons",
      color: "#ff6b35",
      projects: [
        {
          title: "AI-Driven GNN Malware Analyzer",
          subtitle: "SIH 2025 — National Finalist",
          desc: "Converts malware binaries into graph structures (CFG, Call Graph) and uses a hybrid GIN+GraphSAGE model to detect zero-day threats across x86, ARM, and MIPS architectures.",
          tech: ["PyTorch", "GIN+GraphSAGE", "Radare2", "Capstone", "FastAPI", "CUDA", "NetworkX"],
          features: ["Binary → CFG/Call Graph conversion", "Zero-day malware detection", "Multi-arch: x86, ARM, MIPS", "REST API for real-time detection", "97%+ accuracy"],
          arch: "Binary → Graph Extraction → Hybrid GNN → Prediction → API",
          icon: "🧬", color: "#ff6b35",
          badge: "SIH FINALIST",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "Campaign Sentinel",
          subtitle: "Microsoft Hackathon — Multi-Modal AI Phishing Detection",
          desc: "Multi-modal AI backend combining CNN (visual analysis), ANN (behavioral), and GraphSAGE (campaign graph) to detect coordinated phishing campaigns in real time.",
          tech: ["Python", "FastAPI", "PyTorch", "CNN", "ANN", "GraphSAGE", "Docker"],
          features: ["Multi-modal: Visual + Behavioral + Network", "Ensemble risk scoring", "Phishing campaign cluster detection", "Explainable AI outputs"],
          arch: "Email → CNN + ANN + GraphSAGE → Ensemble → Risk Score",
          icon: "🛡️", color: "#00d4ff",
          badge: "MICROSOFT HKN",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "ClimateGuard",
          subtitle: "Hack with India — AI Climate Risk Prediction",
          desc: "STGCN-based system predicting climate risks (floods, heatwaves) across geographic regions, classifying each as Safe / Warning / Danger with temporal attention.",
          tech: ["Python", "PyTorch Geometric", "STGCN", "Chebyshev GCN", "CUDA", "NumPy"],
          features: ["Spatio-temporal graph modeling", "Flood & heatwave prediction", "Multi-region risk classification", "Early disaster warning system"],
          arch: "Climate Data → Graph → STGCN → Temporal Attention → Risk",
          icon: "🌍", color: "#39ff14",
          badge: "HACK WITH INDIA",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "Phishing Link Detector",
          subtitle: "AI Chrome Extension for Real-time URL Safety",
          desc: "Gradient Boosting ML model deployed via Flask and integrated with a Chrome extension that captures URLs as users browse and alerts them instantly on phishing.",
          tech: ["Python", "Scikit-learn", "Gradient Boosting", "Flask", "Chrome Extension", "JS"],
          features: ["Real-time URL phishing detection", "Chrome browser extension", "97.3% accuracy", "Instant user alert system"],
          arch: "Browse → Extension Captures URL → Flask → ML → Alert",
          icon: "🎣", color: "#ffd700",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "HealthKey",
          subtitle: "Secure Digital Health Record Sharing",
          desc: "Blockchain-inspired platform for controlled sharing of medical records with QR-based access, audit logs, and full access control — built in React + TypeScript.",
          tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "QR Code", "Framer Motion"],
          features: ["Secure health record storage", "QR-based controlled sharing", "Access audit log tracking", "Lock/unlock record system"],
          arch: "Upload → Secure Store → QR Share → Authorized Access → Audit Log",
          icon: "🏥", color: "#ff2d78",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
      ],
    },
    {
      id: "Python",
      label: "🐍 Python / CV",
      color: "#39ff14",
      projects: [
        {
          title: "Volvex",
          subtitle: "3D Hand Gesture Detection & Interaction",
          desc: "Real-time hand gesture detection system that lets users control and interact with 3D virtual objects using hand movements via webcam.",
          tech: ["Python", "OpenCV", "MediaPipe", "Three.js", "WebGL", "JavaScript"],
          features: ["Real-time hand tracking", "3D object interaction via gestures", "Finger landmark detection", "Smooth voxel 3D environment"],
          arch: "Camera → MediaPipe → Gesture → 3D Engine → Interactive Output",
          icon: "✋", color: "#bf00ff",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "Dr. Strange",
          subtitle: "Hand Gesture Recognition System",
          desc: "AI gesture recognition system that identifies specific hand signals (hello, peace, etc.) in real time and maps them to digital actions.",
          tech: ["Python", "OpenCV", "MediaPipe", "NumPy"],
          features: ["Multi-gesture recognition", "Finger landmark mapping", "Touchless system control", "Expandable gesture library"],
          arch: "Camera → MediaPipe → Landmark → Gesture → Action",
          icon: "🌀", color: "#ff2d78",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
      ],
    },
    {
      id: "Fintech",
      label: "📈 Fintech",
      color: "#ffd700",
      projects: [
        {
          title: "AI Stock Platform",
          subtitle: "Real-Time Stock Market Intelligence",
          desc: "Full-stack Next.js platform with real-time stock tracking, AI-generated market summaries, personalized watchlists, and automated email alerts via event-driven workflows.",
          tech: ["Next.js", "TypeScript", "ShadCN UI", "Better Auth", "Inngest", "AI SDK"],
          features: ["Real-time stock price dashboard", "AI-generated market summaries", "Personalized watchlist & alerts", "Interactive candlestick charts", "Email notification system"],
          arch: "Stock APIs → Backend → AI Engine → Dashboard → Alerts",
          icon: "📊", color: "#ffd700",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
      ],
    },
    {
      id: "WebDev",
      label: "🌐 Web Dev",
      color: "#00d4ff",
      projects: [
        {
          title: "CodeConnect",
          subtitle: "Social Coding Platform",
          desc: "A social coding ecosystem where developers create profiles, solve problems, compete on leaderboards, and connect — fully frontend, no backend required.",
          tech: ["HTML", "CSS", "JavaScript", "LocalStorage", "Responsive Design"],
          features: ["User profile & rating system", "Problem difficulty filter", "Live leaderboard", "Friend connection & social features"],
          arch: "Profile → Solve → Rating → Leaderboard → Social",
          icon: "⟨⟩", color: "#00d4ff",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "macOS Portfolio",
          subtitle: "This Website — macOS-Inspired OS Interface",
          desc: "Unique macOS-inspired interactive portfolio that showcases projects, skills, and achievements through a realistic desktop OS with dock, draggable windows, and animations.",
          tech: ["React", "TypeScript", "Canvas API", "Tailwind CSS", "JetBrains Mono"],
          features: ["Draggable/resizable windows", "Working terminal with commands", "Matrix hacker mode", "Spotlight search"],
          arch: "macOS UI → Dock → Windows → Apps → Content",
          icon: "🖥️", color: "#888",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "Hospital Dashboard",
          subtitle: "Smart Hospital Management System",
          desc: "Modern hospital management frontend for CRUD management of patients, doctors, billing, and inventory with CSV import/export and dynamic schema editing.",
          tech: ["HTML", "CSS", "JavaScript", "LocalStorage", "CSV I/O"],
          features: ["Multi-module dashboard", "Dynamic schema alteration", "CSV import/export", "Real-time statistics panel"],
          arch: "Login → Dashboard → Module → CRUD → LocalStorage",
          icon: "🏥", color: "#ff6b35",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
        {
          title: "AI Timetable Generator",
          subtitle: "College Schedule Automation",
          desc: "Algorithm-powered timetable generator that creates conflict-free, optimized college schedules from faculty and subject inputs, with dark mode and export.",
          tech: ["HTML", "CSS", "JavaScript", "Scheduling Algorithm", "LocalStorage"],
          features: ["Auto timetable generation", "Conflict detection & resolution", "Faculty-wise view", "Dark mode UI"],
          arch: "Input → Algorithm → Conflict Check → Timetable → Export",
          icon: "📅", color: "#bf00ff",
          github: "https://github.com/Harsh-lab-art",
          live: null,
        },
      ],
    },
  ];

  const allProjects = sections.flatMap(s => s.projects.map(p => ({ ...p, sectionColor: s.color })));
  const displaySections = activeSection === "All" ? sections : sections.filter(s => s.id === activeSection);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Section filter tabs */}
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #ffffff11", display: "flex", gap: 6, flexShrink: 0, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {["All", ...sections.map(s => s.id)].map((id) => {
          const sec = sections.find(s => s.id === id);
          const color = sec ? sec.color : accent;
          const label = sec ? sec.label : "All";
          return (
            <button key={id} onClick={() => { setActiveSection(id); setExpanded(null); }} style={{
              padding: "4px 10px", borderRadius: 20, fontSize: 10, cursor: "pointer", border: "1px solid",
              borderColor: activeSection === id ? color : "#ffffff22",
              background: activeSection === id ? `${color}22` : "transparent",
              color: activeSection === id ? color : "#888",
              fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0,
            }}>{id === "All" ? "🗂 All" : label}</button>
          );
        })}
      </div>

      {/* Projects */}
      <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
        {displaySections.map(section => (
          <div key={section.id} style={{ marginBottom: 28 }}>
            {activeSection === "All" && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: section.color, letterSpacing: 2, textTransform: "uppercase" }}>
                  {section.label}
                </div>
                <div style={{ flex: 1, height: 1, background: `${section.color}33` }} />
                <span style={{ fontSize: 10, color: "#555" }}>{section.projects.length} projects</span>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              {section.projects.map((p, idx) => {
                const key = `${section.id}-${idx}`;
                const isExpanded = expanded === key;
                return (
                  <div key={idx}
                    style={{
                      background: "rgba(255,255,255,0.03)", border: `1px solid ${p.color}44`,
                      borderRadius: 12, padding: 18, cursor: "pointer",
                      transition: "all 0.25s",
                      gridColumn: isExpanded ? "span 2" : "span 1",
                      boxShadow: isExpanded ? `0 0 30px ${p.color}33, 0 0 0 1px ${p.color}55` : "none",
                    }}
                    onMouseEnter={e => { if (!isExpanded) e.currentTarget.style.boxShadow = `0 0 20px ${p.color}33`; }}
                    onMouseLeave={e => { if (!isExpanded) e.currentTarget.style.boxShadow = "none"; }}
                    onClick={() => setExpanded(isExpanded ? null : key)}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ fontSize: 28 }}>{p.icon}</div>
                        <div>
                          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: p.color, fontFamily: "Orbitron, monospace" }}>{p.title}</div>
                            {p.badge && (
                              <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 10, background: "#39ff1422", color: "#39ff14", border: "1px solid #39ff1444" }}>{p.badge}</span>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>{p.subtitle}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 14, color: "#555", userSelect: "none" }}>{isExpanded ? "▲" : "▼"}</span>
                    </div>

                    <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7, marginTop: 10 }}>{p.desc}</div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
                      {p.tech.slice(0, isExpanded ? 999 : 4).map(t => (
                        <span key={t} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}33` }}>{t}</span>
                      ))}
                      {!isExpanded && p.tech.length > 4 && <span style={{ fontSize: 10, color: "#555" }}>+{p.tech.length - 4} more</span>}
                    </div>

                    {isExpanded && (
                      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                        <div style={{ background: `${p.color}08`, borderRadius: 8, padding: 14, border: `1px solid ${p.color}22` }}>
                          <div style={{ fontSize: 10, color: p.color, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Key Features</div>
                          {p.features.map(f => (
                            <div key={f} style={{ fontSize: 11, color: "#bbb", marginBottom: 4, display: "flex", gap: 6 }}>
                              <span style={{ color: p.color }}>›</span> {f}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 14, border: "1px solid #ffffff0a", marginBottom: 10 }}>
                            <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Architecture</div>
                            <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6 }}>{p.arch}</div>
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <a href={p.github || "#"} target="_blank" rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              style={{ flex: 1, padding: "6px 12px", background: "rgba(255,255,255,0.06)", border: "1px solid #ffffff22", borderRadius: 6, color: "#ccc", fontFamily: "inherit", fontSize: 11, cursor: "pointer", textAlign: "center", textDecoration: "none", display: "block" }}>
                              ◉ GitHub
                            </a>
                            {p.live ? (
                              <a href={p.live} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{ flex: 1, padding: "6px 12px", background: `${p.color}22`, border: `1px solid ${p.color}55`, borderRadius: 6, color: p.color, fontFamily: "inherit", fontSize: 11, cursor: "pointer", textAlign: "center", textDecoration: "none", display: "block" }}>
                                ↗ Live Demo
                              </a>
                            ) : (
                              <span style={{ flex: 1, padding: "6px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid #ffffff11", borderRadius: 6, color: "#444", fontFamily: "inherit", fontSize: 11, textAlign: "center" }}>
                                🔒 Private
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// INTERNSHIP APP — all 3 real internships
// ============================================================
function VSCodeApp({ hackerMode }) {
  const accent = hackerMode ? "#39ff14" : "#007acc";
  const [activeIdx, setActiveIdx] = useState(0);

  const internships = [
    {
      id: "mod",
      label: "Ministry of Defence",
      file: "mod_ai_intern.py",
      tag: "CURRENT · 6 MONTHS",
      tagColor: "#39ff14",
      period: "2024 – Present (6 Months)",
      org: "Government of India — Ministry of Defence",
      role: "AI Security Systems Intern",
      level: "National Level · Classified",
      orgColor: "#00d4ff",
      icon: "🛡️",
      highlights: [
        { text: "Developing AI-based threat detection systems for national security infrastructure", icon: "⚡" },
        { text: "Firmware security analysis and cryptographic primitive identification in embedded systems", icon: "🔍" },
        { text: "Building and training ML models for adversarial pattern recognition at scale", icon: "🧠" },
        { text: "Contributing to classified national-level cybersecurity defence frameworks", icon: "🔐" },
        { text: "Working with Graph Neural Networks for malware classification on firmware binaries", icon: "⬡" },
      ],
      tech: ["Python", "PyTorch", "GNN", "Radare2", "Firmware Analysis", "Linux", "CUDA"],
      code: `# Government of India — Ministry of Defence
# AI Security Systems — Internship (6 Months)
# CLEARANCE: RESTRICTED — For Official Use Only

import torch
from torch_geometric.nn import GINConv, SAGEConv
from models.threat_detector import FirmwareClassifier

class MoDSecuritySystem:
    """
    National-level AI threat detection &
    firmware security analysis system.
    Ministry of Defence — AI Security Division.
    Duration: 6 Months (Current)
    """

    def __init__(self):
        self.model = FirmwareClassifier.load_pretrained()
        self.clearance = "RESTRICTED"
        print("[MoD] AI Security System initialized.")

    def analyze_firmware(self, binary_path: str) -> dict:
        """Run AI-based firmware threat analysis."""
        graph = self.binary_to_cfg(binary_path)
        threat_score = self.model.predict(graph)
        return {
            "threat_level": self.classify(threat_score),
            "confidence": float(threat_score.max()),
            "vectors": self.identify_vectors(graph),
            "clearance_level": self.clearance,
        }

    def binary_to_cfg(self, path: str):
        """Convert binary → Control Flow Graph."""
        # Radare2-based disassembly & CFG extraction
        # [CLASSIFIED — implementation redacted]
        pass`,
    },
    {
      id: "deloitte",
      label: "Deloitte",
      file: "deloitte_sim.py",
      tag: "JULY 2025",
      tagColor: "#86bc25",
      period: "July 2025",
      org: "Deloitte Technology Job Simulation",
      role: "Software Engineering Simulation",
      level: "Virtual Internship · Forage",
      orgColor: "#86bc25",
      icon: "🏢",
      certId: "x8mcYfoiFmxSZp37m",
      highlights: [
        { text: "Executed and debugged multiple software modules, improving system stability during testing", icon: "🐛" },
        { text: "Reduced reported bugs by 30% through systematic debugging and code review practices", icon: "📉" },
        { text: "Worked on real-world engineering scenarios simulating Deloitte's technology consulting workflow", icon: "⚙️" },
        { text: "Applied software quality assurance methodologies across multiple module test cycles", icon: "✅" },
      ],
      tech: ["Python", "Debugging", "QA Testing", "Software Engineering", "Code Review"],
      code: `# Deloitte Technology Job Simulation — July 2025
# Certificate ID: x8mcYfoiFmxSZp37m
# Platform: Forage

"""
SIMULATION OVERVIEW
────────────────────────────────────────
Role     : Software Engineering Intern
Company  : Deloitte Technology
Period   : July 2025
Platform : Forage Job Simulation

KEY ACHIEVEMENTS
────────────────────────────────────────
✓ Debugged multiple software modules
✓ Improved system stability under testing
✓ Reduced reported bugs by 30%
✓ Applied QA & review best practices
"""

def debug_module(module_code: str) -> dict:
    """
    Core debugging workflow used during simulation.
    Identifies root causes and applies targeted fixes.
    """
    issues = static_analysis(module_code)
    fixes = []
    for issue in issues:
        fix = generate_fix(issue)
        fixes.append(fix)
        module_code = apply_fix(module_code, fix)

    stability_score = run_test_suite(module_code)
    bug_reduction = calculate_reduction(issues, fixes)

    return {
        "bugs_fixed": len(fixes),
        "stability_improvement": stability_score,
        "bug_reduction_pct": bug_reduction,   # 30%
        "cert_id": "x8mcYfoiFmxSZp37m",
    }`,
    },
    {
      id: "aws",
      label: "AWS APAC",
      file: "aws_architecture.py",
      tag: "SEPT 2025",
      tagColor: "#ff9900",
      period: "September 2025",
      org: "AWS APAC Solutions Architecture",
      role: "Cloud Architecture Simulation",
      level: "Virtual Internship · Forage",
      orgColor: "#ff9900",
      icon: "☁️",
      certId: "99RQY2zcfPrGGzhvt",
      highlights: [
        { text: "Planned and deployed a scalable hosting architecture using AWS Elastic Beanstalk", icon: "🚀" },
        { text: "Achieved 40% faster performance through optimized cloud infrastructure design", icon: "⚡" },
        { text: "Architecture supports 10K+ monthly users without downtime or degradation", icon: "📈" },
        { text: "Applied AWS best practices for high availability, fault tolerance, and auto-scaling", icon: "☁️" },
      ],
      tech: ["AWS Elastic Beanstalk", "EC2", "S3", "Auto Scaling", "Load Balancer", "CloudWatch"],
      code: `# AWS APAC Solutions Architecture Simulation — Sept 2025
# Certificate ID: 99RQY2zcfPrGGzhvt
# Platform: Forage

"""
SIMULATION OVERVIEW
────────────────────────────────────────
Role     : Solutions Architect (Simulation)
Company  : Amazon Web Services — APAC
Period   : September 2025
Platform : Forage Job Simulation

KEY ACHIEVEMENTS
────────────────────────────────────────
✓ Deployed scalable architecture on Elastic Beanstalk
✓ 40% faster performance vs. baseline
✓ Supports 10K+ monthly users without downtime
✓ Applied AWS Well-Architected Framework
"""

import boto3

class ScalableHostingArchitecture:
    """
    Architecture deployed during AWS APAC simulation.
    Uses Elastic Beanstalk + Auto Scaling + ALB.
    """

    def __init__(self, region="ap-south-1"):
        self.eb = boto3.client("elasticbeanstalk", region_name=region)
        self.ec2 = boto3.client("ec2", region_name=region)
        self.cw  = boto3.client("cloudwatch", region_name=region)

    def deploy_environment(self, app_name: str) -> dict:
        """Deploy auto-scaling Elastic Beanstalk environment."""
        response = self.eb.create_environment(
            ApplicationName=app_name,
            EnvironmentName=f"{app_name}-prod",
            SolutionStackName="64bit Amazon Linux 2 v3.5.0",
            OptionSettings=[
                {"Namespace": "aws:autoscaling:asg",
                 "OptionName": "MinSize", "Value": "2"},
                {"Namespace": "aws:autoscaling:asg",
                 "OptionName": "MaxSize", "Value": "10"},
                {"Namespace": "aws:elasticbeanstalk:environment",
                 "OptionName": "EnvironmentType",
                 "Value": "LoadBalanced"},
            ],
        )
        return {
            "env_id": response["EnvironmentId"],
            "performance_gain": "40%",
            "monthly_capacity": "10K+ users",
            "cert_id": "99RQY2zcfPrGGzhvt",
        }`,
    },
  ];

  const intern = internships[activeIdx];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", color: "#d4d4d4" }}>

      {/* ── Top tab bar ── */}
      <div style={{ display: "flex", borderBottom: "1px solid #ffffff11", background: "rgba(0,0,0,0.4)", flexShrink: 0, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {internships.map((int, i) => (
          <button key={int.id} onClick={() => setActiveIdx(i)} style={{
            padding: "10px 14px", borderTop: "none", borderLeft: "none", borderRight: "none",
            borderBottom: activeIdx === i ? `2px solid ${int.orgColor}` : "2px solid transparent",
            background: activeIdx === i ? "rgba(255,255,255,0.06)" : "transparent",
            color: activeIdx === i ? "#fff" : "#666", cursor: "pointer",
            fontFamily: "inherit", fontSize: 11, display: "flex", gap: 5, alignItems: "center",
            transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            <span>{int.icon}</span>
            <span>{int.label}</span>
            <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 8, background: `${int.tagColor}22`, color: int.tagColor, border: `1px solid ${int.tagColor}44` }}>{int.tag}</span>
          </button>
        ))}
      </div>

      {/* ── Split layout: sidebar info + code viewer ── */}
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>

        {/* Left info panel */}
        <div style={{ width: "min(240px, 42vw)", background: "rgba(0,0,0,0.45)", borderRight: "1px solid #ffffff0d", overflowY: "auto", padding: 14, flexShrink: 0 }}>

          {/* Org badge */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>{intern.icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: intern.orgColor, lineHeight: 1.3 }}>{intern.org}</div>
              <div style={{ fontSize: 10, color: "#777", marginTop: 3 }}>{intern.period}</div>
            </div>
          </div>

          {/* Role */}
          <div style={{ background: `${intern.orgColor}12`, border: `1px solid ${intern.orgColor}33`, borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: intern.orgColor, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Role</div>
            <div style={{ fontSize: 12, color: "#ddd" }}>{intern.role}</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 4 }}>{intern.level}</div>
          </div>

          {/* Certificate ID if available */}
          {intern.certId && (
            <div style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.25)", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: "#ffd700", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Certificate ID</div>
              <div style={{ fontSize: 11, color: "#aaa", wordBreak: "break-all" }}>{intern.certId}</div>
              <div style={{ fontSize: 9, color: "#39ff14", marginTop: 4 }}>✓ VERIFIED</div>
            </div>
          )}

          {/* Highlights */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>Key Work</div>
            {intern.highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{h.icon}</span>
                <span style={{ fontSize: 11, color: "#aaa", lineHeight: 1.55 }}>{h.text}</span>
              </div>
            ))}
          </div>

          {/* Tech */}
          <div>
            <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Tech Stack</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {intern.tech.map(t => (
                <span key={t} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${intern.orgColor}18`, color: intern.orgColor, border: `1px solid ${intern.orgColor}33` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: code viewer */}
        <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "6px 12px", background: "rgba(0,0,0,0.3)", borderBottom: "1px solid #ffffff0d", fontSize: 10, color: "#888", flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <span style={{ color: intern.orgColor }}>● </span>{intern.file}
          </div>
          <pre style={{ flex: 1, padding: 14, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.7, fontSize: 11, overflowY: "auto", overflowX: "hidden", wordBreak: "break-word" }}>
            {intern.code.split("\n").map((line, i) => {
              let color = "#d4d4d4";
              if (line.trim().startsWith("#")) color = "#6a9955";
              else if (line.trim().startsWith('"""') || line.trim().endsWith('"""')) color = "#ce9178";
              else if (line.includes("def ") || line.includes("class ")) color = "#dcdcaa";
              else if (line.includes("import ") || line.includes("from ")) color = "#c586c0";
              else if (line.trim().startsWith("✓") || line.trim().startsWith("✗")) color = "#39ff14";
              else if (line.includes(":") && line.trim().startsWith('"') && line.trim().endsWith('",')) color = "#ce9178";
              else if (/^\s*(Role|Company|Period|Platform|Duration)\s*:/.test(line)) color = "#9cdcfe";
              return (
                <div key={i} style={{ display: "flex" }}>
                  <span style={{ color: "#3a3a4a", marginRight: 8, width: 20, textAlign: "right", flexShrink: 0, userSelect: "none", fontSize: 10 }}>{i + 1}</span>
                  <span style={{ color }}>{line}</span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </div>
  );
}


// SIH photos shared between GalleryApp and SIHApp
const SIH_PHOTOS = [
  { id: "s1", img: "sih1.jpeg", emoji: "⚔", label: "Team Presentation", caption: "Presenting AgroChain to the judges at SIH 2025 grand finale." },
  { id: "s2", img: "sih11.jpeg", emoji: "💻", label: "Hacking Session",   caption: "48 hours of non-stop coding — building the GNN malware analyzer." },
  { id: "s3", img: "sih3.jpeg", emoji: "🏆", label: "Finalist Stage",    caption: "Standing on the finalist stage at Smart India Hackathon 2025." },
  { id: "s4", img: "sih4.jpeg", emoji: "🤝", label: "Team Photo",        caption: "The team that made it to SIH 2025 nationals — proud moment!" },
  { id: "s5", img: "sih5.jpeg", emoji: "🎯", label: "Problem Statement", caption: "Working through the AI/ML firmware security problem statement." },
];

// Reusable photo thumbnail
function PhotoThumb({ p, accent, onClick }) {
  return (
    <div
      onClick={() => onClick(p)}
      style={{
        aspectRatio: "1", borderRadius: 10, cursor: "pointer",
        overflow: "hidden", border: `1px solid ${p.color || accent}44`,
        position: "relative", transition: "transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 0 20px ${p.color || accent}55`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <img
        src={p.img}
        alt={p.label}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
      />
      {/* emoji fallback */}
      <div style={{
        display: "none", position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${p.color || accent}22, ${p.color || accent}55)`,
        flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 36 }}>{p.emoji}</span>
      </div>
      {/* label bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
        padding: "16px 8px 7px",
      }}>
        <div style={{ fontSize: 10, color: p.color || accent, textAlign: "center", letterSpacing: 1 }}>{p.label}</div>
      </div>
    </div>
  );
}

// Full-screen lightbox with prev/next navigation
function Lightbox({ photos, startIdx, onClose, accent }) {
  const [idx, setIdx] = useState(startIdx);
  const p = photos[idx];

  const prev = e => { e.stopPropagation(); setIdx(i => (i - 1 + photos.length) % photos.length); };
  const next = e => { e.stopPropagation(); setIdx(i => (i + 1) % photos.length); };

  // keyboard nav
  useEffect(() => {
    const h = e => {
      if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % photos.length);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [photos, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.95)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,0.08)", border: "1px solid #ffffff22",
          borderRadius: "50%", width: 36, height: 36, cursor: "pointer",
          color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >✕</button>

      {/* Counter */}
      <div style={{
        position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)",
        fontSize: 11, color: "#555", letterSpacing: 2, fontFamily: "'JetBrains Mono', monospace",
      }}>{idx + 1} / {photos.length}</div>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          onClick={prev}
          style={{
            position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.08)", border: `1px solid ${accent}33`,
            borderRadius: "50%", width: 44, height: 44, cursor: "pointer",
            color: accent, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = `${accent}22`}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
        >‹</button>
      )}

      {/* Image */}
      <div onClick={e => e.stopPropagation()} style={{ textAlign: "center", maxWidth: "70vw", padding: "0 70px" }}>
        <img
          key={p.img}
          src={p.img}
          alt={p.label}
          style={{
            maxWidth: "100%", maxHeight: "65vh", objectFit: "contain",
            borderRadius: 14, border: `1px solid ${p.color || accent}44`,
            boxShadow: `0 0 60px ${p.color || accent}22`,
          }}
          onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "block"; }}
        />
        <div style={{ display: "none", fontSize: 90, marginBottom: 10 }}>{p.emoji}</div>
        <div style={{ marginTop: 18, fontFamily: "Orbitron, monospace", fontSize: 16, color: p.color || accent }}>{p.label}</div>
        {p.caption && <div style={{ marginTop: 8, fontSize: 12, color: "#777", fontFamily: "'JetBrains Mono', monospace", maxWidth: 500, margin: "10px auto 0" }}>{p.caption}</div>}
        {/* Dot indicators */}
        {photos.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 18 }}>
            {photos.map((_, i) => (
              <div
                key={i}
                onClick={e => { e.stopPropagation(); setIdx(i); }}
                style={{
                  width: i === idx ? 20 : 7, height: 7, borderRadius: 4,
                  background: i === idx ? (p.color || accent) : "#333",
                  cursor: "pointer", transition: "all 0.25s",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          onClick={next}
          style={{
            position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.08)", border: `1px solid ${accent}33`,
            borderRadius: "50%", width: 44, height: 44, cursor: "pointer",
            color: accent, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = `${accent}22`}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
        >›</button>
      )}
    </div>
  );
}


// ============================================================
// SIH PHOTO STRIP — used inside SIHApp + shared with Gallery
// ============================================================
function SIHPhotoStrip({ accent }) {
  const [lightbox, setLightbox] = useState(null);
  const photos = SIH_PHOTOS.map(p => ({ ...p, color: "#ff6b35" }));

  return (
    <div style={{ position: "relative" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: accent, textTransform: "uppercase", letterSpacing: 3, fontWeight: 700 }}>
          📸 SIH 2025 — Memories
        </div>
        <div style={{ flex: 1, height: 1, background: `${accent}33` }} />
        <span style={{ fontSize: 10, color: "#555" }}>5 photos · click to view</span>
      </div>

      {/* Horizontal scrolling strip */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
      }}>
        {photos.map((p, i) => (
          <div
            key={p.id}
            onClick={() => setLightbox(i)}
            style={{
              aspectRatio: "1",
              borderRadius: 10,
              overflow: "hidden",
              cursor: "pointer",
              border: `1px solid ${accent}44`,
              position: "relative",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.06) translateY(-3px)";
              e.currentTarget.style.boxShadow = `0 8px 25px ${accent}55`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Photo */}
            <img
              src={p.img}
              alt={p.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={e => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
            {/* Emoji fallback */}
            <div style={{
              display: "none",
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${accent}22, ${accent}55)`,
              alignItems: "center", justifyContent: "center",
              fontSize: 30,
            }}>{p.emoji}</div>

            {/* Number badge */}
            <div style={{
              position: "absolute", top: 6, left: 6,
              width: 20, height: 20, borderRadius: "50%",
              background: "rgba(0,0,0,0.7)", border: `1px solid ${accent}66`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: accent, fontWeight: 700,
            }}>{i + 1}</div>

            {/* Label on hover */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
              padding: "14px 6px 5px",
            }}>
              <div style={{ fontSize: 9, color: accent, textAlign: "center", letterSpacing: 0.5 }}>
                {p.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          photos={photos}
          startIdx={lightbox}
          onClose={() => setLightbox(null)}
          accent={accent}
        />
      )}
    </div>
  );
}

// ============================================================
// SIH APP
// ============================================================
function SIHApp({ hackerMode }) {
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const accent = "#ff6b35";
  const logLines = [
    "[BOOT] Initializing GNN Malware Analyzer — SIH 2025...",
    "[SCAN] Loading firmware binary: firmware_arm_v2.3.bin",
    "[GRAPH] Extracting Control Flow Graph... [████████] 100%",
    "[GRAPH] Building Call Graph & Dependency Graph...",
    "[DETECT] GIN Layer 1 — local pattern extraction...",
    "[DETECT] GraphSAGE — neighborhood aggregation...",
    "[DETECT] AES S-Box pattern found @ 0x004A2F [x86]",
    "[DETECT] Suspicious entropy region @ 0x008B10 [ARM]",
    "[ML] Hybrid GNN model v2.1 — running inference...",
    "[ML] Confidence: 97.4% — CLASS: MALWARE_BOTNET",
    "[ALERT] ⚠ Zero-day pattern detected — unknown signature",
    "[REPORT] Threat level: HIGH — Immediate action required",
    "[DONE] Scan complete. Reported to SOC dashboard.",
  ];

  useEffect(() => {
    let interval = null;
    let resetTimeout = null;

    const startScan = () => {
      let i = 0;
      setLogs([]);
      setScanProgress(0);
      interval = setInterval(() => {
        if (i < logLines.length) {
          const line = logLines[i];
          if (typeof line === "string") {
            setLogs(prev => [...prev, line]);
            setScanProgress(Math.min(100, ((i + 1) / logLines.length) * 100));
          }
          i++;
        } else {
          clearInterval(interval);
          interval = null;
          resetTimeout = setTimeout(startScan, 4000);
        }
      }, 350);
    };

    startScan();
    return () => {
      if (interval) clearInterval(interval);
      if (resetTimeout) clearTimeout(resetTimeout);
    };
  }, []);

  const stats = [
    { label: "Architecture", value: "x86/ARM/MIPS", icon: "⚙" },
    { label: "Accuracy", value: "97.4%", icon: "◉" },
    { label: "Model", value: "GIN+SAGE", icon: "⬡" },
    { label: "Status", value: "FINALIST", icon: "⚔" },
  ];

  return (
    <div style={{ padding: 16, color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace", overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: accent, fontFamily: "Orbitron, monospace", letterSpacing: 1, wordBreak: "break-word" }}>AI-DRIVEN GNN MALWARE ANALYZER</div>
          <div style={{ fontSize: 10, color: "#888", marginTop: 4, letterSpacing: 1 }}>FIRMWARE & MALWARE GRAPH ANALYSIS · SIH 2025</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ padding: "4px 12px", borderRadius: 20, background: "#39ff1422", border: "1px solid #39ff14", color: "#39ff14", fontSize: 11 }}>SIH 2025 FINALIST</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 16 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: `${accent}0a`, border: `1px solid ${accent}33`, borderRadius: 8, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 18 }}>{s.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: accent, marginTop: 4 }}>{s.value}</div>
            <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, color: "#888" }}>
          <span>FIRMWARE SCAN PROGRESS</span>
          <span style={{ color: accent }}>{Math.round(scanProgress)}%</span>
        </div>
        <div style={{ height: 6, background: "#111", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${accent}, #ff0080)`, width: `${scanProgress}%`, transition: "width 0.35s ease", boxShadow: `0 0 10px ${accent}` }} />
        </div>
      </div>

      <div style={{ background: "rgba(0,0,0,0.7)", border: `1px solid ${accent}33`, borderRadius: 8, padding: 12, height: 150, overflowY: "auto", fontSize: 10, marginBottom: 12 }}>
        {logs.map((l, i) => (
          <div key={i} style={{
            color: (typeof l === "string" && l.includes("ALERT")) ? "#ff4444"
                 : (typeof l === "string" && l.includes("DETECT")) ? "#ffd700"
                 : (typeof l === "string" && l.includes("DONE")) ? "#39ff14"
                 : (typeof l === "string" && l.includes("ML")) ? "#00d4ff"
                 : (typeof l === "string" && l.includes("GRAPH")) ? "#bf00ff"
                 : "#888",
            marginBottom: 3,
          }}>{l}</div>
        ))}
        <div style={{ display: "inline-block", width: 8, height: 12, background: accent, animation: "blink 1s infinite", verticalAlign: "middle" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginBottom: 16 }}>
        {[
          ["Binary → Graph", "⟨/⟩", "CFG, Call Graph, Dependency Graph extraction from firmware"],
          ["GIN + GraphSAGE", "◉", "Hybrid GNN for local pattern + neighborhood aggregation"],
          ["Zero-Day Detection", "⚠", "Detects unknown malware via structural pattern matching"],
        ].map(([label, icon, desc]) => (
          <div key={label} style={{ background: `${accent}08`, border: `1px solid ${accent}33`, borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 20, flexShrink: 0 }}>{icon}</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: accent, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 10, color: "#666", lineHeight: 1.5 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* SIH 2025 Photo Gallery Strip */}
      <SIHPhotoStrip accent={accent} />
    </div>
  );
}

// ============================================================
// BLOCKCHAIN APP — all 3 smart contract projects
// ============================================================
function BlockchainApp({ hackerMode }) {
  const accent = "#f7931a";
  const [active, setActive] = useState(0);

  const projects = [
    {
      title: "AgroChain",
      subtitle: "Farm-to-Consumer Supply Chain Tracking",
      color: "#39ff14",
      icon: "🌾",
      desc: "A transparent supply chain system built on Ethereum where every product gets a unique QR code. Each stage from farmer → factory → distributor → consumer is recorded immutably on-chain, preventing fraud and enabling full product history via a simple QR scan.",
      tech: ["Solidity", "Ethereum", "QR Code", "Web3.js", "React", "Hardhat"],
      features: ["Farmer registers product → QR generated", "Each stage updates blockchain record", "Consumer scans QR → full journey shown", "Tamper-proof supply chain logs"],
      flow: "Farmer → QR Gen → Blockchain → Factory → Distributor → Consumer Scan → History",
      impact: "Agriculture, Pharmaceuticals, Food Safety, Logistics",
    },
    {
      title: "ZKProofSystem",
      subtitle: "Zero-Knowledge Blockchain Verification",
      color: "#bf00ff",
      icon: "🔐",
      desc: "A privacy-preserving verification system on Ethereum using Zero-Knowledge Proof concepts. Users submit proofs (identified by keccak256 hash) and authorized verifiers can verify them without ever seeing the sensitive underlying data.",
      tech: ["Solidity", "keccak256", "Ethereum", "Remix IDE", "Hardhat", "Web3"],
      features: ["Submit proofs without revealing data", "Owner registers authorized verifiers", "Role-based access control", "Full event logging on-chain"],
      flow: "User → Submit Proof → Smart Contract → Verifier → Verified Result → Blockchain",
      impact: "Digital Identity, Secure Voting, Financial Verification, Medical Data",
    },
    {
      title: "PeerLedWorkshops",
      subtitle: "Peer Learning Reward System",
      color: "#00d4ff",
      icon: "🎓",
      desc: "A decentralized reward system that incentivizes peer-to-peer workshop hosting. Admin verifies workshop completion, smart contract auto-calculates ETH rewards per participant, and hosts claim directly to their wallet — fully transparent and trustless.",
      tech: ["Solidity", "Ethereum", "MetaMask", "Hardhat", "Web3.js"],
      features: ["Host creates workshop on-chain", "Admin verifies completion + participant count", "Smart contract auto-calculates reward", "Host claims ETH directly to wallet"],
      flow: "Host → Create → Admin Verify → Contract Calc Reward → Host Claims ETH",
      impact: "EdTech, College Platforms, DAO-based Learning, Peer Teaching",
    },
  ];

  const p = projects[active];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #ffffff11", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexShrink: 0, gap: 8, flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: accent, fontFamily: "Orbitron, monospace", letterSpacing: 1, whiteSpace: "nowrap" }}>⬡ WEB3 & BLOCKCHAIN</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {projects.map((proj, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", border: "1px solid",
              borderColor: active === i ? proj.color : "#ffffff22",
              background: active === i ? `${proj.color}22` : "transparent",
              color: active === i ? proj.color : "#666",
              fontFamily: "inherit", whiteSpace: "nowrap",
            }}>{proj.icon} {proj.title}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ fontSize: 40 }}>{p.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: p.color, fontFamily: "Orbitron, monospace", wordBreak: "break-word" }}>{p.title}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{p.subtitle}</div>
            <div style={{ display: "flex", gap: 5, marginTop: 8, flexWrap: "wrap" }}>
              {p.tech.map(t => (
                <span key={t} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}33` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: `${p.color}08`, border: `1px solid ${p.color}22`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: p.color, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>// overview</div>
          <p style={{ fontSize: 12, color: "#bbb", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #ffffff0a", borderRadius: 10, padding: 12 }}>
            <div style={{ fontSize: 11, color: p.color, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>// how it works</div>
            {p.features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <span style={{ color: p.color, fontSize: 11, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: 12, color: "#bbb" }}>{f}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #ffffff0a", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>// data flow</div>
              <div style={{ fontSize: 11, color: "#888", lineHeight: 1.8 }}>{p.flow}</div>
            </div>
            <div style={{ background: `${p.color}08`, border: `1px solid ${p.color}22`, borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: p.color, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>// impact areas</div>
              <div style={{ fontSize: 12, color: "#999" }}>{p.impact}</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <a href="https://github.com/Harsh-lab-art" target="_blank" rel="noopener noreferrer"
            style={{ padding: "8px 20px", background: "rgba(255,255,255,0.06)", border: "1px solid #ffffff22", borderRadius: 8, color: "#ccc", fontFamily: "inherit", fontSize: 12, cursor: "pointer", textDecoration: "none" }}>
            ◉ View on GitHub →
          </a>
          <span style={{ padding: "8px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid #ffffff0a", borderRadius: 8, color: "#444", fontFamily: "inherit", fontSize: 12 }}>
            🔒 Smart Contract — Testnet
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ============================================================
// GALLERY APP
// ============================================================
// HOW TO ADD YOUR PHOTOS
// ─────────────────────────────────────────────────────────────
// 1. Drop your image into /public with the exact filename below.
// 2. Any extension works (.png .jpg .jpeg .webp) — update img: path.
// 3. Each section has 5 pre-defined slots.
//    img: null  →  shows emoji placeholder (no broken-image error).
//
// FILENAMES (put these in /public):
//   SIH 2025   →  sih1.png … sih5.png
//   Hackathons →  hackathon1.png … hackathon5.png
//   Events     →  event1.png … event5.png
//   College    →  college1.png … college5.png
//   Personal   →  personal1.png … personal5.png
// ============================================================

const mkSlot = (id, img, emoji, label, caption, color) =>
  ({ id, img, emoji, label, caption, color });

const GALLERY_FOLDERS = [
  {
    id: "sih",
    label: "SIH 2025",
    emoji: "⚔",
    color: "#ff6b35",
    badge: "FINALIST",
    desc: "National Finalist · AI/ML Firmware Security",
    photos: [
      mkSlot("s1", "sih1.jpeg", "⚔",  "Team Presentation", "Presenting to the judges at SIH 2025 grand finale.",       "#ff6b35"),
      mkSlot("s2", "sih2.jpeg", "💻", "Stage Presentation",   "My Team ByteMeX.", "#ff6b35"),
      mkSlot("s3", "sih3.jpeg", "🏆", "Finalist Stage",    "Standing on the finalist stage at SIH 2025.",               "#ff6b35"),
      mkSlot("s4", "sih4.jpeg", "🤝", "Judges",        "showing the production level work to judges",              "#ff6b35"),
      mkSlot("s5", "sih5.jpeg", "🎯", "Problem Statement", "Working through the AI/ML firmware security problem.",       "#ff6b35"),
      mkSlot("s6", "sih6.jpeg", "🔬", "IIM",          "IIM Lucknow campus", "#ff6b35"),
      mkSlot("s7", "sih7.jpeg", "🎯", "Late Night", "Late night coding session at SIH 2025.", "#ff6b35" ),
      mkSlot("s8", "sih8.jpeg", "🔬", "Team Photoss",          "Team photo at SIH 2025.", "#ff6b35" ),
      mkSlot("s9", "sih9.jpeg", "🔬", "The Deep learning",          "Implementing deep learnng model", "#ff6b35" ),
      mkSlot("s10", "sih10.jpeg", "🔬", "Getting Started",          "Buidling with enjoyment", "#ff6b35" ),
      mkSlot("s11", "sih11.jpeg", "🔬", "Problem statement",          "Team working and understing the problem statement ", "#ff6b35" ),
      mkSlot("s12", "sih12.jpeg", "🔬", "1st day",          "Arrival at the IIML EIC", "#ff6b35" ),
    ],
  },
  {
    id: "hackathons",
    label: "Hackathons",
    emoji: "🏆",
    color: "#ffd700",
    badge: null,
    desc: "Adobe Hackfest · SunHack · National Wins",
    photos: [
      mkSlot("h1", "hackathon8.jpeg", "🏆", "SunHack", "SunHack a 36 hours Hackathon.", "#ffd700"),
      mkSlot("h2", "hackathon7.jpeg", "☀️", "SunHack",        "Explaining our project to mentors.",               "#ffd700"),
      mkSlot("h3", "hackathon1.jpeg", "💡", "SunHack",  "International Hackathon at Nashik",     "#ffd700"),
      mkSlot("h4", "hackathon2.jpeg", "⚡", "IntrusionX",    "A 24 hour hackathon on GLA University Mathura.",              "#ffd700"),
      mkSlot("h5", "hackathon3.jpeg", "🎯", "IntrusionX", "Pictures with Judges",      "#ffd700"),
      mkSlot("h6", "hackathon4.jpeg", "🏆", "IntrusionX", "The ID Card",      "#ffd700"),
      mkSlot("h7", "hackathon5.jpeg", "💻", "IntrusionX", "The phishing attack Project", "#ffd700")  ,
      mkSlot("h8", "hackathon6.jpeg", "🎉", "IntrusionX", "The complete cyber security project explanation to judges.", "#ffd700")    ,
    ],
  },
  {
    id: "events",
    label: "Events",
    emoji: "🎤",
    color: "#00d4ff",
    badge: null,
    desc: "YUKTI · Google · Microsoft · Conferences",
    photos: [
      mkSlot("e1", "yukti1.jpeg", "🎤",  "YUKTI Innovation", "Presenting at YUKTI National Innovation Festival.",   "#00d4ff"),
      mkSlot("e2", "yukti2.jpeg", "🔬",  "YUKTI Innovation", "The Certificate of Recognition",              "#00d4ff"),
      mkSlot("e3", "yukti3.jpeg", "🪟",  "YUKTI Innovation", "Presenting at YUKTI Innovation Event",    "#00d4ff"),
      mkSlot("e4", "bhopal.jpeg", "🎙️", "Vigyan Mela",  "Our project got shortlisted at Bhopal vigyan mela 2025",             "#00d4ff"),
      mkSlot("e5", "coding.jpeg", "🌐",  "DSA ", "got 3rd prize in DSA competition in college", "#00d4ff"),
      mkSlot("e6", "mini1.jpeg", "💻",  "Agriculural Minister", "Made a block chain project for the minister", "#00d4ff"),
      mkSlot("e7", "mini2.jpeg", "🪟",  "Minister", "Meeting with the minister and selfie", "#00d4ff"),
      mkSlot("e8", "micro1.jpeg", "🎉",  "Microsoft", "Prompt Engineering", "#00d4ff"),
      mkSlot("e9", "micro2.jpeg", "🎉",  "Microsoft", "AI Agent with Azure", "#00d4ff"),
      mkSlot("e10", "micro3.jpeg", "🎉",  "Microsoft", "introduction to LLM", "#00d4ff"),
      mkSlot("e11", "micro4.jpeg", "🎉",  "Microsoft", "Integrating custom tools in the AI Agent", "#00d4ff"),
      mkSlot("e12", "micro5.jpeg", "🎉",  "Microsoft", "Agent development on Azure", "#00d4ff"),
      mkSlot("e13", "micro6.jpeg", "🎉",  "Microsoft", "Microsoft Student Ambassador", "#00d4ff"),
    ],
  },
  {
    id: "college",
    label: "Hackathons Certificates",
    emoji: "🎓",
    color: "#bf00ff",
    badge: null,
    desc: "SIRT Bhopal · Campus Life · Study Mode",
    photos: [
      mkSlot("c1", "certi6.jpeg", "🏛️", "QubitX 2025",  "National Level hackathon at GL Bajaj, Mathura", "#bf00ff"),
      mkSlot("c2", "certi2.jpeg", "📚", "MSME",    "My startup project and recognition",          "#bf00ff"),
      mkSlot("c3", "certi7.jpeg", "🎓", "Samsung",   "The Samsung Galaxy AI tresure hunt",          "#bf00ff"),
      mkSlot("c4", "certi4.jpeg", "🤝", "Loreal",       "Online aptitude test by Loreal",       "#bf00ff"),
      mkSlot("c5", "certi5.jpeg", "🎉", "CodeSynthesis",   "At Guru Tegh Bahadur Engineering college, Delhi",           "#bf00ff"),
      mkSlot("c6", "certi8.jpeg", "⚡", "HacKronyX",   "St. Vincent Pallotti college of Engineering and Technology , Nagpur", "#bf00ff"),
      mkSlot("c7", "certi9.jpeg", "💻", "Paranox 2.0",  "A national level hackathon by TechNinjas",     "#bf00ff"),
      mkSlot("c8", "certi10.jpeg", "🏆", "Quiz-A-Bit",  "A national Level hackathon By Biral Institute of Technology , Ranchi",     "#bf00ff"),
      mkSlot("c9", "certi.jpeg", "🎯", "Dev!@thon",  "A national level hackathon by GLA University, Mathura",     "#bf00ff"),
    ],
  },
  {
    id: "personal",
    label: "Personal",
    emoji: "🧑‍💻",
    color: "#ff2d78",
    badge: null,
    desc: "Late nights · Coding sessions · Life",
    photos: [
      mkSlot("p1", "mee.jpeg", "🧑‍💻", "Harsh Kumar Verma", "Love to create and build system Architectures",  "#ff2d78"),
      mkSlot("p2", "interns1.jpeg", "☕",   "Government of India",     "My interns friends at govternment of India internship at Delhi.", "#ff2d78"),
      mkSlot("p3", "interns2.jpeg", "🎮",   "The Team",          "The energetic team of interns.",              "#ff2d78"),
      mkSlot("p4", "certi1.jpeg", "🌅",   "Hadoop",     "hands on experience in Hadoop",     "#ff2d78"),
      mkSlot("p5", "certi3.jpeg", "✈️",  "MSME",            "Bootcamp of Data Analytics",      "#ff2d78"),
      mkSlot("p6", "nptel.jpeg", "🎉",  "Data base management System",       "Celebrating the small wins in the coding journey.", "#ff2d78"),
      mkSlot("p7", "adobe.jpeg", "🎉",  "Adobe",       "Adobe India Hackathon", "#ff2d78"),
      mkSlot("p8", "intersnhip1.jpeg", "🎉",  "Deloitte",       "virtual Internship at Deloitte on coding an development", "#ff2d78"),
      mkSlot("p9", "internship2.jpeg", "🎉",  "AWS",     "Internship at AWS ", "#ff2d78"),
    ],
  },
];

// ── Photo thumbnail tile ─────────────────────────────────────
function GalleryThumb({ p, onClick }) {
  const [failed, setFailed] = useState(false);
  const empty = !p.img || failed;
  return (
    <div
      onClick={() => !empty && onClick()}
      style={{
        aspectRatio: "4/3", borderRadius: 10, overflow: "hidden", position: "relative",
        border: `1px solid ${empty ? "#ffffff0d" : p.color + "44"}`,
        background: empty ? "rgba(255,255,255,0.02)" : p.color + "0a",
        cursor: empty ? "default" : "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => { if (!empty) { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 8px 24px ${p.color}55`; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {!empty && (
        <img src={p.img} alt={p.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={() => setFailed(true)}
        />
      )}
      {empty && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <span style={{ fontSize: 26, opacity: 0.18 }}>{p.emoji}</span>
          <span style={{ fontSize: 9, color: "#2a2a2a", letterSpacing: 1 }}>{p.img && failed ? "not found" : "add photo"}</span>
          {p.img && failed && <span style={{ fontSize: 8, color: "#222", padding: "0 6px", textAlign: "center", wordBreak: "break-all" }}>{p.img}</span>}
        </div>
      )}
      <div style={{
        position: "absolute", top: 5, left: 5, width: 17, height: 17, borderRadius: "50%",
        background: "rgba(0,0,0,0.65)", border: `1px solid ${empty ? "#ffffff0d" : p.color + "55"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 8, color: empty ? "#2a2a2a" : p.color, fontWeight: 700,
      }}>{p.id.replace(/\D/g, "")}</div>
      {!empty && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "14px 6px 5px" }}>
          <div style={{ fontSize: 9, color: p.color, textAlign: "center", letterSpacing: 0.5 }}>{p.label}</div>
        </div>
      )}
    </div>
  );
}

// ── Lightbox with keyboard + dot nav ────────────────────────
function GalleryLightbox({ photos, startIdx, onClose, accent }) {
  const viewable = photos.filter(p => p.img);
  const [idx, setIdx] = useState(() => {
    const clicked = photos[startIdx];
    const vi = viewable.findIndex(p => p.id === clicked?.id);
    return vi >= 0 ? vi : 0;
  });
  if (!viewable.length) return null;
  const p = viewable[idx];
  const prev = e => { e.stopPropagation(); setIdx(i => (i - 1 + viewable.length) % viewable.length); };
  const next = e => { e.stopPropagation(); setIdx(i => (i + 1) % viewable.length); };
  useEffect(() => {
    const h = e => {
      if (e.key === "ArrowLeft")  setIdx(i => (i - 1 + viewable.length) % viewable.length);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % viewable.length);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [viewable.length, onClose]);
  return (
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.96)", backdropFilter: "blur(16px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", border: "1px solid #ffffff22", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#444", letterSpacing: 2, fontFamily: "'JetBrains Mono', monospace" }}>{idx + 1} / {viewable.length}</div>
      {viewable.length > 1 && <button onClick={prev} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", border: `1px solid ${p.color}55`, background: "rgba(0,0,0,0.55)", color: p.color, fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>‹</button>}
      <div onClick={e => e.stopPropagation()} style={{ textAlign: "center", maxWidth: "min(92vw, 700px)", padding: "0 40px", width: "100%" }}>
        <img key={p.img} src={p.img} alt={p.label} style={{ maxWidth: "100%", maxHeight: "58vh", objectFit: "contain", borderRadius: 12, border: `1px solid ${p.color}44`, boxShadow: `0 0 50px ${p.color}22` }} />
        <div style={{ marginTop: 14, fontSize: 15, color: p.color, fontFamily: "Orbitron, monospace" }}>{p.label}</div>
        {p.caption && <div style={{ marginTop: 7, fontSize: 11, color: "#666", fontFamily: "'JetBrains Mono', monospace", maxWidth: 460, margin: "8px auto 0" }}>{p.caption}</div>}
        {viewable.length > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            {viewable.map((_, i) => <div key={i} onClick={e => { e.stopPropagation(); setIdx(i); }} style={{ width: i === idx ? 20 : 7, height: 7, borderRadius: 4, background: i === idx ? p.color : "#222", cursor: "pointer", transition: "all 0.2s" }} />)}
          </div>
        )}
      </div>
      {viewable.length > 1 && <button onClick={next} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", border: `1px solid ${p.color}55`, background: "rgba(0,0,0,0.55)", color: p.color, fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>›</button>}
    </div>
  );
}

// ── GalleryApp ───────────────────────────────────────────────
function GalleryApp({ hackerMode }) {
  const accent = hackerMode ? "#39ff14" : "#ff2d78";
  const [activeFolder, setActiveFolder] = useState(null);
  const [lightboxIdx,  setLightboxIdx]  = useState(null);
  const folder  = GALLERY_FOLDERS.find(f => f.id === activeFolder) || null;
  const photos  = folder?.photos || [];
  const filled  = f => f.photos.filter(p => p.img).length;
  const openFolder  = id => { setActiveFolder(id); setLightboxIdx(null); };
  const closeFolder = ()  => { setActiveFolder(null); setLightboxIdx(null); };
  const coverImg = f => f.photos.find(p => p.img)?.img || null;
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", position: "relative" }}>
      {/* Breadcrumb */}
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #ffffff11", display: "flex", alignItems: "center", gap: 6, flexShrink: 0, background: "rgba(0,0,0,0.25)" }}>
        <span onClick={folder ? closeFolder : undefined} style={{ fontSize: 12, letterSpacing: 1, color: folder ? folder.color : "#fff", cursor: folder ? "pointer" : "default", fontWeight: folder ? 400 : 700, textDecoration: folder ? "underline" : "none", textUnderlineOffset: 3 }}>Gallery</span>
        {folder && <><span style={{ color: "#2a2a2a", fontSize: 13 }}>›</span><span style={{ fontSize: 12, letterSpacing: 1, color: "#fff", fontWeight: 700 }}>{folder.label}</span></>}
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#333", letterSpacing: 1 }}>
          {folder ? `${filled(folder)} / ${folder.photos.length} photos` : `${GALLERY_FOLDERS.length} albums`}
        </span>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: 18 }}>
        {/* Folder grid */}
        {!folder && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {GALLERY_FOLDERS.map(f => {
              const cover = coverImg(f);
              const n = filled(f);
              return (
                <div key={f.id} onClick={() => openFolder(f.id)} style={{ borderRadius: 14, overflow: "hidden", cursor: "pointer", border: `1px solid ${f.color}44`, background: `linear-gradient(135deg, ${f.color}14, ${f.color}06)`, transition: "transform 0.22s, box-shadow 0.22s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = `0 0 26px ${f.color}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ height: 90, position: "relative", background: `linear-gradient(135deg, ${f.color}33, ${f.color}55)`, overflow: "hidden" }}>
                    {cover ? <img src={cover} alt={f.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => e.currentTarget.style.display = "none"} />
                            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50 }}>{f.emoji}</div>}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 35%, rgba(0,0,0,0.72))" }} />
                    {f.photos.filter(p => p.img).slice(1, 3).map((p, i) => (
                      <img key={p.id} src={p.img} alt="" onError={e => e.currentTarget.style.display = "none"} style={{ position: "absolute", bottom: 6, right: 6 + i * 30, width: 30, height: 30, objectFit: "cover", borderRadius: 4, border: "1.5px solid rgba(255,255,255,0.2)", opacity: 0.6 - i * 0.15 }} />
                    ))}
                    {f.badge && <span style={{ position: "absolute", top: 7, right: 7, fontSize: 9, letterSpacing: 1, padding: "2px 7px", borderRadius: 9, background: "#39ff1433", color: "#39ff14", border: "1px solid #39ff1466" }}>{f.badge}</span>}
                    <span style={{ position: "absolute", bottom: 7, left: 9, fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>🖼 {n} / {f.photos.length}</span>
                  </div>
                  <div style={{ padding: "11px 13px 12px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: f.color, marginBottom: 3 }}>{f.emoji}  {f.label}</div>
                    <div style={{ fontSize: 10, color: "#444", lineHeight: 1.4 }}>{f.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Album view */}
        {folder && (
          <>
            <div style={{ background: `${folder.color}0d`, border: `1px solid ${folder.color}33`, borderRadius: 11, padding: "10px 12px", marginBottom: 14, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 26 }}>{folder.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: folder.color, fontFamily: "Orbitron, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{folder.label}</div>
                <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>{filled(folder)}/{folder.photos.length} photos</div>
              </div>
              {folder.badge && <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: "#39ff1422", color: "#39ff14", border: "1px solid #39ff1444" }}>{folder.badge}</span>}
              <button onClick={closeFolder} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #ffffff15", borderRadius: 7, padding: "5px 10px", cursor: "pointer", color: "#888", fontFamily: "inherit", fontSize: 11, WebkitTapHighlightColor: "transparent" }}>← Back</button>
            </div>
            {filled(folder) === 0 && (
              <div style={{ background: "rgba(255,255,255,0.015)", border: "1px dashed #ffffff0d", borderRadius: 9, padding: "16px 20px", marginBottom: 16, fontSize: 11, color: "#333", lineHeight: 1.8 }}>
                <span style={{ color: folder.color, fontWeight: 700 }}>📂 No photos yet — </span>
                drop <span style={{ color: folder.color }}>{folder.id}1.png</span> … <span style={{ color: folder.color }}>{folder.id}5.png</span> into <span style={{ color: folder.color }}>/public</span> and they appear here automatically.
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              {photos.map((p, i) => (
                <GalleryThumb key={p.id} p={p} onClick={() => setLightboxIdx(i)} />
              ))}
            </div>
          </>
        )}
      </div>
      {lightboxIdx !== null && folder && (
        <GalleryLightbox photos={photos} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} accent={folder.color} />
      )}
    </div>
  );
}

// ============================================================
// CERTIFICATES APP
// ============================================================
function CertsApp({ hackerMode }) {
  const accent = hackerMode ? "#39ff14" : "#ffd700";
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [lightboxCert, setLightboxCert] = useState(null); // index into certs[]

  const cats = ["All", "Hackathons", "Internships", "Courses", "Achievements"];

  // Each cert maps to a static image from the public folder
  const certs = [
    { title: "SIH 2025 Finalist",        cat: "Hackathons",    icon: "⚔",  color: "#ff6b35", org: "Govt. of India — Smart India Hackathon",                  image: "certi.jpeg"  },
    { title: "Defence AI Intern (6mo)",   cat: "Internships",   icon: "🛡️", color: "#00d4ff", org: "Ministry of Defence, India · Current",                    image: "certi1.jpeg" },
    { title: "Deloitte Tech Simulation",  cat: "Internships",   icon: "🏢", color: "#86bc25", org: "Deloitte · July 2025 · ID: x8mcYfoiFmxSZp37m",            image: "certi2.jpeg" },
    { title: "AWS APAC Solutions Arch.",  cat: "Internships",   icon: "☁️", color: "#ff9900", org: "Amazon Web Services · Sept 2025 · ID: 99RQY2zcfPrGGzhvt", image: "certi3.jpeg" },
    { title: "Microsoft Hackathon",       cat: "Hackathons",    icon: "🪟", color: "#007acc", org: "Microsoft — Campaign Sentinel Project",                    image: "certi4.jpeg" },
    { title: "Hack with India",           cat: "Hackathons",    icon: "🇮🇳", color: "#39ff14", org: "Hack with India — ClimateGuard Project",                  image: "certi5.jpeg" },
    { title: "AI/ML Specialization",      cat: "Courses",       icon: "🧠", color: "#bf00ff", org: "Coursera / DeepLearning.AI",                               image: "certi6.jpeg" },
    { title: "Cybersecurity Pro",         cat: "Courses",       icon: "🔐", color: "#39ff14", org: "CISCO Networking Academy",                                 image: "certi7.jpeg" },
    { title: "Web3 Developer",            cat: "Courses",       icon: "⬡",  color: "#f7931a", org: "Alchemy University",                                       image: "certi8.jpeg" },
    { title: "NPTEL Certification",       cat: "Courses",       icon: "📜", color: "#00d4ff", org: "NPTEL — IIT Online Courses",                               image: "nptel.jpeg"  },
    { title: "Hackathon Winner x3",       cat: "Achievements",  icon: "🏆", color: "#ffd700", org: "Multiple National-Level Events",                           image: "certi9.jpeg" },
  ];

  const filtered = filter === "All" ? certs : certs.filter(c => c.cat === filter);

  // Resolve the true index (position in `certs[]`) from filtered list
  const getTrueIdx = (filteredIdx) => {
    const cert = filtered[filteredIdx];
    return certs.findIndex(c => c.title === cert.title);
  };

  // Download by fetching the public image as a blob
  const handleDownload = async (cert) => {
    try {
      const res = await fetch(cert.image);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cert.title.replace(/\s+/g, "_")}_certificate.jpeg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: direct link download
      const a = document.createElement("a");
      a.href = cert.image;
      a.download = `${cert.title.replace(/\s+/g, "_")}_certificate.jpeg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace" }}>

      {/* Filter tabs */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #ffffff11", display: "flex", gap: 6, flexShrink: 0, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "4px 10px", borderRadius: 20, fontSize: 10, cursor: "pointer", border: "1px solid",
            borderColor: filter === c ? accent : "#ffffff22",
            background: filter === c ? `${accent}22` : "transparent",
            color: filter === c ? accent : "#888", fontFamily: "inherit",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>{c}</button>
        ))}
      </div>

      {/* Certificate cards */}
      <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {filtered.map((c, fi) => {
            const ti = getTrueIdx(fi);
            return (
              <div key={ti}
                onMouseEnter={() => setHovered(ti)} onMouseLeave={() => setHovered(null)}
                style={{
                  background: "rgba(255,255,255,0.03)", border: `1px solid ${c.color}44`,
                  borderRadius: 12, padding: 16, position: "relative", overflow: "hidden",
                  transition: "all 0.3s",
                  boxShadow: hovered === ti ? `0 0 30px ${c.color}44, 0 0 0 1px ${c.color}66` : "none",
                  transform: hovered === ti ? "translateY(-2px)" : "none",
                }}
              >
                {hovered === ti && (
                  <div style={{ position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                    animation: "shine 0.5s ease", pointerEvents: "none" }} />
                )}

                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ fontSize: 26 }}>{c.icon}</div>
                  <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 10, background: "#39ff1422", color: "#39ff14", border: "1px solid #39ff1444", flexShrink: 0 }}>✓ VERIFIED</span>
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: c.color, marginTop: 8, fontFamily: "Orbitron, monospace", wordBreak: "break-word" }}>{c.title}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 3 }}>{c.org}</div>

                {/* Certificate image — always shown from public folder */}
                <div style={{ marginTop: 12 }}>
                  <img
                    src={c.image}
                    alt={c.title}
                    onClick={() => setLightboxCert(ti)}
                    style={{
                      width: "100%", maxHeight: 160, objectFit: "contain",
                      borderRadius: 8, border: `1px solid ${c.color}44`,
                      background: "rgba(0,0,0,0.4)", cursor: "zoom-in",
                      display: "block",
                    }}
                  />
                </div>

                {/* Action buttons */}
                <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {/* Download button */}
                  <button
                    onClick={() => handleDownload(c)}
                    style={{
                      fontSize: 10, padding: "5px 12px", borderRadius: 6,
                      background: `${c.color}22`,
                      border: `1px solid ${c.color}55`,
                      color: c.color, cursor: "pointer",
                      fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5,
                      whiteSpace: "nowrap", transition: "all 0.2s",
                    }}
                  >
                    ↓ Download
                  </button>

                  {/* Preview button */}
                  <button
                    onClick={() => setLightboxCert(ti)}
                    style={{
                      fontSize: 10, padding: "5px 12px", borderRadius: 6,
                      background: "rgba(255,255,255,0.04)", border: "1px solid #ffffff22",
                      color: "#aaa", cursor: "pointer", fontFamily: "inherit",
                      display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                    }}
                  >
                    🔍 Preview
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-screen certificate lightbox */}
      {lightboxCert !== null && (
        <div
          onClick={() => setLightboxCert(null)}
          style={{
            position: "absolute", inset: 0, zIndex: 300,
            background: "rgba(0,0,0,0.97)", backdropFilter: "blur(16px)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: 24,
          }}
        >
          <button
            onClick={() => setLightboxCert(null)}
            style={{
              position: "absolute", top: 14, right: 14, width: 34, height: 34,
              borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid #ffffff22",
              color: "#fff", fontSize: 16, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>

          <img
            src={certs[lightboxCert]?.image}
            alt="Certificate"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "90%", maxHeight: "75vh", objectFit: "contain",
              borderRadius: 12, border: `1px solid ${certs[lightboxCert]?.color ?? accent}44`,
              boxShadow: `0 0 60px ${certs[lightboxCert]?.color ?? accent}33`,
            }}
          />

          <div style={{ marginTop: 18, textAlign: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: certs[lightboxCert]?.color ?? accent, fontFamily: "Orbitron, monospace" }}>
              {certs[lightboxCert]?.title}
            </div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{certs[lightboxCert]?.org}</div>
            <button
              onClick={e => { e.stopPropagation(); handleDownload(certs[lightboxCert]); }}
              style={{
                marginTop: 14, padding: "8px 24px", borderRadius: 8,
                background: `${certs[lightboxCert]?.color ?? accent}22`,
                border: `1px solid ${certs[lightboxCert]?.color ?? accent}55`,
                color: certs[lightboxCert]?.color ?? accent,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12, cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              ↓ Download Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// RESUME APP
// ============================================================
function ResumeApp({ hackerMode }) {
  const accent = useAccent(hackerMode);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch("resume.pdf");
      if (!res.ok) throw new Error("not found");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "HarshKumarVermaCurrent2026.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("resume.pdf not found in public folder. Please add it first.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      fontFamily: "'JetBrains Mono', monospace", color: "#e0e0e0",
    }}>
      {/* Header */}
      <div style={{
        padding: "14px 18px", borderBottom: "1px solid #ffffff11",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
      }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: accent, fontFamily: "Orbitron, monospace", letterSpacing: 2 }}>
            RESUME
          </div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 2, letterSpacing: 1 }}>
            Harsh_Kumar_Verma_Resume.pdf
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          style={{
            padding: "8px 18px", borderRadius: 8, fontSize: 11, cursor: downloading ? "wait" : "pointer",
            background: `${accent}22`, border: `1px solid ${accent}55`, color: accent,
            fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
            transition: "all 0.2s", letterSpacing: 1,
            opacity: downloading ? 0.6 : 1,
          }}
        >
          {downloading ? "⏳ Downloading..." : "↓ Download PDF"}
        </button>
      </div>

      {/* PDF preview */}
      <div style={{ flex: 1, position: "relative", background: "#111" }}>
        <iframe
          src="HarshKumarVermaCurrent2026.pdf"
          title="Resume"
          style={{
            width: "100%", height: "100%", border: "none",
            display: "block",
          }}
        />
        {/* Overlay hint — shown if PDF fails to load (browser can't embed) */}
        <div style={{
          position: "absolute", bottom: 16, right: 16,
          background: "rgba(0,0,0,0.75)", border: `1px solid ${accent}33`,
          borderRadius: 8, padding: "8px 14px", fontSize: 10, color: "#666",
          pointerEvents: "none",
        }}>
          If preview is blank, use ↓ Download PDF above
        </div>
      </div>
    </div>
  );
}

// ============================================================
// GITHUB ACTIVITY APP
// ============================================================
function GitHubApp({ hackerMode }) {
  const accent = useAccent(hackerMode);
  const [contributions, setContributions] = useState(null); // array of {date, count}
  const [stats, setStats]                 = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(false);
  const USERNAME = "Harsh-lab-art";

  useEffect(() => {
    // GitHub's contribution data isn't in the REST API — use a free proxy
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then(r => r.json())
      .then(data => {
        const contribs = data.contributions || [];
        const total = contribs.reduce((s, d) => s + d.count, 0);
        const max   = Math.max(...contribs.map(d => d.count), 1);
        const streak = (() => {
          let best = 0, cur = 0;
          [...contribs].reverse().forEach(d => {
            if (d.count > 0) { cur++; best = Math.max(best, cur); }
            else cur = 0;
          });
          return best;
        })();
        setContributions(contribs);
        setStats({ total, max, streak, days: contribs.length });
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  // Color scale — 5 levels
  const getColor = (count, max) => {
    if (count === 0) return "rgba(255,255,255,0.05)";
    const lvl = Math.ceil((count / max) * 4);
    const colors = ["", `${accent}33`, `${accent}55`, `${accent}88`, accent];
    return colors[lvl] || accent;
  };

  // Group into weeks (columns of 7 days)
  const weeks = [];
  if (contributions) {
    for (let i = 0; i < contributions.length; i += 7) {
      weeks.push(contributions.slice(i, i + 7));
    }
  }

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", padding: 16, overflowY: "auto" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: accent, fontFamily: "Orbitron, monospace", letterSpacing: 2 }}>GITHUB ACTIVITY</div>
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: "#555", textDecoration: "none", letterSpacing: 1 }}>
            github.com/{USERNAME} ↗
          </a>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { label: "Contributions", value: stats?.total?.toLocaleString() ?? "—" },
            { label: "Best Streak", value: stats?.streak ? `${stats.streak}d` : "—" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${accent}22`, borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: accent, fontFamily: "Orbitron, monospace" }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Graph */}
      {loading && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#444", fontSize: 12, letterSpacing: 2 }}>
          <span style={{ animation: "blink 1s infinite" }}>⏳ FETCHING ACTIVITY...</span>
        </div>
      )}

      {error && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <div style={{ fontSize: 32 }}>⚠</div>
          <div style={{ color: "#555", fontSize: 12, letterSpacing: 1, textAlign: "center" }}>Could not load GitHub data.<br />Check your connection.</div>
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: accent, padding: "6px 16px", border: `1px solid ${accent}44`, borderRadius: 6, textDecoration: "none" }}>
            View on GitHub ↗
          </a>
        </div>
      )}

      {contributions && !loading && (
        <>
          {/* Contribution heatmap */}
          <div style={{ overflowX: "auto", paddingBottom: 8 }}>
            {/* Month labels */}
            <div style={{ display: "flex", marginBottom: 4, paddingLeft: 2 }}>
              {weeks.map((week, wi) => {
                const firstDay = week[0];
                const d = new Date(firstDay?.date);
                const showMonth = firstDay && d.getDate() <= 7;
                return (
                  <div key={wi} style={{ width: 12, flexShrink: 0, fontSize: 8, color: "#444", textAlign: "center" }}>
                    {showMonth ? months[d.getMonth()] : ""}
                  </div>
                );
              })}
            </div>

            {/* Day grid */}
            <div style={{ display: "flex", gap: 2 }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                      style={{
                        width: 10, height: 10, borderRadius: 2,
                        background: getColor(day.count, stats?.max ?? 1),
                        transition: "background 0.2s",
                        cursor: "default",
                        boxShadow: day.count > 0 ? `0 0 4px ${getColor(day.count, stats?.max ?? 1)}` : "none",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 9, color: "#444" }}>Less</span>
              {[0, 0.25, 0.5, 0.75, 1].map((lvl, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: 2,
                  background: lvl === 0 ? "rgba(255,255,255,0.05)" : `${accent}${Math.round(lvl * 255).toString(16).padStart(2, "0")}`,
                }} />
              ))}
              <span style={{ fontSize: 9, color: "#444" }}>More</span>
            </div>
          </div>

          {/* Recent repos */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>// pinned repos</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { name: "malware-gnn-sih2025", desc: "AI-driven GNN firmware analyzer", lang: "Python", color: "#3572A5" },
                { name: "AgroChain", desc: "Farm-to-consumer blockchain tracking", lang: "Solidity", color: "#AA6746" },
                { name: "ZKProofSystem", desc: "Zero-knowledge proof verification", lang: "Solidity", color: "#AA6746" },
                { name: "macos-portfolio", desc: "This portfolio — HarshOS v2.0", lang: "TypeScript", color: "#3178c6" },
                { name: "campaign-sentinel", desc: "Microsoft hackathon AI project", lang: "Python", color: "#3572A5" },
                { name: "stock-ai-platform", desc: "AI-powered stock analysis", lang: "TypeScript", color: "#3178c6" },
              ].map(repo => (
                <a key={repo.name}
                  href={`https://github.com/${USERNAME}/${repo.name}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${accent}22`, borderRadius: 8, padding: "10px 12px", textDecoration: "none", display: "block", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}55`; e.currentTarget.style.background = `${accent}08`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}22`; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <div style={{ fontSize: 11, color: accent, fontWeight: 700, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>◉ {repo.name}</div>
                  <div style={{ fontSize: 10, color: "#555", lineHeight: 1.5, marginBottom: 6 }}>{repo.desc}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: repo.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 9, color: "#444" }}>{repo.lang}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// SKILLS & TIMELINE APP
// ============================================================
function SkillsApp({ hackerMode }) {
  const accent = useAccent(hackerMode);
  const [tab, setTab] = useState("skills"); // skills | timeline
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  const skillGroups = [
    {
      cat: "AI / ML", color: "#bf00ff", icon: "🧠",
      skills: [
        { name: "PyTorch / GNN", pct: 88 },
        { name: "Scikit-learn", pct: 82 },
        { name: "TensorFlow", pct: 72 },
        { name: "CUDA / GPU", pct: 65 },
        { name: "Computer Vision", pct: 75 },
      ],
    },
    {
      cat: "Security", color: "#ff6b35", icon: "🔐",
      skills: [
        { name: "Firmware Analysis", pct: 80 },
        { name: "Malware Detection", pct: 85 },
        { name: "ZKP / Cryptography", pct: 70 },
        { name: "Reverse Engineering", pct: 68 },
      ],
    },
    {
      cat: "Blockchain", color: "#f7931a", icon: "⬡",
      skills: [
        { name: "Solidity", pct: 82 },
        { name: "Web3.js / Ethers", pct: 78 },
        { name: "Hardhat / Remix", pct: 75 },
        { name: "Smart Contracts", pct: 80 },
      ],
    },
    {
      cat: "Full-Stack", color: "#00d4ff", icon: "◈",
      skills: [
        { name: "React / Next.js", pct: 88 },
        { name: "TypeScript", pct: 82 },
        { name: "FastAPI / Flask", pct: 80 },
        { name: "Node.js", pct: 75 },
        { name: "TailwindCSS", pct: 85 },
      ],
    },
    {
      cat: "DevOps", color: "#39ff14", icon: "⚙",
      skills: [
        { name: "Docker", pct: 72 },
        { name: "Git / GitHub", pct: 90 },
        { name: "Linux", pct: 80 },
        { name: "CI/CD", pct: 65 },
      ],
    },
  ];

  const timeline = [
    {
      year: "2021",
      title: "Started B.Tech CSE",
      org: "LNCT Group of Colleges, Bhopal",
      desc: "Began computer science journey. Discovered passion for AI and security systems.",
      icon: "🎓", color: "#00d4ff",
    },
    {
      year: "2022",
      title: "First Hackathon",
      org: "College Level",
      desc: "Built first full-stack project. Caught the hackathon bug — never looked back.",
      icon: "⚡", color: "#ffd700",
    },
    {
      year: "2023",
      title: "Blockchain Development",
      org: "Self-taught · Alchemy University",
      desc: "Built AgroChain, ZKProofSystem, and PeerLedWorkshops. Earned Web3 Developer cert.",
      icon: "⬡", color: "#f7931a",
    },
    {
      year: "2024",
      title: "Ministry of Defence Internship",
      org: "Government of India · Delhi",
      desc: "AI Security Systems Intern. Built GNN-based malware detection for national-level firmware analysis.",
      icon: "🛡️", color: "#ff6b35",
    },
    {
      year: "2025 Jan",
      title: "SIH 2025 — Finalist",
      org: "Smart India Hackathon · Govt. of India",
      desc: "AI-Driven GNN Firmware Analyzer. Multi-arch malware detection using PyTorch + Radare2. National finalist.",
      icon: "⚔", color: "#ff6b35",
    },
    {
      year: "2025 Jul",
      title: "Deloitte & AWS Simulations",
      org: "Forage Platform",
      desc: "Software Engineering simulation at Deloitte (30% bug reduction) and AWS APAC Solutions Architecture.",
      icon: "☁️", color: "#ff9900",
    },
    {
      year: "Now",
      title: "Building & Shipping",
      org: "Open to Opportunities",
      desc: "Actively building AI security tools, contributing to open source, and seeking full-time roles in AI/Security.",
      icon: "🚀", color: "#39ff14",
    },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace" }}>

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #ffffff11", flexShrink: 0 }}>
        {[{ id: "skills", label: "⬡ Skills" }, { id: "timeline", label: "◎ Timeline" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px 0", fontSize: 11, letterSpacing: 2,
            background: tab === t.id ? `${accent}11` : "transparent",
            borderTop: "none", borderLeft: "none", borderRight: "none",
            borderBottom: tab === t.id ? `2px solid ${accent}` : "2px solid transparent",
            color: tab === t.id ? accent : "#555",
            cursor: "pointer", fontFamily: "inherit",
            textTransform: "uppercase", transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>

        {/* ── SKILLS TAB ── */}
        {tab === "skills" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {skillGroups.map(group => (
              <div key={group.cat}>
                {/* Group header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 16 }}>{group.icon}</span>
                  <span style={{ fontSize: 11, color: group.color, textTransform: "uppercase", letterSpacing: 3, fontWeight: 700 }}>{group.cat}</span>
                </div>
                {/* Skill bars */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {group.skills.map(skill => (
                    <div key={skill.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: "#aaa" }}>{skill.name}</span>
                        <span style={{ fontSize: 11, color: group.color, fontWeight: 700 }}>{skill.pct}%</span>
                      </div>
                      {/* Track */}
                      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                        {/* Fill — animates in */}
                        <div style={{
                          height: "100%", borderRadius: 3,
                          background: `linear-gradient(90deg, ${group.color}99, ${group.color})`,
                          boxShadow: `0 0 8px ${group.color}66`,
                          width: animated ? `${skill.pct}%` : "0%",
                          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Overall stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 4 }}>
              {[
                { label: "Languages", value: "8+", color: "#bf00ff" },
                { label: "Frameworks", value: "12+", color: "#00d4ff" },
                { label: "Projects", value: "15+", color: "#39ff14" },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}33`, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: "Orbitron, monospace" }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: 2, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TIMELINE TAB ── */}
        {tab === "timeline" && (
          <div style={{ position: "relative", paddingLeft: 28 }}>
            {/* Vertical line */}
            <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 2, background: "linear-gradient(180deg, transparent, #ffffff22 10%, #ffffff22 90%, transparent)" }} />

            {timeline.map((item, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 28, opacity: animated ? 1 : 0, transform: animated ? "translateX(0)" : "translateX(-10px)", transition: `all 0.5s ease ${i * 0.08}s` }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: -24, top: 4,
                  width: 14, height: 14, borderRadius: "50%",
                  background: item.color, boxShadow: `0 0 10px ${item.color}`,
                  border: "2px solid rgba(0,0,0,0.8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 7,
                }} />

                {/* Card */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}33`, borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 16 }}>{item.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: "Orbitron, monospace" }}>{item.title}</span>
                      </div>
                      <div style={{ fontSize: 10, color: "#666", marginTop: 3, letterSpacing: 1 }}>{item.org}</div>
                    </div>
                    <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 8, background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}33`, flexShrink: 0 }}>{item.year}</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#888", marginTop: 8, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


// ============================================================
// AI CHAT APP
// ============================================================
const CHAT_KB = [
  // Identity
  { keys: ["who are you","what are you","introduce","yourself","harshOS","harsh os"], answer: "I'm HarshOS AI — an intelligent assistant built into Harsh Kumar Verma's portfolio. Ask me anything about Harsh: his skills, projects, internships, or how to contact him." },
  { keys: ["name","harsh","full name"], answer: "His name is Harsh Kumar Verma. B.Tech CSE student, AI Security Engineer, SIH 2025 Finalist, and Ministry of Defence intern." },
  { keys: ["location","where","city","bhopal","india"], answer: "Harsh is based in Bhopal, Madhya Pradesh, India." },
  { keys: ["college","university","degree","btech","b.tech","lnct","education"], answer: "He's pursuing B.Tech in Computer Science & Engineering with a CPI of 8.11. Currently in his final year." },
  // Skills
  { keys: ["skill","tech","stack","language","framework","know","expertise"], answer: "Harsh's core stack:\n• AI/ML — PyTorch, GNN, TensorFlow, Scikit-learn, CUDA\n• Security — Firmware Analysis, Malware Detection, ZKP\n• Blockchain — Solidity, Ethereum, Web3.js, Hardhat\n• Full-Stack — React, Next.js, TypeScript, FastAPI, Node.js\n• DevOps — Docker, Git, Linux" },
  { keys: ["python"], answer: "Yes, Python is his primary language — used for AI/ML, FastAPI backends, firmware analysis scripts, and automation." },
  { keys: ["react","frontend","typescript","javascript"], answer: "Strong frontend skills — React, Next.js, TypeScript, TailwindCSS. This portfolio itself is built with React + Vite + TypeScript." },
  { keys: ["solidity","blockchain","web3","ethereum","smart contract"], answer: "He's built 3 smart contract projects: AgroChain (supply chain), ZKProofSystem (zero-knowledge proofs), and PeerLedWorkshops (reward system). Certified Web3 Developer from Alchemy University." },
  { keys: ["ai","ml","machine learning","deep learning","neural","gnn","pytorch"], answer: "AI/ML is his core focus. He built an AI-driven GNN Firmware Analyzer for SIH 2025 using PyTorch, GIN+GraphSAGE, and Radare2 for binary analysis. Also worked on malware detection at the Ministry of Defence." },
  // Projects
  { keys: ["project","built","made","created","work"], answer: "15+ projects across:\n• Blockchain: AgroChain, ZKProofSystem, PeerLedWorkshops\n• AI/Security: GNN Malware Analyzer (SIH), Campaign Sentinel, Phishing Detector\n• Web: Stock AI Platform, CodeConnect, Hospital Dashboard, This Portfolio\n• Python: Volvex 3D Gestures, Dr Strange Gestures\nOpen the Projects app for full details." },
  { keys: ["agrochain","agro","farm","supply chain"], answer: "AgroChain is a blockchain-based farm-to-consumer supply chain tracker. Each product gets a unique QR code; every stage is recorded immutably on Ethereum using Solidity smart contracts." },
  { keys: ["zkproof","zk","zero knowledge","zkp"], answer: "ZKProofSystem is a privacy-preserving verification system on Ethereum. Users submit and verify proofs without revealing sensitive data, using keccak256 hashing and role-based verifier access." },
  { keys: ["sih","smart india hackathon","gnn","firmware","malware","finalist"], answer: "SIH 2025 Finalist! He built an AI-Driven GNN Firmware Analyzer — converts binaries to Control Flow Graphs, then uses GIN+GraphSAGE neural networks to detect malware. Supports x86/ARM/MIPS architectures. Built with PyTorch, Radare2, Capstone, FastAPI, and CUDA." },
  { keys: ["portfolio","this site","website","macos"], answer: "This portfolio is HarshOS v2.0 — a macOS-style interactive OS built with React, TypeScript, and Vite. Features include a terminal, gallery, certificates, GitHub activity, and this AI chat." },
  // Internships
  { keys: ["internship","intern","work experience","job","defence","ministry","mod","government"], answer: "He has 3 internships:\n1. Ministry of Defence, India (Current, 6 months) — AI Security Systems, GNN malware analysis, firmware security\n2. Deloitte Technology (July 2025) — Software Engineering simulation, 30% bug reduction\n3. AWS APAC Solutions Architecture (Sept 2025) — Deployed Elastic Beanstalk, 40% faster, 10K+ users" },
  { keys: ["deloitte"], answer: "Deloitte Technology Job Simulation (July 2025) via Forage. Debugged software modules and reduced bugs by 30%. Certificate ID: x8mcYfoiFmxSZp37m." },
  { keys: ["aws","amazon","cloud","elastic beanstalk"], answer: "AWS APAC Solutions Architecture Simulation (Sept 2025). Deployed a scalable Elastic Beanstalk architecture — 40% faster performance, supporting 10K+ users with zero downtime. Certificate ID: 99RQY2zcfPrGGzhvt." },
  // Achievements
  { keys: ["achievement","award","certificate","cert","hackathon","winner"], answer: "Key achievements:\n✦ SIH 2025 Finalist (National Level)\n✦ Ministry of Defence Internship\n✦ Microsoft Hackathon Participant\n✦ Hack with India Participant\n✦ AI/ML Specialization — Coursera\n✦ Cybersecurity Pro — CISCO\n✦ Web3 Developer — Alchemy\n✦ Hackathon Winner ×3" },
  { keys: ["microsoft","campaign sentinel"], answer: "Participated in Microsoft Hackathon with Campaign Sentinel — an AI-powered campaign monitoring and misinformation detection system." },
  // Contact
  { keys: ["contact","email","reach","hire","connect","linkedin","github"], answer: "You can reach Harsh at:\n✉ harsh9760verma@gmail.com\n◉ github.com/Harsh-lab-art\n⬡ linkedin.com/in/harsh-kumar-verma-850636336\n📍 Bhopal, MP, India\n\nOr use the Contact app to send a direct message!" },
  { keys: ["hire","job","opportunity","open to","available","recruit"], answer: "Yes! Harsh is actively open to full-time roles and internships in AI Security, ML Engineering, and Full-Stack development. Reach out at harsh9760verma@gmail.com or via LinkedIn." },
  // Fun
  { keys: ["hobby","interest","fun","free time","outside"], answer: "Outside of coding, Harsh enjoys competitive programming, exploring new AI research papers, and building side projects. He's also into hackathons — 5+ participated, 3 wins." },
  { keys: ["cpi","gpa","grade","marks","score"], answer: "CPI: 8.11 — consistently strong academic performance alongside heavy project and internship work." },
  { keys: ["hello","hi","hey","greet","good morning","good evening"], answer: "Hello, Agent! 👋 I'm HarshOS AI. Ask me anything about Harsh — his skills, projects, internships, or how to get in touch." },
  { keys: ["thank","thanks","appreciate"], answer: "You're welcome! Is there anything else you'd like to know about Harsh?" },
  { keys: ["bye","goodbye","exit","close"], answer: "Goodbye, Agent. Feel free to come back anytime. You can also explore the other apps in HarshOS!" },
];

function getAIResponse(input) {
  const q = input.toLowerCase().trim();
  // Find best matching entry
  let best = null, bestScore = 0;
  for (const entry of CHAT_KB) {
    for (const key of entry.keys) {
      if (q.includes(key)) {
        const score = key.length; // longer match = more specific
        if (score > bestScore) { bestScore = score; best = entry; }
      }
    }
  }
  if (best) return best.answer;
  // Fallback
  return `I don't have specific info on "${input}" yet. Try asking about:\n• Skills & tech stack\n• Projects (AgroChain, SIH, etc.)\n• Internships (MoD, Deloitte, AWS)\n• Achievements & certificates\n• How to contact Harsh`;
}

function ChatApp({ hackerMode }) {
  const accent = useAccent(hackerMode);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello, Agent! I'm HarshOS AI — ask me anything about Harsh Kumar Verma.\n\nTry: \"What are his skills?\", \"Tell me about SIH\", \"How to contact him?\"" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: q }]);
    setTyping(true);
    // Simulate thinking delay
    setTimeout(() => {
      const answer = getAIResponse(q);
      setTyping(false);
      setMessages(m => [...m, { role: "ai", text: answer }]);
    }, 600 + Math.random() * 400);
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const suggestions = ["What are his skills?", "Tell me about SIH 2025", "Internship details", "How to contact?", "Show projects"];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace" }}>

      {/* Header */}
      <div style={{ padding: "10px 16px", borderBottom: "1px solid #ffffff0a", flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${accent}22`, border: `1px solid ${accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⟁</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: 2 }}>HARSHOS AI</div>
          <div style={{ fontSize: 9, color: "#39ff14", letterSpacing: 1 }}>● ONLINE</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "82%", padding: "10px 14px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              background: msg.role === "user" ? `${accent}22` : "rgba(255,255,255,0.04)",
              border: `1px solid ${msg.role === "user" ? accent + "44" : "#ffffff0f"}`,
              fontSize: 12, color: msg.role === "user" ? accent : "#ccc",
              lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word",
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "10px 16px", borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.04)", border: "1px solid #ffffff0f", display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: accent, opacity: 0.6, animation: `blink 1s ease-in-out ${i * 0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions — only show at start */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 14px 8px", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 50); }}
              style={{ fontSize: 10, padding: "4px 10px", borderRadius: 12, background: `${accent}11`, border: `1px solid ${accent}33`, color: accent, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5, whiteSpace: "nowrap" }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid #ffffff0a", display: "flex", gap: 8, flexShrink: 0 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask me anything about Harsh..."
          style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: `1px solid ${accent}33`, borderRadius: 10, padding: "8px 12px", color: "#fff", fontFamily: "inherit", fontSize: 12, outline: "none" }}
        />
        <button onClick={send} disabled={!input.trim() || typing}
          style={{ padding: "8px 14px", borderRadius: 10, background: input.trim() && !typing ? `${accent}22` : "rgba(255,255,255,0.03)", border: `1px solid ${input.trim() && !typing ? accent + "55" : "#ffffff11"}`, color: input.trim() && !typing ? accent : "#444", cursor: input.trim() && !typing ? "pointer" : "not-allowed", fontFamily: "inherit", fontSize: 13, transition: "all 0.2s" }}>
          ↑
        </button>
      </div>
    </div>
  );
}

// ============================================================
// CONTACT APP
// ============================================================
// Web3Forms — no signup needed.
// Just go to https://web3forms.com, enter harsh9760verma@gmail.com,
// click "Create Access Key", paste the key below. That's it.
const WEB3FORMS_KEY = "c34478f6-fbbc-4195-9657-dd6559c56a0f";

function ContactApp({ hackerMode }) {
  const accent = useAccent(hackerMode);
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg]     = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(null); // label of the copied item

  const copyToClipboard = (label, value) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const emailOk = isValidEmail(email);
  const canSend = name.trim() && emailOk && msg.trim() && status === "idle";

  const handleTransmit = async () => {
    if (!canSend) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: name.trim(),
          email: email.trim(),
          message: msg.trim(),
          subject: `Portfolio Contact from ${name.trim()}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setName(""); setEmail(""); setMsg(""); setEmailTouched(false);
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        throw new Error(data.message);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const contacts = [
    { label: "Email", value: "harsh9760verma@gmail.com", icon: "✉", color: "#00d4ff", href: "mailto:harsh9760verma@gmail.com", target: "_self" },
    { label: "Phone", value: "+91 76348 59834", icon: "📞", color: "#39ff14", href: "tel:+917634859834", target: "_self" },
    { label: "GitHub", value: "github.com/Harsh-lab-art", icon: "◉", color: "#ffffff", href: "https://github.com/Harsh-lab-art", target: "_blank" },
    { label: "LinkedIn", value: "Harsh Kumar Verma", icon: "⬡", color: "#0077b5", href: "https://www.linkedin.com/in/harsh-kumar-verma-850636336/", target: "_blank" },
    { label: "LeetCode", value: "Harshspidey12", icon: "◈", color: "#ffa116", href: "https://leetcode.com/u/Harshspidey12/", target: "_blank" },
    { label: "Instagram", value: "@h.arshyxx", icon: "⊞", color: "#e1306c", href: "https://www.instagram.com/h.arshyxx/?hl=en", target: "_blank" },
    { label: "Location", value: "Bhopal, MP, India", icon: "📍", color: "#ff6b35", href: "https://maps.google.com/?q=Bhopal,MP,India", target: "_blank" },
  ];

  const fieldStyle = (invalid = false) => ({
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: `1px solid ${invalid ? "#ff4444" : accent + "33"}`,
    borderRadius: 6, padding: "8px 12px", color: "#fff",
    fontFamily: "inherit", fontSize: 12, outline: "none", boxSizing: "border-box",
  });

  return (
    <div style={{ padding: 16, fontFamily: "'JetBrains Mono', monospace", color: "#e0e0e0", overflowY: "auto", height: "100%" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: accent, fontFamily: "Orbitron, monospace", letterSpacing: 2, marginBottom: 16 }}>ESTABLISH CONTACT</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8, marginBottom: 16 }}>
        {contacts.map(c => (
          <div
            key={c.label}
            onClick={() => copyToClipboard(c.label, c.value)}
            style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${copied === c.label ? c.color + "99" : c.color + "33"}`, borderRadius: 10, padding: "14px 16px", display: "block", textDecoration: "none", transition: "all 0.2s", cursor: "pointer", position: "relative", overflow: "hidden",
              boxShadow: copied === c.label ? `0 0 18px ${c.color}33` : "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.color}88`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 20px ${c.color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = copied === c.label ? `${c.color}99` : `${c.color}33`; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = copied === c.label ? `0 0 18px ${c.color}33` : "none"; }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: c.color, marginTop: 2 }}>{c.value}</div>
                </div>
              </div>
              {/* Copy badge */}
              <span style={{
                fontSize: 9, padding: "2px 8px", borderRadius: 8, letterSpacing: 1,
                background: copied === c.label ? `${c.color}22` : "rgba(255,255,255,0.04)",
                border: `1px solid ${copied === c.label ? c.color + "66" : "#ffffff11"}`,
                color: copied === c.label ? c.color : "#444",
                transition: "all 0.3s", flexShrink: 0,
              }}>
                {copied === c.label ? "✓ COPIED" : "COPY"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: 20, border: `1px solid ${accent}22` }}>
        <div style={{ fontSize: 11, color: accent, marginBottom: 14, textTransform: "uppercase", letterSpacing: 2 }}>// send_message</div>

        {/* Name */}
        <input
          placeholder="Your name..."
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ ...fieldStyle(), marginBottom: 10 }}
        />

        {/* Email with live validation */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ position: "relative" }}>
            <input
              placeholder="Your email address..."
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailTouched(true); }}
              style={{ ...fieldStyle(emailTouched && !emailOk), paddingRight: email ? 32 : 12 }}
            />
            {email && (
              <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: emailOk ? "#39ff14" : "#ff4444" }}>
                {emailOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {emailTouched && !emailOk && email && (
            <div style={{ fontSize: 10, color: "#ff4444", marginTop: 4, letterSpacing: 1 }}>⚠ Invalid email address</div>
          )}
        </div>

        {/* Message */}
        <textarea
          rows={3}
          placeholder="Your message..."
          value={msg}
          onChange={e => setMsg(e.target.value)}
          style={{ ...fieldStyle(), resize: "none", marginBottom: 0 }}
        />

        {/* Status feedback */}
        {status === "sent" && (
          <div style={{ marginTop: 10, fontSize: 11, color: "#39ff14", letterSpacing: 1 }}>✓ Message transmitted successfully!</div>
        )}
        {status === "error" && (
          <div style={{ marginTop: 10, fontSize: 11, color: "#ff4444", letterSpacing: 1 }}>✗ Transmission failed. Try again.</div>
        )}

        <button
          onClick={handleTransmit}
          disabled={!canSend}
          style={{
            marginTop: 12, padding: "8px 24px",
            background: status === "sent" ? "#39ff1422" : `${accent}22`,
            border: `1px solid ${status === "sent" ? "#39ff14" : accent}`,
            borderRadius: 6,
            color: status === "sent" ? "#39ff14" : accent,
            fontFamily: "inherit", fontSize: 12, letterSpacing: 2,
            cursor: canSend ? "pointer" : "not-allowed",
            opacity: canSend ? 1 : 0.45,
            transition: "all 0.3s",
          }}
        >
          {status === "sending" ? "⏳ TRANSMITTING..." : status === "sent" ? "✓ TRANSMITTED" : "TRANSMIT →"}
        </button>
      </div>
    </div>
  );
}
// ============================================================
// SETTINGS APP
// ============================================================
function SettingsApp({ hackerMode, setHackerMode, accentColor, setAccentColor }) {
  const accent = useAccent(hackerMode);
  return (
    <div style={{ padding: 16, fontFamily: "'JetBrains Mono', monospace", color: "#e0e0e0", overflowY: "auto", height: "100%" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: accent, fontFamily: "Orbitron, monospace", letterSpacing: 2, marginBottom: 18 }}>SYSTEM SETTINGS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: `1px solid ${accent}22` }}>
          <div>
            <div style={{ fontSize: 13, color: "#fff" }}>Hacker Mode</div>
            <div style={{ fontSize: 10, color: "#666", marginTop: 2 }}>Enable matrix rain + neon green</div>
          </div>
          <div onClick={() => setHackerMode(h => !h)} style={{
            width: 44, height: 24, borderRadius: 12, background: hackerMode ? "#39ff14" : "#333",
            cursor: "pointer", position: "relative", transition: "background 0.3s",
          }}>
            <div style={{ position: "absolute", top: 3, left: hackerMode ? 23 : 3, width: 18, height: 18, borderRadius: 9, background: "#fff", transition: "left 0.3s" }} />
          </div>
        </div>
        <div style={{ padding: "14px 18px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: `1px solid ${accent}22` }}>
          <div style={{ fontSize: 13, color: "#fff", marginBottom: 12 }}>Accent Color</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["#00fff7", "#39ff14", "#bf00ff", "#ff6b35", "#ffd700", "#ff2d78"].map(c => (
              <div key={c} onClick={() => setAccentColor(c)} style={{ width: 28, height: 28, borderRadius: 6, background: c, cursor: "pointer", border: accentColor === c ? "2px solid #fff" : "2px solid transparent", transition: "border 0.2s", boxShadow: accentColor === c ? `0 0 10px ${c}` : "none" }} />
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 18px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: `1px solid ${accent}22` }}>
          <div style={{ fontSize: 13, color: "#fff", marginBottom: 6 }}>System Info</div>
          <div style={{ fontSize: 11, color: "#555" }}>HarshOS v2.0 · React · TypeScript · Canvas API</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 3 }}>15 Projects · 8 Certs · 5+ Hackathons</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MUSIC APP
// ============================================================
const TRACKS = [
  { title: "Call you mine",   artist: "HarshOS Radio", src: "callYouMine.mp3" },
  { title: "Daddy Home",     artist: "HarshOS Radio", src: "daddy.mp3" },
  { title: "Heaven and Back",      artist: "HarshOS Radio", src: "heaven.mp3" },
  { title: "Bloodshot",  artist: "HarshOS Radio", src: "idaf.mp3" },
];

function MusicApp({ hackerMode }) {
  const accent = useAccent(hackerMode);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [volume, setVolume]     = useState(0.4);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError]       = useState(false);
  const audioRef = useRef(null);
  const track = TRACKS[trackIdx];

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  useEffect(() => {
    const t = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setProgress(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
      }
    }, 500);
    return () => clearInterval(t);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setError(false);
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().then(() => setPlaying(true)).catch(() => setError(true)); }
  };

  const changeTrack = (next) => {
    setTrackIdx(next); setProgress(0); setError(false);
    setTimeout(() => {
      if (playing && audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch(() => setError(true));
      }
    }, 50);
  };

  const seek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * duration;
  };

  const fmt = (s) => isNaN(s) ? "0:00" : `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "'JetBrains Mono', monospace", background: "rgba(0,0,0,0.3)" }}>
      <style>{`
        @keyframes barBounce0{from{height:20%}to{height:100%}}
        @keyframes barBounce1{from{height:40%}to{height:70%}}
        @keyframes barBounce2{from{height:15%}to{height:90%}}
        @keyframes barBounce3{from{height:50%}to{height:60%}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>
      <audio ref={audioRef} src={track.src} onEnded={() => changeTrack((trackIdx + 1) % TRACKS.length)} preload="none" />

      {/* Now playing hero */}
      <div style={{ padding: "32px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", borderBottom: "1px solid #ffffff08" }}>
        {/* Vinyl disc */}
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          background: `conic-gradient(${accent}22, #111, ${accent}44, #111, ${accent}22)`,
          border: `3px solid ${accent}44`,
          boxShadow: playing ? `0 0 40px ${accent}44, 0 0 80px ${accent}22` : `0 0 20px rgba(0,0,0,0.5)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: playing ? "spin 4s linear infinite" : "none",
          transition: "box-shadow 0.5s",
          marginBottom: 20, flexShrink: 0,
        }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0a0a14", border: `2px solid ${accent}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>♫</div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: accent, fontFamily: "Orbitron, monospace", letterSpacing: 2 }}>{track.title}</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 4, letterSpacing: 2 }}>{track.artist}</div>
          {error && <div style={{ fontSize: 10, color: "#ff4444", marginTop: 6 }}>⚠ Stream unavailable — try next track</div>}
        </div>

        {/* Equalizer bars */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 24, marginTop: 16 }}>
          {[1, 0.6, 0.9, 0.4, 0.75, 0.5, 0.85, 0.3].map((h, i) => (
            <div key={i} style={{
              width: 4, borderRadius: 2,
              background: playing ? accent : "#333",
              height: playing ? `${h * 100}%` : "20%",
              animation: playing ? `barBounce${i % 4} ${0.6 + i * 0.1}s ease-in-out ${i * 0.1}s infinite alternate` : "none",
              transition: "height 0.3s, background 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "16px 24px 0" }}>
        <div onClick={seek} style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, cursor: "pointer", marginBottom: 6 }}>
          <div style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${accent}99, ${accent})`, width: duration ? `${(progress/duration)*100}%` : "0%", transition: "width 0.5s linear", boxShadow: `0 0 8px ${accent}` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#444" }}>
          <span>{fmt(progress)}</span><span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, padding: "20px 24px" }}>
        {[
          { icon: "⏮", fn: () => changeTrack((trackIdx - 1 + TRACKS.length) % TRACKS.length), primary: false },
          { icon: playing ? "⏸" : "▶", fn: togglePlay, primary: true },
          { icon: "⏭", fn: () => changeTrack((trackIdx + 1) % TRACKS.length), primary: false },
        ].map((btn, i) => (
          <button key={i} onClick={btn.fn} style={{
            background: btn.primary ? `${accent}22` : "rgba(255,255,255,0.05)",
            border: `1px solid ${btn.primary ? accent + "55" : "#ffffff18"}`,
            borderRadius: "50%", width: btn.primary ? 56 : 40, height: btn.primary ? 56 : 40,
            color: btn.primary ? accent : "#888", fontSize: btn.primary ? 22 : 16,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: btn.primary && playing ? `0 0 20px ${accent}55` : "none",
            transition: "all 0.2s", fontFamily: "inherit",
          }}>{btn.icon}</button>
        ))}
      </div>

      {/* Volume */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 24px 20px" }}>
        <span style={{ fontSize: 14, color: "#444" }}>🔈</span>
        <input type="range" min={0} max={1} step={0.05} value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          style={{ flex: 1, accentColor: accent, cursor: "pointer" }}
        />
        <span style={{ fontSize: 14, color: "#444" }}>🔊</span>
      </div>

      {/* Track list */}
      <div style={{ flex: 1, overflowY: "auto", borderTop: "1px solid #ffffff08", padding: "12px 16px" }}>
        <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>// playlist</div>
        {TRACKS.map((t, i) => (
          <div key={i} onClick={() => changeTrack(i)}
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
              borderRadius: 10, cursor: "pointer", marginBottom: 4,
              background: i === trackIdx ? `${accent}11` : "rgba(255,255,255,0.02)",
              border: `1px solid ${i === trackIdx ? accent + "33" : "transparent"}`,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (i !== trackIdx) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { if (i !== trackIdx) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
          >
            {/* Play indicator */}
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === trackIdx ? `${accent}22` : "rgba(255,255,255,0.04)", border: `1px solid ${i === trackIdx ? accent + "44" : "#ffffff11"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: i === trackIdx ? accent : "#555", flexShrink: 0 }}>
              {i === trackIdx && playing ? "▶" : (i + 1)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: i === trackIdx ? accent : "#aaa", fontWeight: i === trackIdx ? 700 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
              <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>{t.artist}</div>
            </div>
            {i === trackIdx && playing && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 14 }}>
                {[1, 0.6, 0.9, 0.4].map((h, j) => (
                  <div key={j} style={{ width: 3, borderRadius: 1, background: accent, height: `${h * 100}%`, animation: `barBounce${j} 0.8s ease-in-out ${j * 0.15}s infinite alternate` }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// icon
// ============================================================
function Dock({ onOpen, hackerMode, minimized }) {
  const [hovered, setHovered] = useState(null);
  const accent = useAccent(hackerMode);

  return (
    <div style={{
      position: "fixed", bottom: 12, left: "50%", transform: "translateX(-50%)",
      display: "flex", gap: 8, padding: "10px 18px",
      background: "rgba(20,20,30,0.7)", backdropFilter: "blur(20px)",
      borderRadius: 22, border: `1px solid ${accent}22`,
      boxShadow: `0 0 30px rgba(0,0,0,0.8), 0 0 0 1px ${accent}11`,
      zIndex: 500,
    }}>
      {DOCK_APPS.map((id, idx) => {
        const app = APPS[id];
        const isMin = minimized.includes(id);
        const dist = hovered !== null && typeof hovered === "number" ? Math.abs(hovered - idx) : 99;
        const scale = dist === 0 ? 1.5 : dist === 1 ? 1.25 : 1;

        return (
          <div key={id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onOpen(id)}
              style={{
                width: 46, height: 46, borderRadius: 12,
                background: `linear-gradient(135deg, ${app.color}22, ${app.color}44)`,
                border: `1px solid ${app.color}55`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, cursor: "pointer",
                transform: `translateY(-${(scale - 1) * 18}px) scale(${scale})`,
                transition: "transform 0.15s ease, box-shadow 0.2s",
                boxShadow: hovered === idx ? `0 0 20px ${app.color}88` : "none",
              }}
              title={app.title}
            >{app.icon}</div>
            {isMin && <div style={{ width: 4, height: 4, borderRadius: 2, background: app.color }} />}
          </div>
        );
      })}

      <div style={{ width: 1, background: "#ffffff22", margin: "4px 2px" }} />
      <div
        onMouseEnter={() => setHovered("trash")}
        onMouseLeave={() => setHovered(null)}
        style={{
          width: 46, height: 46, borderRadius: 12,
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, cursor: "pointer",
          transform: hovered === "trash" ? "translateY(-10px) scale(1.3)" : "none",
          transition: "transform 0.15s ease",
        }}
      >🗑</div>
    </div>
  );
}

// ============================================================
// MENU BAR
// ============================================================
function MenuBar({ activeWindow, hackerMode, setHackerMode, onOpen }) {
  const [time, setTime] = useState(new Date());
  const [visitors, setVisitors] = useState(null);
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const accent = useAccent(hackerMode);

  // Visitor counter — increments on every new page load
  useEffect(() => {
    fetch("https://hits.sh/harshkumarverma-portfolio.json")
      .then(r => r.json())
      .then(d => setVisitors(d.count ?? d.value ?? null))
      .catch(() => setVisitors(null));
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 28,
      background: "rgba(10,10,20,0.85)", backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${accent}22`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 16px", zIndex: 600, fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
    }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <span style={{ fontSize: 16, cursor: "pointer", color: accent }} onClick={() => onOpen("about")} title="About">⌬</span>
        {["About", "Projects", "Blockchain", "Terminal", "Contact"].map(m => (
          <span key={m} onClick={() => {
            const map = { About: "about", Projects: "projects", Blockchain: "blockchain", Terminal: "terminal", Contact: "contact" };
            onOpen(map[m]);
          }} style={{ color: "#ccc", cursor: "pointer", fontSize: 11, letterSpacing: 1, padding: "2px 6px", borderRadius: 4 }}
            onMouseEnter={e => e.currentTarget.style.color = accent}
            onMouseLeave={e => e.currentTarget.style.color = "#ccc"}
          >{m}</span>
        ))}
      </div>
      <div style={{ color: accent, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
        {activeWindow || "HarshOS"}
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {/* Visitor counter */}
        {visitors !== null && (
          <span title="Total visitors" style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "#888", letterSpacing: 1 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: "#39ff14",
              boxShadow: "0 0 6px #39ff14",
              animation: "blink 2s infinite",
              display: "inline-block", flexShrink: 0,
            }} />
            {visitors.toLocaleString()} agents
          </span>
        )}
        <span style={{ fontSize: 12 }}>📶</span>
        <span style={{ fontSize: 12 }}>🔋</span>
        <span onClick={() => setHackerMode(h => !h)} style={{
          fontSize: 10, letterSpacing: 1, cursor: "pointer", padding: "2px 8px", borderRadius: 10,
          background: hackerMode ? "#39ff1422" : "transparent",
          border: `1px solid ${hackerMode ? "#39ff14" : "#ffffff22"}`,
          color: hackerMode ? "#39ff14" : "#888",
        }}>HACKER</span>
        <span style={{ color: "#ccc", fontSize: 11 }}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// SPOTLIGHT
// ============================================================
const SPOTLIGHT_INDEX = [
  // Apps
  ...Object.values(APPS).map(a => ({ type: "App", label: a.title, sub: `Open ${a.title}`, icon: a.icon, color: a.color, action: "open", id: a.id })),
  // Skills
  ...["PyTorch","TensorFlow","GNN","Scikit-learn","CUDA","FastAPI","React","TypeScript","Next.js","Solidity","Ethereum","Web3.js","Hardhat","Docker","Linux","ZKP","Firmware Analysis","Malware Detection","Flask","Node.js"].map(s => ({
    type: "Skill", label: s, sub: "Tech skill", icon: "⬡", color: "#bf00ff", action: "open", id: "about",
  })),
  // Projects
  ...["AgroChain","ZKProofSystem","PeerLedWorkshops","Campaign Sentinel","ClimateGuard","Phishing Detector","HealthKey","Volvex 3D","Stock AI Platform","CodeConnect","Hospital Dashboard","Timetable Generator"].map(p => ({
    type: "Project", label: p, sub: "View projects", icon: "◈", color: "#bf00ff", action: "open", id: "projects",
  })),
  // Certificates
  ...["SIH 2025 Finalist","Defence AI Intern","Deloitte Tech Simulation","AWS APAC Solutions","Microsoft Hackathon","Hack with India","AI/ML Specialization","Cybersecurity Pro","Web3 Developer","NPTEL"].map(c => ({
    type: "Certificate", label: c, sub: "View certificates", icon: "✦", color: "#ffd700", action: "open", id: "certs",
  })),
  // Quick actions
  { type: "Action", label: "Toggle Hacker Mode", sub: "Switch to matrix theme", icon: "☠️", color: "#39ff14", action: "hacker", id: null },
  { type: "Action", label: "Open Terminal", sub: "Run commands", icon: "⌨", color: "#39ff14", action: "open", id: "terminal" },
  { type: "Action", label: "View Resume", sub: "Download PDF", icon: "📄", color: "#a8ff78", action: "open", id: "resume" },
  { type: "Action", label: "Contact Me", sub: "Send a message", icon: "✉", color: "#00d4ff", action: "open", id: "contact" },
];

const TYPE_ORDER = ["App", "Action", "Project", "Certificate", "Skill"];

function Spotlight({ onClose, onOpen, setHackerMode }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  const results = q.trim().length === 0 ? [] : SPOTLIGHT_INDEX.filter(item =>
    item.label.toLowerCase().includes(q.toLowerCase()) ||
    item.type.toLowerCase().includes(q.toLowerCase()) ||
    item.sub.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 12);

  // Group by type in order
  const grouped = TYPE_ORDER.reduce((acc, type) => {
    const items = results.filter(r => r.type === type);
    if (items.length) acc.push({ type, items });
    return acc;
  }, []);

  // Flat list for keyboard nav
  const flat = results;

  useEffect(() => { setSel(0); }, [q]);

  const execute = (item) => {
    if (!item) return;
    if (item.action === "hacker") { setHackerMode(h => !h); }
    else if (item.action === "open") { onOpen(item.id); }
    onClose();
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(s + 1, flat.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter")     { execute(flat[sel]); }
    if (e.key === "Escape")    { onClose(); }
  };

  // Highlight matching text
  const highlight = (text) => {
    if (!q.trim()) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ color: "#fff", background: "rgba(0,255,247,0.2)", borderRadius: 2, padding: "0 1px" }}>{text.slice(idx, idx + q.length)}</span>
        {text.slice(idx + q.length)}
      </>
    );
  };

  let flatIdx = 0;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 560, background: "rgba(12,12,22,0.97)", backdropFilter: "blur(40px)", borderRadius: 18, border: "1px solid rgba(0,255,247,0.25)", overflow: "hidden", boxShadow: "0 30px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(0,255,247,0.08)" }}>

        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ marginRight: 12, fontSize: 18, opacity: 0.5 }}>⌕</span>
          <input
            ref={inputRef}
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search apps, skills, projects, certificates..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 15, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}
          />
          {q && (
            <span onClick={() => { setQ(""); inputRef.current?.focus(); }} style={{ fontSize: 12, color: "#444", cursor: "pointer", padding: "2px 6px", borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>✕</span>
          )}
        </div>

        {/* Results */}
        {q.trim() && (
          <div style={{ maxHeight: 420, overflowY: "auto" }}>
            {results.length === 0 ? (
              <div style={{ padding: "24px 20px", color: "#444", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
                No results for "{q}"
              </div>
            ) : (
              grouped.map(({ type, items }) => (
                <div key={type}>
                  {/* Category header */}
                  <div style={{ padding: "8px 20px 4px", fontSize: 9, color: "#444", textTransform: "uppercase", letterSpacing: 3, fontFamily: "'JetBrains Mono', monospace" }}>
                    {type}s
                  </div>
                  {items.map(item => {
                    const idx = flatIdx++;
                    const isSelected = sel === idx;
                    return (
                      <div
                        key={item.label + idx}
                        onClick={() => execute(item)}
                        onMouseEnter={() => setSel(idx)}
                        style={{
                          display: "flex", gap: 14, alignItems: "center",
                          padding: "10px 20px", cursor: "pointer",
                          background: isSelected ? `${item.color}14` : "transparent",
                          borderLeft: isSelected ? `2px solid ${item.color}` : "2px solid transparent",
                          transition: "all 0.1s",
                        }}
                      >
                        <span style={{ fontSize: 20, flexShrink: 0, width: 28, textAlign: "center" }}>{item.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, color: isSelected ? "#fff" : "#ccc", fontFamily: "'JetBrains Mono', monospace" }}>
                            {highlight(item.label)}
                          </div>
                          <div style={{ fontSize: 10, color: "#555", marginTop: 2, letterSpacing: 1 }}>{item.sub}</div>
                        </div>
                        <span style={{ fontSize: 9, color: item.color, padding: "2px 7px", borderRadius: 6, background: `${item.color}18`, border: `1px solid ${item.color}33`, flexShrink: 0 }}>
                          {type}
                        </span>
                        {isSelected && (
                          <span style={{ fontSize: 10, color: "#444", flexShrink: 0 }}>↵</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        )}

        {/* Empty state hint */}
        {!q.trim() && (
          <div style={{ padding: "20px 20px", fontFamily: "'JetBrains Mono', monospace" }}>
            <div style={{ fontSize: 10, color: "#333", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>Quick access</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["about","projects","certs","gallery","terminal","contact"].map(id => {
                const a = APPS[id];
                return (
                  <div key={id} onClick={() => { onOpen(id); onClose(); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: `1px solid ${a.color}33`, cursor: "pointer", fontSize: 11, color: a.color, fontFamily: "inherit" }}
                    onMouseEnter={e => e.currentTarget.style.background = `${a.color}14`}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  >
                    <span>{a.icon}</span> {a.title}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 16, fontSize: 10, color: "#2a2a2a", letterSpacing: 1 }}>↑↓ navigate · ↵ open · ESC close</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// CONTEXT MENU
// ============================================================
function ContextMenu({ pos, onClose, onOpen, hackerMode, setHackerMode }) {
  const items = [
    { label: "About HarshOS", action: () => onOpen("about") },
    { label: "Open Terminal", action: () => onOpen("terminal") },
    { label: "View Projects", action: () => onOpen("projects") },
    { label: "Settings", action: () => onOpen("settings") },
    { label: "Toggle Hacker Mode", action: () => setHackerMode(h => !h) },
    null,
    { label: "Restart OS", action: () => window.location.reload() },
  ];

  return (
    <div onMouseLeave={onClose} style={{ position: "fixed", left: pos.x, top: pos.y, background: "rgba(20,20,30,0.95)", backdropFilter: "blur(20px)", borderRadius: 10, border: "1px solid rgba(0,255,247,0.2)", padding: "6px 0", zIndex: 2000, minWidth: 180, boxShadow: "0 10px 40px rgba(0,0,0,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>
      {items.map((item, i) =>
        item === null
          ? <div key={i} style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />
          : <div key={i} onClick={() => { item.action(); onClose(); }}
              style={{ padding: "7px 18px", cursor: "pointer", fontSize: 12, color: "#ccc" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,247,0.1)"; e.currentTarget.style.color = "#00fff7"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ccc"; }}
            >{item.label}</div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function HarshOS() {
  const [booting, setBooting] = useState(true);
  const [windows, setWindows] = useState([]);
  const [minimized, setMinimized] = useState([]);
  const [hackerMode, setHackerMode] = useState(false);
  const [accentColor, setAccentColor] = useState("#00fff7");
  const [spotlight, setSpotlight] = useState(false);
  const [ctxMenu, setCtxMenu] = useState(null);
  const [activeWindow, setActiveWindow] = useState(null);

  useEffect(() => {
    const h = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSpotlight(s => !s); }
      if (e.key === "Escape") { setSpotlight(false); setCtxMenu(null); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const openApp = useCallback((id) => {
    setMinimized(m => m.filter(x => x !== id));
    if (windows.find(w => w.id === id)) { setActiveWindow(APPS[id]?.title || id); return; }
    setWindows(ws => [...ws, { id, key: id + Date.now() }]);
    setActiveWindow(APPS[id]?.title || id);
  }, [windows]);

  const closeApp = useCallback((id) => {
    setWindows(ws => ws.filter(w => w.id !== id));
    if (activeWindow === APPS[id]?.title) setActiveWindow(null);
  }, [activeWindow]);

  const minimizeApp = useCallback((id) => {
    setMinimized(m => [...m, id]);
    setWindows(ws => ws.filter(w => w.id !== id));
  }, []);

  const getAppComponent = (id) => {
    const props = { hackerMode, onOpenApp: openApp };
    switch (id) {
      case "about": return <AboutApp {...props} />;
      case "terminal": return <TerminalApp {...props} />;
      case "projects": return <ProjectsApp {...props} />;
      case "vscode": return <VSCodeApp {...props} />;
      case "sih": return <SIHApp {...props} />;
      case "blockchain": return <BlockchainApp {...props} />;
      case "gallery": return <GalleryApp {...props} />;
      case "certs": return <CertsApp {...props} />;
      case "resume": return <ResumeApp {...props} />;
      case "skills": return <SkillsApp {...props} />;
      case "github": return <GitHubApp {...props} />;
      case "music":  return <MusicApp {...props} />;
      case "chat":   return <ChatApp {...props} />;
      case "contact": return <ContactApp {...props} />;
      case "settings": return <SettingsApp hackerMode={hackerMode} setHackerMode={setHackerMode} accentColor={accentColor} setAccentColor={setAccentColor} />;
      default: return <div style={{ padding: 20, color: "#fff" }}>App not found</div>;
    }
  };

  return (
    <AccentContext.Provider value={accentColor}>
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden", cursor: "default", userSelect: "none", background: "#000" }}
      onContextMenu={e => { e.preventDefault(); setCtxMenu({ x: e.clientX, y: e.clientY }); }}
      onClick={() => setCtxMenu(null)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;400;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shine { 0%{left:-100%} 100%{left:200%} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden; background: #000; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,247,0.3); border-radius: 2px; }
        button { cursor: pointer; }
      `}</style>

      <Wallpaper hackerMode={hackerMode} />
      <MouseGlow hackerMode={hackerMode} />
      {booting && <BootScreen onComplete={() => setBooting(false)} />}
      <MenuBar activeWindow={activeWindow} hackerMode={hackerMode} setHackerMode={setHackerMode} onOpen={openApp} />

      {windows.map(w => (
        <Window key={w.key} id={w.id} title={APPS[w.id]?.title || w.id}
          onClose={() => closeApp(w.id)} onMinimize={() => minimizeApp(w.id)} hackerMode={hackerMode}
        >
          {getAppComponent(w.id)}
        </Window>
      ))}

      <Dock onOpen={openApp} hackerMode={hackerMode} minimized={minimized} />
      {spotlight && <Spotlight onClose={() => setSpotlight(false)} onOpen={openApp} setHackerMode={setHackerMode} />}
      {ctxMenu && (
        <ContextMenu pos={ctxMenu} onClose={() => setCtxMenu(null)} onOpen={openApp}
          hackerMode={hackerMode} setHackerMode={setHackerMode}
        />
      )}

      {windows.length === 0 && !booting && (
        <div style={{ position: "absolute", bottom: 90, left: "50%", transform: "translateX(-50%)", textAlign: "center", fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,255,247,0.3)", fontSize: 12, letterSpacing: 2, pointerEvents: "none" }}>
          <div>Click on icons to open apps</div>
          <div style={{ marginTop: 4, fontSize: 10 }}> CTRL+K for Spotlight · Right-click for menu</div>
        </div>
      )}
    </div>
    </AccentContext.Provider>
  );
}

// ============================================================
// ██╗██████╗ ██╗  ██╗ ██████╗ ███╗   ██╗███████╗ ██████╗ ███████╗
// ╚═╝██╔══██╗██║  ██║██╔═══██╗████╗  ██║██╔════╝██╔═══██╗██╔════╝
//    ██████╔╝███████║██║   ██║██╔██╗ ██║█████╗  ██║   ██║███████╗
//    ██╔═══╝ ██╔══██║██║   ██║██║╚██╗██║██╔══╝  ██║   ██║╚════██║
//    ██║     ██║  ██║╚██████╔╝██║ ╚████║███████╗╚██████╔╝███████║
//    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚══════╝
// MOBILE — iPhone-style UI (auto-shown on screens ≤ 768px)
// Zero changes to the desktop code above.
// ============================================================

// ── App content components (reused from desktop, rendered inside iPhone sheets) ──
// All the existing *App functions (AboutApp, ProjectsApp, etc.) are already defined
// above — we just call them inside iPhone-style full-screen sheets.

// ── Small helpers ─────────────────────────────────────────────

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth <= 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

// iPhone Status Bar
function IPhoneStatusBar({ hackerMode, time, visitors }) {
  const accent = hackerMode ? "#39ff14" : "#fff";
  return (
    <div style={{
      height: 44, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 18px 0 14px",
      flexShrink: 0, userSelect: "none",
    }}>
      {/* Time */}
      <span style={{ fontSize: 15, fontWeight: 700, color: accent, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </span>
      {/* Dynamic island pill — shows visitor count inside */}
      <div style={{
        width: 110, height: 30, borderRadius: 20,
        background: "#000", boxShadow: "0 0 0 2px #111",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
      }}>
        {visitors !== null && (
          <>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#39ff14", boxShadow: "0 0 5px #39ff14", display: "inline-block", animation: "blink 2s infinite" }} />
            <span style={{ fontSize: 9, color: "#39ff14", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>{visitors?.toLocaleString()}</span>
          </>
        )}
      </div>
      {/* Right icons */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 13, color: accent }}>📶</span>
        <span style={{ fontSize: 12, color: accent }}>WiFi</span>
        <span style={{ fontSize: 13, color: accent }}>🔋</span>
      </div>
    </div>
  );
}

// Full-screen app sheet (slides up like iOS)
function IPhoneAppSheet({ appId, hackerMode, onClose, openApp, setHackerMode, accentColor, setAccentColor }) {
  const app = APPS[appId];
  const accent = app?.color || "#00fff7";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide-in animation
    requestAnimationFrame(() => setVisible(true));
    return () => {};
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  const getContent = () => {
    const props = { hackerMode, onOpenApp: openApp };
    switch (appId) {
      case "about":      return <AboutApp {...props} />;
      case "terminal":   return <TerminalApp {...props} />;
      case "projects":   return <ProjectsApp {...props} />;
      case "vscode":     return <VSCodeApp {...props} />;
      case "sih":        return <SIHApp {...props} />;
      case "blockchain": return <BlockchainApp {...props} />;
      case "gallery":    return <GalleryApp {...props} />;
      case "certs":      return <CertsApp {...props} />;
      case "resume":     return <ResumeApp {...props} />;
      case "skills":     return <SkillsApp {...props} />;
      case "github":     return <GitHubApp {...props} />;
      case "music":      return <MusicApp {...props} />;
      case "chat":       return <ChatApp {...props} />;
      case "contact":    return <ContactApp {...props} />;
      case "settings":   return <SettingsApp hackerMode={hackerMode} setHackerMode={setHackerMode} accentColor={accentColor} setAccentColor={setAccentColor} />;
      default: return <div style={{ padding: 24, color: "#fff" }}>App not found</div>;
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 800,
      transform: visible ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.32s cubic-bezier(0.32,0.72,0,1)",
      background: "rgba(8,8,16,0.97)",
      display: "flex", flexDirection: "column",
      borderRadius: visible ? "0px" : "24px",
    }}>
      {/* Nav bar */}
      <div style={{
        height: 52, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 18px",
        borderBottom: `1px solid ${accent}22`,
        background: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)",
        flexShrink: 0,
      }}>
        <button
          onClick={handleClose}
          onTouchEnd={e => { e.preventDefault(); handleClose(); }}
          style={{
            background: "none", border: "none", color: accent,
            fontSize: 16, cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
            display: "flex", alignItems: "center", gap: 4, padding: "8px 4px",
            WebkitTapHighlightColor: "transparent", minWidth: 60,
          }}>
          ‹ Back
        </button>
        <span style={{
          fontSize: 13, fontWeight: 700, color: accent,
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2,
          textTransform: "uppercase",
        }}>{app?.icon} {app?.title}</span>
        <div style={{ width: 52 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", position: "relative", WebkitOverflowScrolling: "touch" }}>
        {getContent()}
      </div>

      {/* iPhone home indicator */}
      <div style={{ height: 34, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ width: 134, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.2)" }} />
      </div>
    </div>
  );
}

// App icon tile for the home screen grid
function IPhoneAppIcon({ appId, onOpen, hackerMode }) {
  const app = APPS[appId];
  const [pressed, setPressed] = useState(false);
  const handleTouchStart = e => { e.stopPropagation(); setPressed(true); };
  const handleTouchEnd   = e => {
    e.stopPropagation();
    e.preventDefault();
    setPressed(false);
    onOpen(appId);
  };
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => onOpen(appId)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
        cursor: "pointer", WebkitTapHighlightColor: "transparent",
        transform: pressed ? "scale(0.88)" : "scale(1)",
        transition: "transform 0.12s",
        padding: "4px 2px", minWidth: 0,
      }}
    >
      <div style={{
        width: 54, height: 54, borderRadius: 14,
        background: `linear-gradient(145deg, ${app.color}33, ${app.color}66)`,
        border: `1.5px solid ${app.color}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, flexShrink: 0,
        boxShadow: pressed ? `0 0 16px ${app.color}77` : `0 3px 12px rgba(0,0,0,0.5), 0 0 0 0.5px ${app.color}33`,
        backdropFilter: "blur(10px)",
      }}>
        {app.icon}
      </div>
      <span style={{
        fontSize: 9, color: "rgba(255,255,255,0.82)",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: 0.2, textAlign: "center",
        width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        lineHeight: 1.3,
      }}>{app.title}</span>
    </div>
  );
}

// iPhone-style dock (bottom 4 apps)
function IPhoneDock({ onOpen, hackerMode }) {
  const dockApps = ["about", "projects", "gallery", "contact"];
  return (
    <div style={{
      margin: "0 12px 6px",
      background: "rgba(255,255,255,0.07)",
      backdropFilter: "blur(30px)",
      borderRadius: 24,
      border: "1px solid rgba(255,255,255,0.12)",
      padding: "10px 8px",
      display: "flex", justifyContent: "space-around", alignItems: "center", gap: 4,
    }}>
      {dockApps.map(id => (
        <IPhoneAppIcon key={id} appId={id} onOpen={onOpen} hackerMode={hackerMode} />
      ))}
    </div>
  );
}

// Lock screen swipe-to-open
function IPhoneLockScreen({ onUnlock, hackerMode }) {
  const [swiping, setSwiping] = useState(false);
  const [startY, setStartY] = useState(null);
  const [dragY, setDragY] = useState(0);
  const [unlocking, setUnlocking] = useState(false);
  const [time, setTime] = useState(new Date());
  const accent = useAccent(hackerMode);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const onTouchStart = e => {
    setStartY(e.touches[0].clientY);
    setSwiping(true);
  };
  const onTouchMove = e => {
    if (!swiping || startY === null) return;
    const dy = startY - e.touches[0].clientY;
    if (dy > 0) setDragY(dy);
  };
  const onTouchEnd = () => {
    if (dragY > 80) {
      setUnlocking(true);
      setTimeout(onUnlock, 400);
    } else {
      setDragY(0);
    }
    setSwiping(false);
  };

  // Also allow click/mouse for desktop preview
  const onMouseDown = e => { setStartY(e.clientY); setSwiping(true); };
  const onMouseMove = e => {
    if (!swiping || startY === null) return;
    const dy = startY - e.clientY;
    if (dy > 0) setDragY(dy);
  };
  const onMouseUp = () => {
    if (dragY > 60) { setUnlocking(true); setTimeout(onUnlock, 400); }
    else setDragY(0);
    setSwiping(false);
  };

  const progress = Math.min(dragY / 120, 1);

  return (
    <div
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
      style={{
        position: "fixed", inset: 0, zIndex: 900,
        background: "rgba(4,4,12,0.96)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "space-between", padding: "60px 0 40px",
        transform: unlocking ? "translateY(-100%)" : `translateY(-${dragY * 0.4}px)`,
        transition: unlocking ? "transform 0.4s cubic-bezier(0.32,0.72,0,1)" : swiping ? "none" : "transform 0.3s ease",
        userSelect: "none", cursor: "ns-resize",
      }}
    >
      {/* Wallpaper blur overlay */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(0,255,247,0.06) 0%, transparent 70%)" }} />

      {/* Top: time + date */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{
          fontSize: 72, fontWeight: 200, color: "#fff",
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: -2, lineHeight: 1,
        }}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2 }}>
          {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
        </div>
        <div style={{ marginTop: 20, fontSize: 12, color: accent, fontFamily: "Orbitron, monospace", letterSpacing: 3, textShadow: `0 0 20px ${accent}` }}>
          HARSHOS v2.0
        </div>
      </div>

      {/* Notification card */}
      <div style={{
        width: "calc(100% - 48px)", position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)",
        borderRadius: 16, padding: "14px 18px",
        border: "1px solid rgba(255,255,255,0.1)",
        transform: `scale(${0.95 + progress * 0.05})`,
      }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: `${accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>⚔</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>SIH 2025 — FINALIST</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>AI-Driven GNN Malware Analyzer · Ministry of Defence Intern</div>
          </div>
        </div>
      </div>

      {/* Swipe up indicator */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, position: "relative", zIndex: 1 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `rgba(255,255,255,${0.08 + progress * 0.15})`,
          border: `1.5px solid rgba(255,255,255,${0.2 + progress * 0.4})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, color: `rgba(255,255,255,${0.4 + progress * 0.6})`,
          transform: `translateY(-${progress * 8}px)`,
          transition: swiping ? "none" : "all 0.3s",
        }}>↑</div>
        <div style={{
          fontSize: 12, color: `rgba(255,255,255,${0.35 + progress * 0.4})`,
          fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2,
        }}>
          {progress > 0.5 ? "RELEASE TO UNLOCK" : "SWIPE UP TO UNLOCK"}
        </div>
        {/* Home indicator */}
        <div style={{ width: 134, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.25)", marginTop: 8 }} />
      </div>
    </div>
  );
}

// ── Main iPhone OS component ──────────────────────────────────
function IPhoneOS() {
  const [locked, setLocked]         = useState(true);
  const [booting, setBooting]       = useState(true);
  const [activeApp, setActiveApp]   = useState(null);
  const [hackerMode, setHackerMode] = useState(false);
  const [accentColor, setAccentColor] = useState("#00fff7");
  const [visitors, setVisitors]     = useState(null);
  const [time, setTime]             = useState(new Date());
  const [page, setPage]             = useState(0);
  const [mobileSpotlight, setMobileSpotlight] = useState(false);

  useEffect(() => {
    // Re-use the same counter key — no double increment, just read
    fetch("https://hits.sh/harshkumarverma-portfolio.json")
      .then(r => r.json())
      .then(d => setVisitors(d.count ?? d.value ?? null))
      .catch(() => setVisitors(null));
  }, []);
  // touch swipe state (on the page container, NOT a blocking overlay)
  const swipeStartX = useRef(null);

  const accent = useAccent(hackerMode);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // ── ALL 10 apps spread across 3 pages ─────────────────────
  // Page 0: 8 apps (2 rows × 4 cols)
  // Page 1: remaining apps
  const page0 = ["about", "terminal", "projects", "vscode", "sih", "blockchain", "resume", "certs"];
  const page1 = ["skills", "github", "music", "chat", "gallery", "contact", "settings"];

  const allPages = [page0, page1];
  const totalPages = allPages.length;

  const openApp  = id => setActiveApp(id);
  const closeApp = ()  => setActiveApp(null);

  // Touch swipe on the home-screen container (no blocking overlay)
  const onTouchStart = e => { swipeStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (swipeStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeStartX.current;
    if (dx < -50 && page < totalPages - 1) setPage(p => p + 1);
    else if (dx > 50 && page > 0)          setPage(p => p - 1);
    swipeStartX.current = null;
  };

  if (booting) {
    return (
      <div style={{ width: "100vw", height: "100dvh", background: "#000" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;400;700&display=swap'); * { box-sizing: border-box; } @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
        <BootScreen onComplete={() => setBooting(false)} />
      </div>
    );
  }

  return (
    <AccentContext.Provider value={accentColor}>
    <div style={{
      width: "100vw", height: "100dvh",
      background: "#050510",
      display: "flex", flexDirection: "column",
      overflow: "hidden", position: "relative",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden; background: #000; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        input, textarea, select { font-size: 16px !important; }
        button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
      `}</style>

      {/* Wallpaper */}
      <img src="macos-big-sur.jpg" alt="" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100dvh", objectFit: "cover", objectPosition: "center center", zIndex: 0, opacity: hackerMode ? 0 : 0.35, transition: "opacity 0.8s", pointerEvents: "none", display: "block" }} />
      <img src="mac-dark.jpg" alt="" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100dvh", objectFit: "cover", objectPosition: "center center", zIndex: 0, opacity: hackerMode ? 0.5 : 0, transition: "opacity 0.8s", pointerEvents: "none", display: "block" }} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100vw", height: "100dvh", background: "rgba(0,0,0,0.55)", zIndex: 0, pointerEvents: "none" }} />

      {/* Status bar */}
      <div style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
        <IPhoneStatusBar hackerMode={hackerMode} time={time} visitors={visitors} />
      </div>

      {/* Home screen — touch events HERE, not on a blocking overlay */}
      <div
        style={{ flex: 1, overflow: "hidden", position: "relative", zIndex: 5 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* iOS-style search bar */}
        <div style={{ padding: "10px 16px 0", position: "relative", zIndex: 20 }}>
          <div
            onClick={() => setMobileSpotlight(true)}
            onTouchEnd={e => { e.preventDefault(); setMobileSpotlight(true); }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)",
              borderRadius: 12, padding: "8px 14px",
              border: "1px solid rgba(255,255,255,0.12)",
              cursor: "pointer", WebkitTapHighlightColor: "transparent",
            }}
          >
            <span style={{ fontSize: 14, opacity: 0.5 }}>⌕</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>Search apps, skills, projects...</span>
          </div>
        </div>

        {/* Page indicator dots */}
        <div style={{
          position: "absolute", top: 58, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 5, zIndex: 20, pointerEvents: "none",
        }}>
          {allPages.map((_, i) => (
            <div key={i} style={{
              width: page === i ? 16 : 7, height: 7, borderRadius: 4,
              background: page === i ? accent : "rgba(255,255,255,0.3)",
              transition: "all 0.3s",
            }} />
          ))}
        </div>

        {/* Sliding pages container — 100vw per page */}
        <div style={{
          display: "flex",
          width: `${totalPages * 100}vw`,
          height: "100%",
          transform: `translateX(-${page * 100}vw)`,
          transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1)",
        }}>
          {allPages.map((pageApps, pageIdx) => (
            <div key={pageIdx} style={{
              width: "100vw",
              flexShrink: 0,
              height: "100%",
              padding: "48px 4px 12px",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px 0",
              alignContent: "start",
              overflowY: "auto",
            }}>
              {pageApps.map(id => (
                <IPhoneAppIcon key={id} appId={id} onOpen={openApp} hackerMode={hackerMode} />
              ))}

              {/* Hacker mode toggle on last page */}
              {pageIdx === totalPages - 1 && (
                <div
                  onTouchEnd={e => { e.stopPropagation(); e.preventDefault(); setHackerMode(h => !h); }}
                  onClick={() => setHackerMode(h => !h)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
                >
                  <div style={{
                    width: 54, height: 54, borderRadius: 14,
                    background: hackerMode ? "#39ff1433" : "rgba(255,255,255,0.08)",
                    border: `1.5px solid ${hackerMode ? "#39ff14" : "rgba(255,255,255,0.25)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                    boxShadow: hackerMode ? "0 0 20px #39ff1444" : "0 3px 12px rgba(0,0,0,0.4)",
                    transition: "all 0.3s",
                  }}>☠️</div>
                  <span style={{ fontSize: 10, color: hackerMode ? "#39ff14" : "rgba(255,255,255,0.75)", fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>
                    {hackerMode ? "HACKER ON" : "Hacker"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Swipe hint */}
        <div style={{
          position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
          fontSize: 9, color: "rgba(255,255,255,0.22)", letterSpacing: 2, textAlign: "center",
          pointerEvents: "none",
        }}>
          {page < totalPages - 1 ? "← SWIPE FOR MORE →" : "← SWIPE BACK"}
        </div>
      </div>

      {/* Dock */}
      <div style={{ position: "relative", zIndex: 10, flexShrink: 0 }}>
        <IPhoneDock onOpen={openApp} hackerMode={hackerMode} />
        <div style={{ height: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 120, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>

      {/* Full-screen app sheet */}
      {activeApp && (
        <IPhoneAppSheet
          appId={activeApp}
          hackerMode={hackerMode}
          onClose={closeApp}
          openApp={openApp}
          setHackerMode={setHackerMode}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
        />
      )}

      {/* Mobile Spotlight */}
      {mobileSpotlight && (
        <div style={{ position: "fixed", inset: 0, zIndex: 850 }}>
          <Spotlight
            onClose={() => setMobileSpotlight(false)}
            onOpen={(id) => { setMobileSpotlight(false); openApp(id); }}
            setHackerMode={setHackerMode}
          />
        </div>
      )}

      {/* Lock screen */}
      {locked && (
        <IPhoneLockScreen onUnlock={() => setLocked(false)} hackerMode={hackerMode} />
      )}
    </div>
    </AccentContext.Provider>
  );
}

// ============================================================
// SMART EXPORT — detects screen size, renders iPhone or macOS
// ============================================================
export default function App() {
  const isMobile = useIsMobile();
  return isMobile ? <IPhoneOS /> : <HarshOS />;
}