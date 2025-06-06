export function useCurrency() {
    const selectedCurrency = inject<Ref<'czk' | 'eur'>>('selectedCurrency')!;
    const selectedCurrencyName = inject<Ref<string>>('selectedCurrencyName')!;
    const setCurrency = inject<((val: 'czk' | 'eur') => void)>('setCurrency')!;
    const setCurrencyName = inject<((val: string) => void)>('setCurrencyName')!;
  
    return { 
        selectedCurrency, 
        selectedCurrencyName, 
        setCurrency, 
        setCurrencyName 
    };
}