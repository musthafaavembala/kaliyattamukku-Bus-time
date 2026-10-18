import React, { useEffect, useState } from "react";
import "./App.css";

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
      <svg viewBox="0 0 1200 440" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hero-sky" x2="0" y2="1">
            <stop stopColor="#8ad8c0" />
            <stop offset=".52" stopColor="#d7e8bd" />
            <stop offset="1" stopColor="#f8c98e" />
          </linearGradient>
          <linearGradient id="hero-road" x2="0" y2="1">
            <stop stopColor="#526b60" />
            <stop offset="1" stopColor="#152d27" />
          </linearGradient>
          <linearGradient id="coach-front" x2="0" y2="1">
            <stop stopColor="#f9fff9" />
            <stop offset="1" stopColor="#84b89d" />
          </linearGradient>
          <linearGradient id="coach-glass" x2="0" y2="1">
            <stop stopColor="#183e3a" />
            <stop offset=".72" stopColor="#38766a" />
            <stop offset="1" stopColor="#a9c8ae" />
          </linearGradient>
          <radialGradient id="sun-glow">
            <stop stopColor="#fff8d9" stopOpacity=".92" />
            <stop offset="1" stopColor="#fff8d9" stopOpacity="0" />
          </radialGradient>
          <filter id="coach-shadow" x="-.3" y="-.5" width="1.7" height="2.2">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <rect width="1200" height="440" fill="url(#hero-sky)" />
        <circle cx="900" cy="113" r="150" fill="url(#sun-glow)" />
        <circle cx="900" cy="113" r="42" fill="#fff4ca" opacity=".78" />
        <path d="M0 215 115 168l85 31 112-83 126 79 119-66 115 72 104-86 132 91 107-49 85 44v72H0Z" fill="#6aa88a" opacity=".48" />
        <path d="m0 249 120-56 95 32 120-77 120 81 102-54 112 67 114-75 112 67 125-44 80 38v48H0Z" fill="#387d65" opacity=".68" />
        <g className="distant-palms" fill="none" stroke="#285c4b" strokeLinecap="round">
          <path d="M156 243q8-61 15-111m-15 2q-18-23-36-19m39 16q13-27 32-29m-34 38q-26-5-38 4m37-9q22-12 40-8" strokeWidth="4" />
          <path d="M1070 230q-2-72 8-128m-8 8q-25-23-44-15m50 10q15-27 34-26m-37 40q-26-6-41 6m43-11q24-12 40-7" strokeWidth="4" />
        </g>
        <path d="M0 263q100-35 205 0t205 0 205 0 205 0 205 0 175 0v52H0Z" fill="#2e6c54" />
        <g className="near-palms" fill="none" stroke="#194d3d" strokeLinecap="round">
          <path d="M73 298q17-91 18-186m-12 17q-29-33-57-26m69 14q20-39 52-39m-57 55q-37-5-58 12m67-19q31-17 57-9m-68 34q-37 2-57 23m63-22q35-4 63 10" strokeWidth="8" />
          <path d="M1113 288q-6-97 9-190m-4 20q-30-29-58-20m66 13q17-40 49-42m-55 59q-37-1-58 17m68-22q31-17 60-5m-70 39q-37 4-57 26m65-26q35-2 63 15" strokeWidth="8" />
        </g>
        <g fill="#214f3e" opacity=".9">
          <path d="M0 268h20v-40l12-14 12 14v40h12v-32l13-15 13 15v32h17v-49l15-18 15 18v49h30v-34l12-14 12 14v34Z" />
          <path d="M1020 267h16v-38l12-15 13 15v38h20v-54l15-17 15 17v54h24v-35l13-16 13 16v35h52v-48l15-18 15 18v48h22v-34l12-15 13 15v34Z" />
        </g>
        <path d="M0 285 468 208h270l462 77v155H0Z" fill="#d6c69e" opacity=".58" />
        <path d="M0 300 492 218h220l488 82v140H0Z" fill="url(#hero-road)" />
        <path d="m0 300 492-82m220 0 488 82" fill="none" stroke="#f2e5bd" strokeWidth="5" opacity=".76" />
        <path d="M600 223v217" fill="none" stroke="#fff1c2" strokeWidth="5" strokeDasharray="12 20" />
        <path d="M520 233 390 440m290-207L820 440" fill="none" stroke="#d0d6c5" strokeWidth="2" opacity=".25" />
        <path d="M0 371h360M0 403h265M1200 365H840m360 39H940" fill="none" stroke="#d9e7d9" strokeWidth="2" strokeLinecap="round" opacity=".28" />
        <g className="bus-stop">
          <ellipse cx="825" cy="374" rx="126" ry="11" fill="#10251e" opacity=".2" />
          <path d="M744 338h150v9H744z" fill="#bdc8a9" />
          <path d="M748 346h142v4H748z" fill="#6c7761" opacity=".7" />
          <path d="m743 290 18-28h113l19 28Z" fill="#0b684a" />
          <path d="M752 289h134v6H752z" fill="#f1c45f" />
          <path d="M753 295v43m125-43v43" stroke="#e7f2df" strokeWidth="5" />
          <path d="M758 322h115v6H758z" fill="#a7b59b" />
          <path d="M766 328v9m98-9v9" stroke="#576f5c" strokeWidth="4" />
          <path d="M925 265v105" stroke="#41574a" strokeWidth="6" />
          <rect x="895" y="250" width="61" height="44" rx="7" fill="#fff8e5" stroke="#426e55" strokeWidth="4" />
          <rect x="903" y="258" width="45" height="28" rx="4" fill="#087653" />
          <path d="M916 281v-13a9 9 0 0 1 18 0v13m-22 0h26m-22-4h18" fill="none" stroke="#fff8e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M895 296h61" stroke="#41574a" strokeWidth="5" />
        </g>
        <g className="animated-bus">
          <ellipse cx="600" cy="344" rx="110" ry="34" fill="#071c16" opacity=".36" filter="url(#coach-shadow)" />
          <g className="bus-body" transform="translate(6 0)">
            <g transform="translate(542 295)">
              <g className="bus-wheel-spin">
                <circle r="14" fill="#15251f" />
                <circle r="8" fill="#8fa49a" />
                <path d="M0-6v12m-6-6h12m-4-4 8 8m0-8-8 8" stroke="#354c41" strokeWidth="2" />
                <circle r="2" fill="#dfe9e2" />
              </g>
            </g>
            <g transform="translate(675 300)">
              <g className="bus-wheel-spin">
                <circle r="14" fill="#15251f" />
                <circle r="8" fill="#8fa49a" />
                <path d="M0-6v12m-6-6h12m-4-4 8 8m0-8-8 8" stroke="#354c41" strokeWidth="2" />
                <circle r="2" fill="#dfe9e2" />
              </g>
            </g>
            <g transform="translate(510 323)">
              <g className="bus-wheel-spin">
                <circle r="16" fill="#15251f" />
                <circle r="9" fill="#8fa49a" />
                <path d="M0-7v14m-7-7h14m-5-5 10 10m0-10L2 5" stroke="#354c41" strokeWidth="2" />
                <circle r="2.2" fill="#dfe9e2" />
              </g>
            </g>
            <g transform="translate(620 332)">
              <g className="bus-wheel-spin">
                <circle r="16" fill="#15251f" />
                <circle r="9" fill="#8fa49a" />
                <path d="M0-7v14m-7-7h14m-5-5 10 10m0-10L2 5" stroke="#354c41" strokeWidth="2" />
                <circle r="2.2" fill="#dfe9e2" />
              </g>
            </g>
            <path d="m500 188 60-26 128 10-60 26Z" fill="#08704f" stroke="#d7eee0" strokeWidth="3" />
            <path d="m628 198 60-26v129l-60 26Z" fill="#087452" stroke="#d7eee0" strokeWidth="3" />
            <path d="m500 188 128 10v129l-128-10Z" fill="url(#coach-front)" stroke="#e8f8ec" strokeWidth="3" />
            <path d="m511 202 106 8v58l-106-8Z" fill="url(#coach-glass)" stroke="#d5ebdd" strokeWidth="3" />
            <path d="m563 206 2 58" fill="none" stroke="#e6f4e9" strokeWidth="3" opacity=".78" />
            <path d="m520 207 23 27m51-18 18 27" stroke="#fff" strokeWidth="2" opacity=".38" />
            <path d="m500 276 128 10v8l-128-10Z" fill="#efbd59" />
            <path d="m500 284 128 10v22l-128-10Z" fill="#087452" />
            <path d="m508 297 18 2v10l-18-2zm94 8 17 2v10l-17-2z" fill="#fff2bf" />
            <path d="m544 299 39 3v11l-39-3z" fill="#243d35" />
            <path d="m628 214 60-26v10l-60 27Z" fill="#f0c45f" />
            <path d="m628 224 60-26v8l-60 27Z" fill="#0b684a" />
            <path d="m636 204 20-9v31l-20 9zm25-11 20-9v31l-20 9z" fill="url(#coach-glass)" stroke="#d5ebdd" strokeWidth="3" />
            <path d="m640 243 34-15v65l-34 15Z" fill="#174d40" stroke="#e4f3e7" strokeWidth="3" />
            <g className="bus-door-leaf door-left">
              <path d="m643 244 14-6v59l-14 6Z" fill="url(#coach-glass)" stroke="#d5ebdd" strokeWidth="2" />
              <path d="m647 248 7-3v50l-7 3Z" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".4" />
            </g>
            <g className="bus-door-leaf door-right">
              <path d="m659 237 12-6v59l-12 6Z" fill="url(#coach-glass)" stroke="#d5ebdd" strokeWidth="2" />
              <path d="m667 234 4-2v59l-4 2Z" fill="#f3d370" />
            </g>
            <path d="m499 213 5 1m-5-1-2 11m126-17 10-5m-10 5 8 9" fill="none" stroke="#243d35" strokeWidth="3" strokeLinecap="round" />
            <path d="m490 208 13 1v10l-13-1zm133-10 12-5 3 9-12 5z" fill="#dff4e6" stroke="#274f3e" strokeWidth="2" />
            <path d="m520 183 78 6-8 6-70-5Z" fill="#f6c95f" />
            <path d="m527 186 62 4v4l-62-4z" fill="#143d33" />
            <text x="558" y="192" fill="#fff8df" fontSize="4" fontWeight="700" textAnchor="middle">BUS</text>
            <path d="m500 338 128 10 60-28" fill="none" stroke="#f3d171" strokeWidth="5" />
            <path d="m638 211 39-17" stroke="#fff" strokeWidth="3" opacity=".3" />
          </g>
        </g>
        <g className="boarding-passengers">
          <g className="boarding-passenger passenger-one" transform="translate(770 361)">
          <ellipse cy="1" rx="7" ry="2.5" fill="#10251e" opacity=".28" />
          <circle cy="-24" r="4.8" fill="#8b5b3e" />
          <path d="M-5-18q5-4 10 0l3 13H-8Z" fill="#f2c15e" />
          <path className="passenger-arm" d="m-4-15-6 9m15-9 5 7" fill="none" stroke="#8b5b3e" strokeWidth="3" strokeLinecap="round" />
          <path className="passenger-leg leg-a" d="m-4-5-3 5m9-5 3 5" fill="none" stroke="#314f42" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="boarding-passenger passenger-two" transform="translate(803 361)">
          <ellipse cy="1" rx="7" ry="2.5" fill="#10251e" opacity=".28" />
          <circle cy="-24" r="4.8" fill="#624532" />
          <path d="M-5-18q5-4 10 0l3 13H-8Z" fill="#7db8a0" />
          <path className="passenger-arm" d="m-4-15-6 7m15-7 5 8" fill="none" stroke="#624532" strokeWidth="3" strokeLinecap="round" />
          <path className="passenger-leg leg-b" d="m-4-5-3 5m9-5 3 5" fill="none" stroke="#344b61" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="boarding-passenger passenger-three" transform="translate(836 361)">
          <ellipse cy="1" rx="7" ry="2.5" fill="#10251e" opacity=".28" />
          <circle cy="-24" r="4.8" fill="#9a6846" />
          <path d="M-5-18q5-4 10 0l3 13H-8Z" fill="#d98b69" />
          <path className="passenger-arm" d="m-4-15-5 8m14-8 5 7" fill="none" stroke="#9a6846" strokeWidth="3" strokeLinecap="round" />
          <path className="passenger-leg leg-a" d="m-4-5-3 5m9-5 3 5" fill="none" stroke="#425247" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
        <path d="M0 434h1200v6H0Z" fill="#10251e" opacity=".5" />
      </svg>
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
