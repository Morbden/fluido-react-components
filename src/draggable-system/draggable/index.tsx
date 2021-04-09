import interact from 'interactjs'
import { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { buildDragMoveListener } from '../tool'

interface DraggableProps {
  title?: React.ReactNode
  initialX?: number
  initialY?: number
}

const StyledDraggable = styled.div`
  position: absolute;
  min-width: 16rem;
  padding-bottom: 0.5rem;
  border: 1px solid var(--on-surface-divider);
  background-color: var(--surface);
  color: var(--on-surface-high-emphasis);
  top: calc(var(--move-parent-y, 0px) + var(--move-child-y, 0px));
  left: calc(var(--move-parent-x, 0px) + var(--move-child-x, 0px));
  will-change: transform, left, top;
  cursor: default;
`

const DragArea = styled.div`
  width: 100%;
  min-height: 3rem;
  padding: 0 0.25rem 0 1rem;
  background-color: var(--surface);
  color: var(--on-surface-high-emphasis);
  border-bottom: 1px solid var(--on-surface-divider);
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`

const Draggable: React.FC<DraggableProps> = ({
  children,
  title,
  initialX = 0,
  initialY = 0,
}) => {
  const [parent, setParent] = useState(null)
  const [node, setNode] = useState(null)

  useLayoutEffect(() => {
    if (!node || !parent) return

    const dragMove = buildDragMoveListener('child', parent, {
      x: initialX,
      y: initialY,
    })

    const nodeObj = interact(node).draggable({
      autoScroll: true,
      listeners: { move: dragMove },
    })

    const parentObj = interact(parent).resizable({})

    return () => {
      nodeObj.unset()
      parentObj.unset()
    }
  }, [node, parent])

  return (
    <StyledDraggable ref={(node) => setParent(node)}>
      <DragArea ref={(node) => setNode(node)}>{title}</DragArea>
      <div>{children}</div>
    </StyledDraggable>
  )
}

export default Draggable
