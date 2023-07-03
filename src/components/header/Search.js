import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utilis/fetchData'
// import { GLOBALTYPES } from '../../redux/actions/globalTypes'
 import UserCard from '../UserCard'
// import LoadIcon from '../../images/loading.gif'

const Search = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)


    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return;

        try {
            setLoad(true)
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            console.log(res.user);
            setUsers([res.user])
            setLoad(false)
        } catch (err) {
            dispatch({
                type: "NOTIFY", payload: {error: err.msg}
            })
        }
    }

    const handleClose = () => {
        setSearch('')
        setUsers([])
    }

    return (
        <form className="search_form mt-2" onSubmit={handleSearch}>
            <div className='flex justify-between w-96'>
            <input type="text" name="search" value={search} id="search" title="Enter to Search" className='px-4 p-1 w-96 border-blue-600 rounded-lg border-2 relative '
            onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} placeholder="Enter to Search" />

            {/* <div className="search_icon" style={{opacity: search ? 0 : 0.8}}>
                <span className="material-icons">search</span>
                <span>Enter to Search</span>
            </div> */}
            <div className="close_search absolute right-[41%] pt-1 cursor-pointer text-red-400" onClick={handleClose}
            style={{opacity: users?.length === 0 ? 0 : 1 }} >
                &times;
            </div>
            </div>

            <button type="submit" style={{display: 'none'}}>Search</button>

            {/* { load && <img className="loading" src={LoadIcon} alt="loading"  /> } */}

            <div className="users absolute w-96 mt-1">
                {
                    search && users?.map(user => (
                        <UserCard 
                        key={user._id} 
                        user={user} 
                        border="border"
                         handleClose={handleClose} 
                        />
                    ))
                }
            </div>
        </form>
    )
}

export default Search