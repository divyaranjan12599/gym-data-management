import React from 'react'
import './Hero.css'
import Header from '../Header/Header'
import hero_image from "../../assets/hero_image.png"
import hero_image_back from "../../assets/hero_image_back.png"
import Heart from "../../assets/heart.png"
import Calories from "../../assets/calories.png"
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'

const Hero = () => {

    const btnstyle = {
        backgroundColor: 'white',
        padding: '0.5rem',
        width: '5rem',
        height: '2.5rem',
        border: '4px solid transparent',
        transition: '300ms all',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      };
      

    const transition = {type: "spring", duration: 3}

    const mobile = window.innerWidth <= 768 ? true : false

    return (
        <div className="hero" id='home'>
            <div className="blur hero-blur"></div>
            <div className="left-h">
                <Header />

                <div className="the-best-ad">
                    <motion.div
                    initial={{left: mobile ? '178px' : '238px'}}
                    whileInView={{left: '8px'}}
                    transition={{...transition, type: "tween"}}
                    >
                    </motion.div>
                    <span>The Best fitness Club in the town</span>
                </div>

                <div className="hero-text">
                    <div>
                        <span className='stroke-text'>Shape </span>
                        <span>Your</span>
                    </div>
                    <div>
                        <span>Ideal Body</span>
                    </div>
                    <div>
                        <span>
                            In here we will help you to shape and build your ideal body
                            and live up your life to fullest
                        </span>
                    </div>
                </div>

                <div className="figures">
                    <div>
                        <span>+ 140</span>
                        <span>Expert coaches</span>
                    </div>
                    <div>
                        <span>+ 978</span>
                        <span>Members joined</span>
                    </div>
                    <div>
                        <span>+ 50</span>
                        <span>Fitness Programs</span>
                    </div>
                </div>

                <div className="hero-buttons">
                    <button className='btn'  >Get Started</button>
                    <button className='btn'>Learn More</button>
                </div>

            </div>
            <div className="right-h">
               {mobile ? "" :<Link to="/login" className='btn' style={btnstyle} ><button className='btn' style={btnstyle} >Login</button></Link>}
                <motion.div
                initial={{right: '-1rem'}}
                whileInView={{right: '4rem'}}
                transition={transition}
                
                className="heart-rate">
                    <img src={Heart} alt="heart" />
                    <span>Heart Rate</span>
                    <span>116 bpm</span>
                </motion.div>

                <img src={hero_image} alt="hero_image" className="hero-image" />
                <motion.img 
                initial={{right: '11rem'}}
                whileInView={{right: '20rem'}}
                transition={transition}
                src={hero_image_back} alt="hero_image_back" className="hero-image-back" />

                <motion.div 
                initial={{right: '37rem'}}
                whileInView={{right: '28rem'}}
                transition={transition}
                className="calories">
                    <img src={Calories} alt="calories" />
                    <div>
                        <span>Calories Burned</span>
                        <span>220 kcal</span>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}

export default Hero