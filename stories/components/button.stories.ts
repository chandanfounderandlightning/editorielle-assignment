import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Button } from '@/common/components/atoms';
import { PlusIcon } from '../../common/components/icons';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    disabled: false,
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'md',
  },
};

export const SolidDisabled: Story = {
  args: {
    variant: 'solid',
    size: 'md',
    disabled: true,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    size: 'md',
    children: '',
    icon: PlusIcon,
  },
};

