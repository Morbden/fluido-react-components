import { Meta, Story } from '@storybook/react'
import Avatar, { AvatarProps } from './index'

const ComponentMeta: Meta = {
  title: 'Avatar',
}

export default ComponentMeta

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />

export const onlyName = Template.bind({})
onlyName.args = {
  name: 'Renato Rodrigues',
}
