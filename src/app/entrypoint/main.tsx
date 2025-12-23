import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "../styles/index.css";

import {AppProvider} from "../providers";
import {appRouter} from "../routes";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <RouterProvider router={appRouter}/>
        </AppProvider>
    </StrictMode>,
);