import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchBox } from './search-box';

const meta = {
  title: 'Molecules/SearchBox',
  component: SearchBox,
  args: {
    value: '',
    onChange: () => undefined,
    placeholder: 'Search books…',
    'aria-label': 'Search',
  },
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <SearchBox {...args} value={value} onChange={setValue} />;
  },
};
