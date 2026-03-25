/* ── Mock responses (swap for real API later) ───── */
const MOCK_RESPONSES = [
  {
    team: "🏀 Purdue Boilermakers",
    expertTake:
      "Their inside-out game creates too much gravity in the paint, leaving the perimeter wide open. Zach Edey's post presence forces constant double-teams, generating open catch-and-shoot threes at an elite clip.",
    actualMeaning:
      "They have really tall guys near the basket, so the other team panics, leaving the shooters totally unguarded. Basically a cheat code."
  },
  {
    team: "🐊 Florida Gators",
    expertTake:
      "Florida's transition offense ranks top-10 nationally in points per possession. Their backcourt's ability to push pace after defensive rebounds creates mismatches before the defense can set.",
    actualMeaning:
      "They run REALLY fast after grabbing the ball. By the time the other team turns around, Florida already scored. It's basically a fast-break party."
  },
  {
    team: "🐅 Auburn Tigers",
    expertTake:
      "Auburn's switching defense and versatile 4-out-1-in motion offense generate elite shot quality. Their rim protection numbers combined with a 40%+ three-point clip make them nearly unguardable on both ends.",
    actualMeaning:
      "They shoot threes like they're playing NBA 2K on rookie mode AND block everything at the rim. It's honestly unfair. Good luck scoring on them."
  }
];

/* ── DOM refs ──────────────────────────────────────── */
const pickBtn = document.getElementById("pickBtn");
const resultCard = document.getElementById("resultCard");
const teamName = document.getElementById("teamName");
const expertTake = document.getElementById("expertTake");
const actualMeaning = document.getElementById("actualMeaning");

let lastIndex = -1;

/* ── Simulate an API call ─────────────────────────── */
function getSmartPick() {
  // Pick a random response, avoid repeating the last one
  let idx;
  do {
    idx = Math.floor(Math.random() * MOCK_RESPONSES.length);
  } while (idx === lastIndex && MOCK_RESPONSES.length > 1);
  lastIndex = idx;
  return MOCK_RESPONSES[idx];
}

/* ── Button handler ───────────────────────────────── */
pickBtn.addEventListener("click", () => {
  // Show loading state
  pickBtn.classList.add("loading");
  const btnText = pickBtn.querySelector(".pick-btn__text");
  btnText.textContent = "Analyzing matchups…";

  // Hide previous card with a brief delay to re-trigger animation
  resultCard.classList.add("hidden");

  // Simulate network latency (400-900ms) for a realistic feel
  const delay = 400 + Math.random() * 500;

  setTimeout(() => {
    const pick = getSmartPick();

    teamName.textContent = pick.team;
    expertTake.textContent = pick.expertTake;
    actualMeaning.textContent = pick.actualMeaning;

    // Reveal card
    resultCard.classList.remove("hidden");
    // Force re-trigger CSS animation
    resultCard.style.animation = "none";
    resultCard.offsetHeight; // reflow
    resultCard.style.animation = "";

    // Reset button
    pickBtn.classList.remove("loading");
    btnText.textContent = "Give Me Another Pick";
  }, delay);
});

/* ── Bracket Hover Stats ──────────────────────────── */
const TEAM_STATS = {
  "Texas": { standing: "28-7", ppg: "78.4", topPlayer: "Tre Johnson (21.2 PPG)" },
  "Purdue": { standing: "30-5", ppg: "81.2", topPlayer: "Fletcher Loyer (15.5 PPG)" },
  "Iowa": { standing: "25-10", ppg: "83.1", topPlayer: "Payton Sandfort (18.1 PPG)" },
  "Nebraska": { standing: "24-11", ppg: "76.5", topPlayer: "Brice Williams (16.2 PPG)" },
  "Arkansas": { standing: "26-9", ppg: "79.8", topPlayer: "Johnell Davis (19.4 PPG)" },
  "Arizona": { standing: "27-8", ppg: "85.6", topPlayer: "Caleb Love (18.9 PPG)" },
  "Illinois": { standing: "28-7", ppg: "80.4", topPlayer: "Kylan Boswell (14.2 PPG)" },
  "Houston": { standing: "32-3", ppg: "72.4", topPlayer: "L.J. Cryer (17.5 PPG)" },
  "St. John's": { standing: "25-10", ppg: "77.9", topPlayer: "Kadary Richmond (15.8 PPG)" },
  "Duke": { standing: "29-6", ppg: "82.3", topPlayer: "Cooper Flagg (19.5 PPG)" },
  "Alabama": { standing: "27-8", ppg: "88.2", topPlayer: "Mark Sears (20.1 PPG)" },
  "Michigan": { standing: "28-7", ppg: "79.1", topPlayer: "Vlad Goldin (16.5 PPG)" },
  "UConn": { standing: "33-2", ppg: "84.5", topPlayer: "Alex Karaban (18.6 PPG)" },
  "Michigan St.": { standing: "25-10", ppg: "75.8", topPlayer: "Jaden Akins (14.9 PPG)" },
  "Tennessee": { standing: "29-6", ppg: "78.9", topPlayer: "Zakai Zeigler (13.8 PPG)" },
  "Iowa State": { standing: "30-5", ppg: "76.2", topPlayer: "Tamin Lipsey (15.3 PPG)" }
};

const bracketTeams = document.querySelectorAll('.bracket__team');
const statsTooltip = document.getElementById('statsTooltip');

bracketTeams.forEach(teamEl => {
  teamEl.style.cursor = 'pointer'; // let users know it's hoverable
  
  teamEl.addEventListener('mouseenter', (e) => {
    // Extract name without the seed number
    const textNodes = Array.from(teamEl.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent.trim());
    
    // The text after the seed span
    const teamName = textNodes.join('').trim();
    
    const stats = TEAM_STATS[teamName];
    if (stats) {
      statsTooltip.innerHTML = `
        <h4>${teamName}</h4>
        <p><strong>Record:</strong> ${stats.standing}</p>
        <p><strong>Offense:</strong> ${stats.ppg} PPG</p>
        <p><strong>Key Player:</strong> ${stats.topPlayer}</p>
      `;
      statsTooltip.classList.add('visible');
    }
  });
  
  teamEl.addEventListener('mousemove', (e) => {
    // Follow the mouse
    statsTooltip.style.left = e.clientX + 'px';
    statsTooltip.style.top = e.clientY + 'px';
  });
  
  teamEl.addEventListener('mouseleave', () => {
    statsTooltip.classList.remove('visible');
  });
});
