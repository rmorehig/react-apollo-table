import React, { useState, useReducer } from "react";
import { useQuery } from "react-apollo";
import Pagination from "./Pagination";
import { FilterIcon } from "../Icons";
import Row from "./Row";

const Table = ({ columns, query }) => {
  const { loading, error, data } = useQuery(query);
  const [activePage, setActivePage] = useState(1);

  const sortingReducer = (state, action) => {
    switch (action.type) {
      case "SORT_DESC":
        return "desc";
      case "SORT_ASC":
        return "asc";
      default:
        return state;
    }
  };
  const initialSorting = "asc";
  const [sorting, dispatch] = useReducer(sortingReducer, initialSorting);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const handleActivePage = nextPage => {
    nextPage ? setActivePage(nextPage) : setActivePage(1);
  };

  const handleSorting = event => {
    sorting === "asc"
      ? dispatch({
          type: "SORT_DESC"
        })
      : dispatch({
          type: "SORT_ASC"
        });
  };

  const handleRowsPerPageChange = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setActivePage(1);
  };

  const totalPages = data ? Math.ceil(data.entidades.length / rowsPerPage) : 1;

  const numSelected = selected.length;
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const allSelected = data.entidades.map(e => e.nombre);
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

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
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
                    checked={numSelected === data.entidades.length}
                  />
                </div>
              </td>
              {columns.map(({ name }) => (
                <td className="px-5" key={name}>
                  <div className="flex justify-between items-center">
                    <input
                      className="bg-gray-100 focus:bg-white"
                      value={name}
                    />
                    <div className="cursor-pointer hover:bg-gray-200 px-1 py-4">
                      <FilterIcon />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.entidades
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
