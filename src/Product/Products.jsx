import React from 'react';
import { useState, useEffect } from 'react';
import './style/Product.css';
import { Header } from '../Heading/Header';
import { Samurai } from './Samurai/Samurai';
import { Pagination } from './Pagination';
import { CartDropDown } from './Cart/CartDropDown';

export const Products = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sorting
  const [sort, setSort] = useState('alphabetical');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Cart
  const [cartItems, setCartItems] = useState([]);
  const [cartBadge, setCartBadge] = useState(0);


  // close cart
  const [cartOpen, setCartOpen] = useState(false);


  // notification
  const [notification, setNotification] = useState(null);


  // Filtered by categories
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filteredData, setFilteredData] = useState([]);




  const fetchProduct = async()=>{
    setLoading(true);
    try {
      const results = await fetch(`https://dummyapi.online/api/products`);
      const product = await results.json();
      setData(product);
      console.log(product);
    } catch (error) {
      setError(error.message);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchProduct()
  },[])


  // Cart product
  const addToCart = (productItem) => {
    const addProduct = data.find((item) => item.id === productItem);
    const productCart = cartItems.some(product => product.id === addProduct.id);

    if(!productCart){
      setCartItems(prev => [...prev, addProduct])
      setCartBadge(prevCount => prevCount + 1);

      // show notification
      setNotification(`${addProduct.name} added to cart`)
      setTimeout(()=>{
        setNotification(null);
      },3500)

      setCartOpen(true)
    }else {
      // If product already exist
      setNotification(`${addProduct.name} already exist in cart`)
      setTimeout(() => {
        setNotification(null);
      }, 2500);
    } 

  }



  // Sorting
  const handleChange = (type) => {
    setSort(type);

    const sortedData = [...data];

    if(type === 'alphabetical'){
      sortedData.sort((a,b) => a.name.localeCompare(b.name));
    }else if(type === 'price'){
      sortedData.sort((a,b) => a.basePrice - b.basePrice);
    } else{sortedData.sort((a,b)=>a.productCategory - b.productCategory)}

    setData(sortedData)
  }

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = data && data.slice(indexOfFirstPost , indexOfLastPost);



  // change page
  const paginate = (pageNumber) =>{
  setCurrentPage(pageNumber)
  };

  const previousPage = () =>{
  if(currentPage > 1){
    paginate(currentPage - 1);
  }
  }


  const nextPage = () =>{
    if(currentPage < Math.ceil(data.length / postsPerPage)){
      paginate(currentPage + 1);
    }
  }


  // close cart

  const closeDropDown = () =>{
    setCartOpen(false);
  }

  // Clear cart
  const clearCart = () =>{
    setCartItems([]);
    setCartBadge(0);
    setCartOpen(false);
    console.log("clearing cart...")
  }



  // Select categories

  const categoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if(prevCategories.includes(category)){
        return prevCategories.filter((prevCategory) => prevCategory !== category);
      }else{ return [...prevCategories, category]};
    })

    setCurrentPage(1);
  }

  const filterData = data.filter((productData) => {
    // Filtered by each selected category
    return selectedCategories.length === 0 || selectedCategories.includes(productData.productCategory)
    
  })


  



    const feature = () =>{
        if(loading){
            return (
                <>
                <div className="load">
                    <div className="loading"></div>
                    <div className="loading"></div>
                    <div className="loading"></div>
                </div>
                </>
            )
        }

        if(error){
            return <div> Hmm...something seems to have gone wrong., {error}</div>
        }


        return (
            <>
            <Header cartBadge={cartBadge} openCartDrop={() => setCartOpen(!cartOpen)} cartOpen={cartOpen} />
            {cartOpen && <CartDropDown cartItem={cartItems} closeDropDown={closeDropDown} clearCart={clearCart} />}
            <Samurai addToCart={addToCart} />
            <section>
              <div className="context">
                <div className="premium">
                  <div className="premium-photo">Photography / <span>Premium Photos</span></div>
                  <div className='sort'>
                    <select onChange={(e) => handleChange(e.target.value)} value={sort}>
                      <option disabled >Sort by:</option>
                      <option value="price">Price</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                  </div>
                </div>

                <div className="cat">
                  Category
                  <div>
                    {Array.from(new Set(data.map((product) => product.productCategory))).map((category) => {
                      return (
                        <>
                        <label htmlFor="" key={category}>
                        <input type="checkbox" value={category} checked={selectedCategories.includes(category)} onChange={() => categoryChange(category)} />
                        {category}
                       </label>
                        </>
                      )
                    })}
                  </div>
                </div>

                <div className="seller">
                  {filterData && filterData.map((product, i)=>{
                      return (
                        <>
                        <div key={i} className="sales">
                          <div className="deals">
                            {product.productCategory}
                          </div>
                          <div>{product.name}</div>
                          <h2>{product.basePrice}</h2>
                          {/* <img src={product.featuredImage} alt={product.thumbnailImage} /> */}
                          <h4>{product.storageOptions.join(', ')}</h4>
                          <button onClick={() => addToCart(product.id)}>Add to cart</button>
                        </div>

                        </>
                          )
                    })}
                </div>

                {/* Logic for displaying pagination */}
                <Pagination 
                postsPerPage={postsPerPage}
                totalPost={data.length}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
                currentPage={currentPage}
                />

              </div>
            </section>
            </>
        )
    }

  return (
    <>
    {feature()}
    {notification && <div>{notification}</div>}
    </>
  )
}
