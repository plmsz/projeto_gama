import styled from 'styled-components/';

export const Container = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 85vh;
  text-align: center;
`;

export const ContainerFlex = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`;

export const ContainerLeft = styled(ContainerFlex)`
  background-color: #fff;
  width: 60%;

  @media screen and (max-width: 47.5rem) {
    display: none;
  }
`;

export const ContainerRight = styled(ContainerFlex)`
  background: #00a6fb;
  width: 40%;

  @media screen and (max-width: 47.5rem) {
    width: 100%;
    ::after {
      content: url('../../public/doctor-275x261.png');
      margin-top: 6rem;
    }
  }
`;

export const Title = styled.h1`
  color: #006494;
  font-family: 'Staatliches';
  font-size: 4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 5rem;
  text-transform: uppercase;
`;

export const ImageDoctor = styled.img`
  margin-top: 10rem;
  max-height: 32.5rem;
  max-width: 34.375rem;
`;

export const ImageLogo = styled.img`
  margin-top: 10rem;
  max-height: 9.5rem;
  max-width: 13.5rem;

  @media screen and (max-width: 47.5rem) {
    margin: 5rem 0 3rem;
  }
`;

export const TitleWhite = styled(Title)`
  color: #fff;
  margin-bottom: 15rem;
  margin-top: 1rem;

  @media screen and (max-width: 47.5rem) {
    margin-bottom: 5rem;
  }
`;
