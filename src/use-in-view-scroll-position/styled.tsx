import styled from "styled-components"

interface ThresholdProps {
  percentage: number
}

interface RootMarginProps {
  percentage: number
}

export const ThresholdTop = styled.div<ThresholdProps>`
  width: 0.5rem;
  position: absolute;
  left: -0.5rem;
  top: 0;
  height: 100%;
  background: linear-gradient(
    to bottom,
    var(--start-color) ${(p) => p.percentage}%,
    var(--end-color) ${(p) => p.percentage}%
  );
`
export const ThresholdBottom = styled.div<ThresholdProps>`
  width: 0.5rem;
  position: absolute;
  right: -0.5rem;
  top: 0;
  height: 100%;
  background: linear-gradient(
    to top,
    var(--start-color) ${(p) => p.percentage}%,
    var(--end-color) ${(p) => p.percentage}%
  );
`
export const RootMarginTop = styled.div<RootMarginProps>`
  position: absolute;
  top: calc(-1 * ${(p) => p.percentage}px);
  left: -50%;
  right: -50%;
  border-top: 2px dotted var(--dots-color);
`
export const RootMarginBottom = styled.div<RootMarginProps>`
  position: absolute;
  bottom: calc(-1 * ${(p) => p.percentage}px);
  left: -50%;
  right: -50%;
  border-bottom: 2px dotted var(--dots-color);
`