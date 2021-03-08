import Button from '../../button'

interface DialogActionsProps {
  actions: {
    [key: string]: VoidFunction
  }
  onClose?: VoidFunction
}

const DialogActions: React.FunctionComponent<DialogActionsProps> = ({
  actions,
  onClose,
}) => {
  const entries = Object.entries(actions || {})

  return (
    <>
      {entries.map((entry) => (
        <Button
          kind='text'
          onClick={() => {
            if (entry[1]) entry[1]()
            if (onClose) onClose()
          }}>
          {entry[0]}
        </Button>
      ))}
    </>
  )
}

export default DialogActions
