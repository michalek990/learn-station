import { useState } from "react";

// ─── STYLE ─────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&display=swap');

:root {
  --deep-space: #020308;
  --star: #ffffff;
  --red: #ff2244;
  --cyan: #00d4ff;
  --purple: #b24bf3;
  --pink: #ff2e97;
  --green: #00ff88;
  --orange: #ff6b35;
  --blue: #4da6ff;
  --yellow: #ffd700;
  --spring: #6db33f;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #000;
  font-family: 'Rajdhani', sans-serif;
  color: var(--star);
  min-height: 100vh;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 3px,
    rgba(255,34,68,0.02) 3px, rgba(255,34,68,0.02) 4px
  );
  pointer-events: none;
}

/* ── STARFIELD ── */
.starfield {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(1px 1px at 20% 30%, white, transparent),
    radial-gradient(1px 1px at 60% 70%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(1px 1px at 80% 10%, white, transparent),
    radial-gradient(1px 1px at 90% 60%, white, transparent),
    radial-gradient(1px 1px at 33% 80%, white, transparent),
    radial-gradient(1px 1px at 15% 90%, white, transparent),
    radial-gradient(1px 1px at 70% 40%, white, transparent),
    radial-gradient(1px 1px at 45% 25%, white, transparent);
  background-size: 200% 200%;
  animation: twinkle 4s ease-in-out infinite;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}
@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50%       { opacity: 0.4; }
}

/* ── CONTAINER ── */
.container {
  position: relative;
  min-height: 100vh;
  padding: 40px 20px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

/* ── HEADER ── */
.header {
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  z-index: 10;
  animation: slideDown 0.6s ease-out;
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.status-line {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  color: var(--red);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.blink { animation: blink 1.2s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

.main-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 8px;
}
.main-title .red   { color: var(--red); }
.main-title .white { color: var(--star); }

.subtitle {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 6px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 32px;
}

.desc {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
  max-width: 600px;
  margin: 0 auto 20px;
  line-height: 1.9;
}

/* ── PILLS ── */
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 40px;
}
.pill {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  padding: 4px 12px;
  border: 1px solid;
  border-radius: 2px;
  letter-spacing: 1px;
}
.pill.r { color: var(--red);    border-color: rgba(255,34,68,0.4);   background: rgba(255,34,68,0.05); }
.pill.c { color: var(--cyan);   border-color: rgba(0,212,255,0.4);   background: rgba(0,212,255,0.05); }
.pill.g { color: var(--green);  border-color: rgba(0,255,136,0.4);   background: rgba(0,255,136,0.05); }
.pill.y { color: var(--yellow); border-color: rgba(255,215,0,0.4);   background: rgba(255,215,0,0.05); }
.pill.s { color: var(--spring); border-color: rgba(109,179,63,0.4);  background: rgba(109,179,63,0.05); }
.pill.p { color: var(--purple); border-color: rgba(178,75,243,0.4);  background: rgba(178,75,243,0.05); }
.pill.o { color: var(--orange); border-color: rgba(255,107,53,0.4);  background: rgba(255,107,53,0.05); }
.pill.b { color: var(--blue);   border-color: rgba(77,166,255,0.4);  background: rgba(77,166,255,0.05); }

/* ── SECTION HEADERS ── */
.section-header {
  width: 100%;
  max-width: 1200px;
  margin: 40px 0 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  z-index: 10;
}
.section-line {
  flex: 1;
  height: 1px;
  background: currentColor;
  opacity: 0.2;
}
.section-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 4px 14px;
  border: 1px solid currentColor;
  border-radius: 2px;
  white-space: nowrap;
  opacity: 0.7;
}

/* ── MODULES GRID ── */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  position: relative;
  z-index: 10;
}

/* ── MODULE CARD ── */
.module {
  background: rgba(10,10,10,0.8);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  border: 1px solid rgba(255,255,255,0.1);
  font-family: inherit;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
.module::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.3s;
}
.module::after {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.3s;
}
.module:hover {
  border-color: currentColor;
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 30px rgba(0,0,0,0.6), 0 0 40px currentColor;
}
.module:hover::before { opacity: 1; }
.module:hover::after  { opacity: 0.05; }

.module-icon {
  font-size: 2.5rem;
  line-height: 1;
  filter: drop-shadow(0 0 10px currentColor);
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}
.module:hover .module-icon { transform: scale(1.1) rotate(5deg); }

.module-name {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--star);
  position: relative;
  z-index: 1;
}
.module:hover .module-name { animation: glitch 0.3s ease-in-out; }
@keyframes glitch {
  0%   { transform: translate(0); }
  20%  { transform: translate(-2px,  2px); }
  40%  { transform: translate(-2px, -2px); }
  60%  { transform: translate( 2px,  2px); }
  80%  { transform: translate( 2px, -2px); }
  100% { transform: translate(0); }
}

.module-desc {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.7;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

.module-status {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 2px;
  padding: 4px 10px;
  border-radius: 2px;
  align-self: flex-start;
  border: 1px solid currentColor;
  margin-top: 4px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}
.module:hover .module-status {
  background: currentColor;
  color: #000;
  font-weight: 700;
}
.module:active { transform: translateY(-2px) scale(0.98); }

/* animation delays */
.module:nth-child(1)  { animation-delay: 0.05s; }
.module:nth-child(2)  { animation-delay: 0.10s; }
.module:nth-child(3)  { animation-delay: 0.15s; }
.module:nth-child(4)  { animation-delay: 0.20s; }
.module:nth-child(5)  { animation-delay: 0.25s; }
.module:nth-child(6)  { animation-delay: 0.30s; }
.module:nth-child(7)  { animation-delay: 0.35s; }
.module:nth-child(8)  { animation-delay: 0.40s; }
.module:nth-child(9)  { animation-delay: 0.45s; }
.module:nth-child(10) { animation-delay: 0.50s; }

/* ── IFRAME VIEWER ── */
.viewer {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: #000;
  animation: viewerIn 0.35s ease;
}
@keyframes viewerIn {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}

.viewer-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  background: rgba(5,5,15,0.97);
  border-bottom: 1px solid rgba(255,34,68,0.25);
  flex-shrink: 0;
}

.viewer-back {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--red);
  background: transparent;
  border: 1px solid rgba(255,34,68,0.4);
  border-radius: 3px;
  padding: 6px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  white-space: nowrap;
}
.viewer-back:hover {
  background: var(--red);
  color: #000;
  font-weight: 700;
}

.viewer-title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.6);
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.viewer-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 8px var(--green);
  flex-shrink: 0;
  animation: blink 2s step-end infinite;
}

.viewer-iframe {
  flex: 1;
  border: none;
  width: 100%;
  background: #000;
}

/* ── FOOTER ── */
.footer {
  margin-top: 60px;
  text-align: center;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.65rem;
  color: rgba(255,255,255,0.3);
  letter-spacing: 2px;
  animation: fadeIn 1s ease-out 0.6s both;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .modules-grid { grid-template-columns: 1fr; gap: 16px; }
  .header { margin-bottom: 40px; }
  .main-title { font-size: 2rem; }
  .subtitle { font-size: 0.65rem; letter-spacing: 3px; }
  .desc { font-size: 0.7rem; }
}
`;

// ─── MODUŁY — skopiowane 1:1 z index.html ──────────────────────────────────
const SECTIONS = [
  {
    label: "☕ Java",
    color: "var(--orange)",
    modules: [
      { file: "java_complete.html",    icon: "☕", name: "Java Kompletny",    desc: "OOP, kolekcje, generyki, wyjątki, strumienie, lambdy, Optional, wielowątkowość, I/O",                                              status: "COMPLETE GUIDE",  color: "#f89820" },
      { file: "java_senior.html",      icon: "🏆", name: "Java Senior",       desc: "JVM internals, GC, memory model, concurrency advanced, performance tuning, patterns",                                              status: "SENIOR LEVEL",    color: "#e07010" },
      { file: "senior_java_syntax.html",icon:"🪤", name: "Java Tricky Code",  desc: "Autoboxing, Integer cache, String pool, overloading vs overriding, generics erasure, concurrency pułapki, Java 17–21",           status: "INTERVIEW TRAPS", color: "#f0a500" },
    ],
  },
  {
    label: "🍃 Spring Framework",
    color: "var(--spring)",
    modules: [
      { file: "spring_podstawy.html",    icon: "🍃", name: "Spring Podstawy",     desc: "IoC Container, Dependency Injection, Beans, Configuration, Scopes, Lifecycle, Qualifiers",                                 status: "SPRING CORE", color: "#6db33f" },
      { file: "spring_data_jpa.html",    icon: "🗃️", name: "Spring Data JPA",     desc: "Encje, repozytoria, JPQL, Criteria API, relacje, lazy/eager loading, transakcje, N+1",                                     status: "PERSISTENCE", color: "#7ec852" },
      { file: "spring_zaawansowany.html",icon: "⚡", name: "Spring Zaawansowany", desc: "AOP, Transactions, Caching, Async, Events, Messaging (RabbitMQ/Kafka), Microservices",                                      status: "ENTERPRISE",  color: "#8fcc6f" },
      { file: "spring_senior.html",      icon: "🎯", name: "Spring Senior",        desc: "Custom autoconfiguration, Spring Security deep dive, reactive, performance, interview Q&A",                                status: "SENIOR LEVEL",color: "#5aa02c" },
    ],
  },
  {
    label: "🗄️ Bazy Danych",
    color: "var(--blue)",
    modules: [
      { file: "sql_podstawy.html",    icon: "🗄️", name: "SQL Podstawy",      desc: "Typy danych, klucze, SELECT, JOIN, INSERT/UPDATE/DELETE, GROUP BY, agregacje",                                                  status: "FUNDAMENTALS", color: "#4da6ff" },
      { file: "sql_zaawansowany.html",icon: "⚡", name: "SQL Zaawansowany",   desc: "Indeksy, EXPLAIN, transakcje ACID, widoki, procedury, window functions, CTE, subqueries",                                       status: "ADVANCED",     color: "#00ff88" },
      { file: "redis.html",           icon: "🔴", name: "Redis",              desc: "Struktury danych, caching, pub/sub, Lua scripts, persistence, clustering, use cases",                                           status: "IN-MEMORY DB", color: "#dc382d" },
      { file: "senior_postgres.html", icon: "🐘", name: "Senior PostgreSQL",  desc: "MVCC, indeksy, Query Planner, EXPLAIN ANALYZE, Vacuum, partycjonowanie, replikacja, performance tuning",                       status: "SENIOR LEVEL", color: "#2dd4bf" },
    ],
  },
  {
    label: "🌐 Sieci i Protokoły",
    color: "var(--yellow)",
    modules: [
      { file: "sieci_podstawy.html",       icon: "🌐", name: "Sieci Podstawy",        desc: "Model OSI, adresy IP i maski podsieci, CIDR, DNS, porty, gniazda TCP/UDP",                                            status: "NETWORKING", color: "#ffd700" },
      { file: "sieci_protokoly.html",      icon: "📡", name: "Protokoły Sieciowe",     desc: "HTTP/1.1 vs HTTP/2 vs HTTP/3, HTTPS/TLS handshake, TCP vs UDP, VPN, WebSocket",                                      status: "PROTOCOLS",  color: "#ff6b35" },
      { file: "sieci_bezpieczenstwo.html", icon: "🔐", name: "Bezpieczeństwo Sieci",   desc: "CORS, cookies, JWT & OAuth, proxy/CDN, load balancer, security headers, checklist",                                  status: "SECURITY",   color: "#b24bf3" },
    ],
  },
  {
    label: "🏛️ Architektura i Wzorce",
    color: "var(--purple)",
    modules: [
      { file: "design_patterns_architecture.html", icon: "🏗️", name: "Design Patterns",      desc: "GoF patterns, SOLID, architektura warstwowa, hexagonalna, DDD, CQRS, Event Sourcing",                         status: "ARCHITECTURE", color: "#b24bf3" },
      { file: "distributed_systems.html",          icon: "🕸️", name: "Systemy Rozproszone",   desc: "CAP theorem, consensus, replikacja, sharding, eventual consistency, saga pattern",                            status: "DISTRIBUTED",  color: "#00d4ff" },
      { file: "system_design_azure.html",          icon: "☁️", name: "System Design / Azure", desc: "Projektowanie systemów skalowalnych, Azure services, cloud patterns, case studies",                           status: "CLOUD & SCALE",color: "#00b4d8" },
    ],
  },
  {
    label: "🚀 DevOps i Infrastruktura",
    color: "#76ff7a",
    modules: [
      { file: "docker_kubernetes.html",  icon: "🐳", name: "Docker & Kubernetes",     desc: "Obrazy, kontenery, Dockerfile, Docker Compose, K8s pods, deployments, services, Helm",                               status: "CONTAINERS",     color: "#2496ed" },
      { file: "cicd_automatyzacja.html", icon: "🔄", name: "CI/CD Automatyzacja",     desc: "GitHub Actions, Docker build, deployment strategies, secrets management, monitoring",                                 status: "DEVOPS",         color: "#76ff7a" },
      { file: "git_guide.html",          icon: "🌿", name: "Git — Kompletny Poradnik", desc: "Branching, merge, rebase, cherry-pick, hooks, workflows, Git Flow, Conventional Commits",                           status: "VERSION CONTROL",color: "#f05032" },
      { file: "observability.html",      icon: "📊", name: "Observability",            desc: "Logi, metryki, tracing, OpenTelemetry, Prometheus, Grafana, alerting, SLO/SLA/SLI",                                status: "MONITORING",     color: "#f5a623" },
      { file: "apache_kafka.html",       icon: "📨", name: "Apache Kafka",             desc: "Topics, partitions, consumer groups, producers, offsets, Kafka Streams, Connect, Schema Registry",                  status: "MESSAGE BROKER", color: "#ff6b35" },
    ],
  },
  {
    label: "🛡️ Jakość i Bezpieczeństwo",
    color: "var(--red)",
    modules: [
      { file: "bezpieczenstwo_aplikacji.html", icon: "🛡️", name: "Bezpieczeństwo Aplikacji", desc: "OWASP Top 10, SQL Injection, XSS, CSRF, JWT security, hashowanie haseł bcrypt, headers", status: "CRITICAL",          color: "#ff2244" },
      { file: "testowanie.html",               icon: "🧪", name: "Testowanie",                desc: "Unit, Integration, E2E, TDD, piramida testów, coverage, mocking, dobre praktyki",         status: "QUALITY ASSURANCE", color: "#1a7f37" },
    ],
  },
  {
    label: "🧠 Algorytmy i CS Fundamentals",
    color: "var(--cyan)",
    modules: [
      { file: "struktury_danych.html",  icon: "🧱", name: "Struktury Danych",    desc: "Array, Linked List, Stack, Queue, BST, HashMap, Graph, Heap — złożoności i użycie",                                         status: "DATA STRUCTURES", color: "#00d4ff" },
      { file: "performance_bigo.html",  icon: "⚙️", name: "Performance & Big O", desc: "Złożoność obliczeniowa, zasady rozpoznawania, optymalizacja, SOLID, DRY/KISS/YAGNI",                                       status: "OPTIMIZATION",    color: "#00ff88" },
      { file: "komputer_od_srodka.html",icon: "🖥️", name: "Komputer od Środka",  desc: "CPU, pamięć, rejestry, cache, OS, procesy, wątki, syscalls, kompilacja, assembler",                                        status: "CS FUNDAMENTALS", color: "#9b59b6" },
    ],
  },
  {
    label: "⭐ Senior Engineering",
    color: "var(--yellow)",
    modules: [
      { file: "senior_engineering.html", icon: "⭐", name: "Senior Engineering", desc: "Tech leadership, code review, mentoring, estymacje, dług techniczny, ADR, komunikacja", status: "LEADERSHIP", color: "#ffd700" },
      { file: "frontend_html_css.html",  icon: "🎨", name: "Frontend HTML/CSS",  desc: "Semantyczny HTML, CSS Grid, Flexbox, animacje, dostępność, responsive design, performance", status: "FRONTEND",  color: "#e34c26" },
    ],
  },
  {
    label: "🧒 Dla Każdego — Od Absolutnego Zera",
    color: "#f97316",
    modules: [
      { file: "podstawy_programowania.html", icon: "🧩", name: "Programowanie od Zera", desc: "Bity, warstwy abstrakcji, zmienne, pętle, funkcje, klasy, OOP — wszystko wytłumaczone jak dla dziecka", status: "ABSOLUTE BASICS", color: "#f97316" },
    ],
  },
  {
    label: "🎯 Rozmowy Kwalifikacyjne",
    color: "#facc15",
    modules: [
      { file: "pytania_rekrutacyjne.html", icon: "🎯", name: "100 Pytań Rekrutacyjnych", desc: "Java Backend, Spring, SQL, Frontend — 100 pytań z pełnymi odpowiedziami, filtrowaniem i paskiem postępu", status: "INTERVIEW PREP", color: "#facc15" },
    ],
  },
];

// ─── IFRAME VIEWER ──────────────────────────────────────────────────────────
function Viewer({ module, onBack }) {
  return (
    <div className="viewer">
      <div className="viewer-bar">
        <button className="viewer-back" onClick={onBack}>
          ← POWRÓT
        </button>
        <div className="viewer-dot" />
        <span className="viewer-title">
          {module.icon} {module.name.toUpperCase()}
        </span>
      </div>
      <iframe
        className="viewer-iframe"
        src={`${import.meta.env.BASE_URL}pages/${module.file}`}
        title={module.name}
      />
    </div>
  );
}

// ─── HOME ───────────────────────────────────────────────────────────────────
function HomePage({ onOpen }) {
  const totalModules = SECTIONS.reduce((acc, s) => acc + s.modules.length, 0);

  return (
    <div className="container">
      <div className="starfield" />

      <div className="header">
        <div className="status-line">
          <span className="blink">█</span>
          SYSTEM READY — {totalModules} MODULES LOADED
        </div>
        <h1 className="main-title">
          <span className="red">PROGRAMOWANIE</span>
          <br />
          <span className="white">INTERAKTYWNY PRZEWODNIK</span>
        </h1>
        <div className="subtitle">// COMPREHENSIVE LEARNING HUB</div>
        <p className="desc">
          Kompletny zbiór wiedzy programistycznej — od podstaw po architekturę enterprise.
          <br />
          Kliknij moduł aby rozpocząć naukę.
        </p>
        <div className="pills">
          {[
            ["SQL","r"],["NETWORKING","c"],["DATA STRUCTURES","g"],["PERFORMANCE","y"],
            ["SECURITY","r"],["TESTING","g"],["SPRING","s"],["JAVA","o"],
            ["DESIGN PATTERNS","p"],["DEVOPS","b"],["DISTRIBUTED","c"],["DOCKER/K8S","b"],
            ["POSTGRESQL","c"],["JAVA TRAPS","o"],["OD ZERA","g"],["100 PYTAŃ","r"],
          ].map(([label, cls]) => (
            <span key={label} className={`pill ${cls}`}>{label}</span>
          ))}
        </div>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.label} style={{ width: "100%", maxWidth: 1200 }}>
          <div className="section-header" style={{ color: section.color }}>
            <div className="section-line" />
            <div className="section-label">{section.label}</div>
            <div className="section-line" />
          </div>

          <div className="modules-grid">
            {section.modules.map((mod) => (
              <button
                key={mod.file}
                className="module"
                style={{ color: mod.color }}
                onClick={() => onOpen(mod)}
              >
                <div className="module-icon">{mod.icon}</div>
                <div className="module-name">{mod.name}</div>
                <div className="module-desc">{mod.desc}</div>
                <div className="module-status">{mod.status}</div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="footer">
        WYBIERZ MODUŁ ABY ROZPOCZĄĆ — {totalModules} MODUŁÓW DOSTĘPNYCH
      </div>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(null);

  return (
    <>
      <style>{STYLES}</style>
      {active
        ? <Viewer module={active} onBack={() => setActive(null)} />
        : <HomePage onOpen={setActive} />
      }
    </>
  );
}