import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
    title: 'Atoms/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
    args: {
        src: 'https://i.pravatar.cc/150?img=1',
        name: 'John Doe'
    }
};

export const WithInitials: Story = {
    args: {
        name: 'John Doe'
    }
};

export const Loading: Story = {
    args: {
        loading: true
    }
};

export const Large: Story = {
    args: {
        size: 72,
        name: 'Jane Smith'
    }
};
