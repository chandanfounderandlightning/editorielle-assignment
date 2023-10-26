import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Toggle } from '@/common/components/molecules';

const meta: Meta<typeof Toggle> = {
  title: 'Example/Toggle',
  component: Toggle,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Plain: Story = {
  args: {
    checked: false,
  },
}
export const Checked: Story = {
  args: {
    checked: true,
  },
}
export const WithLabel: Story = {
  args: {
    labelText: 'Label',
  },
}
