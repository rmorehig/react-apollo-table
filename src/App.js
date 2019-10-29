import React from "react";
import { GET_ENTITIES } from "./graphql/queries";
import Table from "./components/Table";
import { useQuery } from "react-apollo";

const columns = [
  {
    id: "selection",
    groupByBoundary: true,
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <div>
        <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
      </div>
    ),
    Cell: ({ row }) => (
      <div>
        <input type="checkbox" {...row.getToggleRowSelectedProps()} />
      </div>
    )
  },
  {
    Header: "Nombre",
    accessor: "nombre",
    width: 50
  },
  {
    Header: "Código",
    accessor: "codigo",
    width: 50
  },
  {
    Header: "NIF/CIF",
    accessor: "dni_cif"
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
