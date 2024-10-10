import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';

function Signup(){
    const [data,setData] = useState({});
    const navigate = useNavigate();

    return(
        <>
        <div class="d-flex justify-content-center align-items-center vh-100 vw-100">
            <div className='container'>
                <div className='row p-2'>
                    <div className='col-0 col-md-1'></div>
                    <div className='col-12 col-md-10 border border-dark rounded-4'>
                        
                        <div className='row bg-body-secondary p-3 rounded-top-4'>
                            <div className='row d-flex align-items-center justify-content-center'>
                                <img src={require('../assets/kr_sales_white_1.png')} style={{width:"300px"}} height={100}/>
                            </div>
                            <div className='h4 mb-3'>Create Account</div>
                            <span className='col-md-2 border-dark'>Enter Username</span>
                            <input className='col form-control border-dark' id="name"
                            
                                onChange={(e)=>{
                                    setData({...data,UserName: e.target.value})
                                }}type='text' 
                                
                                onBlur={()=>{
                                    var name = document.getElementById('name').value;
                                    var pattern = '^[a-zA-Z0-9!@#$%^&*]{8,12}$';
                                    var regex = new RegExp(pattern);
                                    if(document.getElementById('name').value==''){
                                        document.getElementById('erruname').innerHTML='Please enter username !';
                                    }
                                    else if(document.getElementById('name').value!=''){	
                                        if(regex.test(name)){
                                        }
                                        else{
                                            document.getElementById('erruname').innerHTML='Please enter valid username !';
                                        }
                                    }
                                }} 
                                
                                onFocus={()=>{
                                    document.getElementById('name').addEventListener('focus',()=>{;
                                        document.getElementById('erruname').innerHTML='';
                                    })
                                }} />
                            <span className='bg-warning text-center rounded-2 px-5' id='erruname'></span>
                        </div>


                        <div className='row bg-body-secondary p-3'>
                            <span className='col-md-2 border-dark'>Enter Password</span>
                            <input className='col form-control border-dark' id='pword' type='password'
                            
                            onChange={(e)=>{
                                setData({...data,Password:e.target.value})
                            }} 
                            
                            onBlur={()=>{
                                var password = document.getElementById('pword').value;
                                var pattern = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$';
                                var regex = new RegExp(pattern);
                                if(document.getElementById('pword').value==''){
                                    document.getElementById('errpword').innerHTML='Please enter password !';
                                }
                                else if(document.getElementById('pword').value!=''){
                                    if(regex.test(password)){
                                    }else{
                                        document.getElementById('errpword').innerHTML='Please enter valid password !';
                                    }	
                                }
                            }} 
                            
                            onFocus={()=>{
                                document.getElementById('pword').addEventListener('focus',()=>{;
                                    document.getElementById('errpword').innerHTML='';
                                })	
                            }}/>
                            <span className='bg-warning text-center rounded-2 px-5' id='errpword'></span>
                        </div>
                        
                        
                        <div className='row  bg-body-secondary p-3'>
                            <span className='col-md-2 border-dark'>Repeat Password</span>
                            <input className='col form-control border-dark' type='password' id='rpword' 
                            
                            onBlur={()=>{
                                var rpassword = document.getElementById('rpword').value;
                                if(document.getElementById('rpword').value==''){
                                    document.getElementById('err_r_pword').innerHTML='Please re-enter password !';
                                }
                                else if(document.getElementById('rpword').value!=''){	
                                    if(document.getElementById('pword').value==document.getElementById('rpword').value){
                                    }
                                    else{
                                        document.getElementById('err_r_pword').innerHTML='Both Passwords do not match !';
                                    }
                                }
                            }} 
                            onFocus={()=>{
                                document.getElementById('rpword').addEventListener('focus',()=>{;
                                    document.getElementById('err_r_pword').innerHTML='';
                                })	
                            }}/>
                            <span className='bg-warning text-center rounded-2 px-5' id='err_r_pword'></span>
                        </div>
                        
                        
                        <div className='row  bg-body-secondary p-3'>
                            <span className='col-md-2 border-dark'>Email</span>
                            <input className='col form-control border-dark' type='text' id='email' 

                            onChange={(e)=>{
                                setData({...data,UserEmail:e.target.value})
                            }}

                            onBlur={()=>{
                                var email = document.getElementById("email").value;
                                var pattern = "^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$";
                                var regex = new RegExp(pattern);
                                if(document.getElementById("email").value==""){
                                    document.getElementById("errmail").innerHTML="Please enter email id !";
                                }
                                else if(document.getElementById("email").value!=""){	
                                    if(regex.test(email)){
                                    }
                                    else{
                                        document.getElementById("errmail").innerHTML="Please enter valid email id !";
                                    }
                                }
                            }} 
                            onFocus={()=>{
                                document.getElementById("email").addEventListener('focus',()=>{;
                                    document.getElementById("errmail").innerHTML="";
                                })	
                            }}/>
                            <span className='bg-warning text-center rounded-2 px-5' id='errmail'></span>
                        </div>
                        
                        <div className='row  bg-body-secondary p-3 rounded-bottom-4'>
                            <button className='btn btn-secondary rounded-5' 
                            
                            onClick={()=>{
                                var name = document.getElementById('name').value;
                                var pattern = '^[a-zA-Z0-9!@#$%^&*]{8,12}$';
                                var regex = new RegExp(pattern);
                                if(regex.test(name)){
                                }
                                else{
                                    alert('Username Invalid');
                                    return false;
                                }

                                var password = document.getElementById('pword').value;
                                var pattern = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$';
                                var regex = new RegExp(pattern);
                                if(regex.test(password)){
                                }
                                else{
                                    alert('Password Invalid');
                                    return false;
                                }

                                var rpassword = document.getElementById('rpword').value;
                                if(password==rpassword){
                                }
                                else{
                                    alert('Both Passwords do not match');
                                    return false;
                                }

                                var email = document.getElementById('email').value;
                                var pattern = '^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$';
                                var regex = new RegExp(pattern);
                                if(regex.test(email)){
                                }
                                else{
                                    alert('email Invalid');
                                    return false;
                                }
                                
                                const apiUrl = "http://localhost:3050/users";
                                fetch(apiUrl,{
                                    method:"POST",
                                    body:JSON.stringify(data),
                                    headers:{
                                        "Content-Type":"application/json"
                                    }
                                })
                                .then(res=>res.json())
                                .then(res=>{
                                    navigate('/login')
                                });

                            }}>Create Account</button>
                            <div className='d-flex justify-content-center mt-2'>
                                <div>Already have an account ? <Link to='/login' className='text-decoration-none'>Log In</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-0 col-md-1'></div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Signup 