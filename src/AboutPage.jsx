import React, { useEffect, useState } from "react";
import "./App.css";

const ABOUT_COPY = {
  en: {
    eyebrow: "ABOUT THIS TIMETABLE",
    title: "About & How to Use",
    introduction: "Bus Timer displays the bus departure times listed for travel between Kaliyattamukku and Chemmad in both directions.",
    stepsTitle: "How to use it",
    steps: [
      "Choose a direction using the route buttons above the timetable.",
      "Search by bus name or departure time. Choose a route suggestion to switch directions, or use All buses and Favourites to filter the selected direction.",
      "Select a departure row to add it to Recently viewed. Use the heart button to add or remove a favourite.",
      "Select an item in Recently viewed to switch to its direction and highlight its row. Select Clear to remove the recent list.",
    ],
    timerTitle: "Next departure timer",
    timer: "The Next Bus panel shows the next listed departure for the selected direction. It compares the timetable with your device's local clock and refreshes about every 30 seconds. The time remaining is shown in whole minutes.",
    limitsTitle: "Important to know",
    limits: [
      "This page displays listed departure times; it does not provide live vehicle tracking or real-time delay information.",
      "The timer uses your device's local time. When no later departure is listed today, the panel says there are no upcoming departures.",
      "Traffic or other delays can change actual departure times. Favourites and recently viewed items are saved only in this browser and are not synced.",
    ],
    toggleLabel: "To Malayalam",
    toggleAccessibleLabel: "Show this section in Malayalam",
  },
  ml: {
    eyebrow: "ഈ സമയപ്പട്ടികയെക്കുറിച്ച്",
    title: "പരിചയവും ഉപയോഗിക്കേണ്ട വിധവും",
    introduction: "കളിയാട്ടമുക്കിനും ചെമ്മാടിനും ഇടയിലുള്ള രണ്ട് ദിശകളിലെയും പട്ടികപ്പെടുത്തിയ ബസ് പുറപ്പെടൽ സമയങ്ങളാണ് ബസ് ടൈമറിൽ കാണിക്കുന്നത്.",
    stepsTitle: "എങ്ങനെ ഉപയോഗിക്കാം",
    steps: [
      "സമയപ്പട്ടികയ്ക്ക് മുകളിലുള്ള റൂട്ട് ബട്ടണുകളിൽ നിന്ന് യാത്രാദിശ തിരഞ്ഞെടുക്കുക.",
      "ബസിന്റെ പേരോ പുറപ്പെടൽ സമയമോ തിരയുക. ദിശ മാറ്റാൻ തിരയൽ നിർദ്ദേശങ്ങളിലെ റൂട്ട് തിരഞ്ഞെടുക്കുക. തിരഞ്ഞെടുത്ത ദിശയിലെ പട്ടിക ചുരുക്കാൻ എല്ലാ ബസുകളും അല്ലെങ്കിൽ പ്രിയപ്പെട്ടവയും തിരഞ്ഞെടുക്കാം.",
      "ഒരു പുറപ്പെടൽ വരി തിരഞ്ഞെടുക്കിയാൽ അത് അടുത്തിടെ കണ്ടവയിൽ ചേർക്കപ്പെടും. ഹൃദയ ബട്ടൺ ഉപയോഗിച്ച് പ്രിയപ്പെട്ടതായി ചേർക്കുകയോ നീക്കുകയോ ചെയ്യാം.",
      "അടുത്തിടെ കണ്ടവയിലെ ഒരു ഇനം തിരഞ്ഞെടുക്കുമ്പോൾ അതിന്റെ ദിശയിലേക്ക് മാറി ആ വരി കാണിക്കും. പട്ടിക നീക്കാൻ Clear തിരഞ്ഞെടുക്കുക.",
    ],
    timerTitle: "അടുത്ത പുറപ്പെടൽ സമയം",
    timer: "തിരഞ്ഞെടുത്ത ദിശയിലെ അടുത്ത പട്ടികപ്പെടുത്തിയ പുറപ്പെടൽ അടുത്ത ബസ് പാനലിൽ കാണാം. ഇത് നിങ്ങളുടെ ഉപകരണത്തിലെ പ്രാദേശിക സമയവുമായി താരതമ്യം ചെയ്ത് ഏകദേശം 30 സെക്കൻഡിൽ പുതുക്കുന്നു. ശേഷിക്കുന്ന സമയം മിനിറ്റുകളായി കാണിക്കും.",
    limitsTitle: "ശ്രദ്ധിക്കേണ്ട കാര്യങ്ങൾ",
    limits: [
      "ഈ പേജിൽ പട്ടികപ്പെടുത്തിയ പുറപ്പെടൽ സമയങ്ങളാണ് കാണിക്കുന്നത്; വാഹനത്തിന്റെ തത്സമയ ലൊക്കേഷനോ താമസവിവരങ്ങളോ ലഭ്യമല്ല.",
      "ടൈമർ നിങ്ങളുടെ ഉപകരണത്തിലെ പ്രാദേശിക സമയം ഉപയോഗിക്കുന്നു. ഇന്ന് പിന്നീടുള്ള പുറപ്പെടൽ പട്ടികയിൽ ഇല്ലെങ്കിൽ, ഇനി പുറപ്പെടലുകളില്ലെന്ന് പാനൽ കാണിക്കും.",
      "ട്രാഫിക് അല്ലെങ്കിൽ മറ്റ് താമസങ്ങൾ കാരണം യഥാർത്ഥ പുറപ്പെടൽ സമയങ്ങളിൽ മാറ്റമുണ്ടാകാം. പ്രിയപ്പെട്ടവയും അടുത്തിടെ കണ്ടവയും ഈ ബ്രൗസറിൽ മാത്രമാണ് സൂക്ഷിക്കുന്നത്; അവ സിങ്ക് ചെയ്യില്ല.",
    ],
    toggleLabel: "To English",
    toggleAccessibleLabel: "ഈ ഭാഗം ഇംഗ്ലീഷിൽ കാണിക്കുക",
  },
};

