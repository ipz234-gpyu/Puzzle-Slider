import {type ReactNode} from "react";

import {StoreInitializer} from "@/entities/gameSettings";
import {CookieConsentPopup} from "@/widgets/cookieConsent";

export const AppProvider = ({children}: { children: ReactNode }) => {
    return (
        <>
            <StoreInitializer/>
            <CookieConsentPopup/>
            {children}
        </>
    );
};