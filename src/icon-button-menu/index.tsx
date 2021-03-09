import { useState } from 'react'
import IconButton from '../icon-button'
import PopMenu, { PopMenuProps } from '../pop-menu'

export interface IconButtonMenuProps {
  menu?: PopMenuProps
  [key: string]: any
}

const IconButtonMenu: React.FunctionComponent<IconButtonMenuProps> = ({
  children,
  menu,
  ...props
}) => {
  const [node, setNode] = useState(null)

  return (
    <>
      <IconButton ref={setNode} {...props}>
        {children}
      </IconButton>
      {menu && <PopMenu anchor={node} {...menu} />}
    </>
  )
}

export default IconButtonMenu