function ThemeIcon({ theme }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      {theme === "dark" ? (
        <path
          d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.6 8.6 0 1 0 20.2 15.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      ) : (
        <>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem("bus-time-theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  } catch (error) {
    console.error("Unable to read the theme preference.", error);
  }
  return typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialLanguage() {
  try {
    return window.localStorage.getItem("bus-time-about-language") === "ml" ? "ml" : "en";
  } catch {
    return "en";
  }
}

function AboutPage() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);
  const copy = ABOUT_COPY[language];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#061326" : "#d8e8f7",
    );
    try {
      window.localStorage.setItem("bus-time-theme", theme);
    } catch (error) {
      console.error("Unable to save the theme preference.", error);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem("bus-time-about-language", language);
    } catch (error) {
      console.error("Unable to save the About section language.", error);
    }
  }, [language]);

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand about-page-brand" href="/" aria-label="Kaliyattamukku Bus Timetable home">
            <span className="brand-icon">
              <img src="/arebyan.png" alt="" width="40" height="40" />
            </span>
            <span className="brand-copy">
              <strong>Kaliyattamukku</strong>
              <span>Bus Timetable</span>
            </span>
          </a>
          <div className="header-actions">
            <a className="about-home-link" href="/">Timetable</a>
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "dark"}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={() => setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark")}
            >
              <ThemeIcon theme={theme} />
            </button>
          </div>
        </div>
      </header>

      <main className="page-content about-page-content">
        <section className="about-section" data-language={language} aria-labelledby="about-title">
          <div className="about-copy" key={language}>
            <div className="about-heading">
              <p className="about-eyebrow">{copy.eyebrow}</p>
              <h1 id="about-title">{copy.title}</h1>
              <p>{copy.introduction}</p>
            </div>
            <div className="about-grid">
              <section className="about-block">
                <h2>{copy.stepsTitle}</h2>
                <ol>
                  {copy.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </section>
              <div className="about-details">
                <section className="about-block">
                  <h2>{copy.timerTitle}</h2>
                  <p>{copy.timer}</p>
                </section>
                <section className="about-block about-limits">
                  <h2>{copy.limitsTitle}</h2>
                  <ul>
                    {copy.limits.map((limit) => <li key={limit}>{limit}</li>)}
                  </ul>
                </section>
              </div>
            </div>
          </div>
          <div className="about-actions">
            <button
              className="about-language-toggle"
              type="button"
              aria-label={copy.toggleAccessibleLabel}
              aria-pressed={language === "ml"}
              onClick={() => setLanguage((currentLanguage) => currentLanguage === "en" ? "ml" : "en")}
            >
              {copy.toggleLabel}
            </button>
          </div>
        </section>

        <footer className="site-footer">
          <p>© 2025 Kaliyattamukku Bus Timetable. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default AboutPage;