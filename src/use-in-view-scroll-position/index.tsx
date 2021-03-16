import React, { useLayoutEffect, useState } from 'react'
import { testIsSSR } from '../utils'

export interface UseInViewScrollPositionProps {
  /**
   * 0 a 1, o percentual do tamanho do elemento que precisa estar visível.
   * Ex.: `thresholdX = 0.5`  adiciona 50% da altura do rect ao início.
   */
  thresholdX?: number
  /**
   * 0 a 1, o percentual do tamanho do elemento que precisa estar visível.
   * Ex.: `thresholdY = 0.5`  adiciona 50% da altura do rect ao início.
   */
  thresholdY?: number
  /**
   * number em px. Adiciona essa 'margem' ao left e ao right do
   * tamanho do rect
   */
  rootMarginX?: number
  /**
   * number em px. Adiciona essa 'margem' ao top e ao bottom do
   * tamanho do rect
   */
  rootMarginY?: number
  ref?: React.MutableRefObject<HTMLElement> | HTMLElement
}

export interface UseInViewScrollPositionResult {
  startX: number
  endX: number
  startY: number
  endY: number
  ref?: (node: any) => void
}

export interface UseInViewScrollPositionType {
  (args?: UseInViewScrollPositionProps): UseInViewScrollPositionResult
}

const useInViewScrollPosition: UseInViewScrollPositionType = (args = {}) => {
  const [startY, setStartY] = useState<number>(0)
  const [endY, setEndY] = useState<number>(0)
  const [startX, setStartX] = useState<number>(0)
  const [endX, setEndX] = useState<number>(0)
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
      const posY = refRect.top
      const posX = refRect.left
      const posYEnd = posY + refRect.height
      const posXEnd = posX + refRect.width

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft

      let calcStartY = posY + scrollTop
      let calcEndY = posYEnd + scrollTop
      let calcStartX = posX + scrollLeft
      let calcEndX = posXEnd + scrollLeft

      const checkIfNumber = (input) => !isNaN(+input)

      if (checkIfNumber(args.thresholdY)) {
        calcStartY += refRect.height * args.thresholdY
        calcEndY -= refRect.height * args.thresholdY
      }
      if (checkIfNumber(args.thresholdX)) {
        calcStartX += refRect.width * args.thresholdX
        calcEndX -= refRect.width * args.thresholdX
      }
      if (checkIfNumber(args.rootMarginY)) {
        calcStartY -= args.rootMarginY
        calcEndY += args.rootMarginY
      }
      if (checkIfNumber(args.rootMarginX)) {
        calcStartX -= args.rootMarginX
        calcEndX += args.rootMarginX
      }

      setStartY(Math.round(calcStartY))
      setEndY(Math.round(calcEndY))
      setStartX(Math.round(calcStartX))
      setEndX(Math.round(calcEndX))
    }
  }, [ref, isSSR, args])

  return { startY, endY, startX, endX, ref: (node) => setRef(node) }
}

export default useInViewScrollPosition
