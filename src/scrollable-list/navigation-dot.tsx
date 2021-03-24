import styled from 'styled-components'

const NavigationDot = styled.div`
  width: 1rem;
  height: 2rem;
  padding: 0;
  background: unset;
  background-image: radial-gradient(
    circle at center,
    var(--dots-color) 0.25rem,
    transparent 0.25rem
  );
  appearance: none;
  border: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
`

export default NavigationDot
