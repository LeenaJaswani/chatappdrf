import React from 'react'
import { useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import { jwtDecode } from 'jwt-decode'
import { Link, useParams, useNavigate } from 'react-router-dom'

import moment from 'moment';
import './style/style.css'

import Message from './Message'
function MessageDetail() {
  const baseURL = 'http://127.0.0.1:8000/chat'
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState([])
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  let [newMessage, setnewMessage] = useState({ message: "", });
  let [newSearch, setnewSearch] = useState({ search: "", });

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

  const axios = useAxios()
  const id = useParams()
  const token = localStorage.getItem('authTokens');
  const decoded = jwtDecode(token)
  const user_id = decoded.user_id
  const username = decoded.username
  const navigate = useNavigate()

  useEffect(() => {
    try {
      axios.get(baseURL + '/my-messages/' + user_id + '/').then((res) => {
        setMessages(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }, [id])

  useEffect(() => {
    let interval = setInterval(() => {
      try {
        axios.get(baseURL + '/get-messages/' + user_id + '/' + id.id + '/').then((res) => {
          setMessage(res.data)
        })
      } catch (error) {
        console.log(error);
      }
    }, 800);
    return () => {
      clearInterval(interval);
    };
  }, [id]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await axios.get(baseURL + '/profile/' + id.id + '/').then((res) => {
          setProfile(res.data)
          setUser(res.data.user)
        })
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile()
  }, [id])


  const handleChange = (event) => {
    setnewMessage({
      ...newMessage,
      [event.target.name]: event.target.value,
    });
  };


  const SendMessage = () => {
    const formdata = new FormData()
    formdata.append("user", user_id)
    formdata.append("sender", user_id)
    formdata.append("receiver", id.id)
    formdata.append("message", newMessage.message)
    formdata.append("is_read", false)

    try {
      axios.post(baseURL + '/send-messages/', formdata).then((res) => {
        document.getElementById("text-input").value = "";
        setnewMessage({ message: "" });
      })
    } catch (error) {
      console.log("error ===", error);
    }
  }

  const handleSearchChange = (event) => {
    setnewSearch({
      ...newSearch,
      [event.target.name]: event.target.value,
    });
  };

  const SearchUser = () => {
    axios.get(baseURL + '/search/' + newSearch.username + '/')
      .then((res) => {
        if (res.status === 404) {
          alert("User does not exist");
        } else {
          navigate('/search/' + newSearch.username + '/');
        }
      })
      .catch((error) => {
        alert("User Does Not Exist")
      });
  };


  const groupedMessages = message.reduce((acc, curr) => {
    const date = formatDatePart(curr.date);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  return (
    <div className=''>
 
        <div className="messagedetail ">
  
       
            <div className="row g-0 ">
              <div className="col-12 col-lg-4 col-xl-3 border-right messagelist">
                
               
               <Message/>

              </div>
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block userdetail">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        src={profile.image}
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>{profile.full_name}</strong>
                      <div className="login">
                        <em>@{user.username}</em>
                      </div>
                    </div>
                    <div>
                    
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <div className="chat-messages p-4">
            
                    {Object.entries(groupedMessages).map(([date, messages]) => (
                      <React.Fragment key={date}>
                        <div className="chat-date">{date}</div>
                        {messages.map((message, index) => (
                          <React.Fragment key={message.id}>
                            {message.sender?.id !== user_id &&
                              <div className="chat-message-left pb-4" key={index}>
                                <div>
                                  <img src={message.sender_profile?.image} className="rounded-circle mr-1" alt="Chris Wood" style={{ objectFit: "cover" }} width={40} height={40} />
                                  <br />
                                  <div className="text-muted small text-nowrap mt-2">
                                    <span className='mt-3 login'>{formatTimePart(message.date)}</span>
                                  </div>
                                </div>
                                <div className="flex-shrink-1  rounded py-2 px-3 mr-3 messages">
                                  <div className="font-weight-bold mb-1 nametag">{message.sender_profile?.full_name}</div>
                                  {message.message}
                                  <br />
                                
                                </div>
                              </div>
                            }
                            {message.sender?.id === user_id &&
                              <div className="chat-message-right pb-4" key={index}>
                                <div>
                                  <img src={message.sender_profile?.image} className="rounded-circle mr-1" alt="{message.receiver_profile?.full_name}" style={{ objectFit: "cover" }} width={40} height={40} />
                                  <br />
                                  <div className="text-muted small text-nowrap mt-2">
                                    <span className='mt-3 login'>{formatTimePart(message.date)}</span>
                                  </div>
                                </div>
                                <div className="flex-shrink-1 rounded py-2 px-4 ml-3  messages ">
                                  <div className="font-weight-bold mb-1 nametag">You</div>
                                  {message.message}
                                </div>
                              </div>
                            }
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top userdetail">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                      value={newMessage.message}
                      name="message"
                      id='text-input'
                      onChange={handleChange}
                    />
                    <button onClick={SendMessage} className="btnsubmit">Send</button>
                  </div>
                </div>
              </div>
              
      
          </div>
        </div>
     
    </div>
  )
}

export default MessageDetail