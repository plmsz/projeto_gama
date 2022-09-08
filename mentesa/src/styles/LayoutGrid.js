import styled from 'styled-components'

// SN -> SideNav
// HD -> Header
// PN -> Panel

export const LayoutGrid = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;

  grid-template-columns: 312px auto;
  grid-template-rows: 62px auto;

  grid-template-areas:
    "SN HD"
    "SN PN"
  ;

`
