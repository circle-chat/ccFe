import React from 'react';
import './AboutApp.css';
import { Link } from 'react-router-dom';





function AboutApp() {

  return (
    <section className='AboutApp'>
      <Link className='back-button' to='/'>
        <button data-tooltip="Click to Go Back">
          ＜
        </button>
      </Link>
      <p data-testid='about' id='about'>Welcome to The Circle! Our mission is to increase your personal connections inside a larger Circle. You can either create a Circle, that people can join to get to know each other 1v1, or join one. Once you have entered a Circle, you will see that Circle's rules and purpose as well as a way to invite others. After you have read the rules, you can join a room where you will be matched with someone else in the same circle. Please mind the rules and talk to your heart's content, if you feel that you have made a connection, be sure to share contact information.</p>
    </section>
  );
}


export default AboutApp;
