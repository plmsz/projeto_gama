import React from 'react';

import { Container } from './styles';

function Panel(props) {
  return(
     <Container>
          {props.children}
     </Container>
  );
}

export default Panel;