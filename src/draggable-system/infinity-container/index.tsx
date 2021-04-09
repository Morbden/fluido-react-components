import interact from 'interactjs'
import { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { buildDragMoveListener } from '../tool'

interface InfinityContainerProps {
  initialX?: number
  initialY?: number
}

const StyledInfinityContainer = styled.div`
  --grid-line: var(--on-surface-divider);
  --grid-main-line: var(--secondary);
  background-color: var(--background);
  background-image: linear-gradient(0deg, var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    linear-gradient(0deg, var(--grid-line) 2px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 2px, transparent 1px);
  background-size: var(--grid-space, 1rem) var(--grid-space, 1rem),
    var(--grid-space, 1rem) var(--grid-space, 1rem),
    calc(var(--grid-space, 1rem) * 10) calc(var(--grid-space, 1rem) * 10),
    calc(var(--grid-space, 1rem) * 10) calc(var(--grid-space, 1rem) * 10);
  background-repeat: repeat;
  background-position-x: var(--move-parent-x, 0);
  background-position-y: var(--move-parent-y, 0);
  border-left: 1px solid var(--on-surface-divider);
  position: relative;
  z-index: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  will-change: transform, background-position-x, background-position-y;

  &::before,
  &::after {
    content: '';
    display: block;
    pointer-events: none;
    position: absolute;
    z-index: -1;
    background-color: var(--grid-main-line);
  }
  &::before {
    top: calc(var(--move-parent-y, 0) - 1px);
    left: 0;
    height: 2px;
    width: 100%;
  }
  &::after {
    top: 0;
    left: var(--move-parent-x, 0);
    height: 100%;
    width: 2px;
  }
`

const DragArea = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const InfinityContainer: React.FC<InfinityContainerProps> = ({
  children,
  initialX = 0,
  initialY = 0,
}) => {
  const [parent, setParent] = useState(null)
  const [node, setNode] = useState(null)

  useLayoutEffect(() => {
    if (!node || !parent) return

    const dragMove = buildDragMoveListener('parent', parent, {
      x: initialX,
      y: initialY,
    })

    const obj = interact(node).draggable({
      autoScroll: true,
      cursorChecker: true,
      allowFrom: false,
      maxPerElement: 1,
      listeners: { move: dragMove },
    })

    return () => {
      obj.unset()
    }
  }, [node, parent])

  return (
    <StyledInfinityContainer ref={(node) => setParent(node)}>
      <DragArea ref={(node) => setNode(node)} />
      {children}
    </StyledInfinityContainer>
  )
}

export default InfinityContainer
