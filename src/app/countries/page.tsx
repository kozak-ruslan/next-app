import Link from 'next/link';
import { getClient } from '@/src/lib/apollo/rsc';

import { GET_CONTINENT } from './constarts';
import { Country, GetContinentData } from './types';

interface CountriesProps {
    params: Promise<{ continentCode: string }>;
    searchParams: Promise<{ page: string }>;
}

export default async function Countries(props: CountriesProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    console.log('>>> render Countries searchParams', searchParams.page);
    console.log('>>> render Countries params', params);

    const { data: { continents } = {} } =
        await getClient().query<GetContinentData>({
            query: GET_CONTINENT,
            variables: {
                filter: {
                    code: {
                        eq: 'EU',
                    },
                },
            },
        });

    if (!continents || continents?.length === 0) {
        return <div> No countries found </div>;
    }
    console.log('>>> continents',continents[0].countries)
    const page = Number.parseInt(searchParams.page) || 1;
    console.log('>>> page', page)
    const step = 5;
    const startIndex = (page - 1) * step;
    const endIndex = page * step;
    const pageCountries = continents[0].countries?.slice(startIndex, endIndex);

    return (
        <>
            <h3>Countries</h3>

            <ul>
                {pageCountries.map((country) => (
                    <li key={country.code}>
                        <h4>Country Code: {country.code}</h4>
                        <p>Capital: {country.capital}</p>
                        <p>AWS Region: {country.awsRegion}</p>
                        <Link href={`/countries/${country.code}`}>
                            View Details
                        </Link>
                    </li>
                ))}
            </ul>

            <Link
                href={`/countries?${new URLSearchParams({ page: (page + 1).toString() }).toString()}`}
            >
                Next Page
            </Link>
        </>
    );
}
