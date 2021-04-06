import { Meta, Story } from '@storybook/react'
import { useState } from 'react'
import Button from '../button'
import '@fluido/sass-styles/lib/material.scss'
import PopMenu, { PopMenuProps } from './index'

const ComponentMeta: Meta = {
  title: 'PopMenu',
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

const Template: Story<PopMenuProps> = (args) => {
  const [anchor, setAnchor] = useState<HTMLButtonElement>()

  return (
    <>
      <Button ref={(node) => setAnchor(node as HTMLButtonElement)}>
        Button
      </Button>
      <PopMenu
        anchor={anchor}
        onClick={(id) => alert(`Selected: ${id}`)}
        list={listTemplate}
        {...args}
      />
    </>
  )
}

export const allProps = Template.bind({})
