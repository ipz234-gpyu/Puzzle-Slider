import {ConfigureGameForm} from "@/features/configureGame";
import {ModalFormButton} from "@/features/modalForm";
import {LevelList} from "@/widgets/levelList";
import {Header} from "@/widgets/header";

export const MainPage = () => {
    return (
        <>
            <Header
                description="Choose your level and grid size to start playing:"
                extra={
                    <ModalFormButton
                        buttonText="Settings"
                        modalTitle="Game Settings"
                        renderForm={(onClose) => <ConfigureGameForm onSuccess={onClose}/>}
                    />
                }
            />
            <LevelList />
        </>
    );
};