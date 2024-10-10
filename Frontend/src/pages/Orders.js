import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
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
  
    if (!user) return <div>Loading...</div>;
     else { 
        const formattedCart = data.HistoryProducts?.map((product) => {
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
                                        <p className="card-text">Purchased on : {product.purchaseDate}</p>
                                    </div>
                                </div>
                                <div className='col-4 col-lg-4 d-flex justify-content-center align-items-center'>
                                    <div className='text-center justify-content-center align-items-center p-2'>
                                        <div><h6 className='text-center'>RS. {product.price.toLocaleString()}</h6></div>
                                        <div className='bg-secondary badge rounded-5 my-2'>Quantity : {product.quantityPurchased}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>  
                </>
            )
            
        })
        
        const totalPrice = data.HistoryProducts?.reduce((tot, items) => {
            const price = parseFloat(items.price);
            const quantity = parseInt(items.quantityPurchased || 1);
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
                        <h3 className='col-8 my-auto text-secondary'>Orders</h3>
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
                        ) : data.HistoryProducts && data.HistoryProducts.length > 0 ? (
                            <div className='d-flex p-3 rounded-4 justify-content-end'>
                                <h4 className='bg-secondary badge m-2 rounded-5'>
                                    Total : {isNaN(totalPrice) ? '0' : totalPrice.toLocaleString()}
                                </h4>
                            </div>
                        ) : (
                            <div className='d-flex p-3 rounded-4 justify-content-end'>
                            <h5 className='text-secondary'>No Products</h5>
                            </div>
                        )
                    }
                </div>  
                <div className='col-0 col-md-2'></div>
            </div>
            </div>
        </div>
        </>
        );
    }
}


export default Orders;