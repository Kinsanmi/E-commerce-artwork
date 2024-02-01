import React from 'react';
import { useState, useEffect } from 'react';
import './style/Product.css';
import { Header } from '../Heading/Header';
import { Samurai } from './Samurai/Samurai';
import { Pagination } from './Pagination';
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { BsCurrencyDollar, BsFilterSquare } from "react-icons/bs";
import { Filter } from './Filter';


export const Products = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sorting
  const [sort, setSort] = useState('price');

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
  const [priceRange, setPriceRange] = useState({min: 0, max: Infinity})


  // Mobile filter
  const [filterModal, setFilterModal] = useState(false);

  const toggleFilter = () =>{
    setFilterModal(!filterModal)
  }



  // Api fetch request

  const fetchProduct = async()=>{
    setLoading(true);
    try {
      const results = await fetch(`https://dummyapi.online/api/products`);
      const product = await results.json();
      setData(product);
      console.log(product);
    } catch (error) {
      setError(`No connection`);
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
      setCartItems([...cartItems, addProduct])
      setCartBadge(cartBadge + 1);

      setCartOpen(true);

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


  // Store items in cart
  useEffect(()=>{
    setCartItems(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []);
  },[])


  useEffect(() =>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  },[cartItems])



  // Sorting
  const handleChange = (type) => {
    setSort(type);

    const sortedData = [...data];

    if(type === 'alphabetical'){
      sortedData.sort((a,b) => a.name.localeCompare(b.name));
    }else if(type === 'price'){
      sortedData.sort((a,b) => a.basePrice - b.basePrice);
    }

    setData(sortedData)
  }

  


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

    setNotification("Cart Cleared");
    setTimeout(() =>{
      setNotification('')
    },2500);
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


  // Filtered by each selected category and price
  const filterData = data.filter((productData) => {
    const categoryMatch =  selectedCategories.length === 0 || selectedCategories.includes(productData.productCategory);

    const priceChecked = priceRange.min !== 0 || priceRange.max !== Infinity;

    const priceMatch = (priceChecked && productData.basePrice >= priceRange.min && productData.basePrice <= priceRange.max ) || !priceChecked;

    console.log(`Product:`,productData.name, 'Price range:', priceMatch);

    return categoryMatch && priceMatch;
    
  })

  const priceChange = (min, max) => {
    setPriceRange({min:Number(min), max:Number(max)});
  }

  
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = filterData && filterData.slice(indexOfFirstPost , indexOfLastPost);




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
            return(
              <>
              <div className="error">
                <div className="error-state">
                  <img src="https://media.istockphoto.com/id/1320496766/vector/no-wifi-area-sing-isolate-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=DtWj62XGCHgKdp5i0akfxnbI4K8w0PsBKaef-7xt88s=" alt="No internet" />
                  <h3>Something seems to have gone wrong.<br />{error}</h3>
                </div>
              </div>
              </>
            ) 
        }


        return (
            <>
            <Header 
            cartBadge={cartBadge} 
            openCartDrop={() => setCartOpen(!cartOpen)} 
            cartOpen={cartOpen}
            cartItem={cartItems} 
            closeDropDown={closeDropDown} 
            clearCart={clearCart}
            setCartItems={setCartItems}

            />

            {/* {cartOpen && <CartDropDown cartItem={cartItems} closeDropDown={closeDropDown} clearCart={clearCart} />} */}
            <Samurai addToCart={addToCart}/>
            <section>
              <div className="context">
                <div className="premium">
                  <div className="premium-photo">Photography /<span>Premium Photos</span></div>
                  {/* Filter modal */}
                  <div className="filter-content" onClick={toggleFilter}>
                  <BsFilterSquare className="filter-icon" size={24} />
                  {filterModal && <Filter 
                  closeModal={() => setFilterModal(false)}
                  selectedCategories={selectedCategories}
                  categoryChange={categoryChange}
                  priceChange={priceChange}
                   />}
                  </div>
                  
                  <div className='sort'>
                    <div className="sort-by"><IoIosArrowRoundUp /><IoIosArrowRoundDown />sort by</div>
                    <select className='sorting' onChange={(e) => handleChange(e.target.value)} value={sort}>
                      <option value="price" defaultChecked>Price</option>
                      <option value="alphabetical">Alphabetical</option>
                    </select>
                  </div>
                </div>

                <div className="category">
                  <div className="cat">
                    <div className="categories">
                      <h3>Category</h3>
                      <div className='cat-list'>
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
                

                  <div className="seller">
                    <div className="seller-style">
                    {currentPost && currentPost.map((product, i)=>{
                        return (
                          <div className='seller-type'>
                            <div key={i} className="sales">
                                <div className="product-img">
                                  <img src={product.featuredImage} alt="" />
                                </div>
                                <div className="deals">
                                    <h4>Brand: {product.brand}</h4>
                                    <div className="name">
                                      <h1>{product.name}</h1>
                                      <p><BsCurrencyDollar className="currency" />{`${product.basePrice}`}</p>
                                      <h4>{product.storageOptions.join(', ')}</h4>
                                    </div>

                                  <div className="stock">
                                    <h2>{product.inStock}</h2>
                                    <span>Stock:{product.stock}</span>
                                  </div>
                                </div>
                                
                            </div>
                            <button onClick={() => addToCart(product.id)}>Add to cart</button>
                          </div>
                            )
                      })}
                    </div>
                    <Pagination 
                    postsPerPage={postsPerPage}
                    totalPost={data.length}
                    paginate={paginate}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    currentPage={currentPage}
                    />
                  </div>
                </div>

                {/* Logic for displaying pagination */}
               

              </div>
              {notification && <div className='notify'>{notification}</div>}
            </section>
            </>
        )
    }

  return (
    <>
    {feature()}
    </>
  )
}
