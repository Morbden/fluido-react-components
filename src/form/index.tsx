import { SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import Surface from '../surface'
import FormFooter from './form-footer'

interface FormProps {
  onSubmit?: SubmitHandler<Record<string, any>>
  elevation?: number
  loading?: boolean
  footer?: React.ReactNode
  footerMode?: 'row' | 'column'
}

const StyledForm = styled.form`
  fieldset {
    padding: 0;
    margin: 0;
    border: none;
  }
`

const Form: React.FunctionComponent<FormProps> = ({
  children,
  onSubmit,
  elevation,
  loading = false,
  footer,
  footerMode = 'column',
}) => {
  return (
    <Surface elevation={elevation}>
      <StyledForm onSubmit={onSubmit}>
        <fieldset disabled={loading}>
          {children}
          {footer && <FormFooter mode={footerMode}>{footer}</FormFooter>}
        </fieldset>
      </StyledForm>
    </Surface>
  )
}

export default Form
