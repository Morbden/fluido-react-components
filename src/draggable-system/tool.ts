interface BuildDragMoveListenerOptionsProps {
  x?: number
  y?: number
}

export const buildDragMoveListener = (
  key: string,
  target: HTMLElement,
  options: BuildDragMoveListenerOptionsProps = {},
) => {
  const keyX = `--move${(key && '-' + key) || ''}-x`
  const keyY = `--move${(key && '-' + key) || ''}-y`

  target.style.setProperty(keyX, (options.x || 0) + 'px')
  target.style.setProperty(keyY, (options.y || 0) + 'px')

  return (ev: any) => {
    const dx = ev.dx + parseFloat(target.style.getPropertyValue(keyX))
    const dy = ev.dy + parseFloat(target.style.getPropertyValue(keyY))

    target.style.setProperty(keyX, dx + 'px')
    target.style.setProperty(keyY, dy + 'px')
  }
}
