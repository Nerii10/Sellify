import { useAppContext } from "../../logic/AppContext";
import { useUser } from "../../logic/hooks/useUser";
export default function Panel() {
  const { userData } = useUser();
  const { serverStatus } = useAppContext();

  return (
    <section className="sales-wrapper">
      <div className="sales-header">
        Hej! {userData?.login}
        <button className="button-normal">Ukryj dane</button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br> <br></br>
      <br></br>
      <br></br>
      <br></br> <br></br>
      <br></br>
      <br></br>
      <br></br>
    </section>
  );
}
