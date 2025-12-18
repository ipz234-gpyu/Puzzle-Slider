import {LevelCard, useLevels} from "@/entities/levelCard";
import {SelectLevelSize} from "@/features/selectLevelSize";
import styles from "./styles.module.css";
import {Flex} from "@/shared/ui/flex";

export const LevelList = () => {
    const { levels, isLoading } = useLevels();

    if (isLoading) {
        return <div className={styles.loading}>Loading levels...</div>;
    }

    return (
        <Flex justify="center" wrap="wrap" gap={10}>
            {levels.map((level) => (
                <LevelCard
                    key={level.id}
                    level={level}
                    actions={<SelectLevelSize levelId={level.id}/>}
                />
            ))}
        </Flex>
    );
};