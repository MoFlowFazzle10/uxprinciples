const PRINCIPLES = [
  {
    title: "Clarity at a glance, depth on demand",
    belief:
      "Energy is genuinely complex, but users open the app to feel everything's handled, not to study it. They want the whole picture in one glance, and the freedom to go deeper only if they choose.",
    therefore:
      "We lead every screen with the simplest meaningful view for this moment, and layer detail beneath it (peel the onion). We adapt what we show to the user, break complexity into digestible chunks, and never overload the surface - strong focus over completeness.",
    question:
      "Could a user grasp this screen at a glance, and find the depth only if they go looking?",
  },
  {
    title: "One solution, every setup",
    belief:
      "Our users come with very different offerings and setups, features should think about the whole universe, not just a single planet.",
    therefore:
      "We imagine every feature to flex across the different offerings and configurations we support, solving for the general case and letting the specifics adapt - rather than building a one-off that fits a single setup.",
    question:
      "Does this hold up across all our offerings and setups - can it be utilised or have we quietly built it for just one?",
  },
  {
    title: "Nudge when it pays off",
    belief:
      "People happily build better habits when the benefit is clear and the hint lands in the right moment - they don't come to be taught.",
    therefore:
      "We teach only through subtle, optional nudges placed exactly where and when they help, tied to the moment in the journey - never generic. The surface stays light; deeper explanation lives one layer down, there for anyone who wants it and invisible to anyone who doesn't.",
    question:
      "Does this nudge appear at the exact moment it benefits the user - and can they ignore it without missing anything essential?",
  },
  {
    title: "A companion, not a control panel",
    belief:
      "Energy is full of technical terms and big numbers - watts, kWh, CO\u2082 - that often mean little to most people and can quickly be overwhelming.",
    therefore:
      "We keep interactions warm, personal and human, and translate complex figures into relatable comparisons people instantly picture - like loads of laundry, cars charged or trees planted - so the app feels like a friendly companion in the home, not a technical dashboard. We only use technical numbers, when we are certain they are understood.",
    question:
      "Would this feel like a friendly companion talking to me - and did we turn the raw numbers into a comparison a typical user can picture?",
  },
  {
    title: "Lead with the win, not the analysis",
    belief:
      "People want proof they made the right choice - they open the app to see their savings and feel the system is working for them, not to run a deep analysis.",
    therefore:
      "We put the outcomes that show the win first - money saved, energy saved, consumption and production - and keep deep analysis secondary, so opening the app reassures users their decision is paying off and the system is quietly working in their favour.",
    question:
      "Does this make the user feel their choice paid off and the system is working for them - before any deep analysis?",
  },
];

const homeView = document.getElementById("home");
const detailView = document.getElementById("detail");
const grid = document.getElementById("principle-grid");
const detailTitle = document.getElementById("detail-title");
const detailContent = document.getElementById("detail-content");
const detailCount = document.getElementById("detail-count");
const prevLink = document.getElementById("prev-link");
const nextLink = document.getElementById("next-link");

function pad(n) {
  return String(n).padStart(2, "0");
}

function buildGrid() {
  PRINCIPLES.forEach((p, i) => {
    const li = document.createElement("li");
    const card = document.createElement("a");
    card.className = "card";
    card.href = `#/principle/${i}`;
    card.innerHTML = `
      <h3 class="card__title">${p.title}</h3>
      <span class="card__index">${pad(i + 1)}</span>
    `;
    li.appendChild(card);
    grid.appendChild(li);
  });
}

function renderDetail(index) {
  const p = PRINCIPLES[index];
  detailTitle.textContent = p.title;
  detailCount.textContent = `${pad(index + 1)} / ${pad(PRINCIPLES.length)}`;
  detailContent.innerHTML = `
    <section class="block">
      <p class="block__label">Belief</p>
      <p class="block__text">${p.belief}</p>
    </section>
    <section class="block">
      <p class="block__label">Therefore</p>
      <p class="block__text">${p.therefore}</p>
    </section>
    <section class="block">
      <p class="block__label">Guiding question</p>
      <p class="block__text">${p.question}</p>
    </section>
  `;

  if (index > 0) {
    prevLink.href = `#/principle/${index - 1}`;
    prevLink.hidden = false;
  } else {
    prevLink.hidden = true;
  }

  if (index < PRINCIPLES.length - 1) {
    nextLink.href = `#/principle/${index + 1}`;
    nextLink.hidden = false;
  } else {
    nextLink.hidden = true;
  }

  document.title = `${p.title} — UX Principles`;
}

function showHome() {
  detailView.hidden = true;
  homeView.hidden = false;
  document.title = "UX Principles — Customer Apps";
}

function showDetail(index) {
  renderDetail(index);
  homeView.hidden = true;
  detailView.hidden = false;
  window.scrollTo(0, 0);
}

function router() {
  const match = location.hash.match(/^#\/principle\/(\d+)$/);
  if (match) {
    const index = Number(match[1]);
    if (index >= 0 && index < PRINCIPLES.length) {
      showDetail(index);
      return;
    }
  }
  showHome();
}

buildGrid();
window.addEventListener("hashchange", router);
router();
