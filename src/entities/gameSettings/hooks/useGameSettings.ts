import {useShallow} from 'zustand/react/shallow';
import {useSettingsStore} from './useSettingsStore';

export const useGameSettings = () => {
    return useSettingsStore(
        useShallow((state) => ({
            settings: state.settings,
            isLoading: state.isLoading,
            error: state.error,
            updateSettings: state.updateSettings,
        }))
    );
};