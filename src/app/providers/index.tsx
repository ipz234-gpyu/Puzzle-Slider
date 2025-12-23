import {type ReactNode} from "react";

import {StoreInitializer} from "@/entities/gameSettings";

export const AppProvider = ({children}: { children: ReactNode }) => {
    return (
        <>
            <StoreInitializer/>
            {children}
        </>
    );
};