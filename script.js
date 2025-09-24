const loginForm=document.getElementById('loginForm');
const loginContainer=document.getElementById('login-container');
const gameContainer=document.getElementById('game-container');
const displayTeam=document.getElementById('displayTeam');
const displayCollege=document.getElementById('displayCollege');
const ship=document.getElementById('ship');
const treasure=document.getElementById('treasure');
const narrator=document.getElementById('narrator');

let currentPuzzle=parseInt(localStorage.getItem('currentPuzzle'))||1;

// login
loginForm.addEventListener('submit',(e)=>{
 e.preventDefault();
 const team=document.getElementById('teamName').value;
 const college=document.getElementById('collegeName').value;
 displayTeam.textContent=team;
 displayCollege.textContent=college;
 loginContainer.classList.add('hidden');
 gameContainer.classList.remove('hidden');
 initMap();
});

// set islands & ship
function initMap(){
 for(let i=1;i<=currentPuzzle;i++){
   unlockIsland(i);
 }
 moveShip(currentPuzzle);
 if(currentPuzzle>5){
   treasure.classList.remove('hidden');
   narrator.textContent="🏴‍☠️ Arr! Ye found the grand treasure, well done!";
 }
}

// unlock island
function unlockIsland(num){
 const island=document.querySelector(`.island[data-puzzle="${num}"]`);
 if(island){
   island.classList.remove('locked');
   island.classList.add('glow');
   island.addEventListener('click',()=>goToPuzzle(num));
 }
}

// move ship to island
function moveShip(num){
 const island=document.querySelector(`.island[data-puzzle="${num}"]`);
 if(island){
   ship.style.position="absolute";
   ship.style.top=(island.offsetTop-30)+"px";
   ship.style.left=(island.offsetLeft+30)+"px";
   ship.classList.add("sailing");
   setTimeout(()=>ship.classList.remove("sailing"),2000);
   narrator.textContent=`⚓ Sailing to Island ${num}...`;
 }
}

// complete puzzle after solve
function completePuzzle(num){
 if(num<5){
   currentPuzzle=num+1;
   localStorage.setItem('currentPuzzle',currentPuzzle);
   unlockIsland(currentPuzzle);
   moveShip(currentPuzzle);
   narrator.textContent=`☠ Well done! Island ${num} conquered. Onward!`;
 }else{
   currentPuzzle=6;
   localStorage.setItem('currentPuzzle',currentPuzzle);
   treasure.classList.remove('hidden');
   narrator.textContent="🏆 The treasure is yours, Captain!";
   alert('🏆 The treasure is yours!');
 }
}

// go to puzzle page
function goToPuzzle(num){
 narrator.textContent=`🧩 A challenge awaits ye on Island ${num}...`;
 window.location.href=`puzzle${num}.html`;
}

// Music toggle
const bgMusic=document.getElementById('bg-music');
const muteBtn=document.getElementById('muteBtn');
muteBtn.addEventListener('click',()=>{
 if(bgMusic.muted){bgMusic.muted=false;muteBtn.textContent='🔊';}
 else{bgMusic.muted=true;muteBtn.textContent='🔇';}
});
// login
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const team=document.getElementById('teamName').value;
    const college=document.getElementById('collegeName').value;
   
    // save for dashboard
    localStorage.setItem('teamName',team);
    localStorage.setItem('collegeName',college);
   
    // redirect to dashboard instead of map
    window.location.href="dashboard.html";
   });
   if(ans==="map"){
    alert('☠ Correct! Sailing to next island…');
    localStorage.setItem('previousPuzzle',1); // old
    localStorage.setItem('currentPuzzle',2); // new
    window.location.href='dashboard.html';
  }
