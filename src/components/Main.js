import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import "./Main.css";

function Main() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [forecast, setForecast] = useState(null);

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || {
      backgroundColor: "#f5f5f5",
      color: "#333",
    }
  );

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weeks = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${weeks[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };
  const url = "https://api.openweathermap.org/data/2.5/weather";
  const api_key = "2606acf332dffab932696f7ad59fb188";
  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });

      await axios
        .get(url, {
          params: {
            q: input,
            units: "metric",
            appid: api_key,
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
          getForecast(); // Lấy dự báo thời tiết
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setInput("");
          console.log("error", error);
        });
    }
  };

  // Hàm để lấy dự báo thời tiết từ API
  const getForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=${api_key}`
      );
      setForecast(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm để thêm/xóa một địa điểm khỏi danh sách yêu thích
  const toggleFavorite = (city) => {
    if (favorites.includes(city)) {
      setFavorites(favorites.filter((item) => item !== city));
    } else {
      setFavorites([...favorites, city]);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  // Hàm để thay đổi tùy chỉnh giao diện
  const toggleTheme = () => {
    const newTheme = {
      backgroundColor: theme.backgroundColor === "#f5f5f5" ? "#333" : "#f5f5f5",
      color: theme.color === "#333" ? "#f5f5f5" : "#333",
    };
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  // Hàm để chia sẻ thông tin thời tiết
  const shareWeather = () => {
    const shareData = {
      title: `Weather in ${weather.data.name}, ${weather.data.sys.country}`,
      text: `
        Temperature: ${Math.round(weather.data.main.temp)}°C
        Description: ${weather.data.weather[0].description.toUpperCase()}
        Wind Speed: ${weather.data.wind.speed}m/s
      `,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((error) => console.error(error));
    } else {
      navigator.clipboard.writeText(shareData.text);
      alert("Weather information copied to clipboard");
    }
  };

  return (
    <div className="App" style={theme}>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name.."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: "20px" }}>City not found</span>
          </span>
        </>
      )}
      {weather && weather.data && weather.data.main && (
        <div className="display">
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
            <button
              className="btfav"
              onClick={() => toggleFavorite(weather.data.name)}
            >
              {favorites.includes(weather.data.name)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
          <div className="forecast">
            {forecast &&
              forecast.list.slice(0, 5).map((item, index) => (
                <div key={index}>
                  <img
                    className="icon-forecast"
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                  />
                  <p className="forecastText">{Math.round(item.main.temp)}°C</p>
                  <p className="forecastText">
                    {item.dt_txt.split(" ")[1].slice(0, 5)}
                  </p>
                </div>
              ))}
          </div>

          <button className="bt" onClick={toggleTheme}>
            Toggle Theme
          </button>
          <button className="bt" onClick={shareWeather}>
            <FontAwesomeIcon icon={faShareAlt} />
            Share Weather
          </button>
        </div>
      )}
    </div>
  );
}

export default Main;
