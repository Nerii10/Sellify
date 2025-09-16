import { useAppContext } from "../../logic/AppContext";
import { useUser } from "../../logic/hooks/useUser";
import Input from "../../components/input/Input";
import "./Panel.css";
import StatChart from "./StatChart";

function formatMoney(amount) {
  const formatted = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount);

  return formatted;
}

export default function Panel() {
  const { userData } = useUser();
  const { serverStatus, stats } = useAppContext();

  const data = [
    {
      data: [
        { amount: stats?.allTime?.total ?? 0, label: "Łączny obrót" },
        { amount: stats?.allTime?.profit ?? 0, label: "Łączny zysk" },
      ],
      label: "Łączny",
    },
    {
      data: [
        { amount: stats?.today?.total ?? 0, label: "Obrót dziś" },
        { amount: stats?.today?.profit ?? 0, label: "Zysk dziś" },
      ],
    },
  ];

  return (
    <section className="sales-wrapper">
      <div className="sales-header">
        Hej! {userData?.login}
        <button className="button-normal">Ukryj dane</button>
      </div>

      <div className="panel-money-wrapper">
        {data.map((i) => {
          return i.data.map((j) => {
            return (
              <div className="panel-money-input">
                <a>{j.label}</a>
                <span
                  style={{
                    borderRadius: "20px",
                    willChange: "filter",
                  }}
                >
                  {formatMoney(j.amount)}
                </span>
              </div>
            );
          });
        })}
      </div>

      <StatChart stats={stats} />
    </section>
  );
}
