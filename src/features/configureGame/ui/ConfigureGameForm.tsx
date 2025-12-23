import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import styles from './styles.module.css';

import {useGameSettings} from '@/entities/gameSettings';
import {Button} from '@/shared/ui/button';
import {Flex} from '@/shared/ui/flex';
import {Input} from '@/shared/ui/input';

interface FormData {
    playerName: string;
}

export const ConfigureGameForm = ({onSuccess}: { onSuccess?: () => void }) => {
    const {settings, updateSettings, isLoading: isSettingsLoading} = useGameSettings();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}
    } = useForm<FormData>({
        defaultValues: settings,
    });

    useEffect(() => {
        reset(settings);
    }, [settings, reset]);

    const onSubmit = async (data: FormData) => {
        await updateSettings(data);
        onSuccess?.();
    };

    if (isSettingsLoading) {
        return <div>Loading settings...</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Flex direction="column" gap={20}>
                <Input
                    label="Player Name"
                    placeholder="Enter your name"
                    error={errors.playerName?.message}
                    disabled={isSubmitting}
                    {...register('playerName', {
                        required: "Name is required",
                        minLength: {value: 2, message: "Minimum 2 characters"}
                    })}
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