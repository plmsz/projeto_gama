import styled from 'styled-components';

export const Container = styled.div`
  grid-area: SN;

  display: flex;
  flex-direction: column;
  justify-items:center;
  align-items: center;

  max-width: 312px;
  min-height: 100%;

  background-color: #003554;

  position: relative;
`;

export const NavList = styled.nav`
    width: 100%;
    margin-top: 24px;

    display: flex;
    flex-direction: column;

`;

export const NavItem = styled.li`
    list-style: none;

    a{
      max-width: 100%;
      padding: 18px 0 18px 35px;

      display: ${props => props.showComponent !== false ? 'flex' : 'none'};
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
    }
`;

export const Logo = styled.img`
  margin: 40px 0 40px 0;
`;

export const Logout = styled.div`
  width: 100%;
  max-height: 78px;
  /* padding: 38px 0 38px 0; */

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position:absolute;
  bottom: 0;

  border-top: 1px solid rgba(108, 108, 108, 0.4);

  transition: 0.4s;

  &:hover{
    background-color: #006494;
  }

  button {
    width: 100%;
    height: 100%;

    background-color: transparent;
    &:hover{
      background-color: #006494;
    }

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;

    border:none;

    border-radius: 4px;
    font-size: 2rem;
    color: #f8f7ff;
    font-weight: bold;
    position: relative;

    cursor: pointer;
    
  }
`;
