import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ModalFormButton } from './ModalFormButton';
import { Button } from '@/shared/ui/button/ui/Button';
import { Input } from '@/shared/ui/input/ui/Input';
import { Flex } from '@/shared/ui/flex/ui/Flex';

type ModalFormButtonStoryArgs = React.ComponentProps<typeof ModalFormButton> & {
    onModalOpen: ReturnType<typeof fn>;
    onModalClose: ReturnType<typeof fn>;
    onFormSubmit: ReturnType<typeof fn>;
};

const meta = {
    title: 'Features/ModalFormButton',
    component: ModalFormButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        buttonText: {
            control: 'text',
            description: 'The label displayed on the default trigger button.',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'Open' } },
        },
        modalTitle: {
            control: 'text',
            description: 'The heading title text displayed inside the modal header.',
            table: { type: { summary: 'string' } },
        },
        trigger: {
            control: false,
            description: 'A custom React Node element acting as a target clickable trigger.',
        },
        renderForm: {
            control: false,
            description: 'A render prop function passing down an onClose handler and returning a form element.',
        },
        className: {
            control: 'text',
            description: 'Custom CSS class styling applied on the main wrapping trigger layout.',
        },
        onModalOpen: {
            action: 'Modal Opened',
            description: 'Fires automatically when the modal component is mounted into the DOM view.',
            table: { category: 'Actions' },
        },
        onModalClose: {
            action: 'Modal Closed',
            description: 'Fires automatically when the modal component unmounts from the DOM view.',
            table: { category: 'Actions' },
        },
        onFormSubmit: {
            action: 'Form Submitted',
            description: 'Fires explicitly when the internal form triggers a successful metadata submission.',
            table: { category: 'Actions' },
        },
    },
    args: {
        modalTitle: 'Configuration Settings Form',
        buttonText: 'Open Settings Panel',
        onModalOpen: fn(),
        onModalClose: fn(),
        onFormSubmit: fn(),
    },
    render: ({ onModalOpen, onModalClose, onFormSubmit, ...args }) => {
        const ModalLifecycleObserver = () => {
            useEffect(() => {
                onModalOpen({ status: 'success', timestamp: new Date().toISOString() });
                return () => {
                    onModalClose({ status: 'dismissed', timestamp: new Date().toISOString() });
                };
            }, []);
            return null;
        };

        const InteractiveFormWrapper = ({ onClose }: { onClose: () => void }) => {
            const [inputValue, setInputValue] = useState('');

            return (
                <Flex direction="column" gap={12} style={{ padding: '16px', minWidth: '290px' }}>
                    <ModalLifecycleObserver />
                    <Input
                        label="Configuration Name"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter configuration name..."
                        data-testid="modal-input"
                    />
                    <Flex justify="end" fullWidth>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                                onFormSubmit({ formData: { configurationName: inputValue } });
                                onClose();
                            }}
                        >
                            Submit
                        </Button>
                    </Flex>
                </Flex>
            );
        };

        return (
            <ModalFormButton
                {...args}
                renderForm={(onClose) => <InteractiveFormWrapper onClose={onClose} />}
            />
        );
    },
} satisfies Meta<ModalFormButtonStoryArgs>;

export default meta;

type Story = StoryObj<ModalFormButtonStoryArgs>;

export const Default: Story = {
    args: {
        buttonText: 'Open Default Form',
        modalTitle: 'Default Modal Workspace',
    },
};

export const WithCustomTrigger: Story = {
    args: {
        modalTitle: 'Custom Action Workspace',
        trigger: (
            <div style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: '600',
                boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)',
                cursor: 'pointer',
            }}>
                🚀 Click Here (Custom Element Trigger)
            </div>
        ),
    },
};

export const InteractiveOpenAndClose: Story = {
    args: {
        buttonText: 'Launch Simulation Engine',
        modalTitle: 'Automated Integrity Check',
    },
    play: async ({ canvasElement, step, args }) => {
        args.onModalOpen.mockReset();
        args.onModalClose.mockReset();
        args.onFormSubmit.mockReset();

        const canvas = within(canvasElement);
        const body = within(canvasElement.ownerDocument.body);
        const triggerButton = canvas.getByRole('button', { name: /launch simulation engine/i });

        await step('Verify that the default trigger button component paints correctly', async () => {
            expect(triggerButton).toBeInTheDocument();
        });

        await step('Click the trigger button element and assert modal mounting action logs', async () => {
            await userEvent.click(triggerButton);

            expect(args.onModalOpen).toHaveBeenCalledTimes(1);

            const modalHeader = body.getByRole('heading', { name: /automated integrity check/i });
            expect(modalHeader).toBeInTheDocument();

            const input = body.getByTestId('modal-input');
            expect(input).toBeInTheDocument();
        });

        await step('Simulate realistic user typing inside the modal form layout', async () => {
            const input = body.getByTestId('modal-input');
            await userEvent.type(input, 'Storybook Interaction Testing');
            expect(input).toHaveValue('Storybook Interaction Testing');
        });

        await step('Submit form data, dispatch actions cleanly, and verify modal unmount lifecycles', async () => {
            const submitButton = body.getByRole('button', { name: /submit/i });
            await userEvent.click(submitButton);

            expect(args.onFormSubmit).toHaveBeenCalledTimes(1);
            expect(args.onModalClose).toHaveBeenCalledTimes(1);

            expect(body.queryByRole('heading', { name: /automated integrity check/i })).not.toBeInTheDocument();
        });
    },
};