import React from 'react';


const Pagination = ({ postsPerPage, totalPosts,  activeDealPage, activeTrendingPage }) => {
    
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {

        pageNumbers.push(i);   
    }

    return (
       
            <ul className='pagination'>
                {pageNumbers.map((number)=> (
                    <li key={number} className='page-item'>
                        <div className={activeDealPage === number || activeTrendingPage  === number ? 'page-circle active' : 'page-circle'}></div>
                    </li>
                ))}
            </ul>
        
    )
};

export default Pagination