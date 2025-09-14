import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useAppContext } from "../../logic/AppContext";
import "./Items.css";
import { PackageSearch } from "lucide-react";
import { motion } from "framer-motion";
import AddItem from "./AddItem";
export default function Items() {
  const { items } = useAppContext();
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [open, setOpen] = useState(false);

  function filterItems() {
    const filtered = items.filter(
      (item) =>
        item.code.toLowerCase().includes(filter.toLowerCase()) ||
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.brand.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredItems(filtered);
  }

  useEffect(() => {
    filterItems();
  }, [filter]);

  useEffect(() => {
    if (filter == "") {
      setFilteredItems(items);
    } else {
      filterItems();
    }
  }, [items]);

  return (
    <section className="sales-wrapper">
      <AddItem open={open} setOpen={setOpen} />
      <div className="sales-header">
       
        <div className="sales-header-search-wrapper">
          <motion.p
            className="sales-header-serach-label"
            animate={
              filter
                ? { opacity: 0, marginLeft: "50px" }
                : { opacity: 1, marginLeft: "10px" }
            }
            transition={{ duration: 0.3, ease: "circOut" }}
          >
            <PackageSearch size={20} />
            Szukaj
          </motion.p>
          <input
            type="text"
            className="sales-header-search-input"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </div>

        <button className="button-normal" onClick={()=>{setOpen(!open)}}>Dodaj</button>
      </div>

      <Table
        body={["code", "brand", "name", "buy_price", "sell_price"]}
        headers={["Kod", "Marka", "Nazwa", "Cena Zakupu", "Cena"]}
        data={filteredItems}
      />
      <br></br>
    </section>
  );
}
