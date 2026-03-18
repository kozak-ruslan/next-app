import React from 'react';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { getClient } from '@/src/lib/apollo/rsc';

interface CountryProps {
    params: Promise<{ countryId: string }>
}

export default async function Country(props: CountryProps) {
    console.log('>>> Country props', props);
    const { countryId } = await props.params;
    return (
        <div>
            <h1>Country Page</h1>
            <p>Country ID: {countryId}</p>
        </div>
    )
//     const GET_CONTINENT = gql`
//     query GetContinent($filter: ContinentFilterInput) {
//       continents(filter: $filter) {
//         countries {
//             awsRegion
//             capital
//             code
//         }
//       }
//     }
//   `;
//     interface Country {
//         awsRegion: string;
//         capital: string;
//         code: string;
//     }
//     interface Continent {
//         code: string;
//         countries: Country[];
//     }

//     interface GetContinentData {
//         continents: Continent[];
//     }

//     const { data: { continents } = {} } = await getClient().query<GetContinentData>({
//         query: GET_CONTINENT,
//         variables: {
//             filter: {
//                 code: {
//                     eq: "EU"
//                 }
//             }
//         }
//     });

//     return (
//         <>
//             <h3>Countries</h3>
//             {continents && continents?.length > 0 && (
//                 <ul>
//                     {continents[0]?.countries?.map((country: Country) => (
//                         <li key={country.code}>
//                             <h4>Country Code: {country.code}</h4>
//                             <p>Capital: {country.capital}</p>
//                             <p>AWS Region: {country.awsRegion}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </>
//     );
}
