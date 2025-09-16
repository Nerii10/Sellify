import { useAppContext } from "../../logic/AppContext";
import Input from "../../components/input/Input";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PackageSearch, X } from "lucide-react";

export default function AddItem({ open, setOpen }) {
  const { items, token, addItems, loading } = useAppContext();
  const [currentItems, setCurrentItems] = useState([
    { Code: "", Name: "", BuyPrice: "", SellPrice: "" },
  ]);

  useEffect(() => {
    if (!loading) {
      setOpen(false);
      setCurrentItems([{ Code: "", Name: "", BuyPrice: "", SellPrice: "" }]);
    }
  }, [loading]);

  useEffect(() => {
    console.log(currentItems);
  }, [currentItems]);

  return (
    <motion.div
      className="add-item-wrapper"
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={
        open
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <form
        className="add-item-receipt"
        onSubmit={(e) => {
          e.preventDefault();
          addItems(currentItems);
        }}
      >
        <div className="add-item-receipt-top">
          <div
            className={
              loading ? "add-item-closebutton disabled" : "add-item-closebutton"
            }
            onClick={() => {
              !loading && setOpen(false);
            }}
          >
            <X />
          </div>
          Dodaj przedmiot
        </div>

        <div className="add-item-receipt-mid">
          {currentItems.map((item, index) => {
            return (
              <div className="add-item-input">
                <button
                  className="remove-button"
                  onClick={() => {
                    setCurrentItems((prev) =>
                      prev.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <X />
                </button>
                <Input
                  type={"text"}
                  required={true}
                  value={item.Code}
                  setValue={(e) => {
                    setCurrentItems((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        Code: e,
                      };
                      return newItems;
                    });
                  }}
                  style={{
                    border: "var(--DefaultBorder)",
                    display: "flex",
                    justifyContent: "center",
                    padding: "7px",
                    fontSize: "19px",
                    borderRadius: "10px",
                    flexShrik: 0,
                  }}
                  width={"150px"}
                >
                  Kod
                </Input>

                <Input
                  value={item.Name}
                  required={true}
                  setValue={(e) => {
                    setCurrentItems((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        Name: e,
                      };
                      return newItems;
                    });
                  }}
                  type={"text"}
                  style={{
                    border: "var(--DefaultBorder)",
                    display: "flex",
                    justifyContent: "center",
                    padding: "7px",
                    fontSize: "19px",
                    borderRadius: "10px",
                    flexShrik: 0,
                  }}
                  width={"200px"}
                >
                  Nazwa
                </Input>

                <Input
                  value={item.Brand}
                  required={true}
                  setValue={(e) => {
                    setCurrentItems((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        Brand: e,
                      };
                      return newItems;
                    });
                  }}
                  type={"text"}
                  style={{
                    border: "var(--DefaultBorder)",
                    display: "flex",
                    justifyContent: "center",
                    padding: "7px",
                    fontSize: "19px",
                    borderRadius: "10px",
                  }}
                  width={"200px"}
                >
                  Marka
                </Input>

                <Input
                  value={item.BuyPrice}
                  required={true}
                  setValue={(e) => {
                    setCurrentItems((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        BuyPrice: e,
                      };
                      return newItems;
                    });
                  }}
                  type={"text"}
                  style={{
                    border: "var(--DefaultBorder)",
                    display: "flex",
                    justifyContent: "center",
                    padding: "7px",
                    fontSize: "19px",
                    borderRadius: "10px",
                    flexShrik: 0,
                  }}
                  width={"150px"}
                >
                  Cena Zakupu
                </Input>

                <Input
                  required={true}
                  value={item.SellPrice}
                  setValue={(e) => {
                    setCurrentItems((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        SellPrice: e,
                      };
                      return newItems;
                    });
                  }}
                  type={"text"}
                  style={{
                    border: "var(--DefaultBorder)",
                    display: "flex",
                    justifyContent: "center",
                    padding: "7px",
                    fontSize: "19px",
                    borderRadius: "10px",
                    flexShrik: 0,
                  }}
                  width={"150px"}
                >
                  Cena Sprzedazy
                </Input>
              </div>
            );
          })}
        </div>

        <div className="add-item-receipt-bottom">
          <input type="button"
            className={loading ? "button-normal disabled" : "button-normal"}
            onClick={() => {
              setCurrentItems((prev) => [
                ...prev,
                { Code: "", Name: "", BuyPrice: "", SellPrice: "" },
              ]);
            }}
            value={"+"}
          >
          </input>
          <input
            type="submit"
            className={loading ? "button-normal disabled" : "button-normal"}
            value={"Dodaj przedmioty"}
          ></input>
        </div>
      </form>
    </motion.div>
  );
}
