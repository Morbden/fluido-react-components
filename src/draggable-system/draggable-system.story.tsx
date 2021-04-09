import { Meta, Story } from '@storybook/react'
import InfinityContainer from './infinity-container'
import Draggable from './draggable'

import '@fluido/sass-styles/lib/material.scss'
import '@fluido/sass-styles/lib/elevation.scss'
import '@fluido/sass-styles/lib/typography.scss'
import styled from 'styled-components'

interface ObjectFree {
  [key: string]: any
}

const ComponentMeta: Meta = {
  title: 'DraggableSystem',
  parameters: {
    layout: 'fullscreen',
  },
}

export default ComponentMeta

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const Template: Story<ObjectFree> = (args) => (
  <Container>
    <InfinityContainer initialX={40} initialY={40}>
      <Draggable title={<h6>Lorem ipsum</h6>} initialX={40} initialY={40}>
        <p>Dolor sit amet.</p>
      </Draggable>
    </InfinityContainer>
  </Container>
)

export const presentation = Template.bind({})
