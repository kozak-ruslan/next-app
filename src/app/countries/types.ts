export interface Continent {
    code: string;
    countries: Country[];
}

export interface Country {
    awsRegion: string;
    capital: string;
    code: string;
}

export interface GetContinentData {
    continents: Continent[];
}
