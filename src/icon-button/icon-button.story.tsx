import { Meta, Story } from '@storybook/react'
import IconButton, { IconButtonProps } from './index'
import { MdAdd } from 'react-icons/md'

const ComponentMeta: Meta = {
  title: 'IconButton',
}

export default ComponentMeta

const Template: Story<IconButtonProps> = (args) => (
  <IconButton {...args}>
    <MdAdd size='24' />
  </IconButton>
)

export const allProps = Template.bind({})
allProps.args = {
  badge: '9',
  disabled: false,
}
