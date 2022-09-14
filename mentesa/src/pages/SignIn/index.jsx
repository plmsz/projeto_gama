import * as S from '../../styles/CommonUi'
import Logo from './images/logo.svg'
import Doctor from './images/doctor.svg'
import GoToGoogle from '../../components/ButtonEnter'

function SignIn() {
  return (
    <S.Container>
      <S.ContainerLeft>
        <S.Title>mentesã</S.Title>
        <S.ImageDoctor src={Doctor} />
      </S.ContainerLeft>
      <S.ContainerRigth>
        <div>
          <S.ImageLogo src={Logo} />
          <S.TitleWhite>mentesã</S.TitleWhite>
        </div>
        <GoToGoogle />
      </S.ContainerRigth>
    </S.Container>
  )
}

export default SignIn
