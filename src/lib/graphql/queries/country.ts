import { gql } from '@apollo/client';

export const GET_COUNTRY = gql`
    query getCountry {
        country(code: "AL") {
            name
            capital
            code
            currencies
            currency
            continent {
                name
            }
        }
    }
`;
