import styled from 'styled-components'

interface BadgeProps {}

const StyledDiv = styled.div`
  .badge {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    padding-bottom: 1px;
    align-items: center;
    justify-content: center;
    height: 1.25rem;
    min-width: 1.25rem;
    color: var(--badge-color, var(--on-error));
    background-color: var(--badge-background-color, var(--error));
    border-radius: var(--badge-border-radius, inherit);
    z-index: 3;
  }
`

const Badge: React.FunctionComponent<BadgeProps> = ({ children }) => {
  return <StyledDiv className='badge type-caption'>{children}</StyledDiv>
}

export default Badge
