import React from 'react'
import './style/style.css'
import { useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import {jwtDecode} from 'jwt-decode'
import { Link, useParams, useNavigate } from 'react-router-dom'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faSignOut } from '@fortawesome/free-solid-svg-icons'
const swal = require('sweetalert2')

function SearchUsers() {

  const baseURL = 'http://127.0.0.1:8000/chat'
  const [users, setUser] = useState([])
  const [profiles, setProfile] = useState([])
  let [newSearch, setnewSearch] = useState({search: "",});
  const [loading, setLoading] = useState(true);

  const username = useParams()
  const navigate = useNavigate()
  const axios = useAxios()

  useEffect(() => {
    if (username.username) {
    axios.get(baseURL + '/search/' + username.username + '/')
    .then((res) => {
      setUser(res.data)
    })
    .catch((error) => {
      swal.fire({
        title: "User Does Not Exist",
        icon: "error",
        toast: true,
        timer: 1000,
        position: 'top',
        timerProgressBar: true,
        showConfirmButton: false,
        showCancelButton: true,
      })
    });
}},[username.username])
  // console.log(users);
  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      SearchUser();
    }
  };
  const handleSearchChange = (event) => {
    setnewSearch({
      ...newSearch,
      [event.target.name]: event.target.value,
    });

  };


  // console.log(newSearch.username);


  const SearchUser = () => {
    axios.get(baseURL + '/search/' + newSearch.username + '/')
      .then((res) => {
        navigate('/search/'+newSearch.username+'/');
        setUser(res.data)

      })
      .catch((error) => {
        swal.fire({
          title: "User Does Not Exist",
          icon: "error",
          toast: true,
          timer: 2000,
          position: 'top',
          timerProgressBar: true,
          showConfirmButton: false,
          showCancelButton: true,
        })
      });
};


  // console.log(users);
  // console.log(profiles);
  return (
  
  
     
        <div className="container search">
        
       
            <div className="row g-0 search">
              <div className="col-12 col-lg-5 col-xl-3 search">
              <div className="px-4 search">
                  <div className="d-flfex align-items-center search">
                    <div className=" d-flex align-items-center mt-2">
                      <input
                        type="text"
                        className="form-control my-1 search"
                        placeholder="Search..."
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress}
                        name='username'

                      />
                      <button className='ml-2 btnsearch' onClick={SearchUser} style={{border:"none", borderRadius:"50%"}}>
                      <FontAwesomeIcon icon={faSearch}  />
                        </button>
                      
                    </div>
                           
                  
                  </div>
                </div>
                
                {users.map((user, index) => 
                  <Link 
                    to={"/inbox-message/" + user.id}
                    className="list-group-item list-group-item-action border-0"  key={user.id} 
                  >

                    <small><div className="badge bg-success float-right text-white"></div></small>
                    <div className="d-flex align-items-start">
                      <img src={user.image} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                    
                      <div className="flex-grow-1 ml-3">
                         {user.full_name}  

                        <div className="small">
                           <small><i className='fas fa-envelope'> Send Message</i></small>
                        </div>
                      </div>
                    </div>
                    </Link>
                )}
                
              
              </div>
              
            </div>
    
        </div>
  
    
  )
}

export default SearchUsers