import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { testIsSSR } from '../utils'
import { CSSProperties } from 'styled-components'
import { ScrollableWrapper, ScrollButton } from './scrollable-list-styled'
import {
  getChildrenPositions,
  getChildrenWidths,
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
  /** _Default_ `false` */
  ordered?: boolean
  /** _Default_ `false` */
  pagination?: boolean
  /** _Default_ `1` */
  paginationStep?: 'full' | number
  /** _Default_ `'none'` */
  snap?: 'none' | 'start' | 'center'
  /** _Default_ `'proximity'` */
  snapType?: 'mandatory' | 'proximity'
  /** Aceita qualquer propriedade CSS ou variáveis específicas do [[ CustomCSSProps ]] */
  style?: CSSProperties & CustomCSSProps
}

const ScrollableList: React.FC<ScrollableListProps> = ({
  children,
  ordered = false,
  pagination = false,
  paginationStep = 1,
  snap = 'start',
  snapType = 'proximity',
  style,
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
    if (!isSSR && !('scrollBehavior' in document.documentElement.style)) {
      import('scroll-behavior-polyfill')
    }
  }, [isSSR])

  useEffect(() => {
    window.matchMedia && window.matchMedia('(any-pointer:fine)').matches
      ? setHasPointer(true)
      : setHasPointer(false)
  }, [hasPointer])

  useEffect(() => {
    if (scrollNode) {
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

        setPosition(scrollPosition)
        setIsLastPosition(lastPosition)
      }

      scrollNode.addEventListener('scroll', handleScroll)

      return () => {
        scrollNode.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrollNode])

  const scrollForwards = () => {
    if (scrollNode && pagination) {
      if (paginationStep === 'full') {
        scrollNode.scrollBy(scrollNode.parentElement.offsetWidth, 0)
      } else {
        const childrenWidths = getChildrenWidths(scrollNode)
        const widths = childrenWidths.slice(position, position + paginationStep)
        const step = widths.reduce((prev, value) => prev + value, 0)
        scrollNode.scrollBy(step, 0)
      }
    }
  }

  const scrollBackwards = () => {
    if (scrollNode && pagination) {
      if (paginationStep === 'full') {
        scrollNode.scrollBy(-scrollNode.parentElement.offsetWidth, 0)
      } else {
        const childrenWidths = getChildrenWidths(scrollNode)
        let initialPosition = position - paginationStep
        initialPosition = initialPosition < 0 ? 0 : initialPosition
        const widths = childrenWidths.slice(initialPosition, position)
        const step = widths.reduce((prev, value) => prev + value, 0)

        scrollNode.scrollBy(-step, 0)
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
