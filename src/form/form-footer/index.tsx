import cx from 'classnames'
import styled from 'styled-components'

interface FormFooterProps {
  mode?: 'row' | 'column'
}

const StyledFormFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.5rem;
  border-top: 1px solid var(--on-surface-divider);

  &.row {
    flex-direction: row-reverse;
    align-items: unset;
  }
`

const FormFooter: React.FunctionComponent<FormFooterProps> = ({
  children,
  mode = 'column',
}) => {
  return (
    <StyledFormFooter
      className={cx({
        row: mode === 'row',
      })}>
      {children}
    </StyledFormFooter>
  )
}

export default FormFooter
