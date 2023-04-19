import React from 'react'

const AvatarUserProfile = ({children,backgroundColor,px,py,color,borderRadius,fontSize, cursor}) => {

    const style = {
      backgroundColor,
      padding: '10px 50px 70px 30px',
      color: color || 'black',
      borderRadius,
      fontSize,
      textAlign:"center",
      cursor: cursor || null,
      width: '25px',
      height:'25px',
      textDecoration:"none",
      
    }
    return (
      <div style={style}>
          {children}
      </div>
    )
}

export default AvatarUserProfile ;
