import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import '../styles/index.css'

import {GameSettingsProvider} from "@/entities/gameSettings";
import {MainPage} from "@/pages/main";
import {GamePage} from "@/pages/game";
import {ResultsPage} from "@/pages/result";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GameSettingsProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/game/:id" element={<GamePage/>}/>
                    <Route path="/result" element={<ResultsPage/>}/>
                </Routes>
            </BrowserRouter>
        </GameSettingsProvider>
    </StrictMode>,
);
