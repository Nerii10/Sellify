import { X } from "lucide-react";
import "./Table.css";

export default function Table({ headers, body, data, remove }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr className="table-header">
            {headers?.map((header, index) => (
              <td className="table-header-input" key={index}>
                {header}
              </td>
            ))}
          </tr>
        </thead>

        {data && data.length != 0 ? (
          <tbody className="table-body">
            {data &&
              data?.map((row) => {
                return (
                  <tr className="table-body-row">
                    {body.map((key) => {
                      if (key == "created_at") {
                        return (
                          <td className="table-body-row-input">
                            {(() => {
                              const date = new Date(row[key]);
                              const day = String(date.getDate()).padStart(
                                2,
                                "0"
                              );
                              const month = String(
                                date.getMonth() + 1
                              ).padStart(2, "0");
                              const year = date.getFullYear();
                              return `${day}.${month}.${year}`;
                            })()}
                          </td>
                        );
                      } else if (key == "remove") {
                        return (
                          <td
                            className="table-body-row-input"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <button
                              className="table-body-row-remove-button"
                              onClick={() => {
                                remove(row);
                              }}
                            >
                              <X />
                            </button>
                          </td>
                        );
                      } else {
                        return (
                          <td className="table-body-row-input">{row[key]}</td>
                        );
                      }
                    })}
                  </tr>
                );
              })}

            {data.length <= 10 &&
              Array(5)
                .fill(0)
                .map((item) => {
                  return (
                    <tr className="table-body-row">
                      {headers.map((header) => (
                        <td
                          className="table-body-row-input"
                          style={{ color: "transparent" }}
                        >
                          -
                        </td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        ) : (
          <tbody className="table-body">
            {Array(10)
              .fill(0)
              .map((item) => {
                return (
                  <tr className="table-body-row">
                    {headers.map((header) => (
                      <td
                        className="table-body-row-input"
                        style={{ color: "transparent" }}
                      >
                        -
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
    </div>
  );
}
