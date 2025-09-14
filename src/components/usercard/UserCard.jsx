import { useAppContext } from "../../logic/AppContext";
import { useUser } from "../../logic/hooks/useUser";
import "./UserCard.css";

export default function UserCard() {
  const { userData } = useUser();
  const { serverStatus } = useAppContext();
  
  return (
    <div className="user-card-wrapper">
      {userData ? (
        <>
          <a>{userData.login}</a>
          {/* active , inactive styles */}
          <div className={serverStatus == "online" ? "user-card-status active" : "user-card-status inactive"}></div>
        </>
      ) : (
        <a>Login</a>
      )}
    </div>
  );
}
