import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [timeZone, setTimeZone] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [apiTimeData, setApiTimeData] = useState(null);
  const [joke, setJoke] = useState("");

  useEffect(() => { 
    const defineUser =  () => {
      const storedUser =  localStorage.getItem("user");
      if (storedUser) {
       setUser(JSON.parse(storedUser));
      }
    }

    const fetchTimeData = async () => {
      try {
        await fetch("https://www.timeapi.io/api/time/current/coordinate?latitude=50.48&longitude=42.01")
        .then((data) => {return data.json()})
        .then((apidata) => {
          console.log(apidata)
          setApiTimeData(apidata)
        });
      } catch (error) {
        console.error("Error fetching time data:", error);
      }
    };

    // Fetch a random joke
    const fetchJoke = async () => {
      try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single")
        .then((data) => {return data.json()})
        .then((apidata) => {
          console.log(apidata);
          setJoke(apidata.joke)
        })
      } catch (error) {
        console.error("Error fetching joke:", error);
      }
    };
    const now = new Date();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(tz);
    setCurrentDate(now.toLocaleString("en-US", { timeZone: tz }));

    fetchTimeData();
    fetchJoke();
    defineUser();
  }
  , []);

  

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <p>Welcome, {user.username}</p>}
      <p>Time Zone: {timeZone}</p>
      <p>Current Date: {currentDate}</p>
      
      {user && user.role == 'admin' &&
      <Link to='/admin'>Admin</Link> }

      <button onClick={handleLogout}>Logout</button>

        {apiTimeData ? (
        <div>
          <h2>Текущее время и часовой пояс в Урюпинске</h2>
          <p><strong>Time:</strong> {new Date(apiTimeData.dateTime).toLocaleString()}</p>
          <p><strong>Timezone:</strong> {apiTimeData.timeZone}</p>
        </div>
      ) : (
        <p>Loading time data...</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <h2>Random Joke</h2>
        {joke ? <p>{joke}</p> : <p>Loading joke...</p>}
      </div>
    </div>

  );
};

export default Dashboard;