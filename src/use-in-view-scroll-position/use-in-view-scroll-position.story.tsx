import { Meta, Story } from '@storybook/react'
import styled from 'styled-components'
import useInViewScrollPosition, { UseInViewScrollPositionProps } from './index'

interface ThresholdProps {
  percentage: number
}

interface RootMarginProps {
  percentage: number
}

const ComponentMeta: Meta = {
  title: 'UseInViewScrollPosition',
  parameters: { layout: 'fullscreen' },
}

export default ComponentMeta

const Container = styled.div`
  --start-color: yellowgreen;
  --end-color: crimson;
  --dots-color: black;
  height: 6000px;
  padding-top: 2000px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: lightsteelblue;
  > div {
    position: relative;
    width: 400px;
    height: 200px;
    background-color: steelblue;
    box-sizing: border-box;
    padding: 1rem;
    font-size: 1.5rem;
  }
`
const ThresholdTop = styled.div<ThresholdProps>`
  width: 0.5rem;
  position: absolute;
  left: -0.5rem;
  top: 0;
  height: 100%;
  background: linear-gradient(
    to bottom,
    var(--start-color) ${(p) => p.percentage}%,
    var(--end-color) ${(p) => p.percentage}%
  );
`
const ThresholdBottom = styled.div<ThresholdProps>`
  width: 0.5rem;
  position: absolute;
  right: -0.5rem;
  top: 0;
  height: 100%;
  background: linear-gradient(
    to top,
    var(--start-color) ${(p) => p.percentage}%,
    var(--end-color) ${(p) => p.percentage}%
  );
`
const RootMarginTop = styled.div<RootMarginProps>`
  position: absolute;
  top: calc(-1 * ${(p) => p.percentage}px);
  left: -50%;
  right: -50%;
  border-top: 2px dotted var(--dots-color);
`
const RootMarginBottom = styled.div<RootMarginProps>`
  position: absolute;
  bottom: calc(-1 * ${(p) => p.percentage}px);
  left: -50%;
  right: -50%;
  border-bottom: 2px dotted var(--dots-color);
`
const Template: Story<UseInViewScrollPositionProps> = (args) => {
  const { ref, ...extra } = useInViewScrollPosition(args)

  return (
    <Container>
      <div className='box' ref={ref}>
        {/* <ThresholdTop percentage={args.thresholdOffsetStart * 100} />
        <ThresholdBottom percentage={args.thresholdOffsetEnd * 100} />
        <RootMarginTop percentage={args.rootMarginOffsetStart} />
        <RootMarginBottom percentage={args.rootMarginOffsetEnd} /> */}
        <pre>{JSON.stringify(extra, null, 2)}</pre>
      </div>
    </Container>
  )
}

export const FirstState = Template.bind({})
FirstState.args = {
  debug: true,
  behaviorStart: 'entering',
  behaviorEnd: 'gone',
  thresholdOffsetStart: 0.3,
  thresholdOffsetEnd: 0.3,
  rootMarginOffsetStart: 0,
  rootMarginOffsetEnd: 0,
}

FirstState.argTypes = {
  behaviorStart: {
    control: {
      type: 'select',
      options: ['entering', 'visible'],
    },
  },
  behaviorEnd: {
    control: {
      type: 'select',
      options: ['gone', 'leaving'],
    },
  },
  thresholdOffsetStart: {
    control: {
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
  },
  thresholdOffsetEnd: {
    control: {
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
  },
}
