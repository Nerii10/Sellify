import { X } from "lucide-react";
import "./Table.css";

function TableFillers({ count, headers }) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push(
      <tr className="table-body-row" key={i}>
        {headers.map((header, index) => (
          <td
            className="table-body-row-input"
            style={{ color: "transparent" }}
            key={index}
          >
            0
          </td>
        ))}
      </tr>
    );
  }
  return <>{rows}</>;
}

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

            {data.length <= 10 && (
              <TableFillers headers={headers} count={10 - data.length} />
            )}
          </tbody>
        ) : (
          <tbody className="table-body">
            <TableFillers headers={headers} count={10} />
          </tbody>
        )}
      </table>
    </div>
  );
}
