import { useLayoutEffect, useState } from 'react'
import { testIsSSR } from '../utils'

export interface UseInViewScrollPositionProps {
  /**
   * 0 a 1, o percentual do tamanho do elemento que precisa estar visível.
   * Ex.: `thresholdTop = 0.5`  adiciona 50% da altura do rect a parte de cima.
   */
  thresholdTop?: number
  /**
   * 0 a 1, o percentual do tamanho do elemento que precisa estar visível.
   * Ex.: `thresholdBottom = 0.5`  adiciona 50% da altura do rect a parte de baixo.
   */
  thresholdBottom?: number
  /**
   * number em px. Adiciona essa 'margem' ao top do
   * tamanho do rect
   */
  rootMarginTop?: number
  /**
   * number em px. Adiciona essa 'margem' ao bottom do
   * tamanho do rect
   */
  rootMarginBottom?: number
  /** default `entering` */
  behaviorStart?: 'entering' | 'visible'
  /** default `gone` */
  behaviorEnd?: 'leaving' | 'gone'
  ref?: React.MutableRefObject<HTMLElement> | HTMLElement
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
  const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(0)
  const [ref, setRef] = useState<HTMLElement>(null)
  const isSSR = testIsSSR()

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
    if (!isSSR && ref) {
      const refRect = ref.getBoundingClientRect()

      const elementHeight = refRect.height

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const viewportHeight =
        window.innerHeight || document.documentElement.offsetHeight

      const distanceFromRootTop = refRect.top + scrollTop
      const distanceFromRootBottom = refRect.top + elementHeight + scrollTop

      const addStartY = args.behaviorStart === 'visible' ? elementHeight : 0
      const addEndY = args.behaviorEnd === 'leaving' ? -elementHeight : 0

      const calcStartY = distanceFromRootTop - viewportHeight + addStartY
      const calcEndY = distanceFromRootBottom + addEndY

      const checkIfNumber = (input: any) => !isNaN(+input)

      const thresholdStartY =
        (checkIfNumber(args.thresholdTop) &&
          elementHeight * args.thresholdTop) ||
        0
      const thresholdEndY =
        (checkIfNumber(args.thresholdBottom) &&
          -elementHeight * args.thresholdBottom) ||
        0

      const rootMarginStartY =
        (checkIfNumber(args.rootMarginTop) && -args.rootMarginTop) || 0
      const rootMarginEndY =
        (checkIfNumber(args.rootMarginBottom) && args.rootMarginBottom) || 0

      const finalStartY = calcStartY + thresholdStartY + rootMarginStartY
      const finalEndY = calcEndY + thresholdEndY + rootMarginEndY

      setStart(Math.round(finalStartY))
      setEnd(Math.round(finalEndY))
    }
  }, [ref, isSSR, args])

  return { start, end, ref: (node) => setRef(node) }
}

export default useInViewScrollPosition
