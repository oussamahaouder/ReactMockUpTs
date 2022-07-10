import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function Header() {
  return (
    <Menu>
        <Link to="/"> 
        <Menu.Item name='Home'> Home </Menu.Item> {/* Made a single page react app but i know how to handle links and routs*/ }
        </Link>
        
    </Menu>
  )
}

export default Header