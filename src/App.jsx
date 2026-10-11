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

function App() {
  const [active, setActive] = useState(1);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

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

  const selectedRoute = active === 1 ? route1 : route2;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const nextBus = selectedRoute.find((bus) => {
    const [time, period] = bus.time.split(" ");
    const [hour, minute] = time.split(":").map(Number);
    const departureMinutes = ((hour % 12) + (period === "PM" ? 12 : 0)) * 60 + minute;
    return departureMinutes >= currentMinutes;
  });

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon"><BusIcon /></span>
            <span className="brand-copy">
              <strong>Kaliyattamukku</strong>
              <span>Bus Timetable</span>
            </span>
          </div>
          <span className="header-status"><span /> Live timetable</span>
        </div>
      </header>

      <main className="page-content">
        <section className="intro">
          <p className="eyebrow"> REGULER BUS SERVICE</p>
          <h1>Plan your journey</h1>
          <p className="intro-copy">Choose a route to view the bus timetable.</p>
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

        <div className="content-grid">
          <section className="timetable-card" aria-labelledby="timetable-title">
            <div className="section-heading">
              <span className="section-icon"><BusIcon /></span>
              <div>
                <h2 id="timetable-title">Bus Timetable</h2>
                <p>{active === 1 ? "Kaliyattamukk to Chemmad" : "Chemmad to Kaliyattamukk"}</p>
              </div>
              <span className="entry-count">{selectedRoute.length} buses</span>
            </div>

            {active === 2 && (
              <p className="departure-note">Note : ഇത് സ്റ്റാൻഡിൽ നിന്നും Bus പുറപ്പെടുന്ന സമയമാണ്.</p>
            )}

            <div className="bus-list">
              {selectedRoute.map((bus, i) => (
                <article key={i} className="bus-row">
                  <span className={`bus-row-icon bus-color-${i % 4}`}><BusIcon /></span>
                  <span className="bus-details">
                    <span className="bus-time">{bus.time}</span>
                    <span className="bus-name">{bus.name.trim()}</span>
                  </span>
                  <span className="row-chevron" aria-hidden="true">›</span>
                </article>
              ))}
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
          <span className="footer-mark"><BusIcon /></span>
          <span>@2026</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
