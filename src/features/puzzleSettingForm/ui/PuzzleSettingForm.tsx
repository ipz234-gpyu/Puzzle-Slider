import {useForm} from "react-hook-form";
import styles from "./styles.module.css";

import {Flex} from "@/shared/ui/flex";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {Toggle} from "@/shared/ui/toggle";

export interface FormData {
    sizeCount: number;
    showNumbers: boolean;
}

interface PuzzleSettingFormProps {
    sizeCount: number;
    showNumbers: boolean;
    onSubmit: (data: FormData) => void;
    onSuccess?: () => void;
}

export const PuzzleSettingForm = ({sizeCount, showNumbers, onSubmit, onSuccess}: PuzzleSettingFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<FormData>({
        defaultValues: {
            sizeCount,
            showNumbers
        },
    });

    const onFormSubmit = (data: FormData) => {
        onSubmit(data);
        onSuccess?.();
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
            <Flex direction="column" gap={20}>
                <Input
                    label="Grid Size"
                    type="number"
                    error={errors.sizeCount?.message}
                    disabled={isSubmitting}
                    {...register('sizeCount', {
                        required: "Size is required",
                        min: {value: 2, message: "Minimum size is 2"},
                        max: {value: 8, message: "Maximum size is 8"},
                        valueAsNumber: true
                    })}
                />

                <Toggle
                    label="Show Numbers"
                    disabled={isSubmitting}
                    {...register('showNumbers')}
                />

                <Button
                    type="submit"
                    size="md"
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save Settings'}
                </Button>
            </Flex>
        </form>
    );
};