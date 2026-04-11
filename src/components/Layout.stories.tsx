import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Layout>

export const Default: Story = {
  args: {
    children: <div className="p-8">Page body area</div>,
  },
}
