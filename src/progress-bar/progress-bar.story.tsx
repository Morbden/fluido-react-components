import { Meta, Story } from '@storybook/react'
import ProgressBar, { ProgressBarProps } from './index'

const ComponentMeta: Meta = {
  title: 'ProgressBar',
}

export default ComponentMeta

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />

export const allProps = Template.bind({})
allProps.args = {
  value: 20,
  max: 100,
  buffer: 60,
}
allProps.argTypes = {
  value: {
    control: 'range',
  },
  max: {
    control: 'range',
  },
  buffer: {
    control: 'range',
  },
}
