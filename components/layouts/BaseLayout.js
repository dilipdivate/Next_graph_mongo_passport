import React from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from './../shared/Navbar';
import Hero from './../shared/Hero';

const BaseLayout = ({ children, page = '' }) => {
  const isHomePage = () => page === 'Home';
  return (
    <div className="portfolio-app">
      <Navbar />

      {isHomePage() && <Hero />}

      <div className="container mb-5">{children}</div>

      {/* <main>{children}</main> */}
      {isHomePage() && (
        <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
          <div className="container text-center">
            <small>Copyright &copy; Your Website</small>
          </div>
        </footer>
      )}

      <ToastContainer />
    </div>
  );
};

export default BaseLayout;
