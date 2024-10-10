import Carousel from 'react-bootstrap/Carousel'
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

function Home(){
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
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

    const apiURL = 'http://localhost:3050/products';
    const[data, setData] = useState([]);
    useEffect(()=>{
        fetch(apiURL)
        .then(res=>res.json())
        .then(res=>setData(res))
    },[])

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
              navigate('/login'); // Redirect to login page
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

    function formattedProducts(type,idx){
        return data
        .filter((product) => product.ProductType === type)
        .slice(0, idx)
        .map((i) => (

        <>
        <div className="col-sm-6 col-md-6 col-lg-4 my-4"> 
            <div className="card bg-body-white rounded-4 border border-dark">
                <div className="row no-gutters">
                    <div className="col-5 col-md-4">
                        <img className="card-img rounded-4 ps-2 pt-2" src={i.images[0]} height={180} style={i.ProductType === "laptop" ? { height: "110px" , width:"130px", marginTop:"10px"} : {}}/>
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
        </>
        ));
    };

  

    if (!user) {
        return <div>Loading...</div>;
    } 

    return(
        <> 
            <div className='row p-2'>
                <div className='mt-3'>
                <Carousel fade autoPlay={true} interval={2000} controls={false} indicators={false} data-bs-theme="dark" className='rounded-4 border-dark border'>
                    <Carousel.Item>
                    <img className="d-block img img-fluid rounded-4" src={require('../assets/iphone_16.png')}/>
                    </Carousel.Item>
                    
                    <Carousel.Item>
                    <img className="d-block img img-fluid rounded-4" src={require('../assets/s24_ultra.png')}/>
                    </Carousel.Item>

                    <Carousel.Item>
                    <img className="d-block img img-fluid rounded-4" src={require('../assets/macbook_m3.png')}/>
                    </Carousel.Item>

                    <Carousel.Item>
                    <img className="d-block img img-fluid rounded-4" src={require('../assets/galaxy_book4.png')}/>
                    </Carousel.Item>

                    <Carousel.Item>
                    <img className="d-block img img-fluid rounded-4" src={require('../assets/pixel_9pro.png')}/>
                    </Carousel.Item>            
                </Carousel>
                </div>
            </div> 

            <div className='row bg-body-secondary rounded-4 border border-dark m-2'>
                <div className='d-flex rounded-4 justify-content-start'><h4 className='bg-secondary text-white rounded-5 mt-2 badge'>Mobiles</h4></div>
                <div className='row'>
                    {formattedProducts('mobile',10)}
                </div>
            </div>
            <div className='row bg-body-secondary rounded-4 border border-dark m-2 my-3'>
                <div className='d-flex rounded-4 justify-content-start'><h4 className='bg-secondary text-white rounded-5 mt-2 badge'>Foldables</h4></div>
                <div className='row'>
                    {formattedProducts('foldable',10)}
                </div>
            </div>
            <div className='row bg-body-secondary rounded-4 border border-dark m-2 my-3'>
                <div className='d-flex rounded-4 justify-content-start'><h4 className='bg-secondary text-white rounded-5 mt-2 badge'>Laptops</h4></div>
                <div className='row'>
                    {formattedProducts('laptop',10)}
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

export default Home;