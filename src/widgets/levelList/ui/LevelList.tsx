import styles from "./styles.module.css";
import {Flex} from "@/shared/ui/flex";
import {useLevels} from "@/entities/levelCard";
import {LevelProgressActions} from "@/features/levelProgress";
import {LevelCard} from "@/entities/levelCard/ui/LevelCard.tsx";

export const LevelList = () => {
    const {levels, isLoading} = useLevels();

    if (isLoading) {
        return <div className={styles.loading}>Loading levels...</div>;
    }

    return (
        <Flex justify="center" wrap="wrap" gap={10}>
            {levels.map((level) => (
                <LevelCard
                    key={`${level.id}`}
                    level={level}
                    actions={<LevelProgressActions levelId={level.id}/>}
                />
            ))}
        </Flex>
    );
};