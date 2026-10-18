import React, { useEffect, useState } from "react";
import "./App.css";
import { InstallAppButton, OfflineNotice } from "./PwaControls.jsx";

function BusIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 17.5V6.8A2.8 2.8 0 0 1 7.8 4h8.4A2.8 2.8 0 0 1 19 6.8v10.7"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 10h14v7.5H5zM8 20v-2.5m8 2.5v-2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function getDepartureMinutes(time) {
  const [clock, period] = time.split(" ");
  const [hour, minute] = clock.split(":").map(Number);
  return ((hour % 12) + (period === "PM" ? 12 : 0)) * 60 + minute;
}

function getInitialTheme() {
  const systemTheme = typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  try {
    const savedTheme = window.localStorage.getItem("bus-time-theme");
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : systemTheme;
  } catch {
    return systemTheme;
  }
}

function BusRoadAnimation() {
  return (
    <div className="bus-road-scene" aria-hidden="true">
      <video
        className="bus-road-video"
        src="/kmkbustimemp4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function App() {
  const [active, setActive] = useState(1);
  const [now, setNow] = useState(() => new Date());
  const [theme, setTheme] = useState(getInitialTheme);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [recentBusIds, setRecentBusIds] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [recentJumpId, setRecentJumpId] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

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
    try {
      const savedFavorites = JSON.parse(window.localStorage.getItem("bus-time-favorites") || "[]");
      const savedRecentBuses = JSON.parse(window.localStorage.getItem("bus-time-recent-buses") || "[]");
      if (!Array.isArray(savedFavorites) || !Array.isArray(savedRecentBuses)) {
        throw new Error("Saved bus preferences are not valid lists.");
      }
      setFavoriteIds(savedFavorites.filter((id) => typeof id === "string"));
      setRecentBusIds(savedRecentBuses.filter((id) => typeof id === "string").slice(0, 5));
      setStorageReady(true);
    } catch (error) {
      console.error("Unable to load saved bus preferences.", error);
      setStorageMessage("Saved favourites and recent buses could not be loaded from this browser.");
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem("bus-time-favorites", JSON.stringify(favoriteIds));
      window.localStorage.setItem("bus-time-recent-buses", JSON.stringify(recentBusIds));
      setStorageMessage("");
    } catch (error) {
      console.error("Unable to save bus preferences.", error);
      setStorageMessage("Your browser could not save favourites or recently viewed buses.");
    }
  }, [favoriteIds, recentBusIds, storageReady]);

  // FIRST DIV CUSTOM BUTTONS
  const route1 = [
    { time:"07:15 AM", name:"അറേബ്യൻ"},
    { time:"07:40 AM", name:"അനുഗ്രഹം"},
    { time:"08:20 AM", name:"അറേബ്യൻ"},
    { time:"08:30 AM", name:" അനുഗ്രഹം"},
    { time:"09:20 AM", name:"അറേബ്യൻ"},
    { time:"09:40 AM", name:"ROYAL"},
    { time:"10:30 AM", name:"അറേബ്യൻ"},
    { time:"10:50 AM", name:"അനുഗ്രഹം"},
    { time:"11:15 AM", name:"ROYAL"},
    { time:"11:30 AM", name:"അറേബ്യൻ"},
    { time:"12:00 PM", name:"അനുഗ്രഹം"},
    { time:"12:30 PM", name:"അറേബ്യൻ"},
    { time:"01:00 PM", name:"അനുഗ്രഹം"},
    { time:"01:40 PM", name:"അറേബ്യൻ"},
    { time:"02:05 PM", name:"അനുഗ്രഹം"},
    { time:"02:45 PM", name:"അറേബ്യൻ"},
    { time:"03:15 PM", name:"ROYAL"},
    { time:"03:45 PM", name:"പുറ്റേക്കാട്ട്"},
    { time:"04:00 PM", name:"അനുഗ്രഹം"},
    { time:"04:30 PM", name:"അറേബ്യൻ"},
    { time:"05:00 PM", name:"അനുഗ്രഹം"},
    { time:"05:30 PM", name:"അറേബ്യൻ"},
    { time:"06:00 PM", name:"അനുഗ്രഹം"},
    // { time:"05:30 PM", name:"Dash X"},
    // { time:"06:00 PM", name:"Last Y"},
  ];

  // SECOND DIV CUSTOM BUTTONS
  const route2 = [
    { time:"07:15 AM", name:"അനുഗ്രഹം"},
    { time:"07:45 AM", name:"അറേബ്യൻ"},
    { time:"08:05 AM", name:"അനുഗ്രഹം"},
    { time:"08:45 AM", name:"അറേബ്യൻ"},
    { time:"09:20 AM", name:"ROYAL"},
    { time:"09:50 AM", name:"അറേബ്യൻ"},
    { time:"10:15 AM", name:"അനുഗ്രഹം"},
    { time:"10:40 AM", name:"ROYAL"},
    { time:"11:00 AM", name:"അറേബ്യൻ"},
    { time:"11:30 AM", name:"അനുഗ്രഹം"},
    { time:"12:00 PM", name:"അറേബ്യൻ"},
    { time:"12:30 PM", name:"അനുഗ്രഹം"},
    { time:"01:00 PM", name:"അറേബ്യൻ"},
    { time:"01:40 PM", name:"അനുഗ്രഹം"},
    { time:"02:15 PM", name:"അറേബ്യൻ"},
    { time:"02:40 PM", name:"ROYAL"},
    { time:"03:15 PM", name:"പുറ്റേക്കാട്ട്"},
    { time:"03:35 PM", name:"അനുഗ്രഹം"},
    { time:"04:00 PM", name:"അറേബ്യൻ"},
    { time:"04:30 PM", name:"അനുഗ്രഹം"},
    { time:"05:00 PM", name:"അറേബ്യൻ"},
    { time:"05:30 PM", name:"അനുഗ്രഹം"},
    { time:"06:00 PM", name:"അറേബ്യൻ"},
    { time:"06:30 PM", name:"അനുഗ്രഹം"},
    // { time:"06:15 PM", name:"Return 25"},
  ];

  const routes = [
    { id: 1, label: "Kaliyattamukk to Chemmad", buses: route1 },
    { id: 2, label: "Chemmad to Kaliyattamukk", buses: route2 },
  ];
  const allBusRecords = routes.flatMap((route) =>
    route.buses.map((bus, index) => ({
      id: `route-${route.id}-bus-${index}`,
      routeId: route.id,
      routeLabel: route.label,
      bus,
      index,
    })),
  );
  const busRecordsById = new Map(allBusRecords.map((record) => [record.id, record]));
  const recentRecords = recentBusIds
    .map((id) => busRecordsById.get(id))
    .filter(Boolean);
  const selectedRouteInfo = routes.find((route) => route.id === active);
  const selectedRoute = active === 1 ? route1 : route2;
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const visibleBuses = selectedRoute
    .map((bus, index) => ({ bus, index, id: `route-${active}-bus-${index}` }))
    .filter(({ bus, id }) => {
      const matchesQuery = !normalizedQuery || [
        bus.name,
        bus.time,
        selectedRouteInfo.label,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
      return matchesQuery && (!showFavoritesOnly || favoriteIds.includes(id));
    });
  const suggestions = [
    ...routes.map((route) => ({ label: route.label, routeId: route.id })),
    ...new Set(allBusRecords.map(({ bus }) => bus.name.trim())),
  ]
    .map((suggestion) => typeof suggestion === "string" ? { label: suggestion } : suggestion)
    .filter(({ label }) => label.toLocaleLowerCase().includes(normalizedQuery))
    .slice(0, 5);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const nextBus = selectedRoute.find((bus) => getDepartureMinutes(bus.time) >= currentMinutes);
  const minutesUntilNextBus = nextBus ? getDepartureMinutes(nextBus.time) - currentMinutes : null;
  const toggleFavorite = (id) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((favoriteId) => favoriteId !== id)
        : [...currentIds, id],
    );
  };

  const rememberBus = (id) => {
    setRecentBusIds((currentIds) => [id, ...currentIds.filter((recentId) => recentId !== id)].slice(0, 5));
  };

  const chooseSuggestion = (suggestion) => {
    if (suggestion.routeId) {
      setActive(suggestion.routeId);
      setSearchQuery("");
    } else {
      setSearchQuery(suggestion.label);
    }
    setShowSuggestions(false);
  };

  const openRecentBus = (record) => {
    setActive(record.routeId);
    setSearchQuery("");
    setShowFavoritesOnly(false);
    setRecentJumpId(record.id);
  };

  useEffect(() => {
    if (!recentJumpId) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`bus-${recentJumpId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
    const timeout = window.setTimeout(() => setRecentJumpId(""), 1800);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [active, recentJumpId, searchQuery, showFavoritesOnly]);

  return (
    <div className="app-shell" data-theme={theme}>
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon">
              <img src="/arebyan.png" alt="" width="40" height="40" />
            </span>
            <span className="brand-copy">
              <strong>Kaliyattamukku</strong>
              <span>Bus Timetable</span>
            </span>
          </div>
          <div className="header-actions">
            <span className="header-status"><span /> Scheduled timetable</span>
            <InstallAppButton />
            <a className="header-about-link" href="/about.html">About</a>
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

      <OfflineNotice />

      <main className="page-content">
        <section className="intro">
          <div className="hero-copy">
            <p className="eyebrow">  DAILY BUS SERVICE</p>
            <h1>Every journey<br />starts here.</h1>
            <p className="intro-copy">Find your next ride, and enjoy the way there.</p>
            <span className="hero-route-label"><span /> Kaliyattamukku ↔ Chemmad</span>
          </div>
          <BusRoadAnimation />
        </section>

        <section className="next-bus-card pinned-next-bus" aria-labelledby="next-bus-title">
          <div className="next-bus-heading">
            <span className="clock-icon"><ClockIcon /></span>
            <div>
              <h2 id="next-bus-title">Next Bus</h2>
              <span className="today-label">Today</span>
            </div>
          </div>
          {nextBus ? (
            <div className="next-bus-details">
              <span className="next-bus-icon"><BusIcon /></span>
              <div>
                <strong>{nextBus.time}</strong>
                <span>{nextBus.name.trim()}</span>
                <span className="departure-countdown">
                  {minutesUntilNextBus === 0 ? "Departing now" : `In ${minutesUntilNextBus} min`}
                </span>
              </div>
            </div>
          ) : (
            <p className="no-upcoming">No upcoming departure listed today.</p>
          )}
         
        </section>

        <nav className="route-switch" aria-label="Select bus route">
          <button
            className={active === 1 ? "route-option selected" : "route-option"}
            onClick={() => setActive(1)}
            aria-pressed={active === 1}
          >
            <span>Kaliyattamukk</span>
            <span className="route-arrow" aria-hidden="true">→</span>
            <span>Chemmad</span>
          </button>
          <button
            className={active === 2 ? "route-option selected" : "route-option"}
            onClick={() => setActive(2)}
            aria-pressed={active === 2}
          >
            <span>Chemmad</span>
            <span className="route-arrow" aria-hidden="true">→</span>
            <span>Kaliyattamukk</span>
          </button>
        </nav>

        <section className="bus-tools" aria-label="Search and filter buses">
          <div
            className="search-control"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setShowSuggestions(false);
            }}
          >
            <label htmlFor="bus-search">Find a bus</label>
            <div className="search-box">
              <span className="search-symbol" aria-hidden="true">⌕</span>
              <input
                id="bus-search"
                type="search"
                value={searchQuery}
                placeholder="Search by bus name or route"
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="bus-search-suggestions"
                aria-expanded={showSuggestions && Boolean(normalizedQuery) && suggestions.length > 0}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setShowSuggestions(false);
                  if (event.key === "Enter" && suggestions.length > 0) {
                    event.preventDefault();
                    chooseSuggestion(suggestions[0]);
                  }
                }}
              />
              {searchQuery && (
                <button
                  className="clear-search"
                  type="button"
                  aria-label="Clear bus search"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                >
                  ×
                </button>
              )}
              {showSuggestions && normalizedQuery && suggestions.length > 0 && (
                <div className="search-suggestions" id="bus-search-suggestions" role="listbox" aria-label="Search suggestions">
                  {suggestions.map((suggestion) => (
                    <button
                      key={`${suggestion.routeId || "name"}-${suggestion.label}`}
                      type="button"
                      role="option"
                      aria-selected="false"
                      onClick={() => chooseSuggestion(suggestion)}
                    >
                      <span>{suggestion.label}</span>
                      <span aria-hidden="true">{suggestion.routeId ? "Route" : "Bus"}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="bus-filters" aria-label="Filter timetable">
            <button
              type="button"
              className={!showFavoritesOnly ? "bus-filter selected" : "bus-filter"}
              aria-pressed={!showFavoritesOnly}
              onClick={() => setShowFavoritesOnly(false)}
            >
              All buses
            </button>
            <button
              type="button"
              className={showFavoritesOnly ? "bus-filter selected" : "bus-filter"}
              aria-pressed={showFavoritesOnly}
              onClick={() => setShowFavoritesOnly(true)}
            >
              <span aria-hidden="true">♡</span> Favourites <span className="favorite-count">{favoriteIds.length}</span>
            </button>
          </div>
        </section>

        {recentRecords.length > 0 && (
          <section className="recent-buses" aria-label="Recently viewed buses">
            <div className="recent-heading">
              <h2>Recently viewed</h2>
              <button type="button" onClick={() => setRecentBusIds([])}>Clear</button>
            </div>
            <div className="recent-list">
              {recentRecords.map((record) => (
                <button
                  className="recent-bus"
                  key={record.id}
                  type="button"
                  onClick={() => openRecentBus(record)}
                  title={`Open ${record.routeLabel}`}
                >
                  <span>{record.bus.time}</span>
                  <strong>{record.bus.name.trim()}</strong>
                  <small>{record.routeLabel}</small>
                </button>
              ))}
            </div>
          </section>
        )}
        {storageMessage && <p className="storage-message" role="status">{storageMessage}</p>}

        <div className="content-grid">
          <section className="timetable-card" aria-labelledby="timetable-title">
            <div className="section-heading">
              <span className="section-icon"><BusIcon /></span>
              <div>
                <h2 id="timetable-title">Bus Timetable</h2>
                <p>{selectedRouteInfo.label}</p>
              </div>
              <span className="entry-count">{visibleBuses.length} buses</span>
            </div>

            {active === 2 && (
              <p className="departure-note">Note : ഇത് സ്റ്റാൻഡിൽ നിന്നും Bus പുറപ്പെടുന്ന സമയമാണ്.</p>
            )}

            <div className="bus-list">
              {visibleBuses.length > 0 ? visibleBuses.map(({ bus, index, id }) => {
                const isFavorite = favoriteIds.includes(id);
                return (
                <article
                  id={`bus-${id}`}
                  key={id}
                  className={recentJumpId === id ? "bus-row recent-highlight" : "bus-row"}
                >
                  <span className={`bus-row-icon bus-color-${index % 4}`}><BusIcon /></span>
                  <button
                    className="bus-details"
                    type="button"
                    onClick={() => rememberBus(id)}
                    aria-label={`Add ${bus.name.trim()} at ${bus.time} to recently viewed`}
                  >
                    <span className="bus-time">{bus.time}</span>
                    <span className="bus-name">{bus.name.trim()}</span>
                  </button>
                  <button
                    className={isFavorite ? "favorite-toggle saved" : "favorite-toggle"}
                    type="button"
                    aria-label={`${isFavorite ? "Remove" : "Add"} ${bus.name.trim()} at ${bus.time} ${isFavorite ? "from" : "to"} favourites`}
                    aria-pressed={isFavorite}
                    onClick={() => toggleFavorite(id)}
                  >
                    <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
                  </button>
                  <span className="row-chevron" aria-hidden="true">›</span>
                </article>
                );
              }) : (
                <div className="empty-buses">
                  <span aria-hidden="true">⌕</span>
                  <strong>{showFavoritesOnly ? "No favourite buses on this route yet." : "No buses found."}</strong>
                  <p>{showFavoritesOnly ? "Tap the heart beside a bus to save it here." : "Try another bus name or route."}</p>
                  {(searchQuery || showFavoritesOnly) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setShowFavoritesOnly(false);
                      }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>

          <aside className="sidebar">
            {now.getDay() === 0 && (
              <section className="notice-card" aria-label="Sunday timetable notice">
                <span className="notice-icon" aria-hidden="true">i</span>
                <p><strong>Sunday Note :-</strong> There is likely to be only one bus on Sundays.</p>
              </section>
            )}
            <section className="notice-card" aria-label="Timetable notice">
              <span className="notice-icon" aria-hidden="true">i</span>
              <p><strong>Note :-</strong> Timings may change depending on traffic or delays.</p>
            </section>
          </aside>
        </div>

        <footer className="site-footer">
          <p>© 2025 Kaliyattamukku Bus Timetable. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
