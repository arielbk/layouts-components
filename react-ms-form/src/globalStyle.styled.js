import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e5e5e5;
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #757575;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: #2b2f30;
  }
`;

export default GlobalStyle;