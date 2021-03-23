import { useLayoutEffect, useMemo, useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { testIsSSR } from '../utils'
import {
  RootMarginBottom,
  RootMarginTop,
  ThresholdBottom,
  ThresholdTop,
} from './styled'

export interface UseInViewScrollPositionProps {
  /**
   * 0 a 1, o percentual do tamanho do elemento que precisa estar visível.
   * Ex.: `thresholdOffsetStart = 0.5`  adiciona 50% da altura do rect a parte de cima.
   */
  thresholdOffsetStart?: number
  /**
   * 0 a 1, o percentual do tamanho do elemento que precisa estar visível.
   * Ex.: `thresholdOffsetEnd = 0.5`  adiciona 50% da altura do rect a parte de baixo.
   */
  thresholdOffsetEnd?: number
  /**
   * number em px. Adiciona essa 'margem' ao top do
   * tamanho do rect
   */
  rootMarginOffsetStart?: number
  /**
   * number em px. Adiciona essa 'margem' ao bottom do
   * tamanho do rect
   */
  rootMarginOffsetEnd?: number
  /** default `entering` */
  behaviorStart?: 'entering' | 'visible'
  /** default `gone` */
  behaviorEnd?: 'leaving' | 'gone'
  ref?: React.MutableRefObject<HTMLElement> | HTMLElement
  debug?: boolean
}

export interface UseInViewScrollPositionResult {
  start: number
  end: number
  ref?: (node: any) => void
}

export interface UseInViewScrollPositionType {
  (args?: UseInViewScrollPositionProps): UseInViewScrollPositionResult
}

const useInViewScrollPosition: UseInViewScrollPositionType = (args = {}) => {
  const [height, setHeight] = useState<number>(0)
  const [start, setStart] = useState<number>(Number.MAX_SAFE_INTEGER - 1000)
  const [end, setEnd] = useState<number>(Number.MAX_SAFE_INTEGER)
  const [ref, setRef] = useState<HTMLElement>(null)
  const isSSR = testIsSSR()
  const debugNode = useMemo(() => {
    try {
      return document.createElement('div')
    } catch (err) {
      return null
    }
  }, [isSSR])

  useLayoutEffect(() => {
    if (args.ref) {
      if (args.ref instanceof HTMLElement) {
        setRef(args.ref)
      } else {
        setRef(args.ref.current)
      }
    }
  }, [args.ref])

  useLayoutEffect(() => {
    if (args.debug && debugNode && ref) {
      ref.appendChild(debugNode)
      if (!debugNode.hasAttribute('pos')) {
        debugNode.setAttribute('pos', ref.style.position)
        if (!['fixed', 'absolute', 'relative'].includes(ref.style.position))
          ref.style.position = 'relative'
      }

      const node = (
        <>
          <ThresholdTop percentage={(args.thresholdOffsetStart || 0) * 100} />
          <ThresholdBottom percentage={(args.thresholdOffsetEnd || 0) * 100} />
          <RootMarginTop
            percentage={
              (args.rootMarginOffsetStart || 0) +
              height * (-args.thresholdOffsetStart || 0)
            }
          />
          <RootMarginBottom
            percentage={
              (args.rootMarginOffsetEnd || 0) +
              height * (-args.thresholdOffsetEnd || 0)
            }
          />
        </>
      )
      render(node, debugNode)
    } else if (ref && debugNode && debugNode.hasAttribute('pos')) {
      const pos = debugNode.getAttribute('pos')
      debugNode.removeAttribute('pos')
      unmountComponentAtNode(debugNode)
      ref.removeChild(debugNode)
      ref.style.position = pos || ''
    }
  }, [
    ref,
    debugNode,
    height,
    args.debug,
    args.thresholdOffsetStart,
    args.thresholdOffsetEnd,
    args.rootMarginOffsetStart,
    args.rootMarginOffsetEnd,
  ])

  useLayoutEffect(() => {
    if (ref) {
      const calc = () => {
        const refRect = ref.getBoundingClientRect()

        const elementHeight = refRect.height
        setHeight(elementHeight)

        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop
        const viewportHeight =
          window.innerHeight || document.documentElement.offsetHeight

        const distanceFromRootTop = refRect.top + scrollTop
        const distanceFromRootBottom = refRect.top + elementHeight + scrollTop

        const addStartY = args.behaviorStart === 'visible' ? elementHeight : 0
        const addEndY = args.behaviorEnd === 'leaving' ? -elementHeight : 0

        const calcStartY = distanceFromRootTop - viewportHeight + addStartY
        const calcEndY = distanceFromRootBottom + addEndY

        const checkIfNumber = (input: any) => !isNaN(parseFloat(input))

        const thresholdStartY =
          (checkIfNumber(args.thresholdOffsetStart) &&
            elementHeight * args.thresholdOffsetStart) ||
          0
        const thresholdEndY =
          (checkIfNumber(args.thresholdOffsetEnd) &&
            -elementHeight * args.thresholdOffsetEnd) ||
          0

        const rootMarginStartY =
          (checkIfNumber(args.rootMarginOffsetStart) &&
            -args.rootMarginOffsetStart) ||
          0
        const rootMarginEndY =
          (checkIfNumber(args.rootMarginOffsetEnd) &&
            args.rootMarginOffsetEnd) ||
          0

        const finalStartY = calcStartY + thresholdStartY + rootMarginStartY
        const finalEndY = calcEndY + thresholdEndY + rootMarginEndY

        setStart(Math.round(finalStartY))
        setEnd(Math.round(finalEndY))
      }
      calc()
      window.addEventListener('resize', calc)
      return () => {
        window.removeEventListener('resize', calc)
      }
    }
  }, [ref, args])

  return { start, end, ref: (node) => setRef(node) }
}

export default useInViewScrollPosition
