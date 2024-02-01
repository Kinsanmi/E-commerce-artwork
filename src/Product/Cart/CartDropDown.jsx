import React from 'react';
import './CartDropDown.css';
import { BsCurrencyDollar } from "react-icons/bs";
import { IoClose } from "react-icons/io5";


export const CartDropDown = ({cartItem, closeDropDown, clearCart}) => {


  return (
    <>
    <div className="setup">
      <div className='cart-dropdown'>
        {cartItem.length === 0 ? (
          <p>No items in cart</p>
        ): (
          <div className='items-added'>{cartItem.map((item)=>{
            return(
              <>
              <div className="item-row">
                <div className='text'>
                  <h3 key={item.id}>{item.name}</h3>
                  <h5><BsCurrencyDollar className="currency" />{item.basePrice}</h5>
                </div>
                <div className='item-img'>
                  <img src={item.featuredImage} alt="" />
                </div>
              </div>
              </>
              )
          })}</div>
        )}
      </div>
          <div className="clear-cart">
          {cartItem.length > 0 && (
            <>
            <button className='close-cart' onClick={closeDropDown}><IoClose className="close" /></button>
            <button className='clear' onClick={clearCart}>Clear</button>
            </>
          )}
          </div>
    </div>
    
    
    </>

  )
}
