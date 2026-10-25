import React, { useEffect, useState } from "react";
import "./App.css";
import { InstallAppButton, OfflineNotice } from "./PwaControls.jsx";
import { AboutContent } from "./AboutPage.jsx";

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

function ScheduleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v4m8-4v4M4 9h16m-11 4h2m3 0h2m-7 4h2m3 0h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LiveBusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M5 17.5V6.8A2.8 2.8 0 0 1 7.8 4h8.4A2.8 2.8 0 0 1 19 6.8v10.7M5 10h14v7.5H5zM8 20v-2.5m8 2.5v-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
      <path d="M2 8a10 10 0 0 1 3-5M22 8a10 10 0 0 0-3-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function timeToMinutes(time) {
  const [clock, period] = time.split(" ");
  const [hourText, minuteText, secondText = "0"] = clock.split(":");
  let hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);
  if (!Number.isInteger(hour) || !Number.isInteger(minute) || !Number.isInteger(second)
    || minute < 0 || minute > 59 || second < 0 || second > 59) {
    throw new Error(`Invalid schedule time: ${time}`);
  }

  if (period) {
    if (!["AM", "PM"].includes(period.toUpperCase())) {
      throw new Error(`Invalid schedule time: ${time}`);
    }
    if (hour < 1 || hour > 12) throw new Error(`Invalid schedule time: ${time}`);
    hour = (hour % 12) + (period.toUpperCase() === "PM" ? 12 : 0);
  } else if (hour < 0 || hour > 23) {
    throw new Error(`Invalid schedule time: ${time}`);
  }

  return hour * 60 + minute + second / 60;
}

const indiaClockFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const indiaDisplayTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function formatIndiaTime(date) {
  return indiaDisplayTimeFormatter.formatToParts(date)
    .map(({ type, value }) => type === "dayPeriod" ? value.toUpperCase() : value)
    .join("");
}

function getIndiaTimeParts(date) {
  return Object.fromEntries(
    indiaClockFormatter.formatToParts(date)
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );
}

function getCurrentTimeMinutes(parts) {
  return Number(parts.hour) * 60
    + Number(parts.minute)
    + Number(parts.second) / 60;
}

function getNextDeparture(buses, currentMinutes) {
  const departures = buses
    .map((bus) => ({ bus, minutes: timeToMinutes(bus.time) }))
    .sort((first, second) => first.minutes - second.minutes);
  const todayDeparture = departures.find(({ minutes }) => minutes >= currentMinutes);
  if (todayDeparture) return { ...todayDeparture, dayLabel: "Today" };

  const firstDeparture = departures[0];
  return firstDeparture
    ? { ...firstDeparture, minutes: firstDeparture.minutes + 24 * 60, dayLabel: "Tomorrow" }
    : null;
}

