import React from 'react';

export const Filter = ({closeModal, categoryChange, selectedCategories, priceChange}) => {
  return (
    <section>
      <div>
        <div className="filter-content">
          <span onClick={closeModal}>
            <h2>Filter</h2>
            <div className="cat">
              <div className="categories">
                <div className='cat-list'>
                  {Array.from(new Set(data.map((product) => product.productCategory))).map((category) => {
                    return (
                      <>
                      <label htmlFor={category} key={category}>
                      <input id={category} type="checkbox" value={category} checked={selectedCategories.includes(category)} onChange={() => categoryChange(category)} />
                      {category}
                    </label>
                      </>
                    )
                  })}
                </div>
              </div>
                      

              <div className="price-range">
                <h3>Price range</h3>
                <div className='price-list'>
                  <label>
                    <input 
                    type="checkbox" 
                    value="0-500"
                    onChange={() => priceChange(0,400)}
                    />
                    <span className='check-label'>Lower than $500</span>
                  </label>
                  <label>
                    <input 
                    type="checkbox" 
                    value="0-500"
                    onChange={() => priceChange(500,800)}
                    />
                    <span className='check-label'>$500-$800</span>
                  </label>
                  <label>
                    <input 
                    type="checkbox" 
                    value="500-1000"
                    onChange={() => priceChange(800,1000)}
                    />
                    <span className='check-label'>$500-$1000</span>
                  </label>
                  <label>
                    <input 
                    type="checkbox" 
                    value="1000-2000"
                    onChange={() => priceChange(1000,2000)}
                    />
                    <span className='check-label'>More than $1000</span>
                  </label>
                </div>
              </div>
            </div> 
          </span>
        </div>
      </div>
    </section>
  )
}
