/*
    In this file
    * BrowserRouter, Routes, Route
    * Link, useNavigate
    * Layout, Outlet
    * ErrorPage (404-page)
*/

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
// Link is used for navigation without reloading the whole page

function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* for better routing - all routes under one route */}
          {/* path here represents the base path  */}
          <Route path="/" element={<Layout />}>
            {/* children routes here */}
            <Route path="/" element={<Landing />}></Route>
            {/* for the given path/route, render the given (Blogs) component */}
            <Route
              path="/neet/online-coaching-class-11"
              element={<Class11Program />}
            />
            {/* when the user came to the below route/path, the Class12Program Component gets renderedF */}
            <Route
              path="/neet/online-coaching-class-12"
              element={<Class12Program />}
            />

            {/* if none of the above route are met. i.e. for all incorrect URLs render this error page */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// this is the layout of my application
function Layout() {
  return (
    <div style={{ height: "100vh" }}>
      {/* header */}
      {/* this remains same for all routes */}
      {/* Allen | Class 11 | Class 12 */}
      {/* below content changes according to the routes */}
      <Link to="/">Allen</Link> |
      <Link to="/neet/online-coaching-class-11">Class 11</Link>|
      <Link to="/neet/online-coaching-class-12"> Class 12</Link>
      {/* main body of the application */}
      <div style={{ height: "90vh" }}>
        <Outlet />
      </div>
      {/* footer */}
      Footer
    </div>
  );
}

// every component should be placed inside different files for better structuringF
function Landing() {
  return <div>Welcome to allen.</div>;
}

function Class11Program() {
  return <div>NEET programs for class 11th.</div>;
}

// using `useNavigate()` hook
function Class12Program() {
  const navigate = useNavigate();

  function redirectUser() {
    navigate("/"); // redirect users to the landing page
  }

  return (
    <div>
      NEET programs for class 12th.
      <br />
      <button onClick={redirectUser}>Home</button>
    </div>
  );
}

// for all wrong URLs i.e. default 404 page
function ErrorPage() {
  return <div>Sorry, page not found!</div>;
}

export default Routing;
