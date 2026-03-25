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
