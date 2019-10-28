import React from "react";
import { CheveronLeftIcon, CheveronRightIcon } from "../../Icons";

const Pagination = ({
  activePage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange
}) => {
  return (
    <div className="w-full bg-gray-100 text-gray-600 font-semibold">
      <div className="flex justify-end px-2 list-none rounded py-2 right-0">
        <div className="inline-flex">
          <select
            className="cursor-pointer hover:bg-gray-200 bg-white py-1 px-1 mx-2 rounded border"
            onChange={e => {
              onRowsPerPageChange(e);
              onPageChange("init");
            }}
            value={rowsPerPage}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
          </select>
          <button
            className="bg-gray-100 text-gray-700"
            onClick={() => activePage !== 1 && onPageChange("previous")}
          >
            <CheveronLeftIcon />
          </button>

          <span className="cursor-default bg-white py-1 px-3 mx-2 rounded-full border">
            {activePage}
          </span>
          <button
            className="bg-gray-100 text-gray-700"
            onClick={() => totalPages > activePage && onPageChange("next")}
          >
            <CheveronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
