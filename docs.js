// Sidebar highlighting and search for static HTML docs

const navLinks = document.querySelectorAll(".nav-link");
const searchInput = document.getElementById("search");
const mainContent = document.getElementById("main-content");
const sections = Array.from(mainContent.querySelectorAll("section"));

// Highlight active link on click and hashchange
function highlightActiveLink(hash) {
  navLinks.forEach((link) => link.classList.remove("active"));
  hash = hash || window.location.hash || "#introduction";
  const active = document.querySelector(`.nav-link[href="${hash}"]`);
  if (active) active.classList.add("active");
}
window.addEventListener("hashchange", () => highlightActiveLink());
navLinks.forEach((link) =>
  link.addEventListener("click", function () {
    highlightActiveLink(this.getAttribute("href"));
  })
);
highlightActiveLink();

// Search/filter sidebar
searchInput.addEventListener("input", function () {
  const val = this.value.toLowerCase();
  navLinks.forEach((link) => {
    const text = link.textContent.toLowerCase();
    link.parentElement.style.display = text.includes(val) ? "" : "none";
  });
});

// Smooth scroll to section on click
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = link.getAttribute("href").slice(1);
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scrollspy: highlight sidebar as you scroll
mainContent.addEventListener("scroll", function () {
  let currentSection = sections[0];
  const scrollPos = mainContent.scrollTop + 80; // 80px offset for header
  for (const section of sections) {
    if (section.offsetTop <= scrollPos) {
      currentSection = section;
    }
  }
  highlightActiveLink("#" + currentSection.id);
});

// Also trigger scrollspy on page load
mainContent.dispatchEvent(new Event("scroll"));

// Add copy button to all code blocks
function addCopyButtons() {
  // Add to <pre><code> blocks (existing logic)
  document.querySelectorAll("pre > code").forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (pre.querySelector(".copy-btn")) return; // Only add once
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.title = "Copy code";
    btn.innerHTML = "📋";
    btn.style.position = "absolute";
    btn.style.top = "8px";
    btn.style.right = "8px";
    btn.style.background = "rgba(30,30,30,0.8)";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "4px";
    btn.style.padding = "0.2em 0.5em";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "1em";
    btn.style.zIndex = "2";
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        btn.innerHTML = "✅";
        setTimeout(() => {
          btn.innerHTML = "📋";
        }, 1200);
      });
    });
    pre.style.position = "relative";
    pre.appendChild(btn);
  });

  // Add to <pre> blocks that do NOT contain a <code> child
  document.querySelectorAll("pre").forEach((pre) => {
    // Skip if already handled above (has <code> child)
    if (pre.querySelector("code")) return;
    if (pre.querySelector(".copy-btn")) return; // Only add once
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.title = "Copy code";
    btn.innerHTML = "📋";
    btn.style.position = "absolute";
    btn.style.top = "8px";
    btn.style.right = "8px";
    btn.style.background = "rgba(30,30,30,0.8)";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "4px";
    btn.style.padding = "0.2em 0.5em";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "1em";
    btn.style.zIndex = "2";
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.innerHTML = "✅";
        setTimeout(() => {
          btn.innerHTML = "📋";
        }, 1200);
      });
    });
    pre.style.position = "relative";
    pre.appendChild(btn);
  });
}
addCopyButtons();

document.getElementById("copyright-year").textContent =
  new Date().getFullYear();

// Dark mode toggle logic
const darkToggles = document.querySelectorAll("#darkmode-toggle");
const html = document.documentElement;
function setTheme(theme) {
  if (theme === "light") {
    html.setAttribute("data-theme", "light");
    darkToggles.forEach((btn) => (btn.textContent = "☀️"));
  } else {
    html.setAttribute("data-theme", "dark");
    darkToggles.forEach((btn) => (btn.textContent = "🌙"));
  }
  localStorage.setItem("theme", theme);
}
function toggleTheme() {
  const current = html.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}
darkToggles.forEach((btn) => btn.addEventListener("click", toggleTheme));
// On load, set theme from localStorage or default to dark
const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme || "dark");

// Sidebar mobile toggle
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");
const sidebarBackdrop = document.querySelector(".sidebar-backdrop");
function openSidebar() {
  sidebar.classList.add("open");
  document.body.classList.add("sidebar-open");
  if (sidebarBackdrop) sidebarBackdrop.classList.remove("hide");
}
function closeSidebar() {
  sidebar.classList.remove("open");
  document.body.classList.remove("sidebar-open");
  if (sidebarBackdrop) sidebarBackdrop.classList.add("hide");
}
sidebarToggle.addEventListener("click", function () {
  if (sidebar.classList.contains("open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
});
if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener("click", function () {
    closeSidebar();
  });
}
content.addEventListener("click", function (e) {
  if (window.innerWidth <= 900 && sidebar.classList.contains("open")) {
    closeSidebar();
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && sidebar.classList.contains("open")) {
    closeSidebar();
  }
});
