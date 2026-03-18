import React from 'react';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { getClient } from '@/src/lib/apollo/rsc';

export default async function TestClientComponent() {
    console.log('>>> render TestClientComponent');
    const GET_CONTINENT = gql`
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
    interface Country {
        awsRegion: string;
        capital: string;
        code: string;
    }
    interface Continent {
        code: string;
        countries: Country[];
    }

    interface GetContinentData {
        continents: Continent[];
    }

    const { data: { continents } = {} } = await getClient().query<GetContinentData>({
        query: GET_CONTINENT,
        variables: {
            filter: {
                code: {
                    eq: "EU"
                }
            }
        }
    });

    return (
        <>
            <h3>Countries</h3>
            {continents && continents?.length > 0 && (
                <ul>
                    {continents[0]?.countries?.map((country: Country) => (
                        <li key={country.code}>
                            <h4>Country Code: {country.code}</h4>
                            <p>Capital: {country.capital}</p>
                            <p>AWS Region: {country.awsRegion}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
