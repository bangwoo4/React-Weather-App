import React from "react";

const Main = () => {
  return (
    <main className="App-main">
      <div className="main-content">
        <h1>Weather App</h1>
        <p>Enter a city to get the weather forecast</p>
        <form>
          <input type="text" placeholder="Enter city" />
          <button type="submit">Get Weather</button>
        </form>
      </div>
    </main>
  );
};

export default Main;
