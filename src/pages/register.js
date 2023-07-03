import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
 import { useSelector, useDispatch } from 'react-redux'
 import {  Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'
import Logo from '../assests/social-media.png'


const Register = () => {
    const { auth , notify } = useSelector(state => state)
    console.log( useSelector(state => state));
     const dispatch = useDispatch()
    const history = useNavigate()

    const initialState = { 
        fullname: '', username: '', email: '', password: '', cf_password: '', gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const { fullname, username, email, password, cf_password } = userData

    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    useEffect(() => {
        if(auth.token) history("/home")
    }, [auth.token, history])

    
    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div className="auth_page max-w-screen-md mx-auto h-screen py-40">
            <form onSubmit={handleSubmit}>
            <div style={{ display : 'flex' , justifyContent : "center"  , gap: 10 , alignContent : "center" , marginBottom : 20}}>
              <img src={Logo} alt='logo'
                style={{ width: '40px', height: '40px' }} />
                <h3 className=" text-center mb-4 text-xl font-serif">SociableX</h3>
                
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="fullname" name="fullname" placeholder='Full Name'
                    onChange={handleChangeInput} value={fullname}
                    style={{background: `${notify.fullname ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {notify.fullname ? notify.fullname : ''}
                    </small>
                </div>

                <div className="form-group">
                    <input type="text" className="form-control" id="username" name="username" placeholder='User Name'
                    onChange={handleChangeInput} value={username.toLowerCase().replace(/ /g, '')}
                    style={{background: `${notify.username ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {notify.username ? notify.username : ''}
                    </small>
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" placeholder='Email'
                    onChange={handleChangeInput} value={email}
                    style={{background: `${notify.email ? '#fd2d6a14' : ''}`}} />
                    
                    <small className="form-text text-danger">
                        {notify.email ? notify.email : ''}
                    </small>
                </div>

                <div className="form-group">

                    <div className="pass flex">
                        
                        <input type={ typePass ? "text" : "password" } 
                        className="form-control rounded-r-none" id="exampleInputPassword1" placeholder='Password' 
                        onChange={handleChangeInput} value={password} name="password"
                        style={{background: `${notify.password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypePass(!typePass)} className=' px-4 items-center flex bg-blue-800 p-2  rounded-r-lg text-white hover:bg-blue-950 hover:duration-150'>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {notify.password ? notify.password : ''}
                    </small>
                </div>

                <div className="form-group">

                    <div className="pass flex">
                        
                        <input type={ typeCfPass ? "text" : "password" } 
                        className="form-control rounded-r-none" id="cf_password"
                        onChange={handleChangeInput} value={cf_password} name="cf_password" placeholder='Confirm Password'
                        style={{background: `${notify.cf_password ? '#fd2d6a14' : ''}`}} />

                        <small onClick={() => setTypeCfPass(!typeCfPass)} className=' px-4 items-center flex bg-blue-800 p-2  rounded-r-lg text-white hover:bg-blue-950 hover:duration-150'>
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                    </div>

                    <small className="form-text text-danger">
                        {notify.cf_password ? notify.cf_password : ''}
                    </small>
                </div>

                <div className="row  gap-10 mx-0 mb-1">
                    <label htmlFor="male">
                        Male: <input type="radio" id="male" name="gender"
                        value="male" defaultChecked onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="female">
                        Female: <input type="radio" id="female" name="gender"
                        value="female" onChange={handleChangeInput} />
                    </label>

                    <label htmlFor="other">
                        Other: <input type="radio" id="other" name="gender"
                        value="other" onChange={handleChangeInput} />
                    </label>
                </div>
                
                <button type="submit" className=" bg-blue-800 p-2 rounded-lg w-100 text-white hover:bg-blue-950 hover:duration-150">
                    Register
                </button>

                <p className="my-2">
                    Already have an account? <Link to="/" style={{color: "crimson"}}>Login Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Register