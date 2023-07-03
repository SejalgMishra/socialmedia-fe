import React, { useState, useEffect } from 'react'
import { Link, useHistory, useNavigate } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'
 import Logo from '../assests/social-media.png'



const Login = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)

    const { auth } = useSelector(state => state)
    console.log(auth);
     const dispatch = useDispatch()
     const history = useNavigate()

    useEffect(() => {
        if(auth.token) history("/home")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(userData);
        dispatch(login(userData))
    }

    return (
        <div className="auth_page max-w-screen-md mx-auto h-screen py-40 ">
            <form onSubmit={handleSubmit} >
              <div style={{ display : 'flex' , justifyContent : "center"  , gap: 10 , alignContent : "center" , marginBottom : 20}}>
              <img src={Logo} alt='logo'
                style={{ width: '40px', height: '40px' }} />
                <h3 className=" text-center mb-4 text-xl font-serif">SociableX</h3>
                
                </div>

                <div className="form-group">
                   
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder='E-mail'
                    aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />
                    
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>

                <div className="form-group">
                    

                    <div className="pass flex">
                        
                        <input type={ typePass ? "text" : "password" } 
                        className="form-control rounded-r-none" id="exampleInputPassword1"
                        onChange={handleChangeInput} value={password} name="password" placeholder='Password' />

                        <small onClick={() => setTypePass(!typePass)} className=' px-4 items-center flex bg-blue-800 p-2  rounded-r-lg text-white hover:bg-blue-950 hover:duration-150'>
                            {typePass ? 'Hide ' : 'Show'}
                        </small>
                    </div>
                   
                </div>
                
                <button type="submit" className=" bg-blue-800 p-2 rounded-lg w-100 text-white hover:bg-blue-950 hover:duration-150"
                disabled={email && password ? false : true}>
                    Login
                </button>

                <p className="my-2">
                    You don't have an account? <Link to="/register" style={{color: "crimson"}}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login