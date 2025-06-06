type Product = {
    id: number;
    name: string;
    description: string;
    price: {
        eur: number;
        czk: number;
    };
    image: {
        default: string;
        big: string;
    }
};

type HeroBanner = {
    id: number;
    imageURL: string;
    title: string;
    link: string;
}


type CurrencyMap = 'czk' | 'eur'
type SupportedLocale = 'en' | 'cs';