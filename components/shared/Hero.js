import Image from 'next/image.js';
import React from 'react';

const Hero = () => {
  return (
    <section className="fj-hero">
      <div className="fj-hero-wrapper row">
        <div className="hero-left col-md-6">
          <h1 className="white hero-title">
            Hey I'm Dilip. Experienced full stack developer
          </h1>
          <h2 className="white hero-subtitle">Check my portfolio</h2>
          <div className="button-container">
            <a href="" className="btn btn-main bg-blue ttu">
              See my work
            </a>
          </div>
        </div>
        <div className="hero-right col-md-6">
          <div className="hero-image-container">
            <a className="grow hero-link">
              <Image
                className="hero-image"
                src="/vercel.svg"
                alt="/vercel.svg"
                width={60}
                height={60}
              ></Image>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
