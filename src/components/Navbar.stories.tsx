import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './navbar'

const meta: Meta<typeof NavBar> = {
  title: 'Components/NavBar',
  component: NavBar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NavBar>

export const Default: Story = {}
