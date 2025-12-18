import {useNavigate} from "react-router-dom";
import {Button} from "@/shared/ui/button";
import {Flex} from "@/shared/ui/flex";

interface SelectLevelSizeProps {
    levelId: number;
    sizes?: number[];
}

export const SelectLevelSize = ({levelId, sizes = [3, 4, 5]}: SelectLevelSizeProps) => {
    const navigate = useNavigate();

    return (
        <Flex justify="center" gap="var(--space-2)" wrap="wrap" fullWidth>
            {sizes.map((size) => (
                <Button
                    key={size}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/game/${levelId}/${size}`);
                    }}
                    variant="secondary"
                    size="md"
                >
                    {size}x{size}
                </Button>
            ))}
        </Flex>
    );
};
