import React from 'react'

const Layout = (props) => {
  return (
    <div className="mx-10 pb-4 max-[800px]:mx-5">
        {props.children}
    </div>
  )
}

export default Layout