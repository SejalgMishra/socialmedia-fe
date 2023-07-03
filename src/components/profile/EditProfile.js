import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
 import { checkImage } from '../../utilis/imageUpload'
// import { GLOBALTYPES } from '../../redux/actions/globalTypes'
 import { updateProfileUser } from '../../redux/actions/profileAction'

const EditProfile = ({setOnEdit}) => {
    const initState = {
        fullname: '', mobile: '', address: '', website: '', story: '', gender: ''
    }
    const [userData, setUserData] = useState(initState)
    const { fullname, mobile, address, website, story, gender } = userData

    const [avatar, setAvatar] = useState('')

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])


    const ChangeAvatar = (e) => {
        const file = e.target.files[0]
     console.log(file);
        const err = checkImage(file)
        if(err) return dispatch({
            type:"NOTIFY", payload: {error: err}
        })

        setAvatar(file)
    }

    const handleInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]:value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileUser({userData, avatar, auth}))
    }

    return (
        <div className="edit_profile fixed top-0 left-0 h-screen z-40 overflow-auto w-full bg-[#0008] ">
            <button className="btn btn-danger btn_close absolute top-4 right-4"
            onClick={() => setOnEdit(false)}>
                Close
            </button>

            <form className='max-w-xl w-full bg-white p-5 border-r-2 m-5 mx-auto' onSubmit={handleSubmit} >
                <div className="info_avatar overflow-hidden  w-40 h-40 rounded-full relative mx-auto m-4 cursor-pointer">
                    <label id='file_up' className=' w-40 h-40 rounded-full relative mx-auto cursor-pointer'>
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} className='w-full h-full block object-cover z-10'
                    alt="avatar" style={{filter: theme ? 'invert(1)' : 'invert(0)'}}  />
                    <span className='absolute bottom-[-45%] left-0 w-full h-[50%] hidden hover:opacity-100 text-center  bg-orange-300 duration-300 ease-in-out hover:bottom-[-10%]'>
                        <i className="fas fa-camera" />
                        <p >Change</p>
                        <input type="file" name="file" id="file_up" className='object-fit '
                        accept="image/*" onChange={ChangeAvatar}  />
                    </span>
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <div className="position-relative">
                        <input type="text" className="form-control" id="fullname"
                        name="fullname" value={fullname} onChange={handleInput} />
                        <small className="text-danger position-absolute"
                        style={{top: '50%', right: '5px', transform: 'translateY(-50%)'}}>
                            {fullname.length}/25
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" value={mobile}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={address}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="text" name="website" value={website}
                    className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="story">Story</label>
                    <textarea name="story" value={story} cols="30" rows="4"
                    className="form-control" onChange={handleInput} />

                    <small className="text-danger d-block text-right">
                        {story.length}/200
                    </small>
                </div>

                <label htmlFor="gender">Gender</label>
                <div className="input-group-prepend px-0 mb-4">
                    <select name="gender" id="gender" value={gender}
                    className="custom-select text-capitalize"
                    onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile