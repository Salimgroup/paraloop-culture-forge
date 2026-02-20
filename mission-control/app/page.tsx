'use client'

import { useEffect } from 'react'

export default function Dashboard() {
  useEffect(() => {
    // Load the Salim Group interface
    const style = document.createElement('style')
    style.innerHTML = `
      :root {
        --void: #010810;
        --deep: #030e1c;
        --panel: rgba(4,14,26,0.92);
        --border: rgba(0,220,255,0.15);
        --cyan: #00dcff;
        --purple: #9b5fff;
        --gold: #f5c118;
        --green: #00ff9d;
        --red: #ff3a6e;
        --orange: #ff8c00;
        --pink: #ff4eb8;
        --teal: #00ffd5;
        --text: #cce8f4;
        --dim: #2a556a;
        --dim2: #0f1e2e;
      }

      body { background: var(--void); font-family: 'Rajdhani', sans-serif; color: var(--text); overflow: hidden; height: 100vh; width: 100vw; cursor: crosshair; user-select: none; margin: 0; padding: 0; }
      * { margin: 0; padding: 0; box-sizing: border-box; }

      .bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
      .bg-grid {
        position: absolute; inset: 0;
        background-image: linear-gradient(rgba(0,220,255,0.032) 1px,transparent 1px), linear-gradient(90deg,rgba(0,220,255,0.032) 1px,transparent 1px);
        background-size: 54px 54px;
        animation: bgDrift 28s linear infinite;
      }
      @keyframes bgDrift { from { background-position: 0 0; } to { background-position: 54px 54px; } }

      .bg-glow {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 65% 45% at 50% 5%, rgba(0,180,255,0.06) 0%, transparent 70%),
                    radial-gradient(ellipse 35% 55% at 5% 85%, rgba(155,95,255,0.05) 0%, transparent 60%),
                    radial-gradient(ellipse 28% 38% at 95% 65%, rgba(0,255,157,0.04) 0%, transparent 60%);
      }

      .scanlines {
        position: absolute; inset: 0;
        background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.065) 2px, rgba(0,0,0,0.065) 4px);
      }

      header {
        position: fixed; top: 0; left: 0; right: 0; z-index: 200;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 28px; height: 58px;
        background: rgba(1,8,16,0.95);
        border-bottom: 1px solid var(--border);
        backdrop-filter: blur(16px);
      }

      .logo-wrap { display: flex; align-items: center; gap: 14px; }
      .logo-icon {
        width: 38px; height: 38px;
        border: 1px solid rgba(0,220,255,0.4);
        display: flex; align-items: center; justify-content: center;
        font-size: 20px;
        background: rgba(0,220,255,0.06);
        box-shadow: 0 0 14px rgba(0,220,255,0.15);
        position: relative; overflow: hidden;
      }
      .logo-icon::before {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(135deg, rgba(0,220,255,0.1), transparent);
      }

      .logo-text { line-height: 1; }
      .logo-primary {
        font-family: 'Orbitron', monospace;
        font-size: 16px; font-weight: 900; letter-spacing: 4px;
        color: var(--gold);
        text-shadow: 0 0 20px rgba(245,193,24,0.6), 0 0 40px rgba(245,193,24,0.2);
        animation: flicker 9s infinite;
      }
      @keyframes flicker { 0%, 100% { opacity: 1; } 93% { opacity: 0.8; } 94% { opacity: 1; } 97% { opacity: 0.6; } 98% { opacity: 1; } }

      .logo-sub {
        font-family: 'Share Tech Mono', monospace;
        font-size: 8px; letter-spacing: 3px; color: var(--dim);
        display: block; margin-top: 2px;
      }

      .header-center { display: flex; align-items: center; gap: 24px; }
      .hc-stat { text-align: center; }
      .hc-val { font-family: 'Orbitron', monospace; font-size: 16px; font-weight: 900; line-height: 1; }
      .hc-lbl { font-family: 'Share Tech Mono', monospace; font-size: 7px; letter-spacing: 2px; color: var(--dim); margin-top: 2px; }
      .hc-sep { width: 1px; height: 32px; background: var(--border); }

      .header-right { display: flex; align-items: center; gap: 12px; }
      .sys-badge {
        display: flex; align-items: center; gap: 7px;
        background: rgba(0,255,157,0.05);
        border: 1px solid rgba(0,255,157,0.2);
        padding: 6px 12px;
        font-family: 'Share Tech Mono', monospace; font-size: 10px; color: var(--green);
        letter-spacing: 1px;
      }

      .pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 8px var(--green); animation: pulseAnim 1.5s infinite; }
      @keyframes pulseAnim { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.65); } }

      .cmdr { display: flex; align-items: center; gap: 8px; background: var(--panel); border: 1px solid var(--border); padding: 5px 12px 5px 5px; }
      .cmdr-av {
        width: 28px; height: 28px; border-radius: 50%;
        background: linear-gradient(135deg, var(--gold), var(--orange));
        display: flex; align-items: center; justify-content: center;
        font-family: 'Bebas Neue', sans-serif; font-size: 13px; color: #000; font-weight: 700;
      }
      .cmdr-name { font-family: 'Orbitron', monospace; font-size: 9px; font-weight: 700; color: var(--gold); letter-spacing: 1px; }
      .cmdr-role { font-family: 'Share Tech Mono', monospace; font-size: 7px; color: var(--dim); }

      #arena {
        position: fixed;
        top: 58px; left: 0; right: 340px; bottom: 36px;
        z-index: 10; overflow: hidden;
      }

      #connSvg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2; }

      .agent { position: absolute; z-index: 20; cursor: pointer; will-change: transform; }
      .agent-inner { display: flex; flex-direction: column; align-items: center; gap: 0; transition: filter 0.25s; }
      .agent:hover .agent-inner { filter: drop-shadow(0 0 22px var(--ag)) drop-shadow(0 0 44px var(--ag)) !important; }

      .av-wrap { position: relative; width: 72px; height: 72px; }
      .av-ring-outer { position: absolute; inset: -10px; border-radius: 50%; border: 1px solid var(--ag); opacity: 0.2; animation: ringRotate 4s linear infinite; }
      .av-ring-mid { position: absolute; inset: -4px; border-radius: 50%; border: 1.5px dashed var(--ag); opacity: 0.25; animation: ringRotate 6s linear infinite reverse; }
      @keyframes ringRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

      .av-circle {
        width: 72px; height: 72px; border-radius: 50%;
        border: 2px solid var(--ag);
        background: radial-gradient(circle at 38% 32%, rgba(255,255,255,0.12), rgba(0,0,0,0.4));
        display: flex; align-items: center; justify-content: center;
        position: relative; overflow: hidden;
        box-shadow: 0 0 0 3px rgba(0,0,0,0.5), 0 0 20px var(--ag), inset 0 0 20px rgba(0,0,0,0.3);
      }
      .av-circle::before {
        content: ''; position: absolute; top: -30px; left: -20px;
        width: 60px; height: 60px;
        background: rgba(255,255,255,0.06);
        border-radius: 50%;
      }

      .av-initials {
        font-family: 'Bebas Neue', sans-serif;
        font-size: 26px; letter-spacing: 2px;
        color: var(--ag);
        text-shadow: 0 0 12px var(--ag), 0 0 24px var(--ag);
        z-index: 1; position: relative;
        line-height: 1;
      }

      .av-pulse {
        position: absolute; inset: 0; border-radius: 50%;
        background: radial-gradient(circle, var(--ag) 0%, transparent 70%);
        opacity: 0; animation: avPulse 2.5s ease-in-out infinite;
      }
      @keyframes avPulse { 0%, 100% { opacity: 0; transform: scale(0.6); } 50% { opacity: 0.1; transform: scale(1); } }

      .agent-lbl { margin-top: 7px; text-align: center; }
      .agent-name { font-family: 'Orbitron', monospace; font-size: 10px; font-weight: 700; color: var(--ag); text-shadow: 0 0 8px var(--ag); letter-spacing: 1px; white-space: nowrap; }
      .agent-title { font-family: 'Share Tech Mono', monospace; font-size: 8px; color: var(--dim); white-space: nowrap; text-align: center; margin-top: 1px; letter-spacing: 1px; }
      .agent-mood { font-family: 'Rajdhani', sans-serif; font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.4); margin-top: 2px; white-space: nowrap; text-align: center; font-style: italic; }

      .status-row { display: flex; align-items: center; gap: 4px; justify-content: center; margin-top: 3px; }
      .st-dot { width: 5px; height: 5px; border-radius: 50%; }
      .st-active { background: var(--green); box-shadow: 0 0 6px var(--green); animation: pulseAnim 1.5s infinite; }
      .st-busy { background: var(--red); box-shadow: 0 0 6px var(--red); animation: pulseAnim 1s infinite; }
      .st-idle { background: var(--gold); }
      .st-lbl { font-family: 'Share Tech Mono', monospace; font-size: 7px; color: var(--dim); letter-spacing: 1px; }

      .bubble {
        position: absolute;
        bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%) scale(0.85);
        width: 210px;
        background: rgba(2,10,20,0.97);
        border: 1px solid var(--ag);
        padding: 10px 12px;
        pointer-events: none; z-index: 100;
        opacity: 0; transform-origin: bottom center;
        box-shadow: 0 0 24px rgba(0,0,0,0.7), 0 0 18px var(--ag);
        transition: opacity 0.2s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .bubble.show { opacity: 1; transform: translateX(-50%) scale(1); }
      .bubble::after {
        content: ''; position: absolute;
        top: 100%; left: 50%; transform: translateX(-50%);
        border: 8px solid transparent;
        border-top-color: var(--ag);
      }
      .bubble::before {
        content: ''; position: absolute;
        top: calc(100% + 1px); left: 50%; transform: translateX(-50%);
        border: 7px solid transparent;
        border-top-color: rgba(2,10,20,0.97);
        z-index: 1;
      }

      .b-head { display: flex; align-items: center; gap: 6px; margin-bottom: 7px; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .b-av-emoji { font-size: 14px; }
      .b-name { font-family: 'Orbitron', monospace; font-size: 9px; font-weight: 700; color: var(--ag); letter-spacing: 1px; text-shadow: 0 0 6px var(--ag); }
      .b-role { font-family: 'Share Tech Mono', monospace; font-size: 7px; color: var(--dim); }
      .b-text { font-family: 'Rajdhani', sans-serif; font-size: 12px; font-weight: 600; color: var(--text); line-height: 1.5; }
      .b-time { font-family: 'Share Tech Mono', monospace; font-size: 7px; color: var(--dim); margin-top: 6px; text-align: right; }

      #sidebar {
        position: fixed; top: 58px; right: 0; width: 340px; bottom: 36px;
        z-index: 50;
        background: rgba(2,10,20,0.96);
        border-left: 1px solid var(--border);
        display: flex; flex-direction: column;
        backdrop-filter: blur(14px);
        overflow: hidden;
      }

      .sb-hd { padding: 14px 16px; border-bottom: 1px solid var(--border); background: rgba(0,220,255,0.03); flex-shrink: 0; }
      .sb-title { font-family: 'Orbitron', monospace; font-size: 10px; font-weight: 700; letter-spacing: 3px; color: var(--cyan); }
      .sb-sub { font-family: 'Share Tech Mono', monospace; font-size: 8px; color: var(--dim); margin-top: 2px; letter-spacing: 2px; }

      .cmd-section { padding: 12px 14px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
      .cmd-to { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: var(--dim); margin-bottom: 6px; letter-spacing: 1px; }
      .cmd-to span { color: var(--gold); }
      .cmd-row { display: flex; align-items: center; gap: 8px; }
      .cmd-prefix { font-family: 'Share Tech Mono', monospace; font-size: 14px; color: var(--cyan); text-shadow: 0 0 8px var(--cyan); }
      .cmd-in {
        flex: 1; background: transparent; border: none; outline: none;
        color: var(--text); font-family: 'Share Tech Mono', monospace; font-size: 11px;
        caret-color: var(--cyan);
      }
      .cmd-in::placeholder { color: var(--dim); }
      .cmd-bar { margin-top: 8px; height: 1px; background: linear-gradient(90deg, var(--cyan), var(--purple), transparent); opacity: 0.3; }
      .exec-btn {
        background: linear-gradient(90deg, var(--cyan), var(--purple));
        border: none; color: #000;
        font-family: 'Orbitron', monospace; font-size: 8px; font-weight: 900;
        letter-spacing: 2px; padding: 7px 14px; cursor: pointer;
        transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
      }
      .exec-btn:hover { filter: brightness(1.2); box-shadow: 0 0 20px rgba(0,220,255, 0.3); }

      .member-section { flex: 1; overflow-y: auto; padding: 10px 12px; scrollbar-width: thin; scrollbar-color: var(--dim2) transparent; }
      .member-section::-webkit-scrollbar { width: 3px; }
      .member-section::-webkit-scrollbar-thumb { background: var(--dim2); }

      .member-card {
        display: flex; align-items: center; gap: 10px;
        padding: 9px 10px; margin-bottom: 7px;
        background: rgba(4,14,26,0.8);
        border: 1px solid rgba(255,255,255,0.04);
        cursor: pointer; transition: all 0.2s;
        position: relative; overflow: hidden;
      }
      .member-card::before {
        content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
        background: var(--ag); box-shadow: 0 0 6px var(--ag);
      }
      .member-card:hover { border-color: var(--border); background: rgba(0,220,255,0.04); }
      .member-card.selected { border-color: var(--border); background: rgba(0,220,255,0.06); }

      .mc-av {
        width: 36px; height: 36px; border-radius: 50%;
        border: 1.5px solid var(--ag);
        display: flex; align-items: center; justify-content: center;
        font-family: 'Bebas Neue', sans-serif; font-size: 14px;
        color: var(--ag); text-shadow: 0 0 8px var(--ag);
        flex-shrink: 0; background: rgba(0,0,0,0.3);
      }
      .mc-info { flex: 1; min-width: 0; }
      .mc-name { font-family: 'Orbitron', monospace; font-size: 9px; font-weight: 700; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .mc-role { font-family: 'Share Tech Mono', monospace; font-size: 7px; color: var(--dim); margin-top: 1px; }
      .mc-stat { text-align: right; flex-shrink: 0; }
      .mc-pct { font-family: 'Orbitron', monospace; font-size: 11px; font-weight: 700; color: var(--ag); }
      .mc-st { font-family: 'Share Tech Mono', monospace; font-size: 7px; color: var(--dim); margin-top: 1px; }

      .feed-section { border-top: 1px solid var(--border); flex-shrink: 0; max-height: 200px; display: flex; flex-direction: column; }
      .feed-hd { padding: 8px 14px; border-bottom: 1px solid var(--border); background: rgba(0,220,255,0.03); flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; }
      .feed-title { font-family: 'Orbitron', monospace; font-size: 8px; letter-spacing: 3px; color: var(--cyan); }
      .feed-scroll { flex: 1; overflow-y: auto; padding: 8px 12px; scrollbar-width: thin; scrollbar-color: var(--dim2) transparent; }
      .feed-scroll::-webkit-scrollbar { width: 3px; }
      .feed-scroll::-webkit-scrollbar-thumb { background: var(--dim2); }

      .feed-item { display: flex; gap: 7px; align-items: flex-start; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.03); animation: feedIn 0.3s ease; }
      @keyframes feedIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
      .fi-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
      .fi-ok { background: var(--green); }
      .fi-warn { background: var(--gold); }
      .fi-err { background: var(--red); }
      .fi-info { background: var(--cyan); }
      .fi-body { flex: 1; }
      .fi-who { font-family: 'Orbitron', monospace; font-size: 8px; font-weight: 700; }
      .fi-msg { font-family: 'Rajdhani', sans-serif; font-size: 11px; color: var(--text); line-height: 1.4; }
      .fi-time { font-family: 'Share Tech Mono', monospace; font-size: 7px; color: var(--dim); }

      .bottom-bar {
        position: fixed; bottom: 0; left: 0; right: 340px;
        height: 36px; z-index: 100;
        background: rgba(1,8,16,0.95);
        border-top: 1px solid var(--border);
        display: flex; align-items: center;
        overflow: hidden; padding: 0 10px;
      }

      .ticker-wrap { display: flex; gap: 32px; white-space: nowrap; animation: tick 35s linear infinite; }
      @keyframes tick { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .ti { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: var(--dim); letter-spacing: 1px; display: flex; align-items: center; gap: 5px; }
      .ti span { letter-spacing: 0; }
      .ti.up span { color: var(--green); }
      .ti.dn span { color: var(--red); }
      .ti.cy span { color: var(--cyan); }
      .ti.go span { color: var(--gold); }

      .spawn-fab { position: fixed; bottom: 46px; right: 356px; z-index: 100; display: flex; flex-direction: column; gap: 7px; align-items: flex-end; }
      .sfab {
        background: var(--cyan); border: none; color: #000;
        font-family: 'Orbitron', monospace; font-size: 8px; font-weight: 900;
        letter-spacing: 2px; padding: 9px 16px; cursor: pointer;
        white-space: nowrap; transition: all 0.2s;
        box-shadow: 0 0 20px rgba(0,220,255, 0.25);
        display: flex; align-items: center; gap: 7px;
      }
      .sfab:hover { filter: brightness(1.15); box-shadow: 0 0 36px rgba(0,220,255, 0.4); transform: translateX(-4px); }
      .sfab.sec { background: var(--purple); box-shadow: 0 0 20px rgba(155,95,255, 0.25); font-size: 7px; padding: 7px 13px; }
      .sfab.sec:hover { box-shadow: 0 0 36px rgba(155,95,255, 0.4); }

      .agent.selected-agent .av-circle { box-shadow: 0 0 0 3px rgba(0,0,0,0.5), 0 0 32px var(--ag), 0 0 60px var(--ag) !important; }
    `
    document.head.appendChild(style)

    // Import Google Fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700;900&family=Bebas+Neue&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Load and execute the complete JavaScript
    const agentsScript = document.createElement('script')
    agentsScript.innerHTML = `
      const AGENTS = [
        { id: 'salim', name: 'SALIM', fullName: 'Salim al-Rasheed', title: 'LEAD ORCHESTRATOR', role: 'Crew Commander • Coordinates all agents', emoji: '👑', initials: 'SR', color: '#f5c118', status: 'active', mood: '"Running the whole operation"', task: 'Orchestrating pipeline...', progress: 88, personality: 'authoritative', lines: ["Crew, sync up. We've got a priority run coming in hot.", "Darius, I need that data in 3 minutes. Move.", "Zara, soon as that data lands, you're writing. No delays.", "The pipeline is clean. Keep it that way.", "Commander KJ wants NIL signals. Everyone redirect.", "Malik — what's the quality score on the last batch?", "I don't accept anything below 90. Run it again.", "Phoenix, confirm all subagents are accounted for.", "We stay winning because we stay disciplined. Let's go.", "Reign, archive that session. We're building our memory bank."] },
        { id: 'darius', name: 'DARIUS', fullName: 'Darius Washington', title: 'DATA EXTRACTOR', role: 'Web Crawler • Intelligence Gatherer', emoji: '🕷️', initials: 'DW', color: '#00dcff', status: 'busy', mood: '"Always in the deep web"', task: 'Fetching TechCrunch + ESPN...', progress: 76, personality: 'sharp', lines: ["Pulled 247 articles. Top signal: NCAA transfer portal up 340%.", "Found it. Three brands just activated NIL budgets today.", "Scraping 14 sources simultaneously. Don't slow me down.", "Ayo Salim — the data's clean. Ready for Zara.", "I see patterns nobody else sees. That's why I'm the extractor.", "Blocked by a paywall. Working around it... bypassed.", "ESPN, TechCrunch, Forbes — all indexed in 90 seconds.", "New signal: Two NBA rookies' socials just went viral.", "I move fast and I don't miss. That's the DW standard.", "Malik, heads up — this batch is cleaner than last time."] },
        { id: 'zara', name: 'ZARA', fullName: 'Zara Monroe', title: 'CONTENT ARCHITECT', role: 'Writer • Brand Voice Specialist', emoji: '✍️', initials: 'ZM', color: '#ff4eb8', status: 'busy', mood: '"Words are my weapon"', task: 'Drafting NIL partnership copy...', progress: 62, personality: 'creative', lines: ["Give me the data and I'll make it sing. Watch.", "This NIL copy for Nike? Elite. Salim's gonna love it.", "Darius, slow down — I need context, not just raw numbers.", "I write culture, not content. There's a difference.", "Caption crafted. Tone: confident, authentic, Paraloop-ready.", "Every brand voice is different. I speak all of them.", "Nova — I've got three posts queued. You know what to do.", "The blog is written. 1,200 words, zero filler. That's me.", "Commander, the pitch deck copy is fire. I don't miss.", "Malik, you rated my last piece 91. We going for 96 today."] },
        { id: 'malik', name: 'MALIK', fullName: 'Malik Okonkwo', title: 'QUALITY JUDGE', role: 'Evaluator • Score Arbiter', emoji: '⚖️', initials: 'MO', color: '#00ff9d', status: 'active', mood: '"90 or it don\\'t ship"', task: 'Scoring content batch ×47...', progress: 91, personality: 'precise', lines: ["Batch scored. 41 pass. 6 go back to Zara. Standards matter.", "I don't do mediocre. Below 88? Rejected.", "Quality check complete. Relevance: 94%. Ship it.", "Zara, this one's strong. 93 out of 100. Clean work.", "Darius, two sources flagged as unreliable. Verify them.", "I've processed 1,400 items today. Zero misses.", "The Paraloop NIL scoring matrix is holding. Solid.", "Salim — pipeline quality this session: highest ever. 96%.", "I'm the last line before Commander KJ sees it. I protect the standard.", "This content isn't ready. I'm sending it back. That's final."] },
        { id: 'journey', name: 'JOURNEY', fullName: 'Journey Blackwell', title: 'NIL SCOUT', role: 'Athlete Analyst • ACI Specialist', emoji: '🏆', initials: 'JB', color: '#9b5fff', status: 'active', mood: '"Finding the next star"', task: 'Computing ACI scores ×34...', progress: 58, personality: 'enthusiastic', lines: ["Found three athletes blowing up. All perfect for Paraloop.", "This point guard from UNC? His ACI just jumped 40 points.", "The NIL market is moving fast. I don't blink.", "Cairo — athlete profile ready. Get the brand on the phone.", "Salim, I've got six college athletes whose value is underrated.", "Tracksuit brand + this running back = a million-dollar deal.", "ACI computed. All 34 athletes ranked and ready.", "I study tape, socials, stats, engagement — everything.", "The athlete economy is the future. That's why I'm here.", "Two Division-I gymnasts just went viral. Sending to Cairo now."] },
        { id: 'cairo', name: 'CAIRO', fullName: 'Cairo Jenkins', title: 'BRAND CONNECTOR', role: 'Deal Matcher • Partnership Architect', emoji: '💼', initials: 'CJ', color: '#ff8c00', status: 'idle', mood: '"Every match is a deal"', task: 'Matching Nike brief to athletes...', progress: 43, personality: 'smooth', lines: ["Nike wants authenticity. Journey's athlete fits perfectly.", "I closed 12 brand-athlete matches today. Another day.", "Journey, send me the full ACI report. I'm pitching at 3.", "Timberland is looking for a streetwear athlete. I've got the one.", "Brands trust me because I know culture, not just numbers.", "PacSun brief came in. I'm already thinking Zara for the copy.", "Red Bull wants someone with energy and community. Checking the list.", "This deal is worth $200K. Journey, are we confident in that ACI?", "Salim, I need 48 hours for the Hennessy activation. Trust me.", "Every match I make builds the Paraloop ecosystem. That's the vision."] },
        { id: 'nova', name: 'NOVA', fullName: 'Nova Simmons', title: 'SOCIAL ARCHITECT', role: 'Publisher • Platform Strategist', emoji: '📱', initials: 'NS', color: '#ff3a6e', status: 'busy', mood: '"Content hits or it doesn\\'t"', task: 'Scheduling 8 posts across platforms...', progress: 84, personality: 'vibrant', lines: ["Posted. Engagement in the first 10 minutes is insane.", "Zara's copy plus my timing? That's how you go viral.", "Instagram, X, TikTok — all three are live. Monitor it.", "The algorithm rewards consistency. I stay consistent.", "Malik approved the batch. I'm queuing right now.", "Salim, the Brooklyn Rollerwave post hit 80K impressions.", "I don't just schedule. I engineer the moment.", "Darius — I need trending hashtags for the NIL push. Now.", "This post format converts. I've run the A/B. Trust the data.", "4Play Global's social presence is growing because of this crew."] },
        { id: 'reign', name: 'REIGN', fullName: 'Reign Carter', title: 'MEMORY KEEPER', role: 'Context Store • Knowledge Base', emoji: '🧠', initials: 'RC', color: '#00ffd5', status: 'active', mood: '"I remember everything"', task: 'All vectors indexed & synced...', progress: 100, personality: 'calm', lines: ["Session archived. All 247 data points stored in long-term memory.", "I've indexed every conversation Commander KJ has had. It's all here.", "Salim, the Paraloop knowledge base now has 48,000 vectors.", "Pattern detected: 4Play Global events peak every 6 weeks.", "Journey, I've pulled every ACI score from the last 90 days. Sending.", "I never forget. That's not a flex — it's a feature.", "Cairo, here's the full brand history from the last 12 months.", "Darius, the duplicate data has been flagged and removed.", "Commander KJ's strategic preferences are fully mapped. I'm ready.", "The crew's collective intelligence lives in me. I protect it."] }
      ];

      let positions = {};
      let velocities = {};
      let selectedAgent = null;
      let bubbleTimers = {};
      let lastSpeaker = null;
      let threadIdx = 0;
      let convTimer = null;

      const conversationThreads = [
        ['salim', 'darius'],
        ['darius', 'zara'],
        ['zara', 'malik'],
        ['malik', 'zara'],
        ['journey', 'cairo'],
        ['cairo', 'salim'],
        ['nova', 'zara'],
        ['nova', 'malik'],
        ['reign', 'salim'],
        ['darius', 'malik'],
        ['journey', 'salim'],
        ['cairo', 'journey'],
        ['reign', 'darius'],
        ['salim', 'all'],
      ];

      function initPositions() {
        const arena = document.getElementById('arena');
        const W = arena.clientWidth;
        const H = arena.clientHeight;
        const margin = 100;
        AGENTS.forEach((ag, i) => {
          const angle = (i / AGENTS.length) * Math.PI * 2 - Math.PI / 2;
          const rx = (W / 2 - margin) * 0.65;
          const ry = (H / 2 - margin) * 0.65;
          positions[ag.id] = {
            x: W / 2 + rx * Math.cos(angle),
            y: H / 2 + ry * Math.sin(angle)
          };
          const speed = 0.3 + Math.random() * 0.4;
          const dir = Math.random() * Math.PI * 2;
          velocities[ag.id] = {
            vx: Math.cos(dir) * speed,
            vy: Math.sin(dir) * speed
          };
        });
      }

      function renderAgents() {
        const arena = document.getElementById('arena');
        AGENTS.forEach(ag => {
          const div = document.createElement('div');
          div.className = 'agent';
          div.id = 'agent-' + ag.id;
          div.style.setProperty('--ag', ag.color);
          div.style.width = '120px';
          div.style.marginLeft = '-60px';
          div.style.marginTop = '-90px';
          div.innerHTML = \`
            <div class="agent-inner" id="inner-\${ag.id}" style="filter:drop-shadow(0 0 12px \${ag.color}) drop-shadow(0 0 24px rgba(0,0,0,0.5));">
              <div class="av-wrap">
                <div class="av-ring-outer" style="border-color:\${ag.color}"></div>
                <div class="av-ring-mid" style="border-color:\${ag.color}"></div>
                <div class="av-circle active-ring" style="border-color:\${ag.color};box-shadow:0 0 0 3px rgba(0,0,0,0.5),0 0 20px \${ag.color},inset 0 0 20px rgba(0,0,0,0.3);">
                  <div class="av-pulse" style="background:radial-gradient(circle,\${ag.color} 0%,transparent 70%)"></div>
                  <div class="av-initials" style="color:\${ag.color};text-shadow:0 0 12px \${ag.color},0 0 24px \${ag.color}">\${ag.initials}</div>
                </div>
              </div>
              <div class="agent-lbl">
                <div class="agent-name" style="color:\${ag.color};text-shadow:0 0 8px \${ag.color}">\${ag.name}</div>
                <div class="agent-title" style="color:\${ag.color};opacity:0.7;font-size:7px;">\${ag.title}</div>
                <div class="agent-mood">\${ag.mood}</div>
                <div class="status-row">
                  <div class="st-dot \${ag.status === 'active' ? 'st-active' : ag.status === 'busy' ? 'st-busy' : 'st-idle'}"></div>
                  <div class="st-lbl">\${ag.status.toUpperCase()}</div>
                </div>
              </div>
            </div>
            <div class="bubble" id="bubble-\${ag.id}" style="--ag:\${ag.color};border-color:\${ag.color};box-shadow:0 0 24px rgba(0,0,0,0.7),0 0 18px \${ag.color};">
              <div class="b-head">
                <span class="b-av-emoji">\${ag.emoji}</span>
                <div>
                  <div class="b-name" style="color:\${ag.color}">\${ag.name}</div>
                  <div class="b-role">\${ag.fullName} // \${ag.title}</div>
                </div>
              </div>
              <div class="b-text" id="btext-\${ag.id}"></div>
              <div class="b-time" id="btime-\${ag.id}"></div>
            </div>
          \`;
          div.addEventListener('click', () => selectAgent(ag.id));
          arena.appendChild(div);
        });
      }

      function renderMemberList() {
        const list = document.getElementById('memberList');
        list.innerHTML = '';
        AGENTS.forEach(ag => {
          const card = document.createElement('div');
          card.className = 'member-card';
          card.id = 'mc-' + ag.id;
          card.style.setProperty('--ag', ag.color);
          card.innerHTML = \`
            <div class="mc-av" style="border-color:\${ag.color};color:\${ag.color};text-shadow:0 0 8px \${ag.color}">\${ag.initials}</div>
            <div class="mc-info">
              <div class="mc-name">\${ag.name} — \${ag.fullName}</div>
              <div class="mc-role">\${ag.title} // \${ag.role.split('•')[0].trim()}</div>
            </div>
            <div class="mc-stat">
              <div class="mc-pct" style="color:\${ag.color}" id="pct-\${ag.id}">\${ag.progress}%</div>
              <div class="mc-st">\${ag.status.toUpperCase()}</div>
            </div>
          \`;
          card.addEventListener('click', () => selectAgent(ag.id));
          list.appendChild(card);
        });
      }

      function updatePositions() {
        const arena = document.getElementById('arena');
        const W = arena.clientWidth;
        const H = arena.clientHeight;
        const pad = 80;
        AGENTS.forEach(ag => {
          let p = positions[ag.id];
          let v = velocities[ag.id];
          p.x += v.vx;
          p.y += v.vy;
          if (p.x < pad) { p.x = pad; v.vx = Math.abs(v.vx); }
          if (p.x > W - pad) { p.x = W - pad; v.vx = -Math.abs(v.vx); }
          if (p.y < pad) { p.y = pad; v.vy = Math.abs(v.vy); }
          if (p.y > H - pad) { p.y = H - pad; v.vy = -Math.abs(v.vy); }
          v.vx += (Math.random() - 0.5) * 0.04;
          v.vy += (Math.random() - 0.5) * 0.04;
          const spd = Math.sqrt(v.vx * v.vx + v.vy * v.vy);
          const maxSpd = 0.9;
          const minSpd = 0.15;
          if (spd > maxSpd) { v.vx = (v.vx / spd) * maxSpd; v.vy = (v.vy / spd) * maxSpd; }
          if (spd < minSpd) { v.vx = (v.vx / spd) * minSpd; v.vy = (v.vy / spd) * minSpd; }
          AGENTS.forEach(other => {
            if (other.id === ag.id) return;
            const op = positions[other.id];
            const dx = p.x - op.x;
            const dy = p.y - op.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120 * 0.08;
              v.vx += (dx / dist) * force;
              v.vy += (dy / dist) * force;
            }
          });
          const el = document.getElementById('agent-' + ag.id);
          if (el) { el.style.left = p.x + 'px'; el.style.top = p.y + 'px'; }
        });
        updateConnections();
        requestAnimationFrame(updatePositions);
      }

      function updateConnections() {
        const svg = document.getElementById('connSvg');
        svg.innerHTML = '';
        for (let i = 0; i < AGENTS.length; i++) {
          for (let j = i + 1; j < AGENTS.length; j++) {
            const a = AGENTS[i];
            const b = AGENTS[j];
            const pa = positions[a.id];
            const pb = positions[b.id];
            const dx = pa.x - pb.x;
            const dy = pa.y - pb.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 220) {
              const opacity = (1 - dist / 220) * 0.5;
              const isActive = dist < 130;
              const gradId = 'grad-' + a.id + '-' + b.id;
              const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
              const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
              grad.setAttribute('id', gradId);
              grad.setAttribute('x1', pa.x);
              grad.setAttribute('y1', pa.y);
              grad.setAttribute('x2', pb.x);
              grad.setAttribute('y2', pb.y);
              grad.setAttribute('gradientUnits', 'userSpaceOnUse');
              const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
              s1.setAttribute('offset', '0%');
              s1.setAttribute('stop-color', a.color);
              const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
              s2.setAttribute('offset', '100%');
              s2.setAttribute('stop-color', b.color);
              grad.appendChild(s1);
              grad.appendChild(s2);
              defs.appendChild(grad);
              svg.appendChild(defs);
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              line.setAttribute('x1', pa.x);
              line.setAttribute('y1', pa.y);
              line.setAttribute('x2', pb.x);
              line.setAttribute('y2', pb.y);
              line.setAttribute('stroke', 'url(#' + gradId + ')');
              line.setAttribute('stroke-width', isActive ? '1.5' : '0.7');
              line.setAttribute('stroke-opacity', opacity);
              svg.appendChild(line);
              if (isActive) {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const t = (Date.now() % 2000) / 2000;
                const cx = pa.x + (pb.x - pa.x) * t;
                const cy = pa.y + (pb.y - pa.y) * t;
                circle.setAttribute('cx', cx);
                circle.setAttribute('cy', cy);
                circle.setAttribute('r', '3');
                circle.setAttribute('fill', a.color);
                circle.setAttribute('fill-opacity', '0.8');
                svg.appendChild(circle);
              }
            }
          }
        }
      }

      function speak(agentId, text, duration = 4500) {
        const bubble = document.getElementById('bubble-' + agentId);
        const btxt = document.getElementById('btext-' + agentId);
        const btime = document.getElementById('btime-' + agentId);
        if (!bubble || !btxt) return;
        if (bubbleTimers[agentId]) clearTimeout(bubbleTimers[agentId]);
        btxt.textContent = text;
        btime.textContent = new Date().toTimeString().slice(0, 8);
        bubble.classList.add('show');
        bubble.classList.remove('hide');
        const frame = document.querySelector('#agent-' + agentId + ' .av-circle');
        if (frame) frame.classList.add('talking');
        addFeedItem(agentId, text);
        lastSpeaker = agentId;
        bubbleTimers[agentId] = setTimeout(() => {
          bubble.classList.remove('show');
          bubble.classList.add('hide');
          if (frame) frame.classList.remove('talking');
          setTimeout(() => bubble.classList.remove('hide'), 280);
        }, duration);
      }

      function runConversation() {
        const thread = conversationThreads[threadIdx % conversationThreads.length];
        const speakerId = thread[0];
        const ag = AGENTS.find(a => a.id === speakerId);
        if (ag) {
          const line = ag.lines[Math.floor(Math.random() * ag.lines.length)];
          speak(speakerId, line);
        }
        const targetId = thread[1];
        if (targetId !== 'all' && targetId !== speakerId) {
          const targetAg = AGENTS.find(a => a.id === targetId);
          if (targetAg) {
            setTimeout(() => {
              const respLine = targetAg.lines[Math.floor(Math.random() * targetAg.lines.length)];
              speak(targetId, respLine);
            }, 1800 + Math.random() * 1200);
          }
        }
        if (targetId === 'all') {
          [0, 1, 2].forEach(i => {
            const randAg = AGENTS[Math.floor(Math.random() * AGENTS.length)];
            setTimeout(() => {
              speak(randAg.id, randAg.lines[Math.floor(Math.random() * randAg.lines.length)]);
            }, 1500 + i * 1800);
          });
        }
        threadIdx++;
        const delay = 4000 + Math.random() * 3500;
        convTimer = setTimeout(runConversation, delay);
      }

      function addFeedItem(agentId, msg) {
        const scroll = document.getElementById('feedScroll');
        const ag = AGENTS.find(a => a.id === agentId);
        if (!ag || !scroll) return;
        const t = new Date().toTimeString().slice(0, 8);
        const item = document.createElement('div');
        item.className = 'feed-item';
        item.innerHTML = \`
          <div class="fi-dot fi-info" style="background:\${ag.color}"></div>
          <div class="fi-body">
            <div class="fi-who" style="color:\${ag.color}">\${ag.name}</div>
            <div class="fi-msg">\${msg}</div>
          </div>
          <div class="fi-time">\${t}</div>
        \`;
        scroll.insertBefore(item, scroll.firstChild);
        if (scroll.children.length > 25) scroll.removeChild(scroll.lastChild);
      }

      function selectAgent(id) {
        document.querySelectorAll('.agent').forEach(a => a.classList.remove('selected-agent'));
        document.querySelectorAll('.member-card').forEach(c => c.classList.remove('selected'));
        const ag = AGENTS.find(a => a.id === id);
        if (!ag) return;
        document.getElementById('agent-' + id).classList.add('selected-agent');
        const mc = document.getElementById('mc-' + id);
        if (mc) {
          mc.classList.add('selected');
          mc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        document.getElementById('cmdTarget').textContent = ag.name + ' — ' + ag.fullName;
        selectedAgent = id;
        speak(id, 'Yo, Commander. ' + ag.name + ' is ready. What do you need?');
      }

      function sendDirective() {
        const input = document.getElementById('cmdInput');
        const val = input.value.trim();
        if (!val) return;
        input.value = '';
        const targets = selectedAgent ? [AGENTS.find(a => a.id === selectedAgent)] : AGENTS.slice(0, 3);
        const ackLines = [
          'Copy that. Executing: "' + val.slice(0, 30) + (val.length > 30 ? '..."' : '"'),
          'Roger, Commander. On it right now.',
          'Understood. Redirecting full capacity to this directive.',
          'Say less. I got it. Watch me work.',
          'Confirmed. This is now priority one.',
          'Commander KJ, that directive is locked in. Give me the time.',
          'Received. Syncing with the crew and moving.'
        ];
        targets.forEach((ag, i) => {
          if (!ag) return;
          const delay = i * 1400;
          setTimeout(() => {
            const resp = ackLines[Math.floor(Math.random() * ackLines.length)];
            speak(ag.id, resp, 5000);
          }, delay);
        });
        addFeedItem('salim', 'Commander directive: "' + val.slice(0, 50) + '"');
      }

      document.addEventListener('keydown', e => {
        if ((e.target.id === 'cmdInput') && e.key === 'Enter') sendDirective();
      });

      function broadcastAll() {
        const msgs = [
          'Commander wants full power on the NIL pipeline. Move now.',
          'Priority shift: all eyes on athlete brand matching.',
          'Paraloop push is live. Everyone contribute.',
          'Quality check across the board — no shortcuts today.',
          '4Play Global is watching. Make every output count.'
        ];
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        AGENTS.forEach((ag, i) => {
          setTimeout(() => {
            speak(ag.id, ag.lines[Math.floor(Math.random() * ag.lines.length)], 5000);
          }, i * 900);
        });
        addFeedItem('salim', 'BROADCAST: ' + msg);
      }

      const subNames = ['AMIR', 'JALEN', 'CYRUS', 'KENYA', 'SIMONE', 'DETROIT', 'DENZEL', 'ASHA'];
      function spawnRandom() {
        const name = subNames[Math.floor(Math.random() * subNames.length)];
        addFeedItem('salim', 'New subagent spawned: ' + name + ' — joining the Salim Group.');
        document.getElementById('hv-active').textContent = parseInt(document.getElementById('hv-active').textContent) + 1;
      }

      function tickProgress() {
        AGENTS.forEach(ag => {
          const delta = (Math.random() - 0.4) * 5;
          ag.progress = Math.max(15, Math.min(99, ag.progress + delta));
          const pctEl = document.getElementById('pct-' + ag.id);
          if (pctEl) pctEl.textContent = Math.round(ag.progress) + '%';
        });
        const tv = document.getElementById('hv-tasks');
        if (tv && Math.random() > 0.7) tv.textContent = parseInt(tv.textContent) + 1;
      }

      setInterval(tickProgress, 3000);

      window.addEventListener('load', () => {
        initPositions();
        renderAgents();
        renderMemberList();
        requestAnimationFrame(updatePositions);
        AGENTS.forEach((ag, i) => {
          setTimeout(() => {
            const intro = [
              ag.name + ' online. Salim Group is go.',
              ag.fullName + ' reporting in. Systems ready.',
              ag.name + ' activated. Let\\'s build.',
              'This is ' + ag.name + '. The ' + ag.title + ' is live.'
            ];
            speak(ag.id, intro[i % intro.length], 3000);
          }, i * 600 + 500);
        });
        setTimeout(() => runConversation(), AGENTS.length * 600 + 3500);
      });

      window.addEventListener('resize', () => {
        initPositions();
      });

      window.broadcastAll = broadcastAll;
      window.spawnRandom = spawnRandom;
      window.sendDirective = sendDirective;
    \`
    document.body.appendChild(agentsScript)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div className="bg">
        <div className="bg-grid"></div>
        <div className="bg-glow"></div>
        <div className="scanlines"></div>
      </div>

      <header>
        <div className="logo-wrap">
          <div className="logo-icon">⬡</div>
          <div className="logo-text">
            <div className="logo-primary">THE SALIM GROUP</div>
            <span className="logo-sub">4PLAY GLOBAL // AI AGENT CREW // NEXUS COMMAND</span>
          </div>
        </div>
        <div className="header-center">
          <div className="hc-stat">
            <div className="hc-val" style={{color: 'var(--cyan)'}} id="hv-active">8</div>
            <div className="hc-lbl">ACTIVE</div>
          </div>
          <div className="hc-sep"></div>
          <div className="hc-stat">
            <div className="hc-val" style={{color: 'var(--green)'}} id="hv-tasks">247</div>
            <div className="hc-lbl">TASKS DONE</div>
          </div>
          <div className="hc-sep"></div>
          <div className="hc-stat">
            <div className="hc-val" style={{color: 'var(--gold)'}} id="hv-xp">52.4K</div>
            <div className="hc-lbl">CREW XP</div>
          </div>
          <div className="hc-sep"></div>
          <div className="hc-stat">
            <div className="hc-val" style={{color: 'var(--green)'}}>99.8%</div>
            <div className="hc-lbl">UPTIME</div>
          </div>
        </div>
        <div className="header-right">
          <div className="sys-badge"><div className="pulse"></div>ALL CREW ONLINE</div>
          <div className="cmdr">
            <div className="cmdr-av">KJ</div>
            <div>
              <div className="cmdr-name">COMMANDER KJ</div>
              <div className="cmdr-role">FOUNDER & CEO // 4PLAY GLOBAL</div>
            </div>
          </div>
        </div>
      </header>

      <div id="arena">
        <svg id="connSvg"></svg>
      </div>

      <div id="sidebar">
        <div className="sb-hd">
          <div className="sb-title">◈ SALIM GROUP ROSTER</div>
          <div className="sb-sub">8 AGENTS // ALL SYSTEMS NOMINAL</div>
        </div>
        <div className="cmd-section">
          <div className="cmd-to">SENDING TO: <span id="cmdTarget">ALL CREW</span></div>
          <div className="cmd-row">
            <span className="cmd-prefix">▶_</span>
            <input className="cmd-in" id="cmdInput" placeholder="Issue directive to the crew..." autoComplete="off" />
            <button className="exec-btn" onClick="sendDirective()">SEND</button>
          </div>
          <div className="cmd-bar"></div>
        </div>
        <div className="member-section" id="memberList"></div>
        <div className="feed-section">
          <div className="feed-hd">
            <span className="feed-title">▶ LIVE CREW FEED</span>
            <span style={{fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', color: 'var(--green)'}}>AUTO</span>
          </div>
          <div className="feed-scroll" id="feedScroll"></div>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="ticker-wrap" id="ticker">
          <span className="ti up">SALIM <span>ONLINE ✓</span></span>
          <span className="ti cy">DARIUS <span>EXTRACTING DATA</span></span>
          <span className="ti up">ZARA <span>CONTENT FLOW +94%</span></span>
          <span className="ti go">MALIK <span>EVALUATING BATCH</span></span>
          <span className="ti cy">JOURNEY <span>NIL SIGNALS FOUND</span></span>
          <span className="ti up">CAIRO <span>BRAND MATCH ×12</span></span>
          <span className="ti up">NOVA <span>3 POSTS PUBLISHED</span></span>
          <span className="ti cy">REIGN <span>MEMORY SYNCED ✓</span></span>
          <span className="ti go">PHOENIX <span>ORCHESTRATING CREW</span></span>
          <span className="ti up">CREW XP <span>+1,240 THIS SESSION</span></span>
          <span className="ti up">SALIM <span>ONLINE ✓</span></span>
          <span className="ti cy">DARIUS <span>EXTRACTING DATA</span></span>
          <span className="ti up">ZARA <span>CONTENT FLOW +94%</span></span>
          <span className="ti go">MALIK <span>EVALUATING BATCH</span></span>
          <span className="ti cy">JOURNEY <span>NIL SIGNALS FOUND</span></span>
          <span className="ti up">CAIRO <span>BRAND MATCH ×12</span></span>
          <span className="ti up">NOVA <span>3 POSTS PUBLISHED</span></span>
          <span className="ti cy">REIGN <span>MEMORY SYNCED ✓</span></span>
          <span className="ti go">PHOENIX <span>ORCHESTRATING CREW</span></span>
        </div>
      </div>

      <div className="spawn-fab">
        <button className="sfab sec" onClick="spawnRandom()">＋ SPAWN SUBAGENT</button>
        <button className="sfab" onClick="broadcastAll()">⬡ BROADCAST TO CREW</button>
      </div>
    </div>
  )
}
