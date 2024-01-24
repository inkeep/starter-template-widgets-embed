document.addEventListener("DOMContentLoaded", (event) => {
  const colorModeToggle = document.getElementById("color-mode-toggle");
  colorModeToggle.addEventListener("click", () => {
    colorModeToggle.innerText = document.documentElement.classList.contains(
      "dark"
    )
      ? "🌞"
      : "🌚";
    const html = document.querySelector("html");
    html.classList.toggle("dark");
  });
});
