import React from "react";

const Row = ({ data, columns, handleClick, isItemSelected }) => {
  return (
    <tr className="border-b hover:bg-gray-200">
      <td>
        <div className="flex justify-center items-center ">
          <input
            className="cursor-pointer ml-1 leading-tight"
            type="checkbox"
            onClick={event => handleClick(event, data.nombre)}
            checked={isItemSelected}
          />
        </div>
      </td>
      {columns.map(({ main, field }) => (
        <td
          key={`${field}${data.nombre}`}
          className={`p-3 px-5 ${main && "font-semibold"}`}
        >
          {main ? data[field].toUpperCase() : data[field]}
        </td>
      ))}
    </tr>
  );
};

export default Row;
