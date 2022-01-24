import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";

import Authorization from "./components/Authorization";
import CheckEmail from "./components/CheckEmail";
import Login from "./components/Login";
import "./style/style.scss";
function App() {
  return (
    <div className="Login__App">
      <Router>
        <div className="nav">
          <NavLink
            to="home"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Вход 1
          </NavLink>{" "}
          <NavLink
            to="login"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Вход 2
          </NavLink>{" "}
          <NavLink
            to="Authorization"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            Регистрация
          </NavLink>{" "}
        </div>
        <Routes>
          <Route path="home" element={<CheckEmail />} />
          <Route path="login" element={<Login />} />
          <Route path="Authorization" element={<Authorization />} />
          <Route path="" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
