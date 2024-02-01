import React, { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../Heading/Header.css';
import { CartDropDown } from '../Product/Cart/CartDropDown';

export const Header = ({cartBadge, openCartDrop,cartOpen,cartItem, closeDropDown, clearCart,setCartItems }) => {

  const [backgroundColor, setBackgroundColor] = useState(false);

  const changeColor = () =>{
    if(window.scrollY > 0){
      setBackgroundColor(true);
    }else { setBackgroundColor(false)}
  }

  useEffect(() =>{
    window.addEventListener("scroll", changeColor);

    return ()=>{
      window.removeEventListener("scroll", changeColor)
    }
  },[])


  

  return (
    <>
    <header className='header'>
        <div className={backgroundColor ? "container open" : "container"}>
            <h3 className="ben">Bejamas_</h3>
            <div className="cart-icon" onClick={() => openCartDrop()}>
              <ShoppingCartOutlinedIcon className='icon' />{cartBadge > 0 && <span>{cartBadge}</span>}
              {cartOpen && <CartDropDown cartItem={cartItem} closeDropDown={closeDropDown} clearCart={clearCart} />}
            </div>       
        </div>
    </header>
    </>
  )
}
