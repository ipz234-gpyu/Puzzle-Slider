import {type ReactNode} from "react";
import {GameSettingsContext} from "../model/context";
import {useGameSettings} from "../hooks/useGameSettings";

interface GameSettingsProviderProps {
    children: ReactNode;
}

export const GameSettingsProvider = ({children}: GameSettingsProviderProps) => {
    const state = useGameSettings();

    return (
        <GameSettingsContext.Provider value={state}>
            {children}
        </GameSettingsContext.Provider>
    );
};