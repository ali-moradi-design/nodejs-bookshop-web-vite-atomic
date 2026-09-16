import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/atoms';
import { FormField } from './form-field';

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    htmlFor: 'email',
    children: <Input id="email" type="email" placeholder="you@example.com" />,
  },
};
