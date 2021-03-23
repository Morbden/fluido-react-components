import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { CSSProperties } from 'styled-components'
import { testIsSSR } from '../utils'
import { ScrollableWrapper, ScrollButton } from './styled'
import {
  animatedScrollTo,
  getChildrenPositions,
  getNearestNumber,
} from './utils'

interface CustomCSSProps {
  /** _Default_ '0.5rem' */
  '--gap'?: string
  /** _Default_ '--gap * 2' */
  '--start'?: string
  /** _Default_ '--gap * 4' */
  '--end'?: string
  /** _Default_ '--gap * 2' */
  '--padding'?: string
  /** _Default_ '--padding' */
  '--padding-top'?: string
  /** _Default_ '--padding' */
  '--padding-bottom'?: string
}

export interface ScrollableListProps {
  /** @default false */
  ordered?: boolean
  /** @default false */
  pagination?: boolean
  /** @default 1 */
  paginationStep?: 'full' | number
  /** @default 'none' */
  snap?: 'none' | 'start' | 'center'
  /** @default 'proximity' */
  snapType?: 'mandatory' | 'proximity'
  /** Aceita qualquer propriedade CSS ou variáveis específicas do [[ CustomCSSProps ]] */
  style?: CSSProperties & CustomCSSProps
  /** @default 'easeInOutCubic' */
  actionAnimationEase?:
    | 'linear'
    | 'easeIn'
    | 'easeOut'
    | 'easeInOut'
    | 'easeInQuad'
    | 'easeOutQuad'
    | 'easeInOutQuad'
    | 'easeInCubic'
    | 'easeOutCubic'
    | 'easeInOutCubic'
    | 'easeInQuart'
    | 'easeOutQuart'
    | 'easeInOutQuart'
    | 'easeInQuint'
    | 'easeOutQuint'
    | 'easeInOutQuint'
  /** @default 300 */
  actionAnimationDuration?: number
}

const ScrollableList: React.FC<ScrollableListProps> = ({
  children,
  ordered = false,
  pagination = false,
  paginationStep = 1,
  snap = 'start',
  snapType = 'proximity',
  style,
  actionAnimationEase,
  actionAnimationDuration,
}) => {
  const ListType = ordered ? 'ol' : 'ul'
  const [hasPointer, setHasPointer] = useState<boolean>(true)
  const [position, setPosition] = useState<number>(0)
  const [isLastPosition, setIsLastPosition] = useState<boolean>(false)
  const [scrollNode, setScrollNode] = useState<
    HTMLUListElement | HTMLOListElement
  >(null)
  const isSSR = testIsSSR()

  useEffect(() => {
    !isSSR &&
    window.matchMedia &&
    window.matchMedia('(any-pointer:fine)').matches
      ? setHasPointer(true)
      : setHasPointer(false)
  }, [hasPointer, isSSR])

  useEffect(() => {
    if (scrollNode) {
      let tid: any = null
      let touch: boolean = false
      let currentPos: number = 0

      // const callScroll = (pos: number, time: number = 300) => {
      //   if (touch) return
      //   if (tid) {
      //     clearTimeout(tid)
      //     tid = null
      //   }
      //   tid = setTimeout(() => {
      //     const child = scrollNode.children[pos]
      //     animatedScrollTo(scrollNode, child as HTMLElement)
      //   }, time)
      // }

      const handleScroll = () => {
        const scrollNodePosition = scrollNode.scrollLeft
        const scrollNodeFullWidth = scrollNode.scrollWidth
        const scrollNodeWidth = scrollNode.parentElement.offsetWidth
        const childrenScrollX = getChildrenPositions(scrollNode)
        const nearestPosition = childrenScrollX.reduce(
          getNearestNumber(
            scrollNodePosition + (snap === 'center' ? scrollNodeWidth / 2 : 0),
          ),
        )
        const scrollPosition = childrenScrollX.findIndex(
          (el) => el === nearestPosition,
        )

        const lastPosition =
          scrollNodeFullWidth - scrollNodePosition <= scrollNodeWidth + 32

        // currentPos = scrollPosition
        setPosition(scrollPosition)
        setIsLastPosition(lastPosition)
        // callScroll(scrollPosition)
      }

      const mutation = new MutationObserver((ml) => {
        for (const m of ml) {
          if (m.type === 'childList') {
            handleScroll()
          }
        }
      })

      scrollNode.addEventListener('scroll', handleScroll)
      mutation.observe(scrollNode, {
        childList: true,
      })
      handleScroll()

      // const td = () => {
      //   touch = true
      // }
      // const tu = () => {
      //   touch = false
      //   callScroll(currentPos, 100)
      // }

      // scrollNode.addEventListener('touchstart', td)
      // scrollNode.addEventListener('touchend', tu)

      return () => {
        scrollNode.removeEventListener('scroll', handleScroll)
        // scrollNode.removeEventListener('touchstart', td)
        // scrollNode.removeEventListener('touchend', tu)
        mutation.disconnect()
      }
    }
  }, [scrollNode])

  const scrollForwards = () => {
    if (scrollNode && pagination) {
      if (paginationStep === 'full') {
        animatedScrollTo(scrollNode, scrollNode.parentElement.offsetWidth, {
          ease: actionAnimationEase,
          duration: actionAnimationDuration,
        })
      } else {
        const pos = position + paginationStep
        const validPos =
          pos >= scrollNode.children.length
            ? scrollNode.children.length - 1
            : pos

        const child = scrollNode.children[validPos]
        animatedScrollTo(scrollNode, child as HTMLElement)
      }
    }
  }

  const scrollBackwards = () => {
    if (scrollNode && pagination) {
      if (paginationStep === 'full') {
        animatedScrollTo(scrollNode, -scrollNode.parentElement.offsetWidth)
      } else {
        const pos = position - paginationStep
        const validPos = pos < 0 ? 0 : pos

        const child = scrollNode.children[validPos]
        animatedScrollTo(scrollNode, child as HTMLElement)
      }
    }
  }

  return (
    <ScrollableWrapper style={style} snapType={snapType} snap={snap}>
      {pagination && hasPointer && position !== 0 && (
        <ScrollButton onClick={scrollBackwards} position='left'>
          <MdChevronLeft />
        </ScrollButton>
      )}
      <ListType ref={setScrollNode}>{children}</ListType>
      {pagination && hasPointer && !isLastPosition && (
        <ScrollButton onClick={scrollForwards} position='right'>
          <MdChevronRight />
        </ScrollButton>
      )}
    </ScrollableWrapper>
  )
}

export default ScrollableList
