export interface Continent {
    name?: string
    code: string;
    countries: Country[];
}

export interface Country {
    awsRegion: string;
    capital: string;
    code: string;
}

export type GetCountryData = {
    country: {
        name: string;
        currencies: string;
        currency: string;
        continent?: Pick<Continent, 'name'>
    } & Country;
};

export interface GetContinentData {
    continents: Continent[];
}
