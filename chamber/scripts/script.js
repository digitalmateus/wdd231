const currentYear = new Date().getFullYear();
const lastModified = document.lastModified; 

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});

  const welcomeMessage = document.getElementById('welcome-message');
  const lastVisitKey = 'lastVisit';
  const now = Date.now();
  const msInOneDay = 1000 * 60 * 60 * 24;

  const lastVisit = localStorage.getItem(lastVisitKey);

  if (!lastVisit) {
    // First visit
    welcomeMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDiff = now - parseInt(lastVisit, 10);
    const daysPassed = Math.floor(timeDiff / msInOneDay);

    if (daysPassed < 1) {
      welcomeMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayLabel = daysPassed === 1 ? "day" : "days";
      welcomeMessage.textContent = `You last visited ${daysPassed} ${dayLabel} ago.`;
    }
  }

  // Store current visit time
  localStorage.setItem(lastVisitKey, now.toString());
