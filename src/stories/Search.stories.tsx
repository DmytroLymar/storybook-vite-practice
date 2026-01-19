import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Search } from './Search';
import React from 'react';

const meta = {
    title: 'Atoms/Search',
    component: Search,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    args: {
        value: '',
        onChange: fn(),
        onSearch: fn(),
        disabled: false,
        loading: false
    }
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CallsOnChange: Story = {
    render: function Render(args) {
        const [value, setValue] = React.useState(args.value ?? '');

        return (
            <Search
                {...args}
                value={value}
                onChange={(next) => {
                    setValue(next);
                    args.onChange(next);
                }}
            />
        );
    },
    play: async ({ args, canvas, userEvent }) => {
        const input = canvas.getByRole('textbox');

        await userEvent.clear(input);
        await userEvent.type(input, 'iphone');

        await expect(args.onChange).toHaveBeenLastCalledWith('iphone');
    }
};

export const DisabledDoesNotSearch: Story = {
    args: { disabled: true, value: 'iphone' },
    play: async ({ args, canvas, userEvent }) => {
        const input = canvas.getByRole('textbox');
        const button = canvas.getByRole('button', { name: /search/i });

        await expect(input).toBeDisabled();
        await expect(button).toBeDisabled();

        await userEvent.click(button);
        await expect(args.onSearch).not.toHaveBeenCalled();
    }
};

export const LoadingShowsLoaderAndDoesNotSearch: Story = {
    args: { loading: true, value: 'iphone' },
    play: async ({ args, canvas, userEvent }) => {
        const input = canvas.getByRole('textbox');
        const button = canvas.getByRole('button');

        await expect(input).toBeDisabled();
        await expect(button).toBeDisabled();
        await expect(button).toHaveTextContent('⏳');

        await userEvent.click(button);
        await expect(args.onSearch).not.toHaveBeenCalled();
    }
};

export const PreventsDefaultOnSubmit: Story = {
    args: { value: 'iphone' },
    play: async ({ canvasElement }) => {
        const form = canvasElement.querySelector('form');
        if (!form) throw new Error('Form not found');

        const ev = new Event('submit', { bubbles: true, cancelable: true });
        const notCanceled = form.dispatchEvent(ev);

        await expect(ev.defaultPrevented).toBe(true);
        await expect(notCanceled).toBe(false);
    }
};
