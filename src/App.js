import { useEffect, useRef, useState } from "react";
import "./App.css";
// 1. Import the FontAwesome Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 2. Import specific icons (Solid vs Brands)
import {
  faTerminal,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const DOMAIN_INFO = [
  "domain: praveenjadhav.in",
  "owner: Praveen Jadhav",
  "location: india",
  "visibility: public",
  "type: personal developer domain",
  "primary use: projects & portfolio",
  "stack: react | node | mongodb | firebase",
  "contact: praveenjadhav1510@gmail.com",
  "note: main portfolio building in progress",
];

// ... existing imports ...

export default function App() {
  // ... existing state and effects ...
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const outRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      addLine(DOMAIN_INFO[i]);
      i++;
      if (i >= DOMAIN_INFO.length) clearInterval(t);
    }, 260);
    return () => clearInterval(t);
  }, []);

  function addLine(text) {
    setLines((l) => [...l, { id: Date.now() + Math.random(), text }]);
  }

  function run(cmdRaw) {
    const cmd = cmdRaw.toLowerCase().trim();
    addLine("> " + cmdRaw);

    switch (cmd) {
      case "help":
        addLine(
          "whois owner stack projects links open github open portfolio clear",
        );
        break;
      case "whois":
        DOMAIN_INFO.forEach(addLine);
        break;
      case "owner":
        addLine("Praveen Jadhav — Developer");
        break;
      case "stack":
        addLine("react • node • mongodb • firebase • ai");
        break;
      case "projects":
        addLine("Mood Music App");
        addLine("SaveLinks Manager");
        addLine("TalentSleuth AI");
        break;
      case "links":
        addLine("use top-right links or commands");
        break;
      case "open github":
        window.open("https://github.com/praveenjadhav1510", "_blank");
        addLine("opening github...");
        break;
      case "open portfolio":
        window.open("https://portfolio-2-three-sooty-54.vercel.app/", "_blank");
        addLine("opening portfolio...");
        break;
      case "clear":
        setLines([]);
        break;
      default:
        addLine("unknown command — type help");
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && input.trim()) {
      run(input);
      setInput("");
    }
  }

  useEffect(() => {
    outRef.current?.scrollTo(0, outRef.current.scrollHeight);
  }, [lines]);

  return (
    <main className="console">
      {/* Hidden H1 for SEO */}
      <h1 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
        Praveen Jadhav - Developer Terminal Portfolio
      </h1>

      <div className="quickLinks">
        <a
          href="https://github.com/praveenjadhav1510"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub Profile"
        >
          {/* GitHub Icon (Brand) */}
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </a>
        <a
          href="https://portfolio-2-three-sooty-54.vercel.app/"
          target="_blank"
          rel="noreferrer"
          aria-label="Portfolio Website"
        >
          {/* External Link Icon (Solid) */}
          <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" /> Portfolio
        </a>
      </div>

      <div className="output" ref={outRef}>
        <div className="title">
          {/* Terminal Icon (Solid) */}
          <FontAwesomeIcon icon={faTerminal} style={{ marginRight: "10px" }} />
          praveenjadhav.in — domain information
        </div>
        <div className="title">-----------------------------------------</div>

        {lines.map((l) => {
          const colonIndex = l.text.indexOf(":");
          const isCommand = l.text.startsWith(">");

          return (
            <div key={l.id} className="line">
              {l.text.split("").map((char, i) => {
                const isKey = colonIndex !== -1 && i <= colonIndex;
                const charColor = isKey || isCommand ? "white" : undefined;

                return (
                  <span
                    key={i}
                    className="char"
                    style={{
                      animationDelay: `${i * 30}ms`,
                      color: charColor,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="inputBar">
        <span>&gt;</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="type help"
          autoFocus
          aria-label="Terminal Input"
        />
      </div>
    </main>
  );
}
