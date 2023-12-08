import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsonData from "../../data.json";
import "./Cart.css";
import Address from "../Address/Address";


function Cart() {
  const {id}= useParams();
  const [cartData, setCartData] = useState([]);
  const { email } = useParams();
  const [trueaddress, setTrue] = useState(false);
  const [totalCost,setTotalCost] = useState(0);
  
  const change = () => {
    setTrue(!trueaddress);
  };

  function calculateTotalPrice(mrpArray) {
    // const product = jsonData.product.find((item) => item.id === id);
    // console.log(product)
    // const totalCost = mrpArray.reduce((accumulator, currentValue) => {
    //   // Extract the numeric part from the "MRP ₹..." string
    //   const mrpValue = parseFloat(currentValue.mrp.split("₹")[1].replace(/,/g, ""));

    //   // Add the numeric value to the accumulator
    //   return accumulator + mrpValue;
    // }, 0);
    const totalCost=mrpArray.mrp;
    // setTotalCost(totalCost.toFixed(2));
    return totalCost; // Return the total cost rounded to 2 decimal places
  }

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    const product = jsonData.product.find((item) => item.id === id);
    setCartData(product)
    // const username = email?email:"wait";
    // if (username) {
    //   console.log(username);
    //   fetch(`http://localhost:8000/cart?username=${username}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("found", data);
    //       setCartData(data);
    //     })
    //     .catch((error) => console.error("Error fetching cart data:", error));
    // }
  };

  useEffect(()=>{
      const cost=calculateTotalPrice(cartData);
      if(cost>0) setTotalCost(cost);
      console.log("total",totalCost)
  },[cartData])

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      
      <div className="total-price">
        <p>Total Price: ₹{calculateTotalPrice(cartData)}</p>
      </div>
      <div className="cart-item" key={cartData.id}>
            <img src={cartData.img1} alt={cartData.product} className="product-image" />
            <div className="product-details">
              <h3>{cartData.product}</h3>
              <p>Price: {cartData.mrp}</p>
              {/* Add more product details here */}
            </div>
          </div>
      <button className="add-address" onClick={change}>
        Add Address
      </button>
      {trueaddress && (
        
        <div className="address">
        <Address items={cartData} totalPrice={totalCost}/>
        </div>
        
        
        )}
    </div>
  );
}

export default Cart;
