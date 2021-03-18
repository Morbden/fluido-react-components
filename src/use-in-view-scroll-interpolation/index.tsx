import {
  MotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useViewportScroll,
} from 'framer-motion'
import { SpringOptions } from 'popmotion'
import useInViewScrollPosition, {
  UseInViewScrollPositionProps,
} from '../use-in-view-scroll-position'

export interface InterpolationProps<T = any> {
  [key: string]: T[]
}

export interface InterpolationStepProps {
  /** step vai de [0-1] */
  [key: string]: number[]
}

export interface InterpolationResult<T = any> {
  [key: string]: MotionValue<T>
}

export interface UseInViewScrollInterpolationProps<T = any>
  extends UseInViewScrollPositionProps {
  ease?: {
    [key: string]: SpringOptions
  }
  interpolations?: InterpolationProps<T>
  interpolationSteps?: InterpolationStepProps
}

export interface UseInViewScrollInterpolationResult<T = any> {
  result: InterpolationResult<T>
  ref?: (node: any) => void
}

export interface UseInViewScrollInterpolationType<T = any> {
  (
    args?: UseInViewScrollInterpolationProps<T>,
  ): UseInViewScrollInterpolationResult<T>
}

const useInViewScrollInterpolation: UseInViewScrollInterpolationType = (
  args = {},
) => {
  const { interpolations, interpolationSteps, ...props } = args

  const { scrollY: scroll } = useViewportScroll()
  const reduced = useReducedMotion()
  const { ref, start, end } = useInViewScrollPosition(props)

  const result: InterpolationResult = {}

  for (const r in interpolations) {
    const steps = interpolationSteps && interpolationSteps[r]

    const genSteps = () => {
      const interval = end - start
      if (steps) {
        return steps.map((s) => start + s * interval)
      } else {
        const length = interpolations[r].length
        const step = interval / (length - 1)
        return Array(length)
          .fill(0)
          .map((_, i) => start + i * step)
      }
    }
    const finalSteps = genSteps()

    const interpolationsComputed = reduced
      ? interpolations[r].fill(0)
      : interpolations[r]

    const t = useTransform(scroll, finalSteps, interpolationsComputed)
    const ease: SpringOptions = (args.ease && args.ease[r]) || {
      damping: 20,
      mass: 1,
      stiffness: 100,
    }

    result[r] = useSpring(t, ease)
  }

  return { ref, result }
}

export default useInViewScrollInterpolation
