import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Preview from './preview';
import theme from './theme';
import { Tooltip, Modal, toast } from './lib';

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

const ROOT: React.ReactElement = (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Preview />
    </ThemeProvider>
  </>
);

const MOUNT_NODE: Element | null = document.getElementById('root');
if (MOUNT_NODE) {
  Tooltip.setRoot(MOUNT_NODE, 'root-tooltip');
  Modal.setRoot(MOUNT_NODE, 'root-modal');
  toast.setRoot(MOUNT_NODE, 'root-toast');
}

render(ROOT, MOUNT_NODE);
