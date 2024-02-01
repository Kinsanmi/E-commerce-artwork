import React from 'react';
import '../Samurai/King.css';
import { productData } from '../../Database/Data';

export const Samurai = ({addToCart}) => {

    const detailOnSamurai = () =>{
        return (
            <>
              <section>
                <div className="king-cart">
                  <h2>Samurai King Resting</h2>
                  <button className='btn' onClick={() => addToCart(product.id)}>Add to cart</button>
                </div>

                <div className="puppy">
                  <img src="https://res.cloudinary.com/dkngsthge/image/upload/v1706384250/pexels-evgeny-tchebotarev-2187304_1_1_yvx4qc.png" alt="Samurai king" />
                  <div className="photo">
                    <h4>Photo of the day</h4>
                  </div>
                </div>
                <h6 onClick={() => addToCart(product.id)}>Add to cart</h6>

                <div className="about-king">
                  <div className="detail-king">
                    <h3>About the Samurai King Resting</h3>
                    <div className="detail-text">
                      <h1>Pets</h1>
                      <h4>So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder </h4>
                      <p>text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock.</p>
                    </div>
                  </div>

                  <div className="details">
                    <h3>People also buy</h3>
                    <div className="detail-img">
                      <img src="https://res.cloudinary.com/dkngsthge/image/upload/v1706390451/Rectangle_10_cklw1l.png" alt="" />
                      <img src="https://res.cloudinary.com/dkngsthge/image/upload/v1706390451/Rectangle_10.1_uqjuzu.png" alt="" />
                      <img src="https://res.cloudinary.com/dkngsthge/image/upload/v1706390452/Rectangle_10.2_umlhku.png" alt="" />
                    </div>

                    <div className="detail-size">
                      <h5>Details</h5>
                      <h4>Size: 1020 x 1020 pixel</h4>
                      <p>Size: 15mb</p>
                    </div>
                  </div>
                </div>
              </section>
            </>
        )
    }


  return (
    <>
    {detailOnSamurai()}
    </>
  )
}
