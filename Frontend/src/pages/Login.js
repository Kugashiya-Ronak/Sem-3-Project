import { Link ,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Login(){
    const apiURL = 'http://localhost:3050/users';

    const[data, setData] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetch(apiURL)
        .then(res=>res.json())
        .then(res=>setData(res))
    },[])

    return(
        <>
        <div class="d-flex justify-content-center align-items-center vh-100 vw-100">
            <div className='container'>
                <div className='row p-2'>
                    <div className='col-0 col-md-1'></div>
                    <div className='col-12 col-md-10 border border-dark rounded-4'>
                        
                        <div className='row bg-body-secondary p-3 rounded-top-4'>
                            <div className='row d-flex align-items-center justify-content-center'>
                                <img src={require('../assets/kr_sales_white_1.png')} className='img img-fluid' style={{width:"300px"}} height={100}/>
                            </div>
                            <div className='h4 mb-3'>Log In</div>
                            <span className='col-md-2 border-dark'>Enter Username</span>
                            <input className='col form-control border-dark' type='text' id="name" placeholder='user@123 or user@789 or create a new account'
                            
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
                            <input className='col form-control border-dark' type='password' id='pword' placeholder='user@123 or user@789 or create a new account'
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
                                
                                const ans = data.find((i)=>{
                                    if(i.UserName == name){
                                        return true;
                                    }
                                });
                                
                                if(ans == undefined){
                                    alert("Incorrect username");
                                    return false;
                                }
                                if(ans.UserName == document.getElementById('name').value){
                                    if(ans.Password == document.getElementById('pword').value){
                                        const apiUrl = "http://localhost:3050/currentusers";

                                        fetch(apiUrl,{
                                            method:"POST",
                                            body:JSON.stringify(ans),
                                            headers:{
                                                "Content-Type":"application/json"
                                            }
                                        })
                                        .then(res=>res.json())
                                        .then(navigate('/home'));
                                    }
                                    else{
                                        alert("Incorrect Password")
                                        return false;
                                    }
                                }                        
                            }}>Login</button>
                            <div className='d-sm-flex justify-content-center mb-2 text-center'>
                                <div className="me-sm-2 mb-2 mb-sm-0">
                                    <div>Don't have an account ? <Link to='/signin' className='text-decoration-none'>Sign Up</Link></div>
                                </div>
                                <div>or login as <Link to='/home' className='text-decoration-none'>guest</Link></div>
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

export default Login 