// Pirate messages
const pirateQuotes = [
    "☠ Arr! Ye be sharp as a cutlass!",
    "⚓ Next stop: rum & riches!",
    "🏴‍☠️ Avast! Another victory for yer crew!",
    "💀 Beware, darker waters lie ahead..."
  ];
  
  // Pirate jokes/facts
  const pirateJokes = [
    "Why did no pirate go to school? Because they already knew the seven C’s!",
    "Pirates believed gold earrings improved eyesight.",
    "Arrr, parrots were prized for mimicking human voices!"
  ];
  
  // Play horn when docking
  function playHorn(){
    const horn = new Audio("pirate-horn.mp3");
    horn.play();
  }
  
  // Drop coins
  function dropCoins(count=5){
    for(let i=0;i<count;i++){
      const coin=document.createElement("div");
      coin.className="coin";
      coin.textContent="🪙";
      coin.style.left=Math.random()*100+"vw";
      document.body.appendChild(coin);
      setTimeout(()=>coin.remove(),2000);
    }
  }
  
  // Pirate narrator message
  function pirateTalk(){
    const msg = pirateQuotes[Math.floor(Math.random()*pirateQuotes.length)];
    document.getElementById('narrator').innerHTML =
      `<span class="pirate-bubble">${msg}</span>`;
  }
  
  // Call after puzzle completion
  function puzzleCompleted(){
    dropCoins();
    pirateTalk();
    playHorn();
    // also show a random joke
    alert(pirateJokes[Math.floor(Math.random()*pirateJokes.length)]);
  }
  function makeRain(count=30){
    const weather=document.getElementById("weather");
    weather.innerHTML="";
    for(let i=0;i<count;i++){
      const drop=document.createElement("div");
      drop.className="rain";
      drop.style.left=Math.random()*100+"vw";
      drop.style.animationDelay=Math.random()+"s";
      drop.style.animationDuration=0.5+Math.random()*0.5+"s";
      weather.appendChild(drop);
    }
  }
  
  function makeLightning(){
    const flash=document.createElement("div");
    flash.className="lightning";
    document.body.appendChild(flash);
    setTimeout(()=>flash.remove(),300);
  }
  
  function makeClouds(){
    const weather=document.getElementById("weather");
    for(let i=0;i<3;i++){
      const cloud=document.createElement("div");
      cloud.className="cloud";
      cloud.textContent="☁️";
      cloud.style.top=(10+Math.random()*40)+"%";
      cloud.style.fontSize=(2+Math.random()*2)+"rem";
      cloud.style.animationDuration=(40+Math.random()*40)+"s";
      weather.appendChild(cloud);
    }
  }
  
  // Cycle weather every few minutes
  function cycleWeather(){
    const rand=Math.random();
    if(rand<0.4){ makeRain(30); }
    else if(rand<0.6){ makeLightning(); }
    else { makeClouds(); }
  }
  setInterval(cycleWeather, 10000); // every 10s for demo (change to minutes)
  function showTreasureChest(){
    const chest=document.createElement("div");
    chest.className="chest";
    chest.textContent="🧰";
    document.body.appendChild(chest);
  
    setTimeout(()=>chest.classList.add("open"),500);
  
    for(let i=0;i<6;i++){
      const loot=document.createElement("div");
      loot.className="loot";
      loot.textContent=["🪙","💎","💀"][Math.floor(Math.random()*3)];
      loot.style.left=Math.random()*100+"vw";
      document.body.appendChild(loot);
      setTimeout(()=>loot.remove(),1500);
    }
    setTimeout(()=>chest.remove(),2000);
  }
  const mascotEmoji=["🐒","🦜","🐠","🦀"]
  
  document.addEventListener('DOMContentLoaded',()=>{
    const team=localStorage.getItem('teamName')||"Unknown Crew";
    const college=localStorage.getItem('collegeName')||"Unknown Port";
    const progress=parseInt(localStorage.getItem('currentPuzzle'))||1;
    const prevProgress=parseInt(localStorage.getItem('previousPuzzle'))||0;
  
    document.getElementById('dashTeam').textContent=team;
    document.getElementById('dashCollege').textContent=college;
  
    let completed=progress-1;
    if(progress>5) completed=5;
    document.getElementById('completedCount').textContent=completed;
  
    // Mark completed ports
    for(let i=1;i<=5;i++){
      const port=document.getElementById('port'+i).querySelector('.status');
      if(i<=completed){
        port.textContent="✅ Docked";
        document.getElementById('port'+i).classList.add("completed");
      }else{
        port.textContent="❌ Not Reached";
      }
    }
    // Mark completed ports & unlock next
  for(let i=1;i<=5;i++){
    const portEl=document.getElementById('port'+i);
    const status=portEl.querySelector('.status');
  
    if(i<=completed){
      status.textContent="✅ Docked";
      portEl.classList.add("completed");
      portEl.classList.remove("locked");
    } else if(i===completed+1){
      status.textContent="⛵ Ready to Sail";
      portEl.classList.remove("locked");
    } else {
      status.textContent="❌ Locked";
      portEl.classList.add("locked");
    }
  }
  
    // Place & animate ship
    const shipIcon=document.getElementById('shipIcon');
    if(completed>=1){
      const lastPort=document.getElementById('port'+completed);
  
      // Position instantly if no previous progress
      if(prevProgress===0 || prevProgress===completed){
        shipIcon.style.top=(lastPort.offsetTop-30)+"px";
        shipIcon.style.left=(lastPort.offsetLeft+40)+"px";
        shipIcon.style.display="block";
      } else {
        // Animate from prevPort to newPort
        const prevPort=document.getElementById('port'+prevProgress);
        shipIcon.style.top=(prevPort.offsetTop-30)+"px";
        shipIcon.style.left=(prevPort.offsetLeft+40)+"px";
        shipIcon.style.display="block";
  
        setTimeout(()=>{
          shipIcon.style.top=(lastPort.offsetTop-30)+"px";
          shipIcon.style.left=(lastPort.offsetLeft+40)+"px";
        },200); // trigger transition
      }
    } else {
      shipIcon.style.display="none";
    }
  
    // Save progress for next load
    localStorage.setItem('previousPuzzle',completed);
    port.innerHTML="✅ Docked <span class='mascot'>" + mascotEmoji[i] + "</span>";
  
    // Button action
    document.getElementById('sailBtn').addEventListener('click',()=>{
      window.location.href="index.html";
    });
  });
  // Mark completed ports & unlock next
