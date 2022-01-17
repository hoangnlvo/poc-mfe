import React from 'react'
import PropTypes from 'prop-types';
import get from 'lodash/get'
import noop from 'lodash/noop'
import trim from 'lodash/trim'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {MENU} from '../constants'
import Header from './header'
import MenuItem from './menu-item'
import { useLocation } from 'react-router';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: sticky;
  top: 0px;
  background-color: ${({theme}) => theme.colors.white};
  z-index: 16;
`

const MenuWrapper = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({theme}) => theme.colors.lightBorder};
  position: relative;
  margin: unset;
  padding: 0 ${({theme}) => theme.spacing.gutterSize * 2}px;
  height: 48px;
  align-items: center;
`

const TopBar = () => {
  const handleClickMenu = (e) => {
    e.preventDefault()
  }
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <Wrapper>
      <Header/>
      <MenuWrapper>
        {MENU.map(({label, to, key}) => {

          const trimPathName = trim(currentPath, '/')
          const trimRoute = trim(to, '/')
          const isActiveCurrentTab = trimPathName === trimRoute

          const paths = trimPathName.split('/')
          const currentKey = get(paths, 1, '')

          const onClickAction = isActiveCurrentTab ? handleClickMenu : noop

          return (
            <Link
              onClick={onClickAction}
              to={to}
              key={key}>
              <MenuItem
                selected={currentKey === key}
                label={label} />
            </Link>
          )
        })}
      </MenuWrapper>
    </Wrapper>


  )
}



export default TopBar