function formatClockMinutes(totalMinutes) {
  const minutesInDay = ((Math.floor(totalMinutes) % (24 * 60)) + 24 * 60) % (24 * 60);
  const hour24 = Math.floor(minutesInDay / 60);
  const minute = minutesInDay % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

const routeStops = {
  1: [
    { name: "കളിയാട്ടമുക്ക്", minutes: 0 },
    { name: "MH നഗർ", minutes: 2 },
    { name: "കാളികണ്ടം", minutes: 5 },
    { name: "മുട്ടിച്ചിറ", minutes: 8, isLastMilestone: true },
    { name: "ചെമ്മാട്", minutes: null, isDestination: true },
  ],
  2: [
    { name: "Chemmad", minutes: 0 },
    { name: "പാറക്കടവ്", minutes: 3 },
    { name: "അലിഞ്ചുവട്", minutes: 7 },
    { name: "മുട്ടിച്ചിറ", minutes: 11, isLastMilestone: true },
    { name: "കളിയാട്ടമുക്ക്", minutes: null, isDestination: true },
  ],
};

function SundayAlert({ onClose }) {
  return (
    <section
      className="notice-card sunday-alert"
      aria-label="Sunday timetable notice"
      role="status"
    >
      <span className="notice-icon" aria-hidden="true">!</span>
      <p><strong>Sunday Note :-</strong> <span>There is likely to be only one bus on Sundays.</span></p>
      <button className="sunday-alert-close" type="button" onClick={onClose} aria-label="Dismiss Sunday notice">
        <span aria-hidden="true">×</span>
      </button>
    </section>
  );
}

function App() {
  const [active, setActive] = useState(1);
  const [activeView, setActiveView] = useState("live");
  const [now, setNow] = useState(() => new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showParappanangadiOnly, setShowParappanangadiOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [recentBusIds, setRecentBusIds] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [recentJumpId, setRecentJumpId] = useState("");
  const [dismissedSunday, setDismissedSunday] = useState("");

  useEffect(() => {
    const refreshClock = () => setNow(new Date());
    const interval = window.setInterval(refreshClock, 1_000);
    document.addEventListener("visibilitychange", refreshClock);
    window.addEventListener("focus", refreshClock);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshClock);
      window.removeEventListener("focus", refreshClock);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#ffffff");
  }, []);

  useEffect(() => {
    document.documentElement.lang = activeView === "about" ? "ml" : "en";
  }, [activeView]);

  useEffect(() => {
    try {
      const savedFavorites = JSON.parse(window.localStorage.getItem("bus-time-favorites") || "[]");
      const savedRecentBuses = JSON.parse(window.localStorage.getItem("bus-time-recent-buses") || "[]");
      if (!Array.isArray(savedFavorites) || !Array.isArray(savedRecentBuses)) {
        throw new Error("Saved bus preferences are not valid lists.");
      }
      setFavoriteIds(savedFavorites.filter(
        (id) => typeof id === "string" && !id.startsWith("parappanangadi-bus-"),
      ));
      setRecentBusIds(savedRecentBuses
        .filter((id) => typeof id === "string" && !id.startsWith("parappanangadi-bus-"))
        .slice(0, 5));
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
    { time:"08:30 AM", name:"പരപ്പനങ്ങാടി", route:"Via Chemmad ➔ Parappanangadi"},
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
    { time:"02:05 PM", name:"പരപ്പനങ്ങാടി", route:"Via Chemmad ➔ Parappanangadi"},
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
  const selectedRoute = selectedRouteInfo.buses;
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
  const visibleBuses = selectedRoute
    .map((bus, index) => ({ bus, index, id: `route-${active}-bus-${index}` }))
    .filter(({ bus, id }) => {
      const matchesQuery = !normalizedQuery || [
        bus.name,
        bus.time,
        bus.route || "",
        selectedRouteInfo.label,
      ].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
      const matchesDestination = !showParappanangadiOnly
        || bus.route === "Via Chemmad ➔ Parappanangadi";
      return matchesQuery
        && matchesDestination
        && (!showFavoritesOnly || favoriteIds.includes(id));
    });
  const suggestions = [
    ...routes.map((route) => ({ label: route.label, routeId: route.id })),
    ...new Set(selectedRoute.map((bus) => bus.name.trim())),
  ]
    .map((suggestion) => typeof suggestion === "string" ? { label: suggestion } : suggestion)
    .filter(({ label }) => label.toLocaleLowerCase().includes(normalizedQuery))
    .slice(0, 5);
  const indiaTimeParts = getIndiaTimeParts(now);
  const sundayKey = `${indiaTimeParts.year}-${indiaTimeParts.month}-${indiaTimeParts.day}`;
  const showSundayAlert = indiaTimeParts.weekday === "Sun" && dismissedSunday !== sundayKey;
  const currentMinutes = getCurrentTimeMinutes(indiaTimeParts);
  const selectedStops = routeStops[active];
  const nextDeparture = getNextDeparture(selectedRoute, currentMinutes);
  const nextBus = nextDeparture?.bus ?? null;
  const hasParappanangadiDestination = active === 1
    && ["08:30 AM", "02:05 PM"].includes(nextBus?.time);
  const departureMinutes = nextDeparture?.minutes ?? null;
  const minutesUntilNextBus = departureMinutes !== null
    ? Math.ceil(departureMinutes - currentMinutes)
    : null;
  const reachedStopIndex = nextBus
    ? selectedStops.reduce(
    (lastReached, stop, index) => (
    stop.minutes !== null
      && currentMinutes >= departureMinutes + stop.minutes
      ? index
      : lastReached
    ),
    -1,
    )
    : -1;
  const isWaitingForDeparture = departureMinutes !== null && currentMinutes < departureMinutes;
  const upcomingStopIndex = nextBus
    ? selectedStops.findIndex(
    (stop) => stop.minutes !== null
      && currentMinutes < departureMinutes + stop.minutes,
    )
    : -1;
  const activeStopIndex = isWaitingForDeparture
    ? 0
    : upcomingStopIndex >= 0 ? upcomingStopIndex : reachedStopIndex;
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
    setShowParappanangadiOnly(false);
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
    <div className="app-shell" data-theme="light">
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
          </div>
        </div>
      </header>

      {showSundayAlert && <SundayAlert onClose={() => setDismissedSunday(sundayKey)} />}
      <OfflineNotice />

      <nav className="route-switch" aria-label="Select bus route">
        <div className="route-cards" key={active}>
          <div className="route-card route-card-from">
            <span className="route-card-label">From</span>
            <strong>{active === 1 ? "Kaliyattamukk" : "Chemmad"}</strong>
          </div>
          <div className="route-swap-group">
            <button
              className="route-swap"
              type="button"
              aria-label={`Swap route direction from ${active === 1 ? "Kaliyattamukk to Chemmad" : "Chemmad to Kaliyattamukk"}`}
              title="Swap route direction"
              onClick={() => {
                setActive((currentRoute) => currentRoute === 1 ? 2 : 1);
                setShowParappanangadiOnly(false);
              }}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path d="m16 3 4 4-4 4M20 7H4m4 14-4-4 4-4m-4 4h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="route-helper">Tap to change route</span>
          </div>
          <div className="route-card route-card-to">
            <span className="route-card-label">To</span>
            <strong>{active === 1 ? "Chemmad" : "Kaliyattamukk"}</strong>
          </div>
        </div>
        <button
          className={showParappanangadiOnly ? "destination-filter selected" : "destination-filter"}
          type="button"
          aria-pressed={showParappanangadiOnly}
          onClick={() => {
            setActive(1);
            setActiveView("schedule");
            setSearchQuery("");
            setShowFavoritesOnly(false);
            setShowParappanangadiOnly((current) => !current);
          }}
        >
          Parappanangadi
        </button>
      </nav>

      <main className="page-content">
        {activeView !== "about" && <section className="current-time-card" aria-label="Current time in India">
          <span className="current-time-icon"><ClockIcon /></span>
          <div>
            <span className="current-time-label">Current Time · India</span>
            <time className="current-time-value" dateTime={now.toISOString()}>
              {formatIndiaTime(now)}
            </time>
          </div>
        </section>}
        {activeView === "live" && (
        <section className="next-bus-card pinned-next-bus live-bus-card" aria-labelledby="next-bus-title">
          <div className="next-bus-heading">
            <span className="clock-icon"><ClockIcon /></span>
            <div>
              <h2 id="next-bus-title">Next Bus</h2>
              <span className="today-label">{nextDeparture?.dayLabel ?? "Today"}</span>
            </div>
          </div>
          {nextBus ? (
            <div className="next-bus-details">
              <span className="next-bus-icon"><BusIcon /></span>
              <div>
                <strong>{nextBus.time}</strong>
                <span>{nextBus.name.trim()}</span>
                <span className="departure-countdown">
                  {minutesUntilNextBus > 0
                    ? `In ${minutesUntilNextBus} min`
                    : currentMinutes === departureMinutes ? "Departing now" : "On route"}
                </span>
              </div>
            </div>
          ) : (
            <p className="no-upcoming">No upcoming departure listed today.</p>
          )}
          {nextBus && (
            <div className="route-tracker-section">
              <div className="route-progress-viewport">
                <ol className="route-progress" aria-label="Estimated route stops">
                  {selectedStops.filter((stop) => !stop.isDestination).map((stop, index, milestones) => {
                    const stopArrivalMinutes = stop.minutes === null
                      ? null
                      : departureMinutes + stop.minutes;
                    const isReached = index <= reachedStopIndex;
                    const isCurrent = index === activeStopIndex;
                    const stepClass = [
                      "route-progress-step",
                      stop.isLastMilestone && "is-last-milestone",
                      isReached && "is-reached",
                      isCurrent && "is-current",
                      isCurrent && isWaitingForDeparture && "is-upcoming",
                      index <= reachedStopIndex && index < milestones.length - 1 && "has-passed",
                    ].filter(Boolean).join(" ");
                    return (
                      <li className={stepClass} key={`${active}-${stop.name}`}>
                        <span className="route-progress-marker" aria-hidden="true" />
                        <div className="route-progress-content">
                          <span className="route-progress-name">{stop.name}</span>
                          {stopArrivalMinutes !== null && (
                            <span className="route-progress-time">
                              {formatClockMinutes(stopArrivalMinutes)}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
                <div className="route-progress-destination">
                  {hasParappanangadiDestination ? (
                    <>
                      ചെമ്മാട് - <span className="route-progress-destination-highlight">പരപ്പനങ്ങാടി</span>
                    </>
                  ) : selectedStops[selectedStops.length - 1].name}
                </div>
              </div>
              <p className="route-tracker-disclaimer">
                <span aria-hidden="true">⚠️</span>{" "}
                ശ്രദ്ധിക്കുക: റോഡിലെ ട്രാഫിക്കും മറ്റ് സാഹചര്യങ്ങളും അനുസരിച്ച് ഇതിൽ ചെറിയ സമയവ്യത്യാസങ്ങൾ ഉണ്ടാകാം (ഏകദേശ സമയക്രമം മാത്രം).
              </p>
            </div>
          )}
        </section>
        )}

        {activeView === "about" && <AboutContent />}

        {activeView === "schedule" && <>
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
              onClick={() => {
                setShowFavoritesOnly(false);
                setShowParappanangadiOnly(false);
              }}
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
                    <span className={bus.name.trim() === "അനുഗ്രഹം പരപ്പനങ്ങാടി" ? "bus-name bus-name-pair" : "bus-name"}>
                      {bus.name.trim() === "അനുഗ്രഹം പരപ്പനങ്ങാടി" ? (
                        <>
                          <span className="bus-name-badge">അനുഗ്രഹം</span>
                          <span className="bus-name-badge bus-name-badge-highlight">പരപ്പനങ്ങാടി</span>
                        </>
                      ) : bus.name.trim()}
                    </span>
                    {bus.route && <span className="bus-route-note">{bus.route}</span>}
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
                        setShowParappanangadiOnly(false);
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
            <section className="notice-card" aria-label="Timetable notice">
              <span className="notice-icon" aria-hidden="true">i</span>
              <p><strong>Note :-</strong> Timings may change depending on traffic or delays.</p>
            </section>
          </aside>
        </div>

        <footer className="site-footer">
          <p>© 2025 Kaliyattamukku Bus Timetable. All rights reserved.</p>
        </footer>
        </>}
      </main>

      <nav className="bottom-navigation" aria-label="പ്രധാന മെനു">
        <button
          className={activeView === "live" ? "bottom-navigation-tab active" : "bottom-navigation-tab"}
          type="button"
          aria-current={activeView === "live" ? "page" : undefined}
          onClick={() => setActiveView("live")}
        >
          <LiveBusIcon />
          <span>Live Bus</span>
        </button>
        <button
          className={activeView === "schedule" ? "bottom-navigation-tab active" : "bottom-navigation-tab"}
          type="button"
          aria-current={activeView === "schedule" ? "page" : undefined}
          onClick={() => setActiveView("schedule")}
        >
          <ScheduleIcon />
          <span>All Times</span>
        </button>
        <button
          className={activeView === "about" ? "bottom-navigation-tab active" : "bottom-navigation-tab"}
          type="button"
          aria-current={activeView === "about" ? "page" : undefined}
          onClick={() => setActiveView("about")}
        >
          <span className="bottom-navigation-about-icon" aria-hidden="true">i</span>
          <span>About</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
