import { useAppContext } from "../../logic/AppContext";
import { useUser } from "../../logic/hooks/useUser";
import Table from "../../components/table/Table";
import "./Panel.css";
import { motion } from "framer-motion";

function formatMoney(amount) {
  const formatted = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount);

  return formatted;
}

export function StatChart({ stats }) {
  const monthNames = [
    "Sty",
    "Lut",
    "Mar",
    "Kwi",
    "Maj",
    "Cze",
    "Lip",
    "Sie",
    "Wrz",
    "Paź",
    "Lis",
    "Gru",
  ];

  return (
    <div className="stat-chart-wrapper">
      <div className="stat-chart-top">Wykres zarobków</div>
      <div className="stat-chart-bottom-wrapper">
        <div className="stat-chart-bottom">
          {stats.length != 0 &&
            (() => {
              const monthlyTotals = stats.yearStats.monthly.map((m) => m.total);
              const maxTotal = Math.max(...monthlyTotals);

              return stats.yearStats.monthly.map((month, index) => {
                if (month.total === 0) return null;
                const monthLabel = monthNames[month.month - 1];
                return (
                  <div className="stat-chart-inputs-wrapper">
                    <div
                      key={index}
                      className="stat-chart-input total"
                      style={{ height: `${(month.total / maxTotal) * 80}%` }}
                    >
                      <a className="stat-chart-input-amount">{month.total}</a>
                    </div>
                    <div
                      key={index}
                      className="stat-chart-input profit"
                      style={{ height: `${(month.profit / maxTotal) * 80}%` }}
                    >
                      <a className="stat-chart-input-amount profit">{month.profit}</a>
                    </div>
                    <a className="stat-chart-input-month">{monthLabel}</a>
                  </div>
                );
              });
            })()}
        </div>
      </div>
    </div>
  );
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
