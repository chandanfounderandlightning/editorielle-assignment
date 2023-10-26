import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Checkbox } from '@/common/components/molecules';

const meta: Meta<typeof Checkbox> = {
  title: 'Example/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Plain: Story = {
  args: {
    id: 'checkbox-id',
    name: 'checkbox-name',
    checked: true,
  },
};

export const WithInlineLabel: Story = {
  args: {
    id: 'checkbox-id',
    name: 'checkbox-name',
    label: 'Checkbox label',
  },
};

export const WithJsxLabel: Story = {
  args: {
    id: 'checkbox-id',
    name: 'checkbox-name',
    checked: true,
    label:
      <p className="font-medium text-gray-900">
      Checkbox label
        <span className="text-xs text-gray-500"> (optional)</span>
      </p>,
  },
};
