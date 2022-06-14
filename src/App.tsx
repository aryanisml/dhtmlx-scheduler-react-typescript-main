import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import Scheduler from './components/Scheduler/Scheduler';


const data :any = [
  // {
  //   start_date: "2020-06-10 6:00",
  //   end_date: "2020-06-10 8:00",
  //   text: "Event 1",
  //   id: 1
  // },
  // {
  //   start_date: "2020-06-13 10:00",
  //   end_date: "2020-06-13 18:00",
  //   text: "Event 2",
  //   id: 2
  // }
];

function App(): JSX.Element {
  const [timeFormatState, setTimeFormatState] = useState(true);
  const [messages, setMessages] = useState([]);

  const addMessage = (message:any) => {
  
  };

  const logDataUpdate = (action:string, ev:any, id:any) => {
    const text = ev && ev.text ? ` (${ev.text})` : "";
    const message = `event ${action}: ${id} ${text}`;
    addMessage(message);
  };



  return (
    <div className="App">
      <Toolbar
        timeFormatState={timeFormatState}
        handleTimeFormatStateChange={(event :any) =>
          setTimeFormatState(event.target.checked)
        }
      />
      <Scheduler
        events={data}
        timeFormatState={timeFormatState}
        onDataUpdated={logDataUpdate}
      />
    </div>
  );
}

export default App;
