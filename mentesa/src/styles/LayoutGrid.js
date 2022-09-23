import styled from 'styled-components'

export const LayoutGrid = styled.div`
  min-height: 100vh;
  display: grid;

  grid-template-columns: 280px auto;
  grid-template-rows: 50px auto;

  grid-template-areas:
    'SN HD'
    'SN PN';

  position: relative;

  overflow-x: hidden;
  @media screen and (max-width: 768px) {
    grid-template-columns: auto;
  }
`
