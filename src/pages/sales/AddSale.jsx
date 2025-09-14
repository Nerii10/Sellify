import { useAppContext } from "../../logic/AppContext";
import { motion, scale } from "framer-motion";
import Input from "../../components/input/Input";
import { useEffect, useState } from "react";
import { PackageSearch, X } from "lucide-react";
import { useUser } from "../../logic/hooks/useUser";

export default function AddSale({ open, setOpen }) {
  const { items, token, addSale, loading } = useAppContext();

  const [currentSale, setCurrentSale] = useState([]);
  const [saleDate, setSaleDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (!loading) {
      setOpen(false);
      setCurrentSale([]);
    }
  }, [loading]);

  return (
    <motion.div
      className="add-sale-wrapper"
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={
        open
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <div className="add-sale-receipt">
        <div className="add-sale-receipt-top">
          <div
            className={
              loading ? "add-sale-closebutton disabled" : "add-sale-closebutton"
            }
            onClick={() => {
              !loading && setOpen(false);
            }}
          >
            <X />
          </div>
          Sprzedaż
          <Input
            type={"select"}
            search={true}
            required={true}
            children={
              <>
                <PackageSearch size={19} /> Szukaj
              </>
            }
            style={{
              maxWidth: "350px",
              width: "40vw",
              height: "40px",
              border: "var(--DefaultBorder)",
              borderRadius: "10px",
              fontSize: "19px",
            }}
            value={""}
            setValue={(e) => {
              e &&
                setCurrentSale([
                  ...currentSale,
                  { Code: e.code, SellPrice: e.sell_price, Label: e.label },
                ]);
            }}
            options={items?.map((item) => ({
              code: item.code,
              label: `${item.code} - ${item.name} / ${item.brand}`,
              sell_price: item.sell_price,
            }))}
          ></Input>
        </div>

        <div className="add-sale-receipt-mid">
          <input
            type="date"
            value={saleDate}
            onChange={(e) => {
              setSaleDate(e.target.value);
            }}
            className="add-sale-receipt-mid-date"
          />
          {currentSale.map((sale, index) => (
            <div key={index} className="add-sale-input">
              <a style={{ width: "50%", fontSize: "15px" }}>{sale.Label}</a>
              <input
                className="add-sale-input-text"
                type="number"
                value={sale.SellPrice}
                onChange={(e) => {
                  const newPrice = e.target.value;
                  setCurrentSale((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, SellPrice: newPrice } : item
                    )
                  );
                }}
              />
              <button
                className="add-sale-input-button"
                onClick={() => {
                  setCurrentSale((prev) => prev.filter((_, i) => i !== index));
                }}
              >
                <X stroke="red" />
              </button>
            </div>
          ))}
        </div>

        <div className="add-sale-receipt-bottom">
          <a>
            Razem{" "}
            <span style={{ color: "var(--InteractionColor)" }}>
              {currentSale.reduce(
                (total, sale) => total + Number(sale.SellPrice),
                0
              )}
            </span>{" "}
            PLN
          </a>
          <button
            className={loading ? "button-normal disabled" : "button-normal"}
            onClick={() => {
              !loading &&
                addSale({ saleData: currentSale, saleDate: saleDate });
            }}
          >
            Zapisz Sprzedaz
          </button>
        </div>
      </div>
    </motion.div>
  );
}
