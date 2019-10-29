import React, { useState, useReducer } from "react";
import Pagination from "./Pagination";
import { FilterIcon } from "../Icons";
import Row from "./Row";

const Table = ({ columns, data }) => {
  const [results, setResults] = useState(data);
  const [activePage, setActivePage] = useState(1);
  const sortingReducer = (state, action) => {
    const { type, column } = action;
    switch (type) {
      case "SORT_DESC":
        return {
          type: "desc",
          column
        };
      case "SORT_ASC":
        return {
          type: "asc",
          column
        };
      default:
        return state;
    }
  };
  const initialSorting = {
    type: "",
    column: ""
  };
  const [sorting, dispatchSorting] = useReducer(sortingReducer, initialSorting);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const handleActivePage = nextPage => {
    nextPage ? setActivePage(nextPage) : setActivePage(1);
  };

  const handleSorting = column => {
    sorting.type === "asc" && sorting.column === column
      ? dispatchSorting({
          type: "SORT_DESC",
          column
        })
      : dispatchSorting({
          type: "SORT_ASC",
          column
        });
  };

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getSorting(type, column) {
    return type === "desc"
      ? (a, b) => desc(a, b, column)
      : (a, b) => -desc(a, b, column);
  }

  const handleRowsPerPageChange = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setActivePage(1);
  };

  function sortedResults(results, cmp) {
    const stabilizedThis = results.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const totalPages = results ? Math.ceil(results.length / rowsPerPage) : 1;

  const numSelected = selected.length;
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const allSelected = results.map(e => e.nombre);
      setSelected(allSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className="flex px-5 py-5 justify-center">
      <div className="w-full text-sm bg-white shadow-md rounded">
        <table className="w-full text-xs text-gray-800 ">
          <thead>
            <tr className="border-b bg-gray-100 text-gray-600 font-semibold">
              <td>
                <div className="flex justify-center items-center ">
                  <input
                    className="cursor-pointer ml-1 leading-tight"
                    type="checkbox"
                    onClick={e => handleSelectAllClick(e)}
                    checked={numSelected === results.length}
                  />
                </div>
              </td>
              {columns.map(({ name }) => (
                <td className="px-5" key={name}>
                  <div className="flex justify-start items-center">
                    <input
                      className="bg-gray-100 focus:bg-white"
                      value={name}
                    />
                    <div
                      className="cursor-pointer hover:bg-gray-200 px-1 py-4"
                      onClick={() => handleSorting(name)}
                    >
                      <FilterIcon />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedResults(results, getSorting(sorting.type, sorting.column))
              .slice(
                (activePage - 1) * rowsPerPage,
                (activePage - 1) * rowsPerPage + rowsPerPage
              )
              .map(e => {
                const isItemSelected = isSelected(e.nombre);
                return (
                  <Row
                    key={e.nombre}
                    data={e}
                    columns={columns}
                    handleClick={handleClick}
                    isItemSelected={isItemSelected}
                  />
                );
              })}
          </tbody>
        </table>
        <Pagination
          totalPages={totalPages}
          activePage={activePage}
          onPageChange={handleActivePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
};

export default Table;
