import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function ProductDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [user, setUser] = useState([]);
  const { ProductID } = useParams();

  useEffect(() => {
    fetch('http://localhost:3050/currentusers')
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      })
      .catch((error) => {
        navigate('/login');
      });
  }, []);

  useEffect(() => {
    const apiUrl = `http://localhost:3050/products/${ProductID}`;
    fetch(apiUrl, { method: "GET" })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.error("Error fetching product data:", error));
  }, [ProductID]);


  function handleAddToCart(pid){
    if (user.length === 0) {
        Swal.fire({
            title: 'Please Log In',
            text: 'You must log in to add items to cart',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Log In',
            cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } else {
        const apiURLC = 'http://localhost:3050/cart/'+user[0].UserName+'/'+pid;
        fetch(apiURLC, { method: "POST" })
        .then(res => res.text())
        .then(data => {
            if (data === "Product Added") {
            toast.success(data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className : "rounded-4 border border-dark"
            });
            } else {
            toast.error(data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: "rounded-4 border border-dark"
            });
            }
        })
        .catch(error => console.error(error));
    }
  };

  if (!data || !data.images) return <div>Loading...</div>;

  return (
    <>
    <div class="d-flex justify-content-center align-items-center vh-100 vw-100">
      <div className="container">
        <div className="row mt-5 m-1">
          <div className="col-0 col-md-1"></div>
          <div className="col-12 col-md-10 bg-white rounded-4 border border-dark border-2 p-2">
            <div className="row">
              <div className="col-5 col-md-4 col-lg-3 rounded-4 ">
                <div className="d-flex flex-row flex-nowrap overflow-auto p-3 vc" style={{height:"480px"}}>
                  <div className="row g-4">
                    {data.images.map((image, index) => (
                      <img key={index} src={image} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-7 col-md-8 col-lg-9">
                  <div className="d-flex flex-column h-100">
                    <br/>
                    <h4 class="card-title">{data.Company} {data.ProductName}</h4>
                    <br/>
                    <h6> 
                      CPU - {data.Cpu}<br/><br/>
                      RAM - {data.Ram}<br/><br/>
                      Storage - {data.Storage}<br/><br/>
                      Operating System - {data.OS}<br/><br/>
                      Screen - {data.Screen}<br/><br/>
                      Battery - {data.Battery}<br/><br/>
                    </h6>
                    <div className="mt-auto">
                      <h4>RS. {data.price.toLocaleString()}</h4>
                      <Link to='/home' className='ms-0 btn btn-secondary badge rounded-5 m-2'>Back to Home</Link>
                      <Link to='' className='ms-0 btn btn-secondary badge rounded-5 m-2' onClick={()=>handleAddToCart(data.ProductID)}>Add to cart</Link>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="col-0 col-md-1"></div>
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

export default ProductDetails;