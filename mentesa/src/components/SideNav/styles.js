import styled from 'styled-components';

export const Container = styled.div`
  grid-area: SN;

  display: flex;
  flex-direction: column;
  justify-items:center;
  align-items: center;

  max-width: 312px;
  height: 100vh;

  background-color: #003554;
`;

export const NavList = styled.nav`
    width: 100%;
    margin-top: 24px;

    display: flex;
    flex-direction: column;
`

export const NavItem = styled.a`
  max-width: 100%;
  padding: 14px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  
  cursor: pointer;
  transition: 0.4s;

  text-decoration:none;
  font-weight: bold;
  color: #F8F7FF;
  span {
    font-size: 2rem;
    align-content: center;
  }
  &:hover{
    background-color: #00A6FB;
  }
`

export const Logo = styled.img`
  margin: 40px 0 40px 0;
`