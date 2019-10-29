import React, { useMemo } from "react";
import { GET_ENTITIES } from "./graphql/queries";
import Table from "./components/Table";
import { useQuery } from "react-apollo";

const App = () => {
  const columns = useMemo(() => [
    {
      Header: "Nombre",
      accessor: "nombre",
      name: "Nombre",
      field: "nombre",
      main: true
    },
    {
      Header: "Código",
      accessor: "codigo",
      name: "Código",
      field: "codigo",
      width: 2
    },
    {
      Header: "NIF/CIF",
      accessor: "dni_cif",
      name: "NIF/CIF",
      field: "dni_cif",
      type: "multi",
      filter: "dropdown",
      width: 3
    },
    {
      Header: "Teléfono",
      accessor: "telefono_principal",
      name: "Teléfono",
      field: "telefono_principal",
      type: "multi",
      filter: "dropdown",
      width: 2
    }
  ]);
  const { loading, error, data } = useQuery(GET_ENTITIES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return <Table data={data.entidades} columns={columns} />;
};

export default App;
