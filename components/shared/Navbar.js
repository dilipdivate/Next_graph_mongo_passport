import { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useLazyGetUser } from '@/apollo/actions';

const AppLink = ({ children, className, href, as }) => (
  <Link href={href} as={as}>
    {children}
    {/* <a className={className}>{children}</a> */}
  </Link>
);

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  // console.log('Dilip data:', data);
  if (data) {
    if (data.user && !user) {
      setUser(data.user);
    }
    if (!data.user && user) {
      setUser(null);
    }
    if (!hasResponse) {
      setHasResponse(true);
    }
  }

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">
          DilipDivate
        </AppLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Link href="/portfolios" className="nav-link mr-3">
              Portfolios
            </Link>
            <Link href="/forum/categories" className="nav-link mr-3">
              Forum
            </Link>
            <Link href="/cv" className="mr-3 nav-link">
              Cv
            </Link>
          </Nav>
          {hasResponse && (
            <Nav>
              {user && (
                <>
                  <span className="nav-link mr-2">Welcome {user.username}</span>
                  {(user.role === 'admin' || user.role === 'instructor') && (
                    <NavDropdown
                      className="mr-2"
                      title="Manage"
                      id="basic-nav-dropdown"
                    >
                      <>
                        <Link href="/portfolios/new" className="dropdown-item">
                          Create Portfolio
                        </Link>
                        <Link
                          href="/instructor/[id]/dashboard"
                          as={`/instructor/${user._id}/dashboard`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </Link>
                      </>
                    </NavDropdown>
                  )}
                  <Link href="/logout" className="nav-link btn btn-danger">
                    Sign Out
                  </Link>
                </>
              )}
              {(error || !user) && (
                <>
                  <Link href="/login" className="mr-3 nav-link">
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="mr-3 btn btn-success bg-green-2 bright"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
