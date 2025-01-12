import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const documentChangeHandler = () => setMatches(mediaQueryList.matches);

        mediaQueryList.addEventListener('change', documentChangeHandler);
        documentChangeHandler(); // Set the initial state

        return () => {
            mediaQueryList.removeEventListener('change', documentChangeHandler);
        };
    }, [query]);

    return matches;
};

export default useMediaQuery;