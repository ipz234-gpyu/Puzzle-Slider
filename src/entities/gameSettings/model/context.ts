import {createContext} from 'react';
import {type GameSettingsContextType} from './types';

export const GameSettingsContext = createContext<GameSettingsContextType | undefined>(undefined);