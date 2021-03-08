import { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import Badge from './index'

interface ObjectFree {
  [key: string]: any
}
const ComponentMeta: Meta = {
  title: 'Badge',
}

export default ComponentMeta

const Container = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  background-color: rebeccapurple;
`

const Template: Story<ObjectFree> = (args) => (
  <Container>
    <Badge {...args} />
  </Container>
)

export const FirstState = Template.bind({})
FirstState.args = {
  children: '+9',
}