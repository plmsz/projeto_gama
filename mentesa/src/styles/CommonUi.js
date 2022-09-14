import styled from 'styled-components/'

export const Container = styled.main`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  text-align: center;
`

const containerFlex = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`

export const ContainerLeft = styled(containerFlex)`
  background-color: #fff;
  width: 60%;
  @media screen and (max-width: 47.5rem) {
    display: none;
  }
`

export const ContainerRigth = styled(containerFlex)`
  background: #00a6fb;
  width: 40%;
  @media screen and (max-width: 47.5rem) {
    width: 100%;
    /* ::after {
      content: url('../pages/SignIn/images/doctor.svg');
      min-height: 32.5rem;
      min-width: 34.375rem;
      margin-top: 8rem;
    } */
  }
`

export const Title = styled.h1`
  color: #006494;
  font-family: 'Staatliches';
  font-size: 4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 5rem;
  text-transform: uppercase;
`

export const ImageDoctor = styled.img`
  margin-top: 10rem;
  max-height: 32.5rem;
  max-width: 34.375rem;
`

export const ImageLogo = styled.img`
  margin-top: 10rem;
  max-height: 9.5rem;
  max-width: 13.5rem;
  @media screen and (max-width: 47.5rem) {
    margin: 5rem 0 3rem;
  }
`

export const TitleWhite = styled(Title)`
  color: #fff;
  margin-bottom: 15rem;
  margin-top: 1rem;
  @media screen and (max-width: 47.5rem) {
    margin-bottom: 10rem;
  }
`
