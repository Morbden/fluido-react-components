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
  backgroundColor: '',
  size: 128,
}

export const withPicture = Template.bind({})
withPicture.args = {
  name: 'Renato Rodrigues',
  picture: 'https://source.unsplash.com/2EdIX-O2lkI/516x516',
  size: 128,
}

export const allProps = Template.bind({})
allProps.args = {
  name: 'Renato Rodrigues',
  backgroundColor: 'random',
  color: '',
  picture: '',
  size: 128,
}
