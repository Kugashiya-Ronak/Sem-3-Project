import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Account() {
  const [showError, setShowError] = useState(false);
  const apiURL = 'http://localhost:3050/currentusers';
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((res) => setUser(res))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setShowError(true);
      });
  }, []);

  if (user.length === 0) {
    navigate('/login');
  } else {
    const ans = user[0];

    const handleSignOut = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be signed out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, sign out!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          const apiURL = 'http://localhost:3050/currentusers/' + ans.UserName;
          fetch(apiURL, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => navigate("/login"));
        }
      });
    };

    return (
      <>
        {showError && (
          <div className="alert alert-danger">
            Failed to fetch user data. Please try again.
          </div>
        )}
        <div class="d-flex justify-content-center align-items-center vh-100 vw-100">
        <div className='container'>
          <div className='row m-1'>
            <div className='col-0 col-md-3'></div>
            <div className='col-12 col-md-6 border border-dark rounded-4'>
              <div className='row bg-body-secondary p-3 rounded-top-4'>
                <div className='h4 mb-4 text-center rounded border border-dark d-flex'>
                  <div className='col-2 d-flex'>
                    <h5 className='mt-1'>
                      <Link to='/home' className='btn btn-secondary badge rounded-5 text-decoration-none'>
                        <i className='bi bi-chevron-left'></i>Back
                      </Link>
                    </h5>
                  </div>
                  <div className='col-8'> User Details </div>
                </div>
                <div className='text-center p-2 mb-3'>
                  <img
                    className='img img-fluid rounded-4 border border-dark'
                    src={require('../assets/z_profile_picture.webp')}
                    style={{ width: '130px', height: '130px' }}
                  ></img>
                </div>
                <span className='col-md-4 h4'>Username</span>
                <span className='col-md-8 border border-dark rounded h4'>{ans.UserName}</span>
              </div>
              <div className='row bg-body-secondary p-3'>
                <span className='col-md-4 h4'>Password</span>
                <span className='col-md-8 border border-dark rounded h4'>{ans.Password}</span>
              </div>
              <div className='row bg-body-secondary p-3'>
                <span className='col-md-4 h4'>Email</span>
                <span className='col-md-8 border border-dark rounded h4'>{ans.UserEmail}</span>
              </div>
              <div className='row bg-body-secondary p-3 rounded-bottom-4'>
                <Link to='/account/edituser' className='col btn btn-secondary m-2'>
                  Edit
                </Link>
                <button className='col btn btn-secondary m-2' onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
            <div className='col-0 col-md-3'></div>
          </div>
        </div>
        </div>
      </>
    );
  }
}

export default Account;