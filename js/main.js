/* GJVENZA Technologies - website interactions */

// References to the page elements.
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const currentYear = document.getElementById("currentYear");

// Display the current year in the footer.
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Set up dark mode if the toggle exists.
if (themeToggle) {
    const storageKey = "gjvenza-theme";
    const themeToggleIcon = document.getElementById("themeToggleIcon");
    const themeToggleLabel = document.getElementById("themeToggleLabel");

    // Restore the saved theme, or use the visitor's system preference.
    const savedTheme = localStorage.getItem(storageKey);
    const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme =
        savedTheme || (systemPrefersDark ? "dark" : "light");

    // Apply a theme and keep the button's accessible state in sync.
    function applyTheme(theme) {
        root.setAttribute("data-bs-theme", theme);

        const darkModeEnabled = theme === "dark";

// Show a sun in dark mode and a moon in light mode.
themeToggleIcon.className = darkModeEnabled
    ? "bi bi-sun-fill"
    : "bi bi-moon-stars-fill";

// Keep the control accessible without visible text.
const accessibleLabel = darkModeEnabled
    ? "Switch to light mode"
    : "Switch to dark mode";

themeToggleLabel.textContent = accessibleLabel;
themeToggle.setAttribute("aria-label", accessibleLabel);
themeToggle.setAttribute("title", accessibleLabel);
themeToggle.setAttribute("aria-pressed", String(darkModeEnabled));
    }

    // Apply the initial theme when the page loads.
    applyTheme(initialTheme);

    // Toggle between light and dark modes when clicked.
    themeToggle.addEventListener("click", function () {
        const currentTheme = root.getAttribute("data-bs-theme");

        const nextTheme =
            currentTheme === "dark" ? "light" : "dark";

        applyTheme(nextTheme);

        // Remember the visitor's choice for the next visit.
        localStorage.setItem(storageKey, nextTheme);
    });
}