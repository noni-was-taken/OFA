import type { Meta, StoryObj } from '@storybook/react-vite'
import SkeletonLoader from './SkeletonLoader'

const meta: Meta<typeof SkeletonLoader> = {
  title: 'Components/SkeletonLoader',
  component: SkeletonLoader,
}

export default meta
type Story = StoryObj<typeof SkeletonLoader>

export const Default: Story = {
  args: {
    lines: 5,
  },
}
