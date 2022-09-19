import { HeaderStyled, Avatar } from './styles'

import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

function Header({ image }) {
  return (
    <HeaderStyled>
      <FontAwesomeIcon icon={faBell} color='#0582CA' size='2x' />
      <Avatar src={image} alt='' referrerPolicy='no-referrer' />
    </HeaderStyled>
  )
}

export default Header
