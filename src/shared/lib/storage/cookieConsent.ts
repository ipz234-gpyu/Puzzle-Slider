export type ConsentCategory = 'gameSettings' | 'puzzle_progress';

export interface CookieConsentPreferences {
    gameSettings: boolean;
    puzzle_progress: boolean;
}

export const DEFAULT_COOKIE_CONSENT: CookieConsentPreferences = {
    gameSettings: false,
    puzzle_progress: false,
};

const COOKIE_CONSENT_STORAGE_KEY = 'cookie_consent_settings';
const PERSISTED_KEYS_BY_CATEGORY: Record<ConsentCategory, string> = {
    gameSettings: 'gameSettings',
    puzzle_progress: 'puzzle_progress_',
};

const isStorageAvailable = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const safeGetItem = (key: string): string | null => {
    if (!isStorageAvailable()) {
        return null;
    }

    try {
        return window.localStorage.getItem(key);
    } catch {
        return null;
    }
};

const safeSetItem = (key: string, value: string): void => {
    if (!isStorageAvailable()) {
        return;
    }

    try {
        window.localStorage.setItem(key, value);
    } catch {
        // Ignore storage failures and keep the app usable in-memory.
    }
};

const safeRemoveItem = (key: string): void => {
    if (!isStorageAvailable()) {
        return;
    }

    try {
        window.localStorage.removeItem(key);
    } catch {
        // Ignore storage failures and keep the app usable in-memory.
    }
};

const safeGetKeys = (): string[] => {
    if (!isStorageAvailable()) {
        return [];
    }

    const keys: string[] = [];

    for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);

        if (key) {
            keys.push(key);
        }
    }

    return keys;
};

const safeParse = <T>(raw: string | null, fallback: T): T => {
    if (!raw) {
        return fallback;
    }

    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
};

const normalizePreferences = (
    preferences: Partial<CookieConsentPreferences> | null | undefined,
): CookieConsentPreferences => ({
    gameSettings: Boolean(preferences?.gameSettings),
    puzzle_progress: Boolean(preferences?.puzzle_progress),
});

export const readCookieConsent = (): CookieConsentPreferences | null => {
    const raw = safeGetItem(COOKIE_CONSENT_STORAGE_KEY);

    if (!raw) {
        return null;
    }

    const parsed = safeParse<Partial<CookieConsentPreferences> | null>(raw, null);

    return parsed ? normalizePreferences(parsed) : null;
};

export const saveCookieConsent = (preferences: CookieConsentPreferences): void => {
    safeSetItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(normalizePreferences(preferences)));
};

export const clearStoredCategoryData = (category: ConsentCategory): void => {
    if (category === 'gameSettings') {
        safeRemoveItem(PERSISTED_KEYS_BY_CATEGORY.gameSettings);
        return;
    }

    safeGetKeys()
        .filter((key) => key.startsWith(PERSISTED_KEYS_BY_CATEGORY.puzzle_progress))
        .forEach(safeRemoveItem);
};

export const applyCookieConsent = (preferences: CookieConsentPreferences): void => {
    const normalized = normalizePreferences(preferences);

    saveCookieConsent(normalized);

    if (!normalized.gameSettings) {
        clearStoredCategoryData('gameSettings');
    }

    if (!normalized.puzzle_progress) {
        clearStoredCategoryData('puzzle_progress');
    }
};

export const hasCookieConsent = (): boolean => readCookieConsent() !== null;

export const isCategoryAllowed = (category: ConsentCategory): boolean => {
    const consent = readCookieConsent();

    return consent?.[category] ?? false;
};

export const readPersistedValue = <T>(category: ConsentCategory, storageKey: string, fallback: T): T => {
    if (!isCategoryAllowed(category)) {
        return fallback;
    }

    return safeParse<T>(safeGetItem(storageKey), fallback);
};

export const writePersistedValue = <T>(category: ConsentCategory, storageKey: string, value: T): boolean => {
    if (!isCategoryAllowed(category)) {
        return false;
    }

    safeSetItem(storageKey, JSON.stringify(value));
    return true;
};