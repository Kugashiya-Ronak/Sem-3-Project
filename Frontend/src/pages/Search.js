import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const { sq } = useParams();

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
    const handleSearch = async () => {
        if (!sq || sq.trim() === '') {
            return <div>No search query provided.</div>;        
        } else {
          setIsLoading(true);
          try {
            const encodedSearchQuery = encodeURIComponent(sq);
            const response = await fetch(`http://localhost:3050/products/search/${encodedSearchQuery}`);
            const result = await response.json();
            setSearchResults(result);
            setIsLoading(false);
          } catch (error) {
            console.error(error);
            setIsLoading(false);
          }
        }
      };
    handleSearch();
  }, [sq]);

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

  var searchData = searchResults?.map((i) => (
    <div className="col-sm-6 col-md-6 col-lg-4 my-4"> 
        <div className="card bg-body-white rounded-4 border border-dark">
            <div className="row no-gutters">
                <div className="col-5 col-md-4">
                    <img className="card-img rounded-4 ps-2" src={i.images[0]} height={180}/>
                </div>
                <div className="col-7 col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{i.Company} {i.ProductName}</h5>
                        <p className="card-text">{i.Ram} | {i.Storage}</p>
                        <p className="card-text">RS. {i.price.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center align-items-center'>
                <Link to={'/products/'+i.ProductID} className='col-5 btn btn-secondary badge rounded-5 m-2'>See Details</Link>
                <button className='col-5 btn btn-secondary badge rounded-5 m-2' onClick={()=>handleAddToCart(i.ProductID)}>Add to cart</button>
            </div>
        </div>
    </div>
  )) 
  
  if (!user) {
    return <div>Loading...</div>;
  } 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!searchResults || searchResults.length === 0) {
    return <div>No results found.</div>;
  }
  
  return(
    <>
        <div className='row bg-body-secondary rounded-4 border border-dark m-2'>
            <div className='d-flex rounded-4 justify-content-start'>
                <Link to='/home' className='btn btn-secondary badge m-2 rounded-5'><i className='bi bi-chevron-left'></i> Back to Home</Link>
            </div>
            <div className='row'>
                {searchData}
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
  )
}

export default Search;
