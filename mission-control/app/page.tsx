'use client'

export default function Dashboard() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>THE SALIM GROUP</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700;900&family=Bebas+Neue&display=swap" rel="stylesheet">
<style>
:root{--void:#010810;--deep:#030e1c;--panel:rgba(4,14,26,0.92);--border:rgba(0,220,255,0.15);--cyan:#00dcff;--purple:#9b5fff;--gold:#f5c118;--green:#00ff9d;--red:#ff3a6e;--orange:#ff8c00;--pink:#ff4eb8;--teal:#00ffd5;--text:#cce8f4;--dim:#2a556a;--dim2:#0f1e2e;}
*{margin:0;padding:0;box-sizing:border-box;}
html,body{background:var(--void);font-family:'Rajdhani',sans-serif;color:var(--text);overflow:hidden;height:100vh;width:100vw;cursor:crosshair;user-select:none;}
#root{width:100vw;height:100vh;}
.bg{position:fixed;inset:0;z-index:0;pointer-events:none;}
.bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,220,255,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(0,220,255,0.032) 1px,transparent 1px);background-size:54px 54px;animation:bgDrift 28s linear infinite;}
@keyframes bgDrift{from{background-position:0 0}to{background-position:54px 54px}}
.bg-glow{position:absolute;inset:0;background:radial-gradient(ellipse 65% 45% at 50% 5%,rgba(0,180,255,0.06) 0%,transparent 70%),radial-gradient(ellipse 35% 55% at 5% 85%,rgba(155,95,255,0.05) 0%,transparent 60%),radial-gradient(ellipse 28% 38% at 95% 65%,rgba(0,255,157,0.04) 0%,transparent 60%);}
.scanlines{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.065) 2px,rgba(0,0,0,0.065) 4px);}
header{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:58px;background:rgba(1,8,16,0.95);border-bottom:1px solid var(--border);backdrop-filter:blur(16px);}
.logo-wrap{display:flex;align-items:center;gap:14px;}
.logo-icon{width:38px;height:38px;border:1px solid rgba(0,220,255,0.4);display:flex;align-items:center;justify-content:center;font-size:20px;background:rgba(0,220,255,0.06);box-shadow:0 0 14px rgba(0,220,255,0.15);position:relative;overflow:hidden;}
.logo-icon::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,220,255,0.1),transparent);}
.logo-text{line-height:1;}
.logo-primary{font-family:'Orbitron',monospace;font-size:16px;font-weight:900;letter-spacing:4px;color:var(--gold);text-shadow:0 0 20px rgba(245,193,24,0.6),0 0 40px rgba(245,193,24,0.2);animation:flicker 9s infinite;}
@keyframes flicker{0%,100%{opacity:1}93%{opacity:.8}94%{opacity:1}97%{opacity:.6}98%{opacity:1}}
.logo-sub{font-family:'Share Tech Mono',monospace;font-size:8px;letter-spacing:3px;color:var(--dim);display:block;margin-top:2px;}
.header-center{display:flex;align-items:center;gap:24px;}
.hc-stat{text-align:center;}
.hc-val{font-family:'Orbitron',monospace;font-size:16px;font-weight:900;line-height:1;}
.hc-lbl{font-family:'Share Tech Mono',monospace;font-size:7px;letter-spacing:2px;color:var(--dim);margin-top:2px;}
.hc-sep{width:1px;height:32px;background:var(--border);}
.header-right{display:flex;align-items:center;gap:12px;}
.sys-badge{display:flex;align-items:center;gap:7px;background:rgba(0,255,157,0.05);border:1px solid rgba(0,255,157,0.2);padding:6px 12px;font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--green);letter-spacing:1px;}
.pulse{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);animation:pulseAnim 1.5s infinite;}
@keyframes pulseAnim{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.65)}}
.cmdr{display:flex;align-items:center;gap:8px;background:var(--panel);border:1px solid var(--border);padding:5px 12px 5px 5px;}
.cmdr-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:13px;color:#000;font-weight:700;}
.cmdr-name{font-family:'Orbitron',monospace;font-size:9px;font-weight:700;color:var(--gold);letter-spacing:1px;}
.cmdr-role{font-family:'Share Tech Mono',monospace;font-size:7px;color:var(--dim);}
#arena{position:fixed;top:58px;left:0;right:340px;bottom:36px;z-index:10;overflow:hidden;}
#connSvg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;}
.agent{position:absolute;z-index:20;cursor:pointer;will-change:transform;}
.agent-inner{display:flex;flex-direction:column;align-items:center;gap:0;transition:filter .25s;}
.agent:hover .agent-inner{filter:drop-shadow(0 0 22px var(--ag)) drop-shadow(0 0 44px var(--ag)) !important;}
.av-wrap{position:relative;width:72px;height:72px;}
.av-ring-outer{position:absolute;inset:-10px;border-radius:50%;border:1px solid var(--ag);opacity:0.2;animation:ringRotate 4s linear infinite;}
.av-ring-mid{position:absolute;inset:-4px;border-radius:50%;border:1.5px dashed var(--ag);opacity:0.25;animation:ringRotate 6s linear infinite reverse;}
@keyframes ringRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.av-circle{width:72px;height:72px;border-radius:50%;border:2px solid var(--ag);background:radial-gradient(circle at 38% 32%,rgba(255,255,255,0.12),rgba(0,0,0,0.4));display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;box-shadow:0 0 0 3px rgba(0,0,0,0.5),0 0 20px var(--ag),inset 0 0 20px rgba(0,0,0,0.3);}
.av-circle::before{content:'';position:absolute;top:-30px;left:-20px;width:60px;height:60px;background:rgba(255,255,255,0.06);border-radius:50%;}
.av-initials{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:2px;color:var(--ag);text-shadow:0 0 12px var(--ag),0 0 24px var(--ag);z-index:1;position:relative;line-height:1;}
.av-pulse{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,var(--ag) 0%,transparent 70%);opacity:0;animation:avPulse 2.5s ease-in-out infinite;}
@keyframes avPulse{0%,100%{opacity:0;transform:scale(0.6)}50%{opacity:0.1;transform:scale(1)}}
.agent-lbl{margin-top:7px;text-align:center;}
.agent-name{font-family:'Orbitron',monospace;font-size:10px;font-weight:700;color:var(--ag);text-shadow:0 0 8px var(--ag);letter-spacing:1px;white-space:nowrap;}
.agent-title{font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--dim);white-space:nowrap;text-align:center;margin-top:1px;letter-spacing:1px;}
.agent-mood{font-family:'Rajdhani',sans-serif;font-size:10px;font-weight:600;color:rgba(255,255,255,0.4);margin-top:2px;white-space:nowrap;text-align:center;font-style:italic;}
.status-row{display:flex;align-items:center;gap:4px;justify-content:center;margin-top:3px;}
.st-dot{width:5px;height:5px;border-radius:50%;}
.st-active{background:var(--green);box-shadow:0 0 6px var(--green);animation:pulseAnim 1.5s infinite;}
.st-busy{background:var(--red);box-shadow:0 0 6px var(--red);animation:pulseAnim 1s infinite;}
.st-idle{background:var(--gold);}
.st-lbl{font-family:'Share Tech Mono',monospace;font-size:7px;color:var(--dim);letter-spacing:1px;}
.bubble{position:absolute;bottom:calc(100% + 12px);left:50%;transform:translateX(-50%) scale(0.85);width:210px;background:rgba(2,10,20,0.97);border:1px solid var(--ag);padding:10px 12px;pointer-events:none;z-index:100;opacity:0;transform-origin:bottom center;box-shadow:0 0 24px rgba(0,0,0,0.7),0 0 18px var(--ag);transition:opacity .2s,transform .3s cubic-bezier(.34,1.56,.64,1);}
.bubble.show{opacity:1;transform:translateX(-50%) scale(1);}
.bubble::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:8px solid transparent;border-top-color:var(--ag);}
.bubble::before{content:'';position:absolute;top:calc(100% + 1px);left:50%;transform:translateX(-50%);border:7px solid transparent;border-top-color:rgba(2,10,20,0.97);z-index:1;}
.b-head{display:flex;align-items:center;gap:6px;margin-bottom:7px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.06);}
.b-av-emoji{font-size:14px;}
.b-name{font-family:'Orbitron',monospace;font-size:9px;font-weight:700;color:var(--ag);letter-spacing:1px;text-shadow:0 0 6px var(--ag);}
.b-role{font-family:'Share Tech Mono',monospace;font-size:7px;color:var(--dim);}
.b-text{font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:600;color:var(--text);line-height:1.5;}
.b-time{font-family:'Share Tech Mono',monospace;font-size:7px;color:var(--dim);margin-top:6px;text-align:right;}
#sidebar{position:fixed;top:58px;right:0;width:340px;bottom:36px;z-index:50;background:rgba(2,10,20,0.96);border-left:1px solid var(--border);display:flex;flex-direction:column;backdrop-filter:blur(14px);overflow:hidden;}
.sb-hd{padding:14px 16px;border-bottom:1px solid var(--border);background:rgba(0,220,255,0.03);flex-shrink:0;}
.sb-title{font-family:'Orbitron',monospace;font-size:10px;font-weight:700;letter-spacing:3px;color:var(--cyan);}
.sb-sub{font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--dim);margin-top:2px;letter-spacing:2px;}
.cmd-section{padding:12px 14px;border-bottom:1px solid var(--border);flex-shrink:0;}
.cmd-to{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--dim);margin-bottom:6px;letter-spacing:1px;}
.cmd-to span{color:var(--gold);}
.cmd-row{display:flex;align-items:center;gap:8px;}
.cmd-prefix{font-family:'Share Tech Mono',monospace;font-size:14px;color:var(--cyan);text-shadow:0 0 8px var(--cyan);}
.cmd-in{flex:1;background:transparent;border:none;outline:none;color:var(--text);font-family:'Share Tech Mono',monospace;font-size:11px;caret-color:var(--cyan);}
.cmd-in::placeholder{color:var(--dim);}
.cmd-bar{margin-top:8px;height:1px;background:linear-gradient(90deg,var(--cyan),var(--purple),transparent);opacity:0.3;}
.exec-btn{background:linear-gradient(90deg,var(--cyan),var(--purple));border:none;color:#000;font-family:'Orbitron',monospace;font-size:8px;font-weight:900;letter-spacing:2px;padding:7px 14px;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0;}
.exec-btn:hover{filter:brightness(1.2);box-shadow:0 0 20px rgba(0,220,255,.3);}
.member-section{flex:1;overflow-y:auto;padding:10px 12px;scrollbar-width:thin;scrollbar-color:var(--dim2) transparent;}
.member-section::-webkit-scrollbar{width:3px;}
.member-section::-webkit-scrollbar-thumb{background:var(--dim2);}
.member-card{display:flex;align-items:center;gap:10px;padding:9px 10px;margin-bottom:7px;background:rgba(4,14,26,0.8);border:1px solid rgba(255,255,255,0.04);cursor:pointer;transition:all .2s;position:relative;overflow:hidden;}
.member-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--ag);box-shadow:0 0 6px var(--ag);}
.member-card:hover{border-color:var(--border);background:rgba(0,220,255,0.04);}
.member-card.selected{border-color:var(--border);background:rgba(0,220,255,0.06);}
.mc-av{width:36px;height:36px;border-radius:50%;border:1.5px solid var(--ag);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:14px;color:var(--ag);text-shadow:0 0 8px var(--ag);flex-shrink:0;background:rgba(0,0,0,0.3);}
.mc-info{flex:1;min-width:0;}
.mc-name{font-family:'Orbitron',monospace;font-size:9px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.mc-role{font-family:'Share Tech Mono',monospace;font-size:7px;color:var(--dim);margin-top:1px;}
.mc-stat{text-align:right;flex-shrink:0;}
.mc-pct{font-family:'Orbitron',monospace;font-size:11px;font-weight:700;color:var(--ag);}
.mc-st{font-family:'Share Tech Mono',monospace;font-size:7px;color:var(--dim);margin-top:1px;}
.feed-section{border-top:1px solid var(--border);flex-shrink:0;max-height:200px;display:flex;flex-direction:column;}
.feed-hd{padding:8px 14px;border-bottom:1px solid var(--border);background:rgba(0,220,255,0.03);flex-shrink:0;display:flex;align-items:center;justify-content:space-between;}
.feed-title{font-family:'Orbitron',monospace;font-size:8px;letter-spacing:3px;color:var(--cyan);}
.feed-scroll{flex:1;overflow-y:auto;padding:8px 12px;scrollbar-width:thin;scrollbar-color:var(--dim2) transparent;}
.feed-scroll::-webkit-scrollbar{width:3px;}
.feed-scroll::-webkit-scrollbar-thumb{background:var(--dim2);}
.feed-item{display:flex;gap:7px;align-items:flex-start;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.03);animation:feedIn .3s ease;}
@keyframes feedIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
.fi-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;margin-top:4px;}
.fi-info{background:var(--cyan);}
.fi-body{flex:1;}
.fi-who{font-family:'Orbitron',monospace;font-size:8px;font-weight:700;}
.fi-msg{font-family:'Rajdhani',sans-serif;font-size:11px;color:var(--text);line-height:1.4;}
.fi-time{font-family:'Share Tech Mono',monospace;font-size:7px;color:var(--dim);}
.bottom-bar{position:fixed;bottom:0;left:0;right:340px;height:36px;z-index:100;background:rgba(1,8,16,0.95);border-top:1px solid var(--border);display:flex;align-items:center;overflow:hidden;padding:0 10px;}
.ticker-wrap{display:flex;gap:32px;white-space:nowrap;animation:tick 35s linear infinite;}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.ti{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--dim);letter-spacing:1px;display:flex;align-items:center;gap:5px;}
.ti span{letter-spacing:0;}
.ti.up span{color:var(--green);}
.ti.cy span{color:var(--cyan);}
.ti.go span{color:var(--gold);}
.spawn-fab{position:fixed;bottom:46px;right:356px;z-index:100;display:flex;flex-direction:column;gap:7px;align-items:flex-end;}
.sfab{background:var(--cyan);border:none;color:#000;font-family:'Orbitron',monospace;font-size:8px;font-weight:900;letter-spacing:2px;padding:9px 16px;cursor:pointer;white-space:nowrap;transition:all .2s;box-shadow:0 0 20px rgba(0,220,255,.25);display:flex;align-items:center;gap:7px;}
.sfab:hover{filter:brightness(1.15);box-shadow:0 0 36px rgba(0,220,255,.4);transform:translateX(-4px);}
.sfab.sec{background:var(--purple);box-shadow:0 0 20px rgba(155,95,255,.25);font-size:7px;padding:7px 13px;}
.sfab.sec:hover{box-shadow:0 0 36px rgba(155,95,255,.4);}
.agent.selected-agent .av-circle{box-shadow:0 0 0 3px rgba(0,0,0,0.5),0 0 32px var(--ag),0 0 60px var(--ag) !important;}
</style>
</head>
<body>
<div class="bg"><div class="bg-grid"></div><div class="bg-glow"></div><div class="scanlines"></div></div>
<header>
<div class="logo-wrap"><div class="logo-icon">⬡</div><div class="logo-text"><div class="logo-primary">THE SALIM GROUP</div><span class="logo-sub">4PLAY GLOBAL // AI AGENT CREW // NEXUS COMMAND</span></div></div>
<div class="header-center"><div class="hc-stat"><div class="hc-val" style="color:var(--cyan)" id="hv-active">8</div><div class="hc-lbl">ACTIVE</div></div><div class="hc-sep"></div><div class="hc-stat"><div class="hc-val" style="color:var(--green)" id="hv-tasks">247</div><div class="hc-lbl">TASKS DONE</div></div><div class="hc-sep"></div><div class="hc-stat"><div class="hc-val" style="color:var(--gold)" id="hv-xp">52.4K</div><div class="hc-lbl">CREW XP</div></div><div class="hc-sep"></div><div class="hc-stat"><div class="hc-val" style="color:var(--green)">99.8%</div><div class="hc-lbl">UPTIME</div></div></div>
<div class="header-right"><div class="sys-badge"><div class="pulse"></div>ALL CREW ONLINE</div><div class="cmdr"><div class="cmdr-av">KJ</div><div><div class="cmdr-name">COMMANDER KJ</div><div class="cmdr-role">FOUNDER & CEO // 4PLAY GLOBAL</div></div></div></div>
</header>
<div id="arena"><svg id="connSvg"></svg></div>
<div id="sidebar">
<div class="sb-hd"><div class="sb-title">◈ SALIM GROUP ROSTER</div><div class="sb-sub">8 AGENTS // ALL SYSTEMS NOMINAL</div></div>
<div class="cmd-section"><div class="cmd-to">SENDING TO: <span id="cmdTarget">ALL CREW</span></div><div class="cmd-row"><span class="cmd-prefix">▶_</span><input class="cmd-in" id="cmdInput" placeholder="Issue directive to the crew..." autocomplete="off"><button class="exec-btn" onclick="window.sendDirective()">SEND</button></div><div class="cmd-bar"></div></div>
<div class="member-section" id="memberList"></div>
<div class="feed-section"><div class="feed-hd"><span class="feed-title">▶ LIVE CREW FEED</span><span style="font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--green);">AUTO</span></div><div class="feed-scroll" id="feedScroll"></div></div>
</div>
<div class="bottom-bar"><div class="ticker-wrap" id="ticker"><span class="ti up">SALIM <span>ONLINE</span></span><span class="ti cy">DARIUS <span>EXTRACTING</span></span><span class="ti up">ZARA <span>WRITING</span></span><span class="ti go">MALIK <span>EVALUATING</span></span><span class="ti cy">JOURNEY <span>SCOUTING</span></span><span class="ti up">CAIRO <span>MATCHING</span></span><span class="ti up">NOVA <span>PUBLISHING</span></span><span class="ti cy">REIGN <span>REMEMBERING</span></span><span class="ti up">SALIM <span>ONLINE</span></span><span class="ti cy">DARIUS <span>EXTRACTING</span></span><span class="ti up">ZARA <span>WRITING</span></span><span class="ti go">MALIK <span>EVALUATING</span></span></div></div>
<div class="spawn-fab"><button class="sfab sec" onclick="window.spawnRandom()">＋ SPAWN SUBAGENT</button><button class="sfab" onclick="window.broadcastAll()">⬡ BROADCAST TO CREW</button></div>
<script>
const AGENTS=[{id:'salim',name:'SALIM',fullName:'Salim al-Rasheed',title:'LEAD ORCHESTRATOR',emoji:'👑',initials:'SR',color:'#f5c118',status:'active',progress:88,lines:["Crew sync up. Priority incoming.","Darius need data in 3 mins.","Zara write it NOW.","Pipeline stays clean.","KJ wants NIL signals.","Malik what's the quality score?","Nothing below 90.","Confirm all subagents.","Stay disciplined. Stay winning.","Reign archive that session."]},{id:'darius',name:'DARIUS',fullName:'Darius Washington',title:'DATA EXTRACTOR',emoji:'🕷️',initials:'DW',color:'#00dcff',status:'busy',progress:76,lines:["Pulled 247 articles today.","Three brands activated NIL.","Scraping 14 sources now.","Data is clean for Zara.","I see patterns nobody sees.","Bypassed the paywall.","All indexed in 90 seconds.","Two rookies going viral.","I move fast and don't miss.","Cleaner batch than last."]},{id:'zara',name:'ZARA',fullName:'Zara Monroe',title:'CONTENT ARCHITECT',emoji:'✍️',initials:'ZM',color:'#ff4eb8',status:'busy',progress:62,lines:["Give me data I'll sing.","Nike copy is elite.","Darius slow down.","I write culture not content.","Caption crafted. Perfect tone.","Every brand voice different.","Three posts queued.","1200 words zero filler.","Pitch deck copy is fire.","Going for 96 today."]},{id:'malik',name:'MALIK',fullName:'Malik Okonkwo',title:'QUALITY JUDGE',emoji:'⚖️',initials:'MO',color:'#00ff9d',status:'active',progress:91,lines:["Batch scored. 41 pass.","I don't do mediocre.","Quality check complete. 94%.","This one's strong. 93 out of 100.","Two sources unreliable.","1400 items processed today.","Scoring matrix holding solid.","Highest quality ever. 96%.","I protect the standard.","This isn't ready. Rejected."]},{id:'journey',name:'JOURNEY',fullName:'Journey Blackwell',title:'NIL SCOUT',emoji:'🏆',initials:'JB',color:'#9b5fff',status:'active',progress:58,lines:["Three athletes blowing up.","UNC point guard ACI up 40.","NIL market moving fast.","Athlete profile ready.","Six athletes undervalued.","Tracksuit deal brewing.","ACI computed. All ranked.","Study tape socials stats.","Athlete economy is future.","Gymnasts went viral."]},{id:'cairo',name:'CAIRO',fullName:'Cairo Jenkins',title:'BRAND CONNECTOR',emoji:'💼',initials:'CJ',color:'#ff8c00',status:'idle',progress:43,lines:["Nike wants authenticity.","Closed 12 brand matches.","Send ACI report. Pitching.","Timberland wants streetwear.","Brands trust my knowledge.","PacSun brief came in.","Red Bull wants energy.","This deal is 200K.","Need 48 hours for Hennessy.","Building the ecosystem."]},{id:'nova',name:'NOVA',fullName:'Nova Simmons',title:'SOCIAL ARCHITECT',emoji:'📱',initials:'NS',color:'#ff3a6e',status:'busy',progress:84,lines:["Posted. Engagement insane.","Zara's copy plus timing.","Instagram X TikTok live.","Consistency wins here.","Malik approved. Queuing.","Brooklyn hit 80K views.","I engineer the moment.","Need trending hashtags.","Format converts well.","4Play growing fast."]},{id:'reign',name:'REIGN',fullName:'Reign Carter',title:'MEMORY KEEPER',emoji:'🧠',initials:'RC',color:'#00ffd5',status:'active',progress:100,lines:["Session archived. 247 points.","Indexed all KJ talks.","Knowledge base 48K vectors.","4Play peaks every 6 weeks.","Pulled all ACI scores.","I never forget.","Full brand history stored.","Duplicates flagged.","Preferences fully mapped.","Crew intelligence secured."]}];
let pos={},vel={},sel=null,tim={},idx=0,con=null;
const th=[['salim','darius'],['darius','zara'],['zara','malik'],['malik','zara'],['journey','cairo'],['cairo','salim'],['nova','zara'],['nova','malik'],['reign','salim'],['darius','malik'],['journey','salim'],['cairo','journey'],['reign','darius'],['salim','all']];
function ini(){const a=document.getElementById('arena'),W=a.clientWidth,H=a.clientHeight,m=100;AGENTS.forEach((ag,i)=>{const ang=i/AGENTS.length*Math.PI*2-Math.PI/2,rx=(W/2-m)*.65,ry=(H/2-m)*.65;pos[ag.id]={x:W/2+rx*Math.cos(ang),y:H/2+ry*Math.sin(ang)};const s=.3+Math.random()*.4,d=Math.random()*Math.PI*2;vel[ag.id]={vx:Math.cos(d)*s,vy:Math.sin(d)*s}});}
function ren(){const a=document.getElementById('arena');AGENTS.forEach(ag=>{const d=document.createElement('div');d.className='agent';d.id='agent-'+ag.id;d.style.setProperty('--ag',ag.color);d.style.width='120px';d.style.marginLeft='-60px';d.style.marginTop='-90px';d.innerHTML=\`<div class="agent-inner" style="filter:drop-shadow(0 0 12px \${ag.color}) drop-shadow(0 0 24px rgba(0,0,0,0.5));"><div class="av-wrap"><div class="av-ring-outer" style="border-color:\${ag.color}"></div><div class="av-ring-mid" style="border-color:\${ag.color}"></div><div class="av-circle" style="border-color:\${ag.color};box-shadow:0 0 0 3px rgba(0,0,0,0.5),0 0 20px \${ag.color},inset 0 0 20px rgba(0,0,0,0.3);"><div class="av-pulse" style="background:radial-gradient(circle,\${ag.color} 0%,transparent 70%)"></div><div class="av-initials" style="color:\${ag.color};text-shadow:0 0 12px \${ag.color},0 0 24px \${ag.color}">\${ag.initials}</div></div></div><div class="agent-lbl"><div class="agent-name" style="color:\${ag.color};text-shadow:0 0 8px \${ag.color}">\${ag.name}</div><div class="agent-title" style="color:\${ag.color};opacity:0.7;">\${ag.title}</div><div class="status-row"><div class="st-dot \${ag.status==='active'?'st-active':ag.status==='busy'?'st-busy':'st-idle'}"></div><div class="st-lbl">\${ag.status.toUpperCase()}</div></div></div></div><div class="bubble" id="bubble-\${ag.id}" style="border-color:\${ag.color};"><div class="b-head"><span class="b-av-emoji">\${ag.emoji}</span><div><div class="b-name" style="color:\${ag.color}">\${ag.name}</div><div class="b-role">\${ag.fullName}</div></div></div><div class="b-text" id="btext-\${ag.id}"></div><div class="b-time" id="btime-\${ag.id}"></div></div>\`;d.addEventListener('click',()=>sel_agent(ag.id));a.appendChild(d);});}
function ren_list(){const l=document.getElementById('memberList');l.innerHTML='';AGENTS.forEach(ag=>{const c=document.createElement('div');c.className='member-card';c.id='mc-'+ag.id;c.style.setProperty('--ag',ag.color);c.innerHTML=\`<div class="mc-av" style="border-color:\${ag.color};color:\${ag.color};">\${ag.initials}</div><div class="mc-info"><div class="mc-name">\${ag.name}</div><div class="mc-role">\${ag.title}</div></div><div class="mc-stat"><div class="mc-pct" style="color:\${ag.color}" id="pct-\${ag.id}">\${ag.progress}%</div><div class="mc-st">\${ag.status.toUpperCase()}</div></div>\`;c.addEventListener('click',()=>sel_agent(ag.id));l.appendChild(c);});}
function upd(){const a=document.getElementById('arena'),W=a.clientWidth,H=a.clientHeight,pd=80;AGENTS.forEach(ag=>{let p=pos[ag.id],v=vel[ag.id];p.x+=v.vx;p.y+=v.vy;if(p.x<pd){p.x=pd;v.vx=Math.abs(v.vx);}if(p.x>W-pd){p.x=W-pd;v.vx=-Math.abs(v.vx);}if(p.y<pd){p.y=pd;v.vy=Math.abs(v.vy);}if(p.y>H-pd){p.y=H-pd;v.vy=-Math.abs(v.vy);}v.vx+=(Math.random()-.5)*.04;v.vy+=(Math.random()-.5)*.04;const s=Math.sqrt(v.vx*v.vx+v.vy*v.vy);if(s>.9){v.vx=(v.vx/s)*.9;v.vy=(v.vy/s)*.9;}if(s<.15){v.vx=(v.vx/s)*.15;v.vy=(v.vy/s)*.15;}AGENTS.forEach(ot=>{if(ot.id===ag.id)return;const op=pos[ot.id],dx=p.x-op.x,dy=p.y-op.y,dt=Math.sqrt(dx*dx+dy*dy);if(dt<120&&dt>0){const f=(120-dt)/120*.08;v.vx+=(dx/dt)*f;v.vy+=(dy/dt)*f;}});const el=document.getElementById('agent-'+ag.id);if(el){el.style.left=p.x+'px';el.style.top=p.y+'px';}});upd_conn();requestAnimationFrame(upd);}
function upd_conn(){const s=document.getElementById('connSvg');s.innerHTML='';for(let i=0;i<AGENTS.length;i++){for(let j=i+1;j<AGENTS.length;j++){const a=AGENTS[i],b=AGENTS[j],pa=pos[a.id],pb=pos[b.id],dx=pa.x-pb.x,dy=pa.y-pb.y,dt=Math.sqrt(dx*dx+dy*dy);if(dt<220){const op=(1-dt/220)*.5,act=dt<130;if(act){const dfs=document.createElementNS('http://www.w3.org/2000/svg','defs'),gd=document.createElementNS('http://www.w3.org/2000/svg','linearGradient'),s1=document.createElementNS('http://www.w3.org/2000/svg','stop'),s2=document.createElementNS('http://www.w3.org/2000/svg','stop'),gid='g'+a.id+b.id;gd.setAttribute('id',gid);gd.setAttribute('x1',pa.x);gd.setAttribute('y1',pa.y);gd.setAttribute('x2',pb.x);gd.setAttribute('y2',pb.y);gd.setAttribute('gradientUnits','userSpaceOnUse');s1.setAttribute('offset','0%');s1.setAttribute('stop-color',a.color);s2.setAttribute('offset','100%');s2.setAttribute('stop-color',b.color);gd.appendChild(s1);gd.appendChild(s2);dfs.appendChild(gd);s.appendChild(dfs);const ln=document.createElementNS('http://www.w3.org/2000/svg','line');ln.setAttribute('x1',pa.x);ln.setAttribute('y1',pa.y);ln.setAttribute('x2',pb.x);ln.setAttribute('y2',pb.y);ln.setAttribute('stroke','url(#'+gid+')');ln.setAttribute('stroke-width',act?'1.5':'0.7');ln.setAttribute('stroke-opacity',op);s.appendChild(ln);const cr=document.createElementNS('http://www.w3.org/2000/svg','circle'),t=(Date.now()%2000)/2000,cx=pa.x+(pb.x-pa.x)*t,cy=pa.y+(pb.y-pa.y)*t;cr.setAttribute('cx',cx);cr.setAttribute('cy',cy);cr.setAttribute('r','3');cr.setAttribute('fill',a.color);cr.setAttribute('fill-opacity','0.8');s.appendChild(cr);}}}}}
function spk(id,txt,dur=4500){const b=document.getElementById('bubble-'+id),bt=document.getElementById('btext-'+id),bti=document.getElementById('btime-'+id);if(!b||!bt)return;if(tim[id])clearTimeout(tim[id]);bt.textContent=txt;bti.textContent=new Date().toTimeString().slice(0,8);b.classList.add('show');add_feed(id,txt);tim[id]=setTimeout(()=>{b.classList.remove('show');},dur);}
function add_feed(id,msg){const sc=document.getElementById('feedScroll'),ag=AGENTS.find(a=>a.id===id);if(!ag||!sc)return;const t=new Date().toTimeString().slice(0,8),it=document.createElement('div');it.className='feed-item';it.innerHTML=\`<div class="fi-dot fi-info" style="background:\${ag.color}"></div><div class="fi-body"><div class="fi-who" style="color:\${ag.color}">\${ag.name}</div><div class="fi-msg">\${msg}</div></div><div class="fi-time">\${t}</div>\`;sc.insertBefore(it,sc.firstChild);if(sc.children.length>25)sc.removeChild(sc.lastChild);}
function sel_agent(id){document.querySelectorAll('.agent').forEach(a=>a.classList.remove('selected-agent'));document.querySelectorAll('.member-card').forEach(c=>c.classList.remove('selected'));const ag=AGENTS.find(a=>a.id===id);if(!ag)return;document.getElementById('agent-'+id).classList.add('selected-agent');const mc=document.getElementById('mc-'+id);if(mc){mc.classList.add('selected');mc.scrollIntoView({behavior:'smooth',block:'nearest'});}document.getElementById('cmdTarget').textContent=ag.name+' — '+ag.fullName;sel=id;spk(id,'Ready Commander.');}
window.sendDirective=function(){const inp=document.getElementById('cmdInput'),v=inp.value.trim();if(!v)return;inp.value='';const tg=sel?[AGENTS.find(a=>a.id===sel)]:AGENTS.slice(0,3),ck=['Copy that.','Roger.','Understood.','Say less.','Priority one.','Locked in.','Executing.'];tg.forEach((ag,i)=>{if(!ag)return;setTimeout(()=>{const r=ck[Math.floor(Math.random()*ck.length)];spk(ag.id,r,5000);},i*1400);});add_feed('salim','Directive: '+v.slice(0,50));};
window.broadcastAll=function(){const m=['Full power.','Priority shift.','Paraloop push.','Quality check.','4Play watching.'];AGENTS.forEach((ag,i)=>{setTimeout(()=>{spk(ag.id,ag.lines[Math.floor(Math.random()*ag.lines.length)],5000);},i*900);});add_feed('salim','BROADCAST: '+m[0]);};
window.spawnRandom=function(){const nm=['AMIR','JALEN','CYRUS','KENYA','SIMONE','DETROIT','DENZEL','ASHA'],n=nm[Math.floor(Math.random()*nm.length)];add_feed('salim','New subagent: '+n);document.getElementById('hv-active').textContent=parseInt(document.getElementById('hv-active').textContent)+1;};
setInterval(()=>{AGENTS.forEach(ag=>{ag.progress=Math.max(15,Math.min(99,ag.progress+(Math.random()-.4)*5));const p=document.getElementById('pct-'+ag.id);if(p)p.textContent=Math.round(ag.progress)+'%';});const tv=document.getElementById('hv-tasks');if(tv&&Math.random()>.7)tv.textContent=parseInt(tv.textContent)+1;},3000);
function run_conv(){const th_item=th[idx%th.length],sp=th_item[0],ag=AGENTS.find(a=>a.id===sp);if(ag){const ln=ag.lines[Math.floor(Math.random()*ag.lines.length)];spk(sp,ln);}const tg=th_item[1];if(tg!=='all'&&tg!==sp){const tag=AGENTS.find(a=>a.id===tg);if(tag)setTimeout(()=>{const rl=tag.lines[Math.floor(Math.random()*tag.lines.length)];spk(tg,rl);},1800+Math.random()*1200);}if(tg==='all'){[0,1,2].forEach(i=>{const rag=AGENTS[Math.floor(Math.random()*AGENTS.length)];setTimeout(()=>{spk(rag.id,rag.lines[Math.floor(Math.random()*rag.lines.length)]);},1500+i*1800);});}idx++;const d=4000+Math.random()*3500;con=setTimeout(run_conv,d);}
document.addEventListener('keydown',e=>{if(e.target.id==='cmdInput'&&e.key==='Enter')window.sendDirective();});
setTimeout(()=>{ini();ren();ren_list();requestAnimationFrame(upd);AGENTS.forEach((ag,i)=>{setTimeout(()=>{spk(ag.id,ag.name+' online.');},i*600+500);});setTimeout(()=>run_conv(),AGENTS.length*600+3500);},100);
window.addEventListener('resize',()=>{ini();});
</script>
</body>
</html>`
      }}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
