import { ConfigurationGlobalState } from "./useEasy.types";

/**
 * Represents the configuration options for the global state.
 */
export const defaultConfig: Required<ConfigurationGlobalState> = {
    group: '',
    kind: 'session',
    key: 'globalState',
};