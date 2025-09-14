import { useState } from "react";
import { useUser } from "../../logic/hooks/useUser";

export default function Auth() {
  const { logout, login } = useUser();
  const [loginData, setLoginData] = useState({ Login: "", Password: "" });
  return (
    <>
      <br></br>
      <span>Login</span>
      <input
        type="text"
        value={loginData.Login}
        onChange={(e) =>
          setLoginData((prev) => ({ ...prev, Login: e.target.value }))
        }
      ></input>
      <br></br>

      <span>Haslo</span>
      <input
        type="text"
        value={loginData.Password}
        onChange={(e) =>
          setLoginData((prev) => ({ ...prev, Password: e.target.value }))
        }
      ></input>

      <br></br>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <br></br>
      <button
        onClick={() => {
          login(loginData);
        }}
      >
        Login
      </button>
    </>
  );
}
