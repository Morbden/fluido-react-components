/** Pegar o nó e transformar em Array */
interface ParseHtmlCollectionToArrayType {
  (el: HTMLCollection): Element[]
}

/** Retorna a posição do elemento em relação ao início da lista */
interface GetOffsetLeftType {
  (el: HTMLElement): number
}

/** Retorna a largura do elemento */
interface GetOffsetWidthType {
  (el: HTMLElement): number
}

/** Redução do número mais próximo */
interface GetNearestNumberType {
  (value: number): (prev: number, current: number) => number
}

/** Pegar as larguras dos filhos do nó */
interface GetChildrenWidthsType {
  (node: HTMLElement): number[]
}

/** Pegar as posições dos filhos do nó */
interface GetChildrenPositionsType {
  (node: HTMLElement, origin?: 'left' | 'right' | 'center'): number[]
}

export const parseHtmlCollectionToArray: ParseHtmlCollectionToArrayType = (
  el,
) => {
  const result: Element[] = []
  for (let i = 0; i < el.length; i++) {
    result.push(el[i])
  }
  return result
}

export const getOffsetLeft: GetOffsetLeftType = (el) => el.offsetLeft

export const getOffsetWidth: GetOffsetWidthType = (el) => el.offsetWidth

export const getNearestNumber: GetNearestNumberType = (value) => (
  prev,
  current,
) => (Math.abs(current - value) < Math.abs(prev - value) ? current : prev)

export const getChildrenWidths: GetChildrenWidthsType = (node) => {
  const children = parseHtmlCollectionToArray(node.children)
  return children.map((el: HTMLElement) => getOffsetWidth(el))
}

export const getChildrenPositions: GetChildrenPositionsType = (
  node,
  origin = 'left',
) => {
  const children = parseHtmlCollectionToArray(node.children)
  return children.map((el: HTMLElement) => {
    const width = getOffsetWidth(el)
    const position = getOffsetLeft(el)
    switch (origin) {
      case 'right':
        return position + width
      case 'center':
        return position + width / 2
      case 'left':
      default:
        return position
    }
  })
}
