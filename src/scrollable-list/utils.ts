import { testIsSSR } from '../utils'

/** Pegar o nó e transformar em Array */
interface ParseHtmlCollectionToArrayType {
  (el: HTMLCollection): Element[]
}

/** Pegar as distancias dos filhos do nó */
interface GetChildrenRangeType {
  (node: HTMLElement): [number, number][]
}

/** Pegar índice dos filhos mais próximos a posição */
interface GetNearestChildIndexType {
  (node: HTMLElement, align?: 'none' | 'start' | 'center'): number
}

/** Pegar as quais dos filhos do estão visiveis */
interface GetChildrenVisibleType {
  (node: HTMLElement, partial?: boolean): boolean[]
}

/** Anima o scroll para posição ou elemento */
interface AnimatedScrollToType {
  (
    node: HTMLElement,
    val: HTMLElement | number,
    align?: 'none' | 'start' | 'center',
  ): void
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

export const getChildrenRange: GetChildrenRangeType = (node) => {
  const children = parseHtmlCollectionToArray(node.children)

  return children.map((el: HTMLElement, i, l) => {
    const isLast = i === l.length - 1
    const fix = isLast ? parseInt(el.style.paddingInlineEnd) || 32 : 0
    const start = el.offsetLeft - node.scrollLeft
    return [start, start + el.offsetWidth - fix]
  })
}

export const getChildrenVisible: GetChildrenVisibleType = (
  node,
  partial = false,
) => {
  const children = getChildrenRange(node)
  return children.map((range) => {
    if (!partial) return range[0] >= 0 && range[1] <= node.offsetWidth
    return range[1] >= 0 && range[0] <= node.offsetWidth
  })
}

export const getNearestChildIndex: GetNearestChildIndexType = (
  node,
  align = 'none',
) => {
  const width = node.offsetWidth
  const position = align !== 'center' ? 0 : width / 2
  const children = getChildrenRange(node).map((v) => {
    return align !== 'center' ? v[0] : v[0] + (v[1] - v[0]) / 2
  })
  const closest = children.length
    ? children.reduce((prev, pos) => {
        return Math.abs(pos - position) < Math.abs(Math.abs(prev - position))
          ? pos
          : prev
      }, Infinity)
    : null
  return closest ? children.indexOf(closest) : -1
}

export const animatedScrollTo: AnimatedScrollToType = (
  node,
  val,
  align = 'none',
) => {
  if (testIsSSR()) return false
  let distance = -1
  const testPositions = () => distance < 0
  const start: number = +window.getComputedStyle(node).paddingInlineStart || 16
  const scrollPos: number = node.scrollLeft
  const width: number = node.offsetWidth

  if (val instanceof HTMLElement && testPositions()) {
    if (align !== 'center') distance = val.offsetLeft - scrollPos
    else distance = val.offsetLeft - scrollPos + val.offsetWidth / 2 - width / 2
  } else {
  }
  if (!isNaN(parseFloat(val as any)) && testPositions()) {
    distance = (val as number) || 0
  }

  const to = scrollPos + distance - start
  node.scrollTo(to, 0)
}
