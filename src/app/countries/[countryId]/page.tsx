import React from 'react';

import Link from 'next/link';

import { getClient } from '@/lib/apollo/rsc';
import { GET_COUNTRY } from '@/lib/graphql/queries/country';
import { GetCountryData } from '@/app/countries/types';

interface CountryProps {
    params: Promise<{
        countryId: string;
    }>;
}

export default async function Country(
    props: CountryProps
) {
    console.log(
        '>>> Country props',
        props
    );
    const { countryId } =
        await props.params;
    const { data: { country } = {} } =
        await getClient().query<GetCountryData>({
            query: GET_COUNTRY,
            variables: {
                code: countryId,
            },
        });
    console.log(
        '>>> country: ',
        country
    );
    return (
        <div>
            <Link href="/countries">
                Back to Countries List
            </Link>
            <h1>Country Page</h1>
            <p>
                name: {country?.name} <br />
                {country?.currency} <br />
                {country?.currencies} <br />
                {country?.continent?.name} <br />
                {country?.code}<br />
                {country?.capital}<br />
                {country?.awsRegion}<br />

            </p>
        </div>
    );
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
