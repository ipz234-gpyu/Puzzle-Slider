export interface GameSettings {
    playerName: string;
}

export const DEFAULT_SETTINGS: GameSettings = {
    playerName: 'Player',
};

export interface GameSettingsContextType {
    settings: GameSettings;
    isLoading: boolean;
    updateSettings: (newSettings: GameSettings) => Promise<void>;
}