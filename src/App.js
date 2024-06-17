import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <div className="Header">
        <Header />
      </div>

      <div className="Main">
        <Main />
      </div>

      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
