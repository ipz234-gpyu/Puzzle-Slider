import {ConfigureGameForm} from "@/features/configureGame";
import {ModalFormButton} from "@/features/modalForm";
import {LevelList} from "@/widgets/levelList";
import {Header} from "@/widgets/header";
import {Button} from "@/shared/ui/button";
import {useNavigate} from "react-router-dom";
import {Flex} from "@/shared/ui/flex";

export const MainPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header
                description="Choose your level and grid size to start playing:"
                extra={
                    <Flex gap="var(--space-3)">
                        <ModalFormButton
                            buttonText="Settings"
                            modalTitle="Game Settings"
                            renderForm={(onClose) => <ConfigureGameForm onSuccess={onClose}/>}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/results')}
                        >
                            Results
                        </Button>
                    </Flex>
                }
            />
            <LevelList />
        </>
    );
};