import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import {Transition, Easing} from '@kobiton/core-react/v2/services/animation'

const Menu = styled.li.attrs({
  className: 'kobiton-org-menu'
})`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 12px ${({theme}) => theme.spacing.gutterSize * 2}px;
  font-size: ${({theme}) => theme.font.size.default}px;
  line-height: ${({theme}) => theme.font.lineHeight.tiny};
  font-weight: 600;
  color: ${({theme}) => theme.colors.grayscale.placeholder};
  cursor: pointer;
  will-change: color;
  ${Transition.all(0.3, Easing.SineOut)};
  position: relative;

  &:hover {
    color: ${({theme}) => theme.colors.primary.normal};
    ${Transition.all(0.3, Easing.SineOut)};
  }

  &.active {
    color: ${({theme}) => theme.colors.primary.normal};
  }
`

const Item = styled.span`
  text-align: center;
  line-height: 16px;
`

const MenuItem = ({selected, label, icon}) => {

  return (
    <Menu className={selected ? 'active' : ''}>
      {icon && <span>{icon}</span>}
      <Item>{label}</Item>
    </Menu>
  )
}

MenuItem.propTypes = {
  selected: PropTypes.bool,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object
}

MenuItem.defaultProps = {
  icon: null,
  selected: false
}

export default MenuItem
