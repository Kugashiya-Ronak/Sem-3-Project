import { Link,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function EditUser(){
    const navigate = useNavigate();
    const apiURL = 'http://localhost:3050/currentusers/'+0;

    const[user, setUser] = useState([]);

    useEffect(()=>{
        fetch(apiURL)
        .then(res=>res.json())
        .then(res=>setUser(res))
    },[])


    const[data, setData] = useState([]);
    useEffect(()=>{
        fetch(apiURL)
        .then(res=>res.json())
        .then(res=>setData(res))
    },[])

    return(
        <>
            <div class="d-flex justify-content-center align-items-center vh-100 vw-100">
            <div className='container'>
                <div className='row m-1'>
                    <div className='col-0 col-md-3'></div>
                    <div className='col-12 col-md-6 border border-dark rounded-4'>
                        <div className='row bg-body-secondary p-3 rounded-top-4'>
                            <div className='h4 mb-4 text-center rounded border border-dark d-flex'>
                                <div className='col-2'>
                                <h5 className='mt-1'><Link to='/account' className='btn btn-secondary badge rounded-5 text-decoration-none'><i class="bi bi-chevron-left"></i>Back</Link></h5>
                                </div>
                                <div className='col-8'>
                                    User Details
                                </div>
                            </div>
                            <div className='text-center p-2 mb-3'>
                                <img className='img img-fluid rounded-4 border border-dark' src={require('../assets/z_profile_picture.webp')} style={{width:'130px', height:'130px'}}></img>
                            </div>
                            <span className='col-md-4 h4'>Username</span>
                            <input className='col form-control border-dark' type='text' id="name" value={user.UserName} 

                                onChange={(e)=>{
                                    setUser({...user,UserName: e.target.value})
                                }}

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
                            <span className='col-md-4 h4'>Password</span>
                            <input className='col form-control border-dark' type='text' id='pword'value={user.Password} 
                            
                            onChange={(e)=>{
                                setUser({...user,Password:e.target.value})
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
                            <span className='col-md-4 h4'>Email</span>
                            <input className='col form-control border-dark' type='text' id='email' value={user.UserEmail} 

                            onChange={(e)=>{
                                setUser({...user,UserEmail:e.target.value})
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
                            <button className='col btn btn-secondary m-2' 
                                
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

                                    var email = document.getElementById('email').value;
                                    var pattern = '^[\\w-_\.]*[\\w-_\.]\@[\\w]\.+[\\w]+[\\w]$';
                                    var regex = new RegExp(pattern);
                                    if(regex.test(email)){
                                    }
                                    else{
                                        alert('email Invalid');
                                        return false;
                                    }

                                    const apiURL = 'http://localhost:3050/currentusers/'+0;
                                    fetch(apiURL,{
                                        method:"PATCH",
                                        body:JSON.stringify(user),
                                        headers:{
                                            "Content-Type":"application/json"
                                        }
                                    })
                                    .then(()=>{
                                        const apiURLU = 'http://localhost:3050/users/'+data.UserName;
                                        fetch(apiURLU,{
                                            method:"PATCH",
                                            body:JSON.stringify(user),
                                            headers:{
                                                "Content-Type":"application/json"
                                            }
                                        })
                                        .then(res=>res.json())
                                        .then(navigate('/account'))
                                    })
                                        
                                }}
                            
                            >Save Changes</button>
                        </div>
                    </div>
                    <div className='col-0 col-md-3'></div>
                </div>
            </div>
            </div>
        </>
    )
}

export default EditUser