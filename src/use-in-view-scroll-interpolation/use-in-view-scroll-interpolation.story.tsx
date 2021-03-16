import { Meta, Story } from '@storybook/react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import useInViewScrollInterpolation, {
  UseInViewScrollInterpolationProps,
} from './index'

interface ThresholdProps {
  percentage: number
}

interface RootMarginProps {
  percentage: number
}

const ComponentMeta: Meta = {
  title: 'UseInViewScrollInterpolation',
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
  .box {
    position: relative;
    width: 25rem;
    height: 25rem;
    background-color: steelblue;
    box-sizing: border-box;
    padding: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    & > .item {
      position: fixed;
      top: calc(50% - 2rem);
      left: calc(50% - 2rem);
      width: 4rem;
      height: 4rem;
      background: linear-gradient(to bottom, purple, green);
    }
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
const Template: Story<UseInViewScrollInterpolationProps> = (args) => {
  const { ref, result } = useInViewScrollInterpolation({
    ...args,
    interpolations: {
      rotate: [0, 360],
    },
  })

  return (
    <Container>
      <div className='box' ref={ref}>
        <ThresholdTop percentage={args.thresholdTop * 100} />
        <ThresholdBottom percentage={args.thresholdBottom * 100} />
        <RootMarginTop percentage={args.rootMarginTop} />
        <RootMarginBottom percentage={args.rootMarginBottom} />
        <motion.div style={result} className='item' />
      </div>
    </Container>
  )
}

export const FirstState = Template.bind({})
FirstState.args = {
  orientation: 'vertical',
  thresholdTop: 0,
  thresholdBottom: 0,
  rootMarginTop: 0,
  rootMarginBottom: 0,
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
      options: ['leaving', 'gone'],
    },
  },
  thresholdTop: {
    control: {
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
  },
  thresholdBottom: {
    control: {
      type: 'range',
      max: 1,
      min: 0,
      step: 0.05,
    },
  },
}
