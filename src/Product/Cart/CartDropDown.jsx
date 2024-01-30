import React from 'react';

export const CartDropDown = ({cartItem, closeDropDown, clearCart}) => {


  return (
    <>
    <div className='cart-dropdown'>
      {cartItem.length === 0 ? (
        <p>No items in cart</p>
      ): (
        <div>{cartItem.map((item)=>{
          return(
            <>
            <div key={item.id}>{item.name}</div>
            <p>${item.basePrice}</p>
            </>
            )
        })}</div>
      )}
    </div>
    
    {cartItem.length > 0 && (
      <>
      <button onClick={closeDropDown}>Close</button>
      <button onClick={clearCart}>Clear</button>
      </>
    )}
    </>

  )
}
