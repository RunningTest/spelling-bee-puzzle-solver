import React from "react";
import { FaGithub } from "react-icons/fa";

const setDark = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");

const prefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
  storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};

const DarkMode = () => {
  return (
    <div className="toggle-theme-wrapper">
      <span role="img" aria-label="light theme">
        ⚪
      </span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          defaultChecked={defaultDark}
        />
        <div className="slider round"></div>
      </label>
      <span role="img" aria-label="dark theme">
        ⚫
      </span>
      <div className="footer-info">
        <p>
          ©2024 Jan Horak
          <a href="https://github.com/MrJanHorak/spelling-bee-puzzle-solver"><FaGithub /></a>
          <a href="/blog.html">Blog</a>
        </p>
      </div>
    </div>
  );
};

export default DarkMode;
