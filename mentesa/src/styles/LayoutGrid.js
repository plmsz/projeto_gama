import styled from 'styled-components'

export const LayoutGrid = styled.div`
  width: 100vw;
  min-height: 100vh;

  display: grid;

  grid-template-columns: 300px auto;
  grid-template-rows: 62px auto;

  grid-template-areas:
    "SN HD"
    "SN PN"
  ;

  position: relative;

`
