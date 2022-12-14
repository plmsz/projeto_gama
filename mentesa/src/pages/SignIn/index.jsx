import * as S from '../../styles/CommonUi'
import Logo from '../../assets/logo.svg'
import Doctor from '../../assets/doctor.svg'
import GoToGoogle from '../../components/ButtonEnter'

function SignIn() {
  return (
    <S.Container>
      <S.ContainerLeft>
        <S.Title>mentesã</S.Title>
        <S.ImageDoctor src={Doctor} />
      </S.ContainerLeft>
      <S.ContainerRight>
        <div>
          <S.ImageLogo src={Logo} />
          <S.TitleWhite>mentesã</S.TitleWhite>
        </div>
        <GoToGoogle />
      </S.ContainerRight>
    </S.Container>
  )
}

export default SignIn
