'use client'
import { Country } from '@/app/countries/types';

import { List } from '@/components/ui/List/List';

export default function CountriesList({ countries }: { countries: Country[] }) {
    const listItems = countries.map((country) => ({
        key: country.code,
        name: country.capital,
        link: `/countries/${country.code}`,
        desc: `AWS Region: ${country.awsRegion}`,
    }));

    return <>
        <h2 className='text-lg text-red-500 text-center'>Countries list</h2>
        <List list={listItems} />
        </>
}
