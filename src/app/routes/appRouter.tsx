import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages/main";
import { GamePage } from "@/pages/game";
import { ResultsPage } from "@/pages/result";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/game/:id",
        element: <GamePage />,
    },
    {
        path: "/results",
        element: <ResultsPage />,
    },
    {
        path: "/result/:levelId",
        element: <ResultsPage />,
    },
    {
        path: "*",
        element: <div>Page not found</div>
    }
]);