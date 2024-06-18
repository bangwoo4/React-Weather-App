import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="App-footer">
      <div className="footer-content">
        <p className="i4">
          React Weather App
          <br></br>
          Copyright © 2024 - Created by Bang
        </p>

        <nav className="links">
          <ul>
            <li>
              <a
                href="https://www.geeksforgeeks.org/user/bangwoo4/"
                aria-label="GeeeksforGeeks"
              >
                GeeeksforGeeks
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/bangwoo4_/"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=100018136776949"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </li>
            <li>
              <a href="https://github.com/bangwoo4" aria-label="Github">
                <FontAwesomeIcon icon={faGithub} /> Github
              </a>
            </li>
          </ul>
          <div style={{ padding: "10px" }}>
            All the weather data is provided by OpenWeatherMap API.
          </div>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