for (let i = 1; i <= 5; i++) {
  const portEl = document.getElementById('port' + i);
  const status = portEl.querySelector('.status');

  if (i <= completed) {
    status.textContent = "✅ Docked";
    portEl.classList.add("completed");
    portEl.classList.remove("locked");
  } else if (i === completed + 1) {
    status.textContent = "⛵ Ready to Sail";
    portEl.classList.remove("locked");
  } else {
    status.textContent = "❌ Locked";
    portEl.classList.add("locked");
  }
}
function showCongrats() {
  document.getElementById("congratsScreen").classList.remove("hidden");
  launchFireworks();
  dropTreasure();
}

function launchFireworks() {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const fw = document.createElement("div");
      fw.className = "firework";
      fw.style.left = Math.random() * 100 + "vw";
      fw.style.background = ["red","gold","cyan","lime"][Math.floor(Math.random()*4)];
      document.body.appendChild(fw);
      setTimeout(() => fw.remove(), 1000);
    }, i * 300);
  }
}

function dropTreasure(count=15) {
  for(let i=0;i<count;i++){
    const loot=document.createElement("div");
    loot.className="coin";
    loot.textContent=["🪙","💎","👑","⚔️","💀"][Math.floor(Math.random()*5)];
    loot.style.left=Math.random()*100+"vw";
    document.body.appendChild(loot);
    setTimeout(()=>loot.remove(),2000);
  }
}

function goHome() {
  document.getElementById("congratsScreen").classList.add("hidden");
  window.location.href="dashboard.html";
}
const jackQuotes = [
  "Arrr, ye be the Kings of the Seas! 🍻",
  "Savvy? The treasure be yours now! 💰",
  "Drink up, me hearties, yo ho! 🍺",
  "Ye outsmarted every scallywag in the seven seas! ⚓"
];

function jackTalk() {
  const msg = jackQuotes[Math.floor(Math.random()*jackQuotes.length)];
  document.getElementById("jackSpeech").textContent = msg;
}
// Show pirate trail as progress
for (let i=1; i<completed; i++) {
  document.getElementById("path"+i).classList.add("show");
}
if (completed > prevProgress) {
  const newPath = document.getElementById("path"+prevProgress);
  if (newPath) newPath.classList.add("show");
}
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const teamName = document.getElementById("teamName").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  try {
    const ref = doc(db, "teams", teamName);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      const data = snap.data();
      if (data.password === password) {
        // ✅ Valid
        localStorage.setItem("teamName", data.teamName);
        localStorage.setItem("currentPuzzle", 1);
        window.location.href = "dashboard.html";
      } else {
        alert("❌ Wrong password!");
      }
    } else {
      alert("❌ Team not found!");
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Error connecting to database.");
  }
});
         