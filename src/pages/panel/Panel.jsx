import { useAppContext } from "../../logic/AppContext";
import { useUser } from "../../logic/hooks/useUser";
import Table from "../../components/table/Table";
export default function Panel() {
  const { userData } = useUser();
  const { serverStatus, stats } = useAppContext();
  console.log(stats);
  return (
    <section className="sales-wrapper">
      <div className="sales-header">
        Hej! {userData?.login}
        <button className="button-normal">Ukryj dane</button>
      </div>

      {stats.length != 0 && (
        <>
          <a>Od Poczatku: {stats?.allTime.total}zł</a>
          <br></br>
          <a>Łacznie {stats?.allTime.total}zł</a>
          <br></br>
          <a>Profit {stats?.allTime.profit}zł</a>

          <br></br>
          <br></br>
          <br></br>
          <a>Dzisiaj: </a>
          <br></br>
          <a>Łacznie {stats?.today.total}zł</a>
          <br></br>
          <a>Profit {stats?.today.profit}zł</a>
        </>
      )}

      <br></br>
      <br></br>
      <br></br>
    </section>
  );
}
