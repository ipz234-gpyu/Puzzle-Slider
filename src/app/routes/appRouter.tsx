import { createBrowserRouter } from "react-router-dom";
import { MainPage, GamePage, ResultsPage } from "@/pages";

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