  import React, { useState } from "react";
import "./App.css";
 

function App() {

  const [active, setActive] = useState(1);

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

  return (
    <div>

      <div className="header">
        KALIYATTAMUKK BUS TIME
      </div>

      <div className="button-one">

        <button
          className={active === 1 ? "active-btn" : ""}
          onClick={() => setActive(1)}
        >
          Kaliyattamukk To Chemmad
        </button>

        <button
          className={active === 2 ? "active-btn" : ""}
          onClick={() => setActive(2)}
        >
          Chemmad To Kaliyattamukk
        </button>

      </div>

      <div className="main-body">

        {/* FIRST DIV */}

        {active === 1 && (
          <div className="body active-body">
             
            {route1.map((bus,i)=>(
              <button key={i} className="bus-btn">
                {bus.time} — {bus.name}
              </button>
            ))}
          </div>
        )}

        {/* SECOND DIV */}
        {active === 2 && (
          <div className="body active-body">
             <p>Note : ഇത് സ്റ്റാൻഡിൽ നിന്നും Bus പുറപ്പെടുന്ന സമയമാണ്. </p>
            {route2.map((bus,i)=>(
              <button key={i} className="bus-btn">
                {bus.time} — {bus.name}
              </button>
            ))}
          </div>
        )}

      </div>

      <div>
        <footer className="footer">

  <div className="footer-content">

     
 
    <div className="footer-right">
      <p>Note :-</p>
      <p>Timings may change depending on traffic or delays.</p>
    </div>

  </div>

  <div className="footer-bottom">
    @2026
  </div>

</footer>
      </div>
       
    </div>
  );
}

export default App;
