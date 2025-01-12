import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set debouncedValue to value (passed in) after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Return a cleanup function that will be called on component unmount
        return () => {
            clearTimeout(handler);
        };
    },
    // Only re-call effect if value or delay changes
    [value, delay]);

    return debouncedValue;
}

export default useDebounce;
