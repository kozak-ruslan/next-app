import Link from 'next/link';
import { getClient } from '@/lib/apollo/rsc';

import UserForm from '@/components/userForm/UserForm';
import CountriesList from '@/components/Countries/CountriesList';
import { GET_CONTINENT } from '@/lib/graphql/queries/continents';

import { GetContinentData } from './types';

interface CountriesProps {
    params: Promise<{
        continentCode: string;
    }>;
    searchParams: Promise<{
        page: string;
    }>;
}

export default async function Countries({
    params,
    searchParams,
}: CountriesProps) {
    const awaitedParams = await params;
    const awaitedSearchParams =
        await searchParams;

    const {
        data: { continents } = {},
    } =
        await getClient().query<GetContinentData>(
            {
                query: GET_CONTINENT,
                variables: {
                    filter: {
                        code: {
                            eq: 'EU',
                        },
                    },
                },
            }
        );

    if (
        !continents ||
        continents?.length === 0
    ) {
        return (
            <div>
                {' '}
                No countries found{' '}
            </div>
        );
    }
    // console.log('>>> continents', continents[0].countries);
    const page =
        Number.parseInt(
            awaitedSearchParams.page
        ) || 1;
    console.log('>>> page', page);
    const step = 5;
    const startIndex =
        (page - 1) * step;
    const endIndex = page * step;
    const pageCountries =
        continents[0].countries?.slice(
            startIndex,
            endIndex
        );

    return (
        <>
            <h3>Countries</h3>
            <UserForm />
            <CountriesList
                countries={
                    pageCountries
                }
            />

            <Link
                href={`/countries?${new URLSearchParams({ page: (page + 1).toString() }).toString()}`}
            >
                Next Page
            </Link>
        </>
    );
}
