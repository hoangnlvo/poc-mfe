import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce'
import styled from 'styled-components'
import {ScrollObserver} from 'portal/lists'
import TopBar from './top-bar';
import { ThemeProvider } from 'styled-components';
import theme from 'portal/theme'
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  background-color: ${({theme}) => theme.colors.bg.default};

  * {
    box-sizing: border-box;
    font-family: Poppins;
    letter-spacing: 0.75px;
  }
`

const Container = styled.div`
  padding: 0px;
  background-color: transparent;
  margin: ${({theme}) => `${(theme.spacing.doubleGutterSize * 2) - 2}px
    ${theme.spacing.doubleGutterSize * 2}px ${theme.spacing.tripleGutterSize * 2}px`};
`

const DEBOUNCE_WAITING_TOGGLE_REACHED_STATE_CHANGE_IN_MS = 300

const TestManagementLayout = ({children}) => {
//   constructor(props) {
//     super(props)

//     this.state = {
//       isBottomReached: false
//     }
//     this._wrapperRef = null

//     this._setBottomReached = debounce(
//       this._setBottomReached, DEBOUNCE_WAITING_TOGGLE_REACHED_STATE_CHANGE_IN_MS
//     )
//   }
  const [isBottomReached, setIsBottomReached] = useState(false)
  let wrapperRef = useRef(null)

  const _setBottomReached = (value) => {
    setIsBottomReached(!!value)
  }

  const setWrapperRef = (ref) =>{
      wrapperRef = ref;
  }

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <ScrollObserver
                    toggleMode
                    innerRef={setWrapperRef}
                    onBottomReached={_setBottomReached}>
                <Wrapper>
                    <TopBar />
                    <Container>
                        <Routes>
                            <Route path='/test-management/test-cases'
                                element={<div>hello from test cases</div>}/>
                        </Routes>
                    </Container>
                </Wrapper>
                </ScrollObserver>
            </ThemeProvider>
        </BrowserRouter>
    )

}

TestManagementLayout.propTypes ={
    children: PropTypes.any,
}

export default TestManagementLayout