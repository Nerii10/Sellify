import { useEffect, useState } from "react";
import { AlignJustify, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import Input from "../../components/input/Input";
import "./StatChart.css";

export default function StatChart({ stats }) {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(null);
  const [currentChartData, setCurrentChartData] = useState([]);
  const [currentDataType, setCurrentDataType] = useState("weekly");
  const day = new Date().getDay();
  const diff = new Date().getDate() - day + (day === 0 ? -6 : 1);
  const currentWeekStart = new Date(new Date().setDate(diff))
    .toISOString()
    .split("T")[0];
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
  const dayNames = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ];

  function HandleWeekIndexChange(value) {
    setCurrentWeekIndex((prev) => {
      if (prev == null) return prev;
      const next = prev + value;
      if (next < 0 || next >= stats?.yearStats?.weekly?.length) return prev;
      return next;
    });
  }

  useEffect(() => {
    if (!stats?.yearStats?.weekly) return;

    const CurrentWeekIndex = stats.yearStats.weekly.findIndex(
      (e) => e.week_start === currentWeekStart
    );
    setCurrentWeekIndex(CurrentWeekIndex);
  }, [stats, currentWeekStart]);

  useEffect(() => {
    if (!stats?.yearStats) {
      setCurrentChartData([]);
      return;
    }

    if (currentDataType === "monthly") {
      setCurrentChartData(stats.yearStats.monthly);
    } else if (currentWeekIndex != null) {
      setCurrentChartData(stats.yearStats.weekly[currentWeekIndex]?.days ?? []);
    }
  }, [currentDataType, stats, currentWeekIndex]);

  if (!stats?.yearStats) return null;

  const Max = currentChartData.length
    ? Math.max(...currentChartData.map((d) => Number(d.total)))
    : 0;

  return (
    <div className="stat-chart-wrapper">
      <div className="stat-chart-top">
        Statystyki zarobków
        <Input
          type="select"
          options={[
            { label: "Tygodniowo", value: "weekly" },
            { label: "Miesięcznie", value: "monthly" },
          ]}
          setValue={(e) => setCurrentDataType(e.value)}
          style={{
            borderRadius: "10px",
            color: "var(--InteractionColor)",
            width: "130px",
            height: "35px",
            alignItems: "center",
            border: "var(--DefaultBorder)",
          }}
        />
      </div>

      <div className="stat-chart-mid-wrapper">
        <div className="stat-chart-mid">
          {/* No data this period */}
          {Max === 0 && (
            <div
              style={{
                color: "gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <p>Brak danych w tym okresie..</p>
            </div>
          )}

          {/* Data */}
          {currentChartData.map((Data, index) => {
            if (Data.total === 0) return null;
            const label =
              currentDataType === "monthly"
                ? monthNames[index]
                : dayNames[index];

            return (
              <div className="stat-chart-inputs-wrapper" key={index}>
                <motion.div
                  animate={{
                    height: Max ? `${(Data.total / Max) * 80}%` : "0%",
                  }}
                  className="stat-chart-input total"
                  style={{ height: "0px" }}
                  transition={{
                    duration: 0.7,
                    ease: "circOut",
                  }}
                >
                  <span className="stat-chart-input-amount">{Data.total}</span>
                </motion.div>
                <motion.div
                  animate={{
                    height: Max ? `${(Data.profit / Max) * 80}%` : "0%",
                  }}
                  className="stat-chart-input profit"
                  style={{
                    height: "0px",
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "circOut",
                  }}
                >
                  <span className="stat-chart-input-amount profit">
                    {Data.profit}
                  </span>
                </motion.div>
                <span className="stat-chart-input-month">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="stat-chart-bottom-wrapper">
        <div className="stat-chart-bottom-change">
          <button
            className="stat-chart-bottom-change-button"
            disabled={currentDataType == "monthly"}
          >
            <ChevronLeft onClick={() => HandleWeekIndexChange(-1)} />
          </button>
          <span className="stat-chart-bottom-change-date">
            {currentDataType === "monthly"
              ? stats.yearStats.year
              : stats.yearStats.weekly?.[currentWeekIndex]?.week_start ?? ""}
          </span>
          <button className="stat-chart-bottom-change-button">
            <ChevronRight
              onClick={() => HandleWeekIndexChange(1)}
              disabled={currentDataType == "monthly"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
