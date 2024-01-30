import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../Heading/Header.css';

export const Header = ({cartBadge, openCartDrop,cartOpen }) => {
  return (
    <>
    <header className='header'>
        <div className="container">
            <h3 className="ben">Bejamas_</h3>
            <div className="cart-icon" onClick={() => openCartDrop()}><ShoppingCartOutlinedIcon className='icon' />{cartBadge > 0 && <span>{cartBadge}</span>}</div>       
        </div>
        {/* {cartOpen && <div>No item in cart</div>} */}
    </header>
    </>
  )
}
