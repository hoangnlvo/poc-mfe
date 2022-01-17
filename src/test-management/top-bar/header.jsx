import React from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  padding: 20px 40px;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid ${(p) => p.theme.colors.lightBorder};
`

const TextTitle = styled.div`
  font-family: Poppins;
  font-weight: 600;
  font-size: ${({theme}) => theme.font.size.large}px;
`

const Header = () => {
    return (
      <Wrapper>
        <TextTitle>Test Management </TextTitle>
      </Wrapper>
    )
}

export default Header
