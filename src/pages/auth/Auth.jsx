import { useState } from "react";
import { useUser } from "../../logic/hooks/useUser";
import "./Auth.css";

export default function Auth() {
  const { logout, login } = useUser();
  const [loginData, setLoginData] = useState({ Login: "", Password: "" });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        boxSizing: "border-box",
      }}
    >
      <br></br>

      <div className="auth-wrapper">
        <div className="auth-input-wrapper">
          <a
            className={
              loginData.Login != ""
                ? "auth-input-text hidden"
                : "auth-input-text"
            }
          >
            Login
          </a>
          <input
            className="auth-input"
            type="text"
            value={loginData.Login}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, Login: e.target.value }))
            }
          ></input>
        </div>

        <div className="auth-input-wrapper">
          <a
            className={
              loginData.Password != ""
                ? "auth-input-text hidden"
                : "auth-input-text"
            }
          >
            Hasło
          </a>
          <input
            className="auth-input"
            type="password"
            value={loginData.Password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, Password: e.target.value }))
            }
          ></input>
        </div>

        <button
          style={{ width: "100%" }}
          className="button-normal"
          onClick={() => {
            login(loginData);
          }}
        >
          Zaloguj
        </button>

        <button
          style={{ width: "100%" }}
          className="button-normal"
          onClick={() => {
            logout();
          }}
        >
          Wyloguj
        </button>
      </div>
    </div>
  );
}
