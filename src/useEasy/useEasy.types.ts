/**
 * Represents the global state object.
 */
export type GlobalState = Record<string, any>;

/**
 * Represents the configuration options for the global state.
 */
export interface ConfigurationGlobalState {
    group?: string;
    kind?: 'local' | 'session';
    key?: string;
}


export interface CustomUpdaters<T> {
    [key: string]: (state: T, ...args: any[]) => T;
}

export interface GlobalStateReturn< T = Record<string, any>> {
    state: T;
    methods: {
        resetInitial: () => void;
        onlyCurrentInitial: () => void;
        deleteState: () => void;
        isError: boolean;
        errorMessage: string | null;
    };
    actions: {[key in keyof CustomUpdaters<T>]: (...args: any[]) => void}
}

export interface useEasyProps<T = Record<string, any>> {
    initial?: T;
    config?: ConfigurationGlobalState;
    updaters?: CustomUpdaters<T>;
}

export type UseEasy = (_: useEasyProps) => GlobalState;
