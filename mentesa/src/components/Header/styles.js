import {Notifications} from '@mui/icons-material';

import styled from "styled-components";

export const HeaderStyled = styled.header`
     grid-area: HD;

     background-color: #F8F7FF;

     width: auto;

     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content:flex-end;

     gap: 36px;

     padding: 0 16px 0 0;

     border: 1px solid rgba(0, 0, 0, 0.14);
     box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
`

export const Avatar = styled.img`
     height: 45px;
     width: 45px;
     margin-right: 30px;
     margin-top: 2px;
     border-radius: 50%;
`