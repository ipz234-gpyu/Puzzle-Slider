import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from '../index';
import styles from './Button.stories.module.css';

const buttonClickSpy = fn();

const meta = {
    title: 'Shared/UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Button label',
            table: { type: { summary: 'ReactNode' } },
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline'],
            description: 'Visual style of the button',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'primary' } },
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Button size',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
        },
        isLoading: {
            control: 'boolean',
            description: 'Displays a loading state',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        fullWidth: {
            control: 'boolean',
            description: 'Expands the button to the full width of its container',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Disables the button',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
            description: 'HTML button type',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'button' } },
        },
        className: {
            control: 'text',
            description: 'Additional CSS class names',
            table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
        },
        onClick: {
            action: 'Click handler',
            table: { type: { summary: 'function' } },
        },
    },
    args: {
        children: 'Start game',
        type: 'button',
        onClick: buttonClickSpy,
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Settings',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Cancel',
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Hint',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Main action',
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
        children: 'Saving',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Locked',
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
        children: 'Continue',
    },
    decorators: [
        (Story) => (
            <div className={styles.fullWidthPreview}>
                <Story />
            </div>
        ),
    ],
};

export const InteractiveClick: Story = {
    args: {
        children: 'Click simulator',
    },
    play: async ({ canvasElement, step }) => {
        buttonClickSpy.mockReset?.();

        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: /click simulator/i });

        await step('render the button', async () => {
            expect(button).toBeInTheDocument();
        });

        await step('trigger the click handler', async () => {
            await userEvent.click(button);
            expect(buttonClickSpy).toHaveBeenCalledTimes(1);
        });
    },
};