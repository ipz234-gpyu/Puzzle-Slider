import {useState} from 'react';

import {useSettingsStore} from '@/entities/gameSettings';
import {useProgressStore} from '@/features/levelProgress';
import {
    applyCookieConsent,
    DEFAULT_COOKIE_CONSENT,
    readCookieConsent,
    type CookieConsentPreferences,
    type ConsentCategory,
    writePersistedValue,
} from '@/shared/lib/storage/cookieConsent';

const syncAllowedData = (preferences: CookieConsentPreferences) => {
    if (preferences.gameSettings) {
        const {settings} = useSettingsStore.getState();

        writePersistedValue('gameSettings', 'gameSettings', settings);
    }

    if (preferences.puzzle_progress) {
        const {settings} = useSettingsStore.getState();
        const {progress} = useProgressStore.getState();

        writePersistedValue('puzzle_progress', `puzzle_progress_${settings.playerName}`, progress);
    }
};

export const useCookieConsentPopup = () => {
    const [consent, setConsent] = useState<CookieConsentPreferences | null>(() => readCookieConsent());
    const [draftConsent, setDraftConsent] = useState<CookieConsentPreferences>(() =>
        readCookieConsent() ?? DEFAULT_COOKIE_CONSENT,
    );
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    const commitConsent = (preferences: CookieConsentPreferences) => {
        applyCookieConsent(preferences);
        syncAllowedData(preferences);

        setConsent(preferences);
        setDraftConsent(preferences);
        setIsAdvancedOpen(false);
    };

    const updateDraftConsent = (category: ConsentCategory, value: boolean) => {
        setDraftConsent((current) => ({
            ...current,
            [category]: value,
        }));
    };

    return {
        consent,
        draftConsent,
        isAdvancedOpen,
        isVisible: consent === null,
        acceptAll: () => commitConsent({gameSettings: true, puzzle_progress: true}),
        rejectAll: () => commitConsent(DEFAULT_COOKIE_CONSENT),
        toggleAdvanced: () => {
            setIsAdvancedOpen((current) => !current);
        },
        updateDraftConsent,
        saveDraftConsent: () => commitConsent(draftConsent),
    };
};