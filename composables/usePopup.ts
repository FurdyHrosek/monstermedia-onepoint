export const usePopup = () => {
    const popups = reactive<Record<string, boolean>>({});

    /**
     * Initialize popups' visibility state dynamically with predefined keys.
     * @param keys - A string (single popup) or an array of strings (multiple popups)
     * @returns The reactive popup visibility state
     */
    const setPopups = (keys: string | string[]) => {
        const popupKeys = keys instanceof Array ? keys : [keys];

        for (const key of popupKeys) {
            const formattedKey = format.camelcase(key);
            if (!(formattedKey in popups)) {
                popups[formattedKey] = false; 
            }
        }

        return popups;
    };

    /**
     * Toggle a specific popup's visibility
     * @param popupKey - The key of the popup to toggle
     * @param visible - The boolean visibility state
     */
    const togglePopup = (popupKey: string, visible: boolean) => {
        const formattedKey = format.camelcase(popupKey);

        if (!(formattedKey in popups)) {
            console.warn(`TogglePopup: Popup key "${formattedKey}" not found.`);
            return;
        }
        popups[formattedKey] = visible;
    };

    return {
        setPopups,
        togglePopup
    };
};