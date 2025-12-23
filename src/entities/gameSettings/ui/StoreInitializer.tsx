import {useEffect} from 'react';
import {useSettingsStore} from '../hooks/useSettingsStore';

export const StoreInitializer = () => {
    const initSettings = useSettingsStore((state) => state.initSettings);

    useEffect(() => {
        initSettings();
    }, [initSettings]);

    return null;
};