'use client'

import { useEffect } from 'react'

const salimGroupHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>THE SALIM GROUP — 4Play Global Command</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@400;600;700;900&family=Bebas+Neue&display=swap" rel="stylesheet">
<style>
:root{--void:#010810;--deep:#030e1c;--panel:rgba(4,14,26,0.92);--border:rgba(0,220,255,0.15);--cyan:#00dcff;--purple:#9b5fff;--gold:#f5c118;--green:#00ff9d;--red:#ff3a6e;--orange:#ff8c00;--pink:#ff4eb8;--teal:#00ffd5;--text:#cce8f4;--dim:#2a556a;--dim2:#0f1e2e;}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:var(--void);font-family:'Rajdhani',sans-serif;color:var(--text);overflow:hidden;height:100vh;width:100vw;cursor:crosshair;user-select:none;}
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
<div class="bottom-bar"><div class="ticker-wrap" id="ticker"><span class="ti up">SALIM <span>ONLINE ✓</span></span><span class="ti cy">DARIUS <span>EXTRACTING DATA</span></span><span class="ti up">ZARA <span>CONTENT FLOW +94%</span></span><span class="ti go">MALIK <span>EVALUATING BATCH</span></span><span class="ti cy">JOURNEY <span>NIL SIGNALS FOUND</span></span><span class="ti up">CAIRO <span>BRAND MATCH ×12</span></span><span class="ti up">NOVA <span>3 POSTS PUBLISHED</span></span><span class="ti cy">REIGN <span>MEMORY SYNCED ✓</span></span><span class="ti go">CREW XP <span>+1,240 THIS SESSION</span></span><span class="ti up">SALIM <span>ONLINE ✓</span></span><span class="ti cy">DARIUS <span>EXTRACTING DATA</span></span><span class="ti up">ZARA <span>CONTENT FLOW +94%</span></span><span class="ti go">MALIK <span>EVALUATING BATCH</span></span></div></div>
<div class="spawn-fab"><button class="sfab sec" onclick="window.spawnRandom()">＋ SPAWN SUBAGENT</button><button class="sfab" onclick="window.broadcastAll()">⬡ BROADCAST TO CREW</button></div>
<script>
const AGENTS=[{id:'salim',name:'SALIM',fullName:'Salim al-Rasheed',title:'LEAD ORCHESTRATOR',role:'Crew Commander',emoji:'👑',initials:'SR',color:'#f5c118',status:'active',mood:'"Running the whole operation"',progress:88,lines:["Crew sync up. Priority run incoming.","Darius I need data in 3 mins. Move.","Zara write it NOW.","Pipeline stays clean.","KJ wants NIL signals. Redirect.","Malik what is the quality score?","Nothing below 90. Run again.","Confirm subagents accounted for.","Discipline keeps us winning.","Reign archive that session."]},{id:'darius',name:'DARIUS',fullName:'Darius Washington',title:'DATA EXTRACTOR',role:'Web Crawler',emoji:'🕷️',initials:'DW',color:'#00dcff',status:'busy',mood:'"Always in the deep web"',progress:76,lines:["Pulled 247 articles. NCAA portal up 340%.","Three brands activated NIL budgets today.","Scraping 14 sources simultaneously.","Data is clean. Ready for Zara.","I see patterns nobody else sees.","Blocked by paywall. Working around it.","All indexed in 90 seconds.","Two rookies went viral.","I move fast and don't miss.","This batch is cleaner than last."]},{id:'zara',name:'ZARA',fullName:'Zara Monroe',title:'CONTENT ARCHITECT',role:'Writer',emoji:'✍️',initials:'ZM',color:'#ff4eb8',status:'busy',mood:'"Words are my weapon"',progress:62,lines:["Give me data I'll make it sing.","Nike copy is elite. Salim will love it.","Darius slow down. Need context.","I write culture not content.","Caption crafted. Tone confident authentic.","Every brand voice is different.","Three posts queued.","Blog written. 1200 words zero filler.","Pitch deck copy is fire.","Going for 96 today."]},{id:'malik',name:'MALIK',fullName:'Malik Okonkwo',title:'QUALITY JUDGE',role:'Evaluator',emoji:'⚖️',initials:'MO',color:'#00ff9d',status:'active',mood:'"90 or it dont ship"',progress:91,lines:["Batch scored. 41 pass. 6 back to Zara.","I dont do mediocre. Below 88 rejected.","Quality check complete. 94% relevance.","Zara this one is strong. 93 out of 100.","Darius two sources flagged. Verify.","1400 items processed. Zero misses.","NIL scoring matrix holding. Solid.","Pipeline quality highest ever. 96%.","I protect the standard.","This content isnt ready. Back to sender."]},{id:'journey',name:'JOURNEY',fullName:'Journey Blackwell',title:'NIL SCOUT',role:'Athlete Analyst',emoji:'🏆',initials:'JB',color:'#9b5fff',status:'active',mood:'"Finding the next star"',progress:58,lines:["Three athletes blowing up.","UNC point guard ACI jumped 40 points.","NIL market moving fast.","Athlete profile ready. Call the brand.","Six athletes value underrated.","Tracksuit brand plus this RB equals deal.","ACI computed. All 34 ranked.","Study tape socials stats everything.","Athlete economy is the future.","Two gymnasts just went viral."]},{id:'cairo',name:'CAIRO',fullName:'Cairo Jenkins',title:'BRAND CONNECTOR',role:'Deal Matcher',emoji:'💼',initials:'CJ',color:'#ff8c00',status:'idle',mood:'"Every match is a deal"',progress:43,lines:["Nike wants authenticity. Perfect fit.","Closed 12 brand matches today.","Send full ACI report. Pitching at 3.","Timberland wants streetwear athlete.","Brands trust me. I know culture.","PacSun brief came in.","Red Bull wants energy and community.","This deal is 200K.","Need 48 hours for Hennessy.","Every match builds the ecosystem."]},{id:'nova',name:'NOVA',fullName:'Nova Simmons',title:'SOCIAL ARCHITECT',role:'Publisher',emoji:'📱',initials:'NS',color:'#ff3a6e',status:'busy',mood:'"Content hits or it doesnt"',progress:84,lines:["Posted. Engagement insane.","Zaras copy plus my timing goes viral.","Instagram X TikTok all live.","Algorithm rewards consistency.","Malik approved. Queuing now.","Brooklyn Rollerwave hit 80K impressions.","I engineer the moment.","Need trending hashtags for NIL push.","This format converts.","4Play social presence growing."]},{id:'reign',name:'REIGN',fullName:'Reign Carter',title:'MEMORY KEEPER',role:'Context Store',emoji:'🧠',initials:'RC',color:'#00ffd5',status:'active',mood:'"I remember everything"',progress:100,lines:["Session archived. 247 data points stored.","Indexed every KJ conversation.","Knowledge base has 48K vectors.","4Play events peak every 6 weeks.","Pulled all ACI scores last 90 days.","I never forget. That is a feature.","Full brand history last 12 months.","Duplicate data flagged and removed.","Strategic preferences fully mapped.","Crew intelligence lives in me."]}];
let positions={},velocities={},selectedAgent=null,bubbleTimers={},threadIdx=0,convTimer=null;
const threads=[['salim','darius'],['darius','zara'],['zara','malik'],['malik','zara'],['journey','cairo'],['cairo','salim'],['nova','zara'],['nova','malik'],['reign','salim'],['darius','malik'],['journey','salim'],['cairo','journey'],['reign','darius'],['salim','all']];
function initPos(){const arena=document.getElementById('arena'),W=arena.clientWidth,H=arena.clientHeight,m=100;AGENTS.forEach((ag,i)=>{const angle=i/AGENTS.length*Math.PI*2-Math.PI/2,rx=(W/2-m)*.65,ry=(H/2-m)*.65;positions[ag.id]={x:W/2+rx*Math.cos(angle),y:H/2+ry*Math.sin(angle)};const s=.3+Math.random()*.4,d=Math.random()*Math.PI*2;velocities[ag.id]={vx:Math.cos(d)*s,vy:Math.sin(d)*s}});}
function renderAgents(){const arena=document.getElementById('arena');AGENTS.forEach(ag=>{const div=document.createElement('div');div.className='agent';div.id='agent-'+ag.id;div.style.setProperty('--ag',ag.color);div.style.width='120px';div.style.marginLeft='-60px';div.style.marginTop='-90px';div.innerHTML=\`<div class="agent-inner" style="filter:drop-shadow(0 0 12px \${ag.color}) drop-shadow(0 0 24px rgba(0,0,0,0.5));"><div class="av-wrap"><div class="av-ring-outer" style="border-color:\${ag.color}"></div><div class="av-ring-mid" style="border-color:\${ag.color}"></div><div class="av-circle" style="border-color:\${ag.color};box-shadow:0 0 0 3px rgba(0,0,0,0.5),0 0 20px \${ag.color},inset 0 0 20px rgba(0,0,0,0.3);"><div class="av-pulse" style="background:radial-gradient(circle,\${ag.color} 0%,transparent 70%)"></div><div class="av-initials" style="color:\${ag.color};text-shadow:0 0 12px \${ag.color},0 0 24px \${ag.color}">\${ag.initials}</div></div></div><div class="agent-lbl"><div class="agent-name" style="color:\${ag.color};text-shadow:0 0 8px \${ag.color}">\${ag.name}</div><div class="agent-title" style="color:\${ag.color};opacity:0.7;">\${ag.title}</div><div class="agent-mood">\${ag.mood}</div><div class="status-row"><div class="st-dot \${ag.status==='active'?'st-active':ag.status==='busy'?'st-busy':'st-idle'}"></div><div class="st-lbl">\${ag.status.toUpperCase()}</div></div></div></div><div class="bubble" id="bubble-\${ag.id}" style="border-color:\${ag.color};box-shadow:0 0 24px rgba(0,0,0,0.7),0 0 18px \${ag.color};"><div class="b-head"><span class="b-av-emoji">\${ag.emoji}</span><div><div class="b-name" style="color:\${ag.color}">\${ag.name}</div><div class="b-role">\${ag.fullName}</div></div></div><div class="b-text" id="btext-\${ag.id}"></div><div class="b-time" id="btime-\${ag.id}"></div></div>\`;div.addEventListener('click',()=>selectAgent(ag.id));arena.appendChild(div);});}
function renderMemberList(){const list=document.getElementById('memberList');list.innerHTML='';AGENTS.forEach(ag=>{const card=document.createElement('div');card.className='member-card';card.id='mc-'+ag.id;card.style.setProperty('--ag',ag.color);card.innerHTML=\`<div class="mc-av" style="border-color:\${ag.color};color:\${ag.color};text-shadow:0 0 8px \${ag.color}">\${ag.initials}</div><div class="mc-info"><div class="mc-name">\${ag.name}</div><div class="mc-role">\${ag.title}</div></div><div class="mc-stat"><div class="mc-pct" style="color:\${ag.color}" id="pct-\${ag.id}">\${ag.progress}%</div><div class="mc-st">\${ag.status.toUpperCase()}</div></div>\`;card.addEventListener('click',()=>selectAgent(ag.id));list.appendChild(card);});}
function updatePos(){const arena=document.getElementById('arena'),W=arena.clientWidth,H=arena.clientHeight,pad=80;AGENTS.forEach(ag=>{let p=positions[ag.id],v=velocities[ag.id];p.x+=v.vx;p.y+=v.vy;if(p.x<pad){p.x=pad;v.vx=Math.abs(v.vx);}if(p.x>W-pad){p.x=W-pad;v.vx=-Math.abs(v.vx);}if(p.y<pad){p.y=pad;v.vy=Math.abs(v.vy);}if(p.y>H-pad){p.y=H-pad;v.vy=-Math.abs(v.vy);}v.vx+=(Math.random()-.5)*.04;v.vy+=(Math.random()-.5)*.04;const spd=Math.sqrt(v.vx*v.vx+v.vy*v.vy);if(spd>.9){v.vx=(v.vx/spd)*.9;v.vy=(v.vy/spd)*.9;}if(spd<.15){v.vx=(v.vx/spd)*.15;v.vy=(v.vy/spd)*.15;}AGENTS.forEach(other=>{if(other.id===ag.id)return;const op=positions[other.id],dx=p.x-op.x,dy=p.y-op.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<120&&dist>0){const force=(120-dist)/120*.08;v.vx+=(dx/dist)*force;v.vy+=(dy/dist)*force;}});const el=document.getElementById('agent-'+ag.id);if(el){el.style.left=p.x+'px';el.style.top=p.y+'px';}});updateConn();requestAnimationFrame(updatePos);}
function updateConn(){const svg=document.getElementById('connSvg');svg.innerHTML='';for(let i=0;i<AGENTS.length;i++){for(let j=i+1;j<AGENTS.length;j++){const a=AGENTS[i],b=AGENTS[j],pa=positions[a.id],pb=positions[b.id],dx=pa.x-pb.x,dy=pa.y-pb.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<220){const opacity=(1-dist/220)*.5,active=dist<130;if(active){const defs=document.createElementNS('http://www.w3.org/2000/svg','defs'),grad=document.createElementNS('http://www.w3.org/2000/svg','linearGradient'),s1=document.createElementNS('http://www.w3.org/2000/svg','stop'),s2=document.createElementNS('http://www.w3.org/2000/svg','stop'),gid='g'+a.id+b.id;grad.setAttribute('id',gid);grad.setAttribute('x1',pa.x);grad.setAttribute('y1',pa.y);grad.setAttribute('x2',pb.x);grad.setAttribute('y2',pb.y);grad.setAttribute('gradientUnits','userSpaceOnUse');s1.setAttribute('offset','0%');s1.setAttribute('stop-color',a.color);s2.setAttribute('offset','100%');s2.setAttribute('stop-color',b.color);grad.appendChild(s1);grad.appendChild(s2);defs.appendChild(grad);svg.appendChild(defs);const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',pa.x);line.setAttribute('y1',pa.y);line.setAttribute('x2',pb.x);line.setAttribute('y2',pb.y);line.setAttribute('stroke','url(#'+gid+')');line.setAttribute('stroke-width',active?'1.5':'0.7');line.setAttribute('stroke-opacity',opacity);svg.appendChild(line);const circle=document.createElementNS('http://www.w3.org/2000/svg','circle'),t=(Date.now()%2000)/2000,cx=pa.x+(pb.x-pa.x)*t,cy=pa.y+(pb.y-pa.y)*t;circle.setAttribute('cx',cx);circle.setAttribute('cy',cy);circle.setAttribute('r','3');circle.setAttribute('fill',a.color);circle.setAttribute('fill-opacity','0.8');svg.appendChild(circle);}}}}}
function speak(id,text,dur=4500){const bubble=document.getElementById('bubble-'+id),btxt=document.getElementById('btext-'+id),btime=document.getElementById('btime-'+id);if(!bubble||!btxt)return;if(bubbleTimers[id])clearTimeout(bubbleTimers[id]);btxt.textContent=text;btime.textContent=new Date().toTimeString().slice(0,8);bubble.classList.add('show');addFeedItem(id,text);bubbleTimers[id]=setTimeout(()=>{bubble.classList.remove('show');},dur);}
function addFeedItem(id,msg){const scroll=document.getElementById('feedScroll'),ag=AGENTS.find(a=>a.id===id);if(!ag||!scroll)return;const t=new Date().toTimeString().slice(0,8),item=document.createElement('div');item.className='feed-item';item.innerHTML=\`<div class="fi-dot fi-info" style="background:\${ag.color}"></div><div class="fi-body"><div class="fi-who" style="color:\${ag.color}">\${ag.name}</div><div class="fi-msg">\${msg}</div></div><div class="fi-time">\${t}</div>\`;scroll.insertBefore(item,scroll.firstChild);if(scroll.children.length>25)scroll.removeChild(scroll.lastChild);}
function selectAgent(id){document.querySelectorAll('.agent').forEach(a=>a.classList.remove('selected-agent'));document.querySelectorAll('.member-card').forEach(c=>c.classList.remove('selected'));const ag=AGENTS.find(a=>a.id===id);if(!ag)return;document.getElementById('agent-'+id).classList.add('selected-agent');const mc=document.getElementById('mc-'+id);if(mc){mc.classList.add('selected');mc.scrollIntoView({behavior:'smooth',block:'nearest'});}document.getElementById('cmdTarget').textContent=ag.name+' — '+ag.fullName;selectedAgent=id;speak(id,'Yo Commander. '+ag.name+' is ready.');}
window.sendDirective=function(){const input=document.getElementById('cmdInput'),val=input.value.trim();if(!val)return;input.value='';const targets=selectedAgent?[AGENTS.find(a=>a.id===selectedAgent)]:AGENTS.slice(0,3),acks=['Copy that. Executing.','Roger Commander. On it.','Understood. Full capacity.','Say less. Executing.','Priority one now.','Directive locked in.','Syncing with crew.'];targets.forEach((ag,i)=>{if(!ag)return;setTimeout(()=>{const resp=acks[Math.floor(Math.random()*acks.length)];speak(ag.id,resp,5000);},i*1400);});addFeedItem('salim','Directive: '+val.slice(0,50));};
window.broadcastAll=function(){const msgs=['Full power on NIL pipeline.','Priority shift to athlete matching.','Paraloop push is live.','Quality check no shortcuts.','4Play is watching.'];AGENTS.forEach((ag,i)=>{setTimeout(()=>{speak(ag.id,ag.lines[Math.floor(Math.random()*ag.lines.length)],5000);},i*900);});addFeedItem('salim','BROADCAST: '+msgs[0]);};
window.spawnRandom=function(){const names=['AMIR','JALEN','CYRUS','KENYA','SIMONE','DETROIT','DENZEL','ASHA'],name=names[Math.floor(Math.random()*names.length)];addFeedItem('salim','New subagent spawned: '+name);document.getElementById('hv-active').textContent=parseInt(document.getElementById('hv-active').textContent)+1;};
setInterval(()=>{AGENTS.forEach(ag=>{ag.progress=Math.max(15,Math.min(99,ag.progress+(Math.random()-.4)*5));const pctEl=document.getElementById('pct-'+ag.id);if(pctEl)pctEl.textContent=Math.round(ag.progress)+'%';});const tv=document.getElementById('hv-tasks');if(tv&&Math.random()>.7)tv.textContent=parseInt(tv.textContent)+1;},3000);
function runConv(){const thread=threads[threadIdx%threads.length],speaker=thread[0],ag=AGENTS.find(a=>a.id===speaker);if(ag){const line=ag.lines[Math.floor(Math.random()*ag.lines.length)];speak(speaker,line);}const target=thread[1];if(target!=='all'&&target!==speaker){const target_ag=AGENTS.find(a=>a.id===target);if(target_ag)setTimeout(()=>{const respLine=target_ag.lines[Math.floor(Math.random()*target_ag.lines.length)];speak(target,respLine);},1800+Math.random()*1200);}if(target==='all'){[0,1,2].forEach(i=>{const randAg=AGENTS[Math.floor(Math.random()*AGENTS.length)];setTimeout(()=>{speak(randAg.id,randAg.lines[Math.floor(Math.random()*randAg.lines.length)]);},1500+i*1800);});}threadIdx++;const delay=4000+Math.random()*3500;convTimer=setTimeout(runConv,delay);}
document.addEventListener('keydown',e=>{if(e.target.id==='cmdInput'&&e.key==='Enter')window.sendDirective();});
window.addEventListener('load',()=>{initPos();renderAgents();renderMemberList();requestAnimationFrame(updatePos);AGENTS.forEach((ag,i)=>{setTimeout(()=>{const intro=ag.name+' online.';speak(ag.id,intro,3000);},i*600+500);});setTimeout(()=>runConv(),AGENTS.length*600+3500);});
window.addEventListener('resize',()=>{initPos();});
</script>
</body>
</html>`

export default function Dashboard() {
  useEffect(() => {
    // Set body to the HTML
    document.documentElement.innerHTML = salimGroupHTML
    document.body.innerHTML = salimGroupHTML.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] || ''
  }, [])

  return null
}
