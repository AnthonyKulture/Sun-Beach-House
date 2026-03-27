import React from 'react'
import styled from 'styled-components'

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`

const LogoImage = styled.img`
  height: 28px;
  width: auto;
  object-fit: contain;
`

export const Logo = () => {
  // We use the blue logo as it contrasts well with the default Sanity white background
  return (
    <LogoContainer>
      <img 
        src="/static/logo-sbh-blue.png" 
        alt="Sun Beach House" 
        style={{ height: '28px', width: 'auto', objectFit: 'contain' }} 
      />
    </LogoContainer>
  )
}
