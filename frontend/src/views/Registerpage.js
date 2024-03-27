import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser,faKey } from '@fortawesome/free-solid-svg-icons';
function Registerpage() {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const {registerUser} = useContext(AuthContext)

  console.log(email);
  console.log(username);
  console.log(password);
  console.log(password2);


  const handleSubmit = async e => {
    e.preventDefault()
    registerUser(email, username, password, password2)
  }
  

  return (
    <div className="section">
		<div className="container">
			<div className="row full-height justify-content-center ">
				<div className="col-12 text-center align-self-center py-5 main">
					<div className="section pb-1 pt-0 pt-sm-1 text-center">
					
						<div className="card-3d-wrap mx-auto">
							<div className="card-3d-wrapper">
     <div className="card-front">
									<div className="center-wrap">
                  <form onSubmit={handleSubmit}>
										<div className="section text-center">
											<h4 className="mb-1 pb-3 login">Register</h4>
											<div className="form-group">
                    
												<input type="text"  onChange={e => setUsername(e.target.value)} className="form-style" placeholder="Your Username Name" id="logname" />
                        <FontAwesomeIcon icon={faUser} className="input-icon" />
											</div>	
											<div className="form-group mt-2">
												<input type="email" onChange={e => setEmail(e.target.value)} className="form-style" placeholder="Your Email" id="logemail" />
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
											</div>	
											<div className="form-group mt-2">
												<input type="password" onChange={e => setPassword(e.target.value)} className="form-style" placeholder="Your Password" id="logpass" />
                        <FontAwesomeIcon icon={faLock} className="input-icon" />
											</div>
                      <div className="form-group mt-2">
												<input type="password"  className="form-style" placeholder="Retype Password" id="logpass" onChange={e => setPassword2(e.target.value)}/>
                        <FontAwesomeIcon icon={faKey} className="input-icon" />
											</div>
                      <button
                        className="btnsubmit mt-4 login " 
                        type="submit"
                      >
                        Login
                      </button>
                      <p className=" mt-2 pb-lg-2 login" >
                      Already have an account?{" "}
                      <Link to="/login" className="link">
                        Login Now 
                      </Link>
                    </p>
				      					</div>
                        </form>
			      					</div>
			      				</div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
 
  )
}

export default Registerpage