import { gql } from "@apollo/client";

export const GET_CONTINENT = gql`
    query GetContinent($filter: ContinentFilterInput) {
      continents(filter: $filter) {
        countries {
            awsRegion
            capital
            code
        }
      }
    }
  `;