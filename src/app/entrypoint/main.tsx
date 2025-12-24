import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import '../styles/index.css'

import {AppProvider} from "../providers";
import {appRouter} from "../routes";
import {RouterProvider} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <RouterProvider router={appRouter}/>
        </AppProvider>
    </StrictMode>,
);
