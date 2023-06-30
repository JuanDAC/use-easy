import { useEffect, useState, useMemo, useCallback } from 'react';
import {  GlobalStateReturn, useEasyProps } from './useEasy.types';
import { defaultConfig } from './useEasy.default';


/**
 * Hook for managing global state using local storage.
 *
 * @param initial - The initial state for the global state (optional). 
 * @param config - The configuration options for the global state (optional).
 * @param updaters - The custom updaters for the global state (optional).
 * @returns The memoized global state and advanced actions.
 */
export const useEasy = <T = {},>({ initial = {} as T, config = {}, updaters = {} }: useEasyProps<T>): GlobalStateReturn<T> => {

    /**
   * Retrieves the appropriate storage based on the configuration.
   */
    const storage = useMemo(() => {
        return window[`${config.kind ?? defaultConfig.kind}Storage`];
    }, []);

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

    const setItem = useCallback((key: string, value: any) => new Promise((resolve, reject) => {
        const newValue = JSON.stringify(value);
        setTimeout(() => {
            try {
                storage.setItem(key, newValue);
                const event = new StorageEvent('storage', {
                    key,
                    newValue,
                });

                window.dispatchEvent(event);
                resolve(newValue);
            } catch (error) {
                reject(error);
            }
        }, 0);
    }), []);


    /**
   * Retrieves the initial state from local storage when the component mounts.
   */
    useEffect(() => {
        const storedValue = storage.getItem(key);

        if (!storedValue) {
            setItem(key, initial).catch((error) => {
                setError(`Error in the set of the initial state of the global state: ${error}`);
            })
        }
        if (storedValue) {
            const updatedState = JSON.parse(storedValue);
            setItem(key, { ...initial, ...updatedState }).then((error) => {
                setError(`Error in the loading of the initial state of the global state: ${error}`);
            });
        }

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
    const memoizedState = useMemo(() => {
        /**
         * Handles the storage change event and updates the state accordingly.
         */

        const observeChanges = (obj: T, path: string = '') => {

            const handleChange = () => {
                setItem(key, state).catch((error) => {
                    setError(`Error in the set of the global state: ${error}`);
                })
            };

            const proxyHandler: ProxyHandler<any> = {
                get: (target, prop: string) => {
                    const value = target[prop];
                    if (typeof value === 'object' && value !== null) {
                        const nestedPath = path ? `${path}.${prop}` : prop.toString();
                        return observeChanges(value, nestedPath);
                    }
                    return value;
                },
                set: (target, prop: string, value) => {
                    if (target[prop] === value) {
                        return true;
                    }
                    target[prop] = value;
                    handleChange();
                    return true;
                },
                deleteProperty: (target, prop: string) => {
                    delete target[prop];
                    handleChange();
                    return true;
                },
                apply(target, thisArg, argumentsList) {
                    const thisArgBefore = JSON.stringify(thisArg);
                    const result = Reflect.apply(target, thisArg, argumentsList);
                    const thisArgAfter = JSON.stringify(thisArg);
                    if (thisArgBefore !== thisArgAfter) {
                        handleChange();
                    }
                    return result;
                }
            };

            return new Proxy(obj, proxyHandler);
        };

        return observeChanges(state);

    }, [state]);

    /**
     * Handles the storage change event and updates the state accordingly.
     */
    const advancedActions = ({
        /**
         * Resets the global state to the current initial state.
         */
        resetInitial: useCallback(() => {
            setItem(key, { ...state, ...initial }).catch((error) => {
                setError(`Error in the reset to current initial state: ${error}`);
            })
        }, [state]),
        /**
         * Resets the global state to only the current initial state.
         */
        onlyCurrentInitial: useCallback(() => {
            setItem(key, initial).catch((error) => {
                setError(`Error in the reset to only current initial state: ${error}`);
            })
        }, []),
        /**
          * Deletes the global state from storage.
          */
        deleteState: useCallback(() => {
            setItem(key, {}).catch((error) => {
                setError(`Error in the delete of the global state: ${error}`);
            })
        }, []),
        /**
         * Indicates if there is an error in the global state.
         */
        isError: useMemo(() => errorMessage !== null, [errorMessage]),
        /**
         * Indicates if there is an error in the global state.
         */
        errorMessage: useMemo(() => errorMessage, [errorMessage]),
    });

    const handleChangeNewState = useCallback((newState: any) => {
        setItem(key, newState).catch((error) => {
            setError(`Error in the set of the global state: ${error}`);
        })
    }, []);

    const actions = useMemo(() => {

        const entries = Object.entries(updaters).map(([key, updater]) => {

            if (typeof updater !== 'function') {
                throw new Error(`The action ${key} is not a function.`);
            }

            return [key, (...args: any[]) => {
                const newState = updater(state, ...args);
                handleChangeNewState(newState);
            }];

        });

        return Object.fromEntries(entries);
    }, [state, updaters]);

    return { state: memoizedState as T, methods: advancedActions, actions };
};

