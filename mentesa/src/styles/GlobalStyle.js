import { createGlobalStyle } from 'styled-components/'

const GlobalStyle = createGlobalStyle`
*{
    font-family: Robot, sans-serif;
}

html {
  font-size: 62.5%;
}
body{
    margin: 0;
    box-sizing: border-box;
    padding: 0;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: #F5F5F5;
}
`
export default GlobalStyle
