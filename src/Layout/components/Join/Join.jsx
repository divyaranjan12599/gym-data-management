import React, { useRef } from 'react'
import './Join.css'
const Join = () => {

    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(form.current.user_email.value);
      };

  return (
    <div className="Join" id="join-us">
        <div className="left-j">
            <hr />
            <div>
                <span className='stroke-text'>READY TO</span>
                <span>LEVEL UP</span>
            </div>
            <div>
                <span>YOUR BODY</span>
                <span className='stroke-text'>WITH US</span>
            </div>
        </div>
        <div className="right-j">
            <form ref={form} className='email-container' onSubmit={handleSubmit}>
                <input type="email" name="user_email" id="user_email" placeholder='Enter your email address' />
                <button className='btn-j'>Join Now</button>
            </form>
        </div>
    </div>
  )
}

export default Join