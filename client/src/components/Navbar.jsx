import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const userName = userInfo;
  const navigate = useNavigate();
  const logout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include",
      method: "POST",
    })
      .then(async (res) => {
        console.log("loged out");
        const data = await res.json();
        alert(data.message);
        setUserInfo(null);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        console.log(userInfo);
        setUserInfo(userInfo);
      });
    });
  }, []);

  return (
    <header className="flex justify-between  shadow-md py-5 bg-white px-10 max-w-full sticky top-0 z-10">
      <div>
        <Link to="/" className="text-2xl font-serif font-bold text-gray-900">
          
          MyBlog
        </Link>
      </div>
      {userName && (
        <div className="flex gap-5 items-center">
          <Link to="/create" className="hover:text-indigo-600 transition font-semibold">Create a Post</Link>
          <button onClick={logout} className="cursor-pointer hover:text-indigo-600 transition font-semibold">Logout</button>
        </div>
      )}
      {!userName && (
        <div className="flex gap-5">
          <Link to="/login" className="hover:text-indigo-600 transition font-semibold">Login</Link>
          <Link to="/register" className="hover:text-indigo-600 transition font-semibold">Register</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
