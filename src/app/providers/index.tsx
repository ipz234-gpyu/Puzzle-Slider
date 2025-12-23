import { type ReactNode } from "react";
import { GameSettingsProvider } from "@/entities/gameSettings";

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <GameSettingsProvider>
            {children}
        </GameSettingsProvider>
    );
};