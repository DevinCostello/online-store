import React, { useState, useContext } from 'react';

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
    //Filter State
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [activeCategory, setActiveCategory] = useState("");
    const [trending, setTrending] = useState("");
    const [discount, setDiscount] = useState("");
    const [activeDiscount, setActiveDiscount] = useState("");
    const [price, setPrice] = useState("");
    const [price2, setPrice2] = useState("");
    const [price3, setPrice3] = useState("");
    const [activePrice, setActivePrice] = useState("");



    //filter functions

    const FilterEqual = (data, key, value) => {
        return data.filter((item) => item[key] === value);
    };

    const FilterBoolean = (data, key) => {
        return data.filter((item) => item[key] === true);
    };

    const FilterLessThan = (data, key, value) => {
        return data.filter((item) => item[key] < value);
    };

    const FilterCompare2 = (data, key, value, value2) => {
        return data.filter((item) => item[key] > value && item[key] < value2);
    };


    // filter toggle functions

    const handleCategory = (e) => {


        if (category === e.currentTarget.dataset.category) {
            setCategory("")
            setActiveCategory("")

        } else {
            setCategory(e.currentTarget.dataset.category)
            setActiveCategory(e.currentTarget.dataset.category)
        }

    }

    const handleTrending = () => {
        if (trending === "") { setTrending(true) }
        else { setTrending("") }
    }

    const handlePrice = (e) => {

        //set one price value for filtering, toggle filter if already active
        if (e.currentTarget.dataset.price_upper === null) {
            setPrice(e.currentTarget.dataset.price_lower)

        }
        if (price === e.currentTarget.dataset.price_lower) {
            setPrice("")
            setActivePrice("")
        } else {
            setPrice(e.currentTarget.dataset.price_lower)
            setActivePrice(e.currentTarget.innerText)
        }

        //reset 2 price filter when filtering for 1 value

        if (price2 !== "" && price3 !== "") {
            setPrice2("");
            setPrice3("");
        }
    }

    const handlePrice2 = (e) => {

        //set 2 price values, toggle if filter already active

        if (price2 === e.currentTarget.dataset.price_lower && price3 === e.currentTarget.dataset.price_upper) {
            setPrice2("")
            setPrice3("")
            setActivePrice("")
        } else {
            setPrice2(e.currentTarget.dataset.price_lower)
            setPrice3(e.currentTarget.dataset.price_upper)
            setActivePrice(e.currentTarget.innerText)
        }

        //toggle 1 price filter when filtering for 2 prices

        if (price !== "") {
            setPrice("");
        }


    }

    const handleDiscount = (e) => {

        if (discount === parseInt(e.currentTarget.dataset.discount)) {
            setDiscount("")
            setActiveDiscount("")
        } else {
            setDiscount(parseInt(e.currentTarget.dataset.discount))
            setActiveDiscount(parseInt(e.currentTarget.dataset.discount))
        }
    }

    const resetFilters = () => {
        setName("")

        setCategory("")
        setActiveCategory("")

        setPrice("")
        setPrice2("")
        setPrice3("")
        setActivePrice("")

        setTrending("")

        setDiscount("")
        setActiveDiscount("")
    }


    //cart crud functions

    

    const handleDelete = (e) => {

        const id = e.currentTarget.dataset.deleteid
        e.preventDefault();
        fetch(`http://localhost:8000/cart/${id}`,
          {
            method: 'DELETE'       
          }
        )
        alert("Item Deleted From Cart")
      }

    return (
        <GlobalContext.Provider
            value={{
                FilterEqual,
                FilterBoolean,
                FilterLessThan,
                FilterCompare2,
                handleCategory,
                handleTrending,
                handlePrice,
                handlePrice2,
                handleDiscount,
                resetFilters,
                category,
                name,
                price,
                price2,
                price3,
                trending,
                discount,
                setName,
                activeCategory,
                activePrice,
                activeDiscount, 
                handleDelete,

            }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export {GlobalContext, GlobalProvider}