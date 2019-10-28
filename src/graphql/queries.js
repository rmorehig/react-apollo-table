import gql from "graphql-tag";

export const GET_ENTITIES = gql`
  query {
    entidades(order_by: { nombre: asc }) {
      id_entidad
      dni_cif
      codigo
      nombre
      codigo_postal
      direccion
      dni_cif
      email
      etiquetas
      facebook
      fecha_alta
      fecha_baja
      fecha_constitucion
      id_pais
      id_poblacion
      id_provincia
      id_sector
      id_tipo_entidad
      instagram
      linkedin
      nombre_comercial
      observaciones
      telefono_principal
      telefono_secundario
      twitter
      web
    }
  }
`;
