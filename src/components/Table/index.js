import React, { useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import matchSorter from "match-sorter";
import {
  FilterIcon,
  CheveronRightIcon,
  CheveronLeftIcon,
  CheveronDownIcon,
  CheveronUpIcon
} from "../Icons";
import DefaultColumnFilter from "./DefaultColumnFilter";

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = val => !val;

const Table = ({ columns, data }) => {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, groupBy, expanded, filters, selectedRowPaths }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes
    },
    useFilters,
    useSortBy,
    usePagination
  );
  const [isFiltering, setIsFiltering] = useState(true);
  return (
    <div className="flex px-5 py-5 justify-center">
      <div className="w-full text-sm bg-white shadow-md rounded">
        <table {...getTableProps()} className="w-full text-xs text-gray-800 ">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="border-b bg-gray-100 text-gray-600 font-semibold text-sm"
              >
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    <div
                      {...column.getSortByToggleProps()}
                      className="flex justify-start px-5 py-3"
                    >
                      <span>{column.render("Header")}</span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <CheveronDownIcon />
                        ) : (
                          <CheveronUpIcon />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                    {isFiltering && (
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(
              (row, i) =>
                prepareRow(row) || (
                  <tr
                    {...row.getRowProps()}
                    className="border-b hover:bg-gray-200"
                  >
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()} className="py-1 px-5">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                )
            )}
          </tbody>
        </table>
        <div className="w-full bg-gray-100 text-gray-600 font-semibold">
          <div className="flex justify-end px-2 list-none rounded py-2 right-0">
            <div className="inline-flex">
              <select
                className="cursor-pointer hover:bg-gray-200 bg-white py-1 px-1 mx-2 rounded border"
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 25, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
              <button
                className="bg-gray-100 text-gray-700"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <CheveronLeftIcon />
              </button>

              <span className="cursor-default bg-white py-1 px-3 mx-2 rounded-full border">
                {pageIndex + 1}
              </span>
              <button
                className="bg-gray-100 text-gray-700"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <CheveronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
