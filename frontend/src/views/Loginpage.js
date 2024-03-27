import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser,faKey } from '@fortawesome/free-solid-svg-icons';

function Loginpage() {

  const {loginUser} = useContext(AuthContext)
  const handleSubmit = e => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    email.length > 0 && loginUser(email, password)

    console.log(email)
    console.log(password)
   
  }

  return (
 
    <div className="section">
		<div className="container">
			<div className="row full-height justify-content-center ">
				<div className="col-12 text-center align-self-center py-5 main">
					<div className="section pb-1 pt-0 pt-sm-1 text-center">
					
						<div className="card-wrap mx-auto">
							<div className="card-wrapper">
								<div className="card-front">
									<div className="center-wrap">
                  <form className="forml"onSubmit={handleSubmit}>
										<div className="section text-center">
											<h4 className="mb-4 pb-3 login">Log In</h4>
                     
											<div className="form-group" >
												<input type="email" name='email' className="form-style" placeholder="Your Email" id="logemail" />
                        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
											</div>	
											<div className="form-group mt-2">
												<input type="password" name='password' className="form-style" placeholder="Your Password" id="logpass" />
                        <FontAwesomeIcon icon={faKey} className="input-icon" />
											</div>
                      <button
                        className="btnsubmit mt-4 login " 
                        type="submit"
                      >
                        Login
                      </button>
                      <p className="mb-5 mt-2 pb-lg-2 login" >
                      Don't have an account?{" "}
                      <Link to="/register" className="link">
                        Register Now 
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

export default Loginpage