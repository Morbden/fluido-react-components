import { Meta, Story } from '@storybook/react'
import { MdMoreVert } from 'react-icons/md'
import '@fluido/sass-styles/lib/material.scss'
import IconButtonMenu, { IconButtonMenuProps } from './index'

const ComponentMeta: Meta = {
  title: 'IconButtonMenu',
}

export default ComponentMeta

const listTemplate = [
  {
    id: 1,
    label: 'Item 1',
  },
  {
    id: 2,
    label: 'Item 2',
    divider: true,
  },
  {
    id: 3,
    label: 'Item 3',
  },
  {
    id: 4,
    label: 'Item 4',
  },
]

const Template: Story<IconButtonMenuProps> = (args) => (
  <IconButtonMenu
    menu={{
      list: listTemplate,
      onClick: (id) => alert(`Selected: ${id}`),
    }}>
    <MdMoreVert size='24' />
  </IconButtonMenu>
)

export const allProps = Template.bind({})
