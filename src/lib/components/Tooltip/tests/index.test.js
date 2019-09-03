import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Tooltip, { Target, Tip } from '../index'
import { styles } from '../../../theme'

describe('<Tooltip />', () => {
  it('should render and match the snapshot', () => {
    const { container: { firstChild } } = render(<Tooltip content='message'>TEST</Tooltip>)
    expect(firstChild).toMatchSnapshot()
  })
})

describe('<Target /> styled component', () => {
    it('should have display: inline-block;', () => {
      const tree = renderer.create(<ThemeProvider theme={styles}><Target /></ThemeProvider>).toJSON()
      expect(tree).toHaveStyleRule('display', 'inline-block')
    })
  })

describe('<Tip /> styled component', () => {
  it('should have max-width: 300px; max-height: 150px', () => {
    const tree = renderer.create(<ThemeProvider theme={styles}><Tip /></ThemeProvider>).toJSON()
    expect(tree).toHaveStyleRule('max-width', '300px')
    expect(tree).toHaveStyleRule('max-height', '150px')
  })
})