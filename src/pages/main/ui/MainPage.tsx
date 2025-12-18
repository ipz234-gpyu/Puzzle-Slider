import {Header} from "@/widgets/header";
import {LevelList} from "@/widgets/levelList";

export const MainPage = () => {
    return (
        <>
            <Header
                description="Choose your level and grid size to start playing:"
            />
            <LevelList />
        </>
    );
};