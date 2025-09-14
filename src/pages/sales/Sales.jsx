import { useState } from "react";
import Table from "../../components/table/Table";
import { useAppContext } from "../../logic/AppContext";
import AddSale from "./AddSale";
import "./Sales.css";

export default function Sales() {
  const { sales, removeSale } = useAppContext();
  const [open, setOpen] = useState(false);

  function handleRemove(data) {
    removeSale(data);
  }

  return (
    <section className="sales-wrapper">
      <AddSale open={open} setOpen={setOpen} />

      <div className="sales-header">
        <a className="sales-header-text">Ostatnie sprzedaże</a>
        <button
          className="button-normal"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Dodaj sprzedaż
        </button>
      </div>

      <div className="sales-list">
        <Table
          remove={handleRemove}
          body={["remove", "created_at", "name", "brand", "sellprice", "code"]}
          headers={["Usuń", "Data", "Nazwa", "Marka", "Wartość", "Kod"]}
          data={sales.slice(0, 100)}
        />
      </div>
      <br></br>
    </section>
  );
}
