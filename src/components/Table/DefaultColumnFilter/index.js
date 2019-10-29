import React from "react";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, Header }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Buscar ${Header.toLowerCase()}`}
    />
  );
}

export default DefaultColumnFilter;
