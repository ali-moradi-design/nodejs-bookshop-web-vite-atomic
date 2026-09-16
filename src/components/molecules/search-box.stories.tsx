import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchBox } from './search-box';

const meta = {
  title: 'Molecules/SearchBox',
  component: SearchBox,
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    return (
      <SearchBox
        value={value}
        onChange={setValue}
        placeholder="Search books…"
        aria-label="Search"
      />
    );
  },
};
