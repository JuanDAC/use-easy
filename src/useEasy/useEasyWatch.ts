import { useEffect, useState, useMemo } from 'react';
import { useEasyProps } from './useEasy.types';
import { defaultConfig } from './useEasy.default';


/**
 * Hook for managing global state using local storage solo para escuhar los cambios del estado.
 *
 * @param initial - The initial state for the global state (optional). 
 * @param config - The configuration options for the global state (optional).
 * @param updaters - The custom updaters for the global state (optional).
 * @returns The memoized global state and advanced actions.
 */
export const useEasyWatch = <T = {},>({ initial = {} as T, config = {}, updaters: _ = {} }: useEasyProps<T>) => {

    /**
   * Generates the key for storing the global state.
   */
    const key = useMemo(() => {
        return `${config.group ?? defaultConfig.group
            }${config.key ?? defaultConfig.key
            }${config.kind ?? defaultConfig.kind}`;
    }, []);

    /**
   * Generates the key for storing the global state.
   */
    const [state, setState] = useState<T>(initial);

    /**
   * State for storing the error message, if any.
   */
    const [errorMessage, setError] = useState<string | null>(null);

    /**
   * Retrieves the initial state from local storage when the component mounts.
   */
    useEffect(() => {
        /**
        * Handles the storage change event and updates the state accordingly.
        */
        const handleStorageChange = (event: StorageEvent) => {
            try {
                if (event.key !== key)
                    return;
                const updatedState = JSON.parse(event.newValue || '{}') as T;
                setState(updatedState);
            } catch (error) {
                setError(`Error in the update changes of the global state: ${error}`);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    
    /**
     * Handles the storage change event and updates the state accordingly.
     */
    const advancedActions = ({
        /**
         * Indicates if there is an error in the global state.
         */
        isError: useMemo(() => errorMessage !== null, [errorMessage]),
        /**
         * Indicates if there is an error in the global state.
         */
        errorMessage: useMemo(() => errorMessage, [errorMessage]),
    });

    return { state: state as T, methods: advancedActions };
};

