import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import Preview from './preview';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        font-family: 'Nunito', sans-serif;
    }

    body {
        /* background: #2a2a2a; */
    }

    ::-webkit-scrollbar {
        width: 4px;
        height: 0;
    }

    ::-webkit-scrollbar-track {
        background: none;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
    }

    ::-webkit-scrollbar-button {
        background: none;
        width: 0;
        height: 0;
    }

    ::-webkit-scrollbar-corner {
        background: none;
    }
`;

render(
    <Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <Preview />
        </ThemeProvider>
    </Fragment>,
    document.getElementById('root')
);
