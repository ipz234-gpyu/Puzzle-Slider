import {Button} from '@/shared/ui/button';
import {Modal} from '@/shared/ui/modal';
import {Toggle} from '@/shared/ui/toggle';

import {useCookieConsentPopup} from '../model/useCookieConsentPopup';
import styles from './styles.module.css';

export const CookieConsentPopup = () => {
    const {
        draftConsent,
        isAdvancedOpen,
        isVisible,
        acceptAll,
        rejectAll,
        toggleAdvanced,
        updateDraftConsent,
        saveDraftConsent,
    } = useCookieConsentPopup();

    if (!isVisible) {
        return null;
    }

    return (
        <Modal
            isOpen={isVisible}
            onClose={() => undefined}
            showCloseButton={false}
            closeOnOverlayClick={false}
        >
            <div className={styles.root}>
                <div className={styles.hero}>
                    <p className={styles.kicker}>Privacy and storage</p>
                    <h4 className={styles.title}>Choose what PuzzleSlider may store</h4>
                    <p className={styles.description}>
                        Your consent choice is always saved in localStorage. Game settings and puzzle progress can be allowed separately.
                    </p>
                </div>

                <div className={styles.actions}>
                    <Button type="button" variant="secondary" size="md" fullWidth className={styles.actionButton} onClick={acceptAll}>
                        Accept All
                    </Button>
                    <Button type="button" variant="secondary" size="md" fullWidth className={styles.actionButton} onClick={rejectAll}>
                        Reject All
                    </Button>
                    <Button type="button" variant="secondary" size="md" fullWidth className={styles.actionButton} onClick={toggleAdvanced}>
                        Advanced
                    </Button>
                </div>

                {isAdvancedOpen && (
                    <div className={styles.advanced}>
                        <div className={styles.advancedIntro}>
                            <p className={styles.sectionDescription}>
                                Disabled categories stay in memory only and reset on reload.
                            </p>
                        </div>

                        <div className={styles.preferenceList}>
                            <div className={styles.preferenceCard}>
                                <Toggle
                                    label="Game settings"
                                    checked={draftConsent.gameSettings}
                                    onChange={(event) => updateDraftConsent('gameSettings', event.target.checked)}
                                />
                                <p className={styles.preferenceDescription}>
                                    Remembers the current player profile and saved settings.
                                </p>
                            </div>

                            <div className={styles.preferenceCard}>
                                <Toggle
                                    label="Puzzle progress"
                                    checked={draftConsent.puzzle_progress}
                                    onChange={(event) => updateDraftConsent('puzzle_progress', event.target.checked)}
                                />
                                <p className={styles.preferenceDescription}>
                                    Stores unlocked levels and best records for the active player.
                                </p>
                            </div>
                        </div>

                        <Button type="button" variant="primary" size="md" fullWidth className={styles.saveButton} onClick={saveDraftConsent}>
                            Save Preferences
                        </Button>
                    </div>
                )}

                <p className={styles.footerNote}>
                    If you reject puzzle progress, it stays session-only for the current player and resets after refresh.
                </p>
            </div>
        </Modal>
    );
};