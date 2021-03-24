import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { CSSProperties } from 'styled-components'
import { testIsSSR } from '../utils'
import Indicator from './navigation-dots'
import { ScrollableWrapper, ScrollButton } from './styled'
import {
  animatedScrollTo,
  getChildrenVisible,
  getNearestChildIndex,
} from './utils'

interface ParentObservableProps {
  __iObserver?: IntersectionObserver
}

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
  /** @default false */
  hasIndicator?: boolean
  /** @default 'none' */
  snap?: 'none' | 'start' | 'center'
  /** @default 'proximity' */
  snapType?: 'mandatory' | 'proximity'
  /** Aceita qualquer propriedade CSS ou variáveis específicas do [[ CustomCSSProps ]] */
  style?: CSSProperties & CustomCSSProps
}

const ScrollableList: React.FC<ScrollableListProps> = ({
  children,
  ordered = false,
  pagination = false,
  hasIndicator = true,
  paginationStep = 1,
  snap = 'start',
  snapType = 'proximity',
  style,
}) => {
  const ListType = ordered ? 'ol' : 'ul'
  const [hasPointer, setHasPointer] = useState<boolean>(true)
  const [position, setPosition] = useState<number>(0)
  const [length, setLength] = useState<number>(0)
  const [visibleChildren, setVisibleChildren] = useState<boolean[]>([])
  const [visibleChildrenPartial, setVisibleChildrenPartial] = useState<
    boolean[]
  >([])
  const [parent, setParent] = useState<
    | (HTMLUListElement & ParentObservableProps)
    | (HTMLOListElement & ParentObservableProps)
  >(null)
  const isSSR = testIsSSR()

  useEffect(() => {
    if (!parent) return

    const handleScroll = () => {
      const visibleChildren = getChildrenVisible(parent)
      const visibleChildrenPartial = getChildrenVisible(parent, true)
      const currentPos = getNearestChildIndex(parent, snap)

      setPosition(currentPos)
      setVisibleChildren(visibleChildren)
      setVisibleChildrenPartial(visibleChildrenPartial)
      setLength(parent.children.length)
    }

    const mutation = new MutationObserver((ml) => {
      for (const m of ml) {
        if (m.type === 'childList') {
          handleScroll()
        }
      }
    })
    mutation.observe(parent, {
      childList: true,
    })

    const asyncHandleScroll = () => {
      setTimeout(handleScroll, 0)
    }

    parent.addEventListener('scroll', asyncHandleScroll)
    handleScroll()

    return () => {
      parent.removeEventListener('scroll', asyncHandleScroll)
      mutation.disconnect()
    }
  }, [parent, snap])

  useEffect(() => {
    !isSSR &&
    window.matchMedia &&
    window.matchMedia('(any-pointer:fine)').matches
      ? setHasPointer(true)
      : setHasPointer(false)
  }, [hasPointer, isSSR])

  const validatePosition = (pos: number) => {
    if (pos < 0) return 0
    if (pos >= parent.children.length) return parent.children.length - 1
    return pos
  }

  const scrollToPosition = (targetPosition: number) => {
    const validPosition = validatePosition(targetPosition)
    const child = parent.children[validPosition]
    animatedScrollTo(parent, child as HTMLElement, snap)
  }

  const scrollToDirection = (direction: 'backwards' | 'forwards') => {
    if (!pagination || !parent) return
    const visibleWidth = parent.parentElement.offsetWidth
    const scrollAmount =
      direction === 'backwards' ? -visibleWidth : visibleWidth
    if (paginationStep === 'full') {
      animatedScrollTo(parent, scrollAmount, snap)
      return
    }
    const targetPosition =
      direction === 'backwards'
        ? position - paginationStep
        : position + paginationStep
    scrollToPosition(targetPosition)
  }

  const scrollForwards = () => scrollToDirection('forwards')
  const scrollBackwards = () => scrollToDirection('backwards')

  return (
    <ScrollableWrapper style={style} snapType={snapType} snap={snap}>
      {pagination && hasPointer && !visibleChildren[0] && (
        <ScrollButton onClick={scrollBackwards} position='left'>
          <MdChevronLeft />
        </ScrollButton>
      )}
      <ListType ref={setParent}>{children}</ListType>
      {pagination &&
        hasPointer &&
        !visibleChildren[visibleChildren.length - 1] && (
          <ScrollButton onClick={scrollForwards} position='right'>
            <MdChevronRight />
          </ScrollButton>
        )}
      {pagination && hasIndicator && (
        <Indicator
          active={position}
          length={length}
          group={visibleChildrenPartial}
          onClick={scrollToPosition}
        />
      )}
    </ScrollableWrapper>
  )
}

export default ScrollableList
