import React from 'react';
import './Paginate.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Pagination = ({postsPerPage, totalPost, paginate, previousPage, nextPage, currentPage}) => {

    const pageNumber =[];

    for (let i = 1; i < Math.ceil(totalPost / postsPerPage); i++) {
    pageNumber.push(i);
    
    }
    


  const renderPage = () =>{
    return (
        <>
        <div className="pages">
            <div className='pagination'>
              <button onClick={previousPage} disabled={currentPage === 1} className='page-number'><IoIosArrowBack /></button>

              <div className="page-digit">
                {pageNumber.map((numbers)=>{
                  return (
                    <a key={numbers} onClick={() => paginate(numbers)} className={numbers === currentPage ? 'active' : 'inactive'}>{numbers}</a>
                  )
                })}
              </div>
              <button onClick={nextPage} disabled={currentPage === pageNumber.length}><IoIosArrowForward /></button>
            </div>
        </div>
        </>
    )
  }

  return (
    <div>{renderPage()}</div>
  )
}
