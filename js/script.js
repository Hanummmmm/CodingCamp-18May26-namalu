// js/script.js

// CLOCK & GREETING
function updateClock() {

  const now = new Date();

  const time = now.toLocaleTimeString();
  const date = now.toDateString();

  document.getElementById("clock").textContent = time;
  document.getElementById("date").textContent = date;

  const hour = now.getHours();

  let greeting = "Good Evening 🌙";

  if (hour < 12) {
    greeting = "Good Morning 🌤️";
  } else if (hour < 18) {
    greeting = "Good Afternoon ☀️";
  }

  document.getElementById("greeting").textContent = greeting;
}

setInterval(updateClock, 1000);
updateClock();

// DAILY QUOTE
const quotes = [
  "Small progress is still progress ✨",
  "Stay focused and never give up 🚀",
  "Make today productive 💡",
  "Dream big, start small 🌤️",
  "One task at a time ✅"
];

const randomQuote =
  quotes[Math.floor(Math.random() * quotes.length)];

document.getElementById("quote").textContent = randomQuote;

// TIMER
let timer;
let timeLeft = 25 * 60;

const timerDisplay = document.getElementById("timer");
const timerSelect = document.getElementById("timerSelect");

function updateTimerDisplay() {

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

timerSelect.addEventListener("change", () => {

  clearInterval(timer);

  timeLeft = timerSelect.value * 60;

  updateTimerDisplay();

});

document.getElementById("startBtn").addEventListener("click", () => {

  clearInterval(timer);

  timer = setInterval(() => {

    if (timeLeft > 0) {

      timeLeft--;
      updateTimerDisplay();

    } else {

      clearInterval(timer);

      alert("Time's up! ⏰");

    }

  }, 1000);

});

document.getElementById("pauseBtn").addEventListener("click", () => {
  clearInterval(timer);
});

document.getElementById("resetBtn").addEventListener("click", () => {

  clearInterval(timer);

  timeLeft = timerSelect.value * 60;

  updateTimerDisplay();

});

updateTimerDisplay();

// TASK
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {

  const completedTasks =
    tasks.filter(task => task.completed).length;

  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : (completedTasks / totalTasks) * 100;

  document.getElementById("progress").style.width =
    `${progress}%`;

  document.getElementById("progressText").textContent =
    `${Math.round(progress)}% Completed`;
}

function renderTasks() {

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");

    li.classList.add("task-item");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>

      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);

  });

  updateProgress();
}

function addTask() {

  const text = taskInput.value.trim();

  if (text === "") return;

  const duplicate = tasks.some(
    task => task.text.toLowerCase() === text.toLowerCase()
  );

  if (duplicate) {
    alert("Task already exists!");
    return;
  }

  tasks.push({
    text,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = "";
}

function toggleTask(index) {

  tasks[index].completed = !tasks[index].completed;

  saveTasks();
  renderTasks();
}

function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();
  renderTasks();
}

function editTask(index) {

  const updated = prompt("Edit task:", tasks[index].text);

  if (updated !== null && updated.trim() !== "") {

    tasks[index].text = updated;

    saveTasks();
    renderTasks();
  }
}

// ENTER KEY
taskInput.addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    addTask();
  }

});

addTaskBtn.addEventListener("click", addTask);

renderTasks();

// QUICK LINKS
const linksContainer =
  document.getElementById("linksContainer");

const linkName =
  document.getElementById("linkName");

const linkURL =
  document.getElementById("linkURL");

const addLinkBtn =
  document.getElementById("addLinkBtn");

let links = JSON.parse(localStorage.getItem("links")) || [

  {
    name: "Google",
    url: "https://google.com"
  },

  {
    name: "YouTube",
    url: "https://youtube.com"
  },

  {
    name: "GitHub",
    url: "https://github.com"
  }

];

function saveLinks() {
  localStorage.setItem("links", JSON.stringify(links));
}

function renderLinks() {

  linksContainer.innerHTML = "";

  links.forEach((link) => {

    const div = document.createElement("div");

    div.classList.add("link-card");

    div.innerHTML = `
      <a href="${link.url}" target="_blank">
        ${link.name}
      </a>
    `;

    linksContainer.appendChild(div);

  });

}

addLinkBtn.addEventListener("click", () => {

  const name = linkName.value.trim();
  const url = linkURL.value.trim();

  if (!name || !url) return;

  links.push({
    name,
    url
  });

  saveLinks();
  renderLinks();

  linkName.value = "";
  linkURL.value = "";

});

renderLinks();

// DARK MODE
const darkModeBtn =
  document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );

});

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}