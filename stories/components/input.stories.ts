import type {
  Meta, StoryObj,
} from '@storybook/react';

import { Input } from '@/common/components/molecules';

const meta: Meta<typeof Input> = {
  title: 'Example/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Input',
    width: 'w-60',
  },
}

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
export const Labelled: Story = {
  args: {
    labelText: 'Label',
  },
}
export const WithOptionalText: Story = {
  args: {
    optionalText: 'Optional',
  },
}
export const LabelledWithOptionalText: Story = {
  args: {
    labelText: 'Label',
    optionalText: 'Optional',
  },
}

export const LabelledWithError: Story = {
  args: {
    labelText: 'Label',
    error: true,
    errorMessage: 'Error',
  },
}
