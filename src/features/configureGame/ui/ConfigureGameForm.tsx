import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import styles from './styles.module.css';

import {useGameSettings} from '@/entities/gameSettings';
import {Button} from '@/shared/ui/button';
import {Flex} from '@/shared/ui/flex';
import {Input} from '@/shared/ui/input';
import {Toggle} from '@/shared/ui/toggle';
import {useProgressStore} from '@/features/levelProgress';
import {
    DEFAULT_COOKIE_CONSENT,
    applyCookieConsent,
    readCookieConsent,
    type CookieConsentPreferences,
    writePersistedValue,
} from '@/shared/lib/storage/cookieConsent';

interface FormData {
    playerName: string;
}

export const ConfigureGameForm = ({onSuccess}: { onSuccess?: () => void }) => {
    const {settings, updateSettings, isLoading: isSettingsLoading} = useGameSettings();
    const [privacyPreferences, setPrivacyPreferences] = useState<CookieConsentPreferences>(
        () => readCookieConsent() ?? DEFAULT_COOKIE_CONSENT,
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<FormData>({
        defaultValues: settings,
    });

    useEffect(() => {
        reset(settings);
    }, [settings, reset]);

    const setPrivacyPreference = (key: keyof CookieConsentPreferences, value: boolean) => {
        setPrivacyPreferences((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const persistPrivacyPreferences = (nextPlayerName: string, previousPlayerName: string) => {
        applyCookieConsent(privacyPreferences);

        if (privacyPreferences.gameSettings) {
            writePersistedValue('gameSettings', 'gameSettings', {playerName: nextPlayerName});
        }

        if (privacyPreferences.puzzle_progress && previousPlayerName === nextPlayerName) {
            const {progress} = useProgressStore.getState();

            writePersistedValue('puzzle_progress', `puzzle_progress_${nextPlayerName}`, progress);
        }
    };

    const onSubmit = async (data: FormData) => {
        const previousPlayerName = settings.playerName;
        const nextPlayerName = data.playerName;

        await updateSettings(data);
        persistPrivacyPreferences(nextPlayerName, previousPlayerName);
        onSuccess?.();
    };

    if (isSettingsLoading) {
        return <div>Loading settings...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Flex direction="column" gap={20}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Player</h3>
                        <p className={styles.sectionDescription}>Basic profile data used across the app.</p>
                    </div>

                    <Input
                        label="Player Name"
                        placeholder="Enter your name"
                        error={errors.playerName?.message}
                        disabled={isSubmitting}
                        {...register('playerName', {
                            required: "Name is required",
                            minLength: {value: 2, message: "Minimum 2 characters"}
                        })}
                    />
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Storage preferences</h3>
                        <p className={styles.sectionDescription}>
                            Decide which data can be persisted in localStorage. Consent itself is always saved.
                        </p>
                    </div>

                    <div className={styles.toggleGrid}>
                        <div className={styles.toggleCard}>
                            <Toggle
                                label="Save game settings"
                                checked={privacyPreferences.gameSettings}
                                disabled={isSubmitting}
                                onChange={(event) => setPrivacyPreference('gameSettings', event.target.checked)}
                            />
                            <p className={styles.toggleDescription}>
                                Keeps the player name and related settings after reload.
                            </p>
                        </div>

                        <div className={styles.toggleCard}>
                            <Toggle
                                label="Save puzzle progress"
                                checked={privacyPreferences.puzzle_progress}
                                disabled={isSubmitting}
                                onChange={(event) => setPrivacyPreference('puzzle_progress', event.target.checked)}
                            />
                            <p className={styles.toggleDescription}>
                                Remembers unlocked levels and best records for the current player.
                            </p>
                        </div>
                    </div>
                </section>

                <Button
                    type="submit"
                    size="md"
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
            </Flex>
        </form>
    );
};