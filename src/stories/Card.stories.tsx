import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms';

const meta = {
  title: 'Atoms/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Bookstore</CardTitle>
      </CardHeader>
      <CardContent>Vite + React SPA card example</CardContent>
    </Card>
  ),
};
