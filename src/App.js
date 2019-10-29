import React from "react";
import { GET_ENTITIES } from "./graphql/queries";
import Table from "./components/Table";
import { useQuery } from "react-apollo";
import SelectColumnFilter from "./components/Table/SelectColumnFilter";

const columns = [
  {
    id: "selection",
    // Make this column a groupByBoundary. This ensures that groupBy columns
    // are placed after it
    groupByBoundary: true,
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <div>
        <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
      </div>
    ),
    // The cell can use the individual row's getToggleRowSelectedProps method
    // to the render a checkbox
    Cell: ({ row }) => (
      <div>
        <input type="checkbox" {...row.getToggleRowSelectedProps()} />
      </div>
    )
  },
  {
    Header: "Nombre",
    accessor: "nombre"
  },
  {
    Header: "Código",
    accessor: "codigo"
  },
  {
    Header: "NIF/CIF",
    accessor: "dni_cif"
    //Filter: SelectColumnFilter,
    //filter: "includes"
  },
  {
    Header: "Teléfono",
    accessor: "telefono_principal"
  },
  {
    Header: "Dirección",
    accessor: "direccion"
  }
];

const App = () => {
  const { loading, error, data } = useQuery(GET_ENTITIES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return <Table data={data.entidades} columns={columns} />;
};

export default App;
