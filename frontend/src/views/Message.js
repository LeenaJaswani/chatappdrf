import React from 'react'
import './style/style.css'
import { useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import {jwtDecode} from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment';
import SearchUsers from './SearchUsers'
function Message() {
  const formatDatePart = (date) => {
    const messageDate = moment(date);
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');
  
    if (messageDate.isSame(today, 'd')) {
      return 'Today';
    } else if (messageDate.isSame(yesterday, 'd')) {
      return 'Yesterday';
    } else {
      return messageDate.format('DD-MM-YY');
    }
  };

  const formatTimePart = (date) => {
    return moment(date).format('HH:mm');
  };
  
  const baseURL = 'http://127.0.0.1:8000/chat'
 
  const [messages, setMessages] = useState([])
  let [newSearch, setnewSearch] = useState({search: "",});

  
  const axios = useAxios()

  // Get and Decode Token
  const token = localStorage.getItem('authTokens');
  const decoded = jwtDecode(token)
  // Get Userdata from decoded token
  const user_id = decoded.user_id
  const username = decoded.username
  const navigate = useNavigate()

  useEffect(() => {
    try {
     
      axios.get(baseURL + '/my-messages/' + user_id + '/').then((res) => {
      
        setMessages(res.data)
        
        // console.log(res.data);
      })
    } catch (error) {
      console.log(error);
    }
  }, [])
 

 return (
    <div>
      <main className="content" >
     
       
            <div className="row g-0">
            <SearchUsers/>
              <div className="col-12 col-lg-3 col-xl-8 border-right message">
             
            
                {messages.map((message) =>
                  <Link  key={message.id} 
                    to={"/inbox-message/" + 
                    (message.sender?.id === user_id ? message.receiver?.id : message.sender?.id) +
                     "/"}
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                   
                    <div className="d-flex align-items-center chat">
                    {message.sender?.id !== user_id && 
                      <img src={message.sender_profile?.image} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                    }
                    {message.sender?.id === user_id && 
                      <img src={message.receiver_profile?.image} className="rounded-circle mr-1" alt="2" width={40} height={40}/>
                    }
                      <div className="flex-grow-1 ml-3">
                          {message.sender?.id === user_id && 
                            (message.receiver_profile?.full_name !== null ? message.receiver_profile?.full_name : message.receiver.username)
                          }

                          {message.sender?.id !== user_id && 
                            (message.sender.username) 
                          }
                          
                       
                        <div className="mymsg">
                        <small>{message.message}</small>
                           
                       
                        </div>
                        <div className="badge  float-right  time">
                    &nbsp;        &nbsp;    &nbsp;   {formatDatePart(message.date)} {formatTimePart(message.date)}
                        </div>
                      </div>
                    </div>
                    <hr className=' hr'/>
                    </Link>
                 
                )}
                
              
              </div>
              
            </div>
       
      </main>
    </div>
  )
}

export default Message