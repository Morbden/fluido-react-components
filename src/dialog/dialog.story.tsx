import { Meta, Story } from '@storybook/react'
import Dialog, { DialogProps } from './index'
import '@fluido/sass-styles/lib/material.scss'
import '@fluido/sass-styles/lib/typography.scss'

const ComponentMeta: Meta = {
  title: 'Dialog',
}

export default ComponentMeta

const Template: Story<DialogProps> = (args) => {
  return (
    <Dialog {...args}>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam,
        blanditiis?
      </p>
    </Dialog>
  )
}

export const simple = Template.bind({})
simple.args = {
  open: true,
  title: 'Dialog Title',
}

export const actions = Template.bind({})
actions.args = {
  open: true,
  title: 'Dialog Title',
  actions: {
    OK: null,
  },
}
export const lockMode = Template.bind({})
lockMode.args = {
  open: true,
  lock: true,
  title: 'Dialog Title',
  actions: {
    OK: null,
  },
}
export const loadingMode = Template.bind({})
loadingMode.args = {
  open: true,
  loading: true,
  title: 'Dialog Title',
  actions: {
    OK: null,
  },
}
