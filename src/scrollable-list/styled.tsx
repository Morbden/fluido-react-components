import styled from 'styled-components'

interface ScrollableListProps {
  snapType?: 'proximity' | 'mandatory'
  snap: 'none' | 'start' | 'center'
}

interface StyledScrollButtonProps {
  position?: 'left' | 'right'
}

export const ScrollableWrapper = styled.div<ScrollableListProps>`
  --gap: 0.5rem;
  --start: calc(var(--gap) * 2);
  --end: calc(var(--gap) * 4);
  --padding: calc(var(--gap) * 2);
  --padding-top: var(--padding);
  --padding-bottom: var(--padding);
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  ul,
  ol {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: var(--gap);
    /* scroll-behavior: smooth;
    scroll-snap-type: x ${(props) => props.snapType};
    scroll-padding-left: ${(props) =>
      props.snap === 'start' && 'var(--start)'}; */
    list-style: none;
    overflow-x: auto;
    overflow-y: visible;
    padding-inline-start: var(--start);
    padding-inline-end: var(--end);
    padding-top: var(--padding-top);
    padding-bottom: var(--padding-bottom);
    margin-block-start: unset;
    margin-block-end: unset;
    white-space: nowrap;
    width: 100%;
    & > * {
      scroll-snap-align: ${(props) => props.snap};
      &:last-child {
        padding-inline-end: var(--end);
      }
    }
  }
`

export const ScrollButton = styled.button<StyledScrollButtonProps>`
  padding: 0.5rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  border: 2px solid black;
  border-radius: 9999px;
  background-color: white;
  position: absolute;
  z-index: 1;
  left: ${(props) => (props.position === 'left' ? 'var(--padding)' : 'auto')};
  right: ${(props) => (props.position === 'right' ? 'var(--padding)' : 'auto')};
`
