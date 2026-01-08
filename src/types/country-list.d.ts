declare module 'country-list-with-dial-code-and-flag' {
    export interface Country {
        name: string;
        dial_code: string;
        code: string;
        flag: string;
    }

    export function getAllCountries(): Country[];
    export function getList(): Country[];
}
