import styled from 'styled-components/'

export const Container = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  text-align: center;
  min-height: 100vh;
  padding: 1.6875rem auto;
`

const containerFlex = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
`

export const ContainerLeft = styled(containerFlex)`
  width: 60%;
  background-color: #fff;
  @media screen and (max-width: 47.5rem) {
    display: none;
  }
`

export const ContainerRigth = styled(containerFlex)`
  width: 40%;
  background: #00a6fb;
  @media screen and (max-width: 47.5rem) {
    width: 100%;
  }
`

export const Title = styled.h1`
  font-family: 'Staatliches';
  font-style: normal;
  font-weight: 400;
  font-size: 4rem;
  line-height: 5rem;
  color: #006494;
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
    margin-top: 5rem;
  }
`

export const TitleWhite = styled(Title)`
  color: #fff;
`
