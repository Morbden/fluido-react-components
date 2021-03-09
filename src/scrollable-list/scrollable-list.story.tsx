import { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import ScrollableList, { ScrollableListProps } from './index'

interface ExtraProps {
  childSize?: number
}

const ComponentMeta: Meta = {
  title: 'ScrollableList',
}

export default ComponentMeta

const Box = styled.div`
  width: 10rem;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background-color: rebeccapurple;
  color: #fff;
  border-radius: 1rem;
`

const Template: Story<ScrollableListProps & ExtraProps> = ({
  childSize,
  ...args
}) => (
  <ScrollableList {...args}>
    {Array(childSize)
      .fill(0)
      .map((_, i) => (
        <li>
          <Box>{i + 1}</Box>
        </li>
      ))}
  </ScrollableList>
)

export const allProps = Template.bind({})
allProps.args = {
  childSize: 20,
  pagination: true,
  paginationStep: 2,
  snap: 'start',
  snapType: 'mandatory',
}

allProps.argTypes = {
  snap: {
    control: {
      type: 'select',
      options: ['none', 'start', 'center'],
    },
  },
  snapType: {
    control: {
      type: 'select',
      options: ['mandatory', 'proximity'],
    },
  },
}
