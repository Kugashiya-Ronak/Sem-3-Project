import React, { useState,useEffect } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Layout(props){
    const navigate = useNavigate();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);    
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const [searchQuery, setSearchQuery] = useState('');

    const [user, setUser] = useState([]);
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


      function handle(txt,nav){
        if (user.length === 0 ) {
            Swal.fire({
                title: 'Please Log In',
                text: txt,
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
            navigate(nav);
        }
    }

    const handleSearch = () => {
        navigate(`/home/search/${searchQuery}`);
      };

    return(
        <>  
            <div className='row d-flex justify-content-center'>
            <nav className='navbar bg-white navbar-expand-lg rounded-4 border border-dark position-fixed m-3' style={{width:'98%', zIndex:"9999"}}>
                <div className='container-fluid'>
                    <Link to='/home' className='navbar-brand'><img src={require('../assets/kr_sales_white.png')} width={130} height={40}/></Link>
                    
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded={!isNavCollapsed ? true : false} aria-label='Toggle navigation' onClick={handleNavCollapse}>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id='navbarNavAltMarkup'>
                        <div className='navbar-nav ms-auto'>   
                            <div className='input-group me-3'>
                                <input className="form-control bg-body-tertiary search rounded-start-4 border-dark" type="search" placeholder="Search for a product...." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                <button className='btn btn-outline-secondary rounded-end-4 border-dark' onClick={handleSearch}><i className='bi bi-search'></i></button>
                            </div>
                            <button className='btn badge text-decoration-none text-secondary d-flex me-3' onClick={()=>handle('You must log in to access profile','/account')}><div className='h5 my-auto me-2'>Profile</div><i className='bi bi-person-circle h5 my-auto' style={{fontSize : "25px"}}></i></button>
                            <button className='btn badge text-decoration-none text-secondary d-flex' onClick={()=>handle('You must log in to access cart', '/cart')}><div className='h5 my-auto me-2'>Cart</div><i className='bi bi-cart-fill h5 my-auto me-4' style={{fontSize : "25px"}}></i></button>
                            <button className='btn badge text-decoration-none text-secondary d-flex' onClick={()=>handle('You must log in to access Orders', '/orders')}><div className='h5 my-auto me-2'>Orders</div></button>
                            {/* <span className='text-decoration-none text-secondary d-flex me-1'><i className='bi bi-moon-fill h5 mt-2'  style={{fontSize : "22px"}}></i></span> */}
                        </div>  
                    </div>
                </div>
            </nav>
            </div>
    

            <div className="row-sm-3 p-3" style={{ marginTop: '90px' }}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout;