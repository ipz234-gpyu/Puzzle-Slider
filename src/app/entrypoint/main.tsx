import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import '../styles/index.css'
import {MainPage} from "@/pages/main";
import {GamePage} from "@/pages/game";
import {ResultsPage} from "@/pages/result";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/game/:id/:size" element={<GamePage/>}/>
                <Route path="/result" element={<ResultsPage/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
