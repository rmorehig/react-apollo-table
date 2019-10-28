import gql from "graphql-tag";

export const ADD_ENTITY = gql`
  mutation AddEntity(
    $nombre: String!
    $codigo: String
    $email: String
    $dni_cif: String
    $telefono_principal: String
    $direccion: String
    $codigo_postal: String
    $web: String
  ) {
    insert_entidades(
      objects: [
        {
          nombre: $nombre
          codigo: $codigo
          email: $email
          dni_cif: $dni_cif
          telefono_principal: $telefono_principal
          direccion: $direccion
          codigo_postal: $codigo_postal
          web: $web
        }
      ]
    ) {
      returning {
        nombre
        codigo
        email
        dni_cif
        telefono_principal
        direccion
        codigo_postal
        web
      }
    }
  }
`;
