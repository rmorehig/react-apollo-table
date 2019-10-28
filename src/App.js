import React from "react";
import { GET_ENTITIES } from "./graphql/queries";

const columns = [
  {
    name: "Nombre",
    field: "nombre",
    main: true
  },
  {
    name: "Código",
    field: "codigo",
    width: 2
  },
  {
    name: "NIF/CIF",
    field: "dni_cif",
    type: "multi",
    filter: "dropdown",
    width: 3
  },
  {
    name: "Teléfono",
    field: "telefono_principal",
    type: "multi",
    filter: "dropdown",
    width: 2
  }
];

const App = () => {
  return <Table query={GET_ENTITIES} columns={columns} />;
};

export default App;
