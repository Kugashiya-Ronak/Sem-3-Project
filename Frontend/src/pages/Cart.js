import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [data, setData] = useState({});
    const [cartQuantities, setCartQuantities] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://localhost:3050/currentusers')
        .then((res) => res.json())
        .then((res) => {
          setUser(res);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          navigate('/login');
        });
    }, []);
  
    useEffect(() => {
      if (!isLoading && user.length > 0 && user[0].UserName) {
        const apiURLC = 'http://localhost:3050/cart/' + user[0].UserName;
        fetch(apiURLC)
          .then((res) => res.json())
          .then((res) => {
                setData(res);
                const quantities = {};
                res.CartProducts.forEach((product) => {
                    quantities[product.ProductID] = 1;
                });
                setCartQuantities(quantities);
            });
      } else if (!isLoading && user.length === 0) {
        navigate('/login');
      }
    }, [user, isLoading]);
    


    const handleQuantityChange = (productID, operation) => {
        const updatedQuantities = { ...cartQuantities };
        if (operation === 'increment') {
          updatedQuantities[productID] += 1;
        } else if (operation === 'decrement' && updatedQuantities[productID] > 1) {
          updatedQuantities[productID] -= 1;
        }
        setCartQuantities(updatedQuantities);
      };

      const handleBuyAll = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure, you want to checkout!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Checkout',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDone();
            }
        });
        };
        
      const handleDone = async () => {
        const cartProducts = data.CartProducts.map((product) => ({
          ...product,
          quantityPurchased: cartQuantities[product.ProductID],
        }));
      
        const today = new Date().toLocaleString();
      
        const orderData = {
          date: today,
          products: cartProducts,
        };
      
        try {
          const response = await fetch(`http://localhost:3050/history/${user[0].UserName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });
      
          const result = await response.json();
          window.location.href = '/cart?orderPlaced=true';
            
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('orderPlaced') === 'true') {
          toast.success('Order placed successfully!', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'rounded-4 border border-dark',
          });
      }
      },[]);

      useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('productRemoved') === 'true') {
          toast.success('Product removed from cart!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "rounded-4 border border-dark",
          });
        }
      }, []);
      
      
    if (!user) return <div>Loading...</div>;
     else { 
        const formattedCart = data.CartProducts?.map((product) => {
            return(
                <>
                    <div key={product.ProductID}>
                    <div className='my-2'> 
                        <div className="card bg-white rounded-4 border border-dark">
                            <div className="row no-gutters">
                                <div className="col-3 col-lg-2 d-flex justify-content-center align-items-center">
                                    <img className="card-img rounded-4 ps-3" src={product.images[0]} height={100} style={{width:"100px"}}/>
                                </div>
                                <div className="col-5 col-lg-6">
                                    <div className="card-body">
                                        <h6 className="card-title">{product.Company} {product.ProductName}</h6>
                                        <p className="card-text">{product.Ram} | {product.Storage}</p>
                                    </div>
                                </div>
                                <div className='col-4 col-lg-4 d-flex justify-content-center align-items-center'>
                                    <div className='text-center justify-content-center align-items-center p-2'>
                                        <div><h6 className='text-center'>RS. {product.price.toLocaleString()}</h6></div>
                                        <div className='input-group'>
                                            <button className='btn btn-secondary btn-sm  rounded-start-5 badge' onClick={() => handleQuantityChange(product.ProductID, 'decrement')}>-</button>
                                            <span className='px-1 bg-secondary text-white'>{cartQuantities[product.ProductID]}</span>
                                            <button className='btn btn-secondary btn-sm  rounded-end-5 badge' onClick={() => handleQuantityChange(product.ProductID, 'increment')}>+</button>
                                        </div>
                                        <div>
                                            <button
                                                className='btn btn-secondary badge rounded-5 my-2 me-3'
                                                onClick={() => {
                                                    const apiURLC = 'http://localhost:3050/cart/' + user[0].UserName + '/' + product.ProductID;
                                                    fetch(apiURLC, { method: "DELETE" })
                                                    .then(res => res.text())
                                                    .then(data => {
                                                        if (data === "Product Removed") {
                                                        window.location.href = '/cart?productRemoved=true'; // Redirect with query parameter
                                                        }
                                                    })
                                                    .catch(error => console.error(error));
                                                }}
                                                >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>  
                </>
            )
            
        })
        
        const totalPrice = data.CartProducts?.reduce((tot, items) => {
            const price = parseFloat(items.price);
            const quantity = parseInt(cartQuantities[items.ProductID] || 1);
            return tot + (price * quantity);
          }, 0);

        return (
        <>
        <div class="d-flex justify-content-center align-items-center vh-100 vw-100">
            <div className='container-fluid'>
            <div className='row m-1'>
                <div className='col-0 col-md-2'></div>
                <div className='col-12 col-md-8 pt-3 bg-body-secondary border border-dark rounded-4'>
                    <div className='p-2 d-flex bg-white border border-dark rounded-4'>
                        <Link to='/home' className='text-decoration-none rounded-5 h5 my-auto'>
                            <i className='bi bi-chevron-left'></i>
                        </Link>
                        <h3 className='col-8 my-auto text-secondary'>Cart</h3>
                        <Link to='/account' className='col rounded-4 text-decoration-none d-flex align-items-center'>
                            {/* <img src={require('../assets/z_profile_picture_tp.png')} width={70} className='rounded-4 my-auto ms-auto'/> */}
                            <h5 className='text-secondary my-auto ms-auto'>{data.UserName}</h5>
                            {/* <h4 className='text-secondary my-auto ms-auto'><i class="bi bi-chevron-right"></i></h4> */}
                        </Link>
                    </div>
                    {data.CartProducts && (
                    <div className='row my-2 rounded-4 d-flex flex-row flex-nowrap overflow-auto vc' style={{height:"400px"}}>
                       <div>{formattedCart}</div>
                    </div>
                    )}
                    {
                        isLoading ? (
                            <div className='d-flex p-3 rounded-4 justify-content-end'>
                            <h5 className='text-secondary'>Loading...</h5>
                            </div>
                        ) : data.CartProducts && data.CartProducts.length > 0 ? (
                            <div className='d-flex p-3 rounded-4 justify-content-end'>
                            <button
                                className='btn btn-secondary m-2 rounded-5'
                                onClick={handleBuyAll}
                            >
                                Buy RS. {isNaN(totalPrice) ? '0' : totalPrice.toLocaleString()}
                            </button>
                            </div>
                        ) : (
                            <div className='d-flex p-3 rounded-4 justify-content-end'>
                            <h5 className='text-secondary'>Add products to cart to buy</h5>
                            </div>
                        )
                    }

                </div>  
                <div className='col-0 col-md-2'></div>
            </div>
            </div>
        </div>
            <ToastContainer 
            position="bottom-right" 
            autoClose={3000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
            />
        </>
        );
    }
}


export default Cart;