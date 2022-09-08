import { HeaderStyled, Avatar } from './styles'

import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

function Header({image}) {
  return (
     <HeaderStyled>
          <Avatar src={image}/>
          <FontAwesomeIcon icon={faBell} color='#0582CA' size='2x'/>
          <Button size='large'variant='text'>Sair</Button>
     </HeaderStyled>
  );
}

export default Header;