import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const{setUserInfo}=useContext(UserContext);
  const [userName, chngUserName] = useState("");
  const [userPassword, chngUserPwd] = useState("");
  const [redirect,setRedirect]=useState(false);
const login = async (ev) => {
    ev.preventDefault();
    const formdata = { userName: userName, password: userPassword };
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(formdata),
      credentials:"include",
      headers: { "Content-Type": "application/json" },
    });
     if(response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
      })
      setRedirect(true);
    }
    else{
      response.json().then((info)=>{
          alert(info.message);
      })
    }
   
  };

  if(redirect){
    return <Navigate to={"/"}/>
  }
  return (
    <div className="max-w-100 mx-auto">
      <h1 className="text-4xl font-bold mt-20 mb-3 text-center">Login</h1>
      <form className="flex flex-col gap-2" onSubmit={login}>
        <input
          type="text"
          className="p-2 border-2 rounded-md border-gray-200 w-full outline-0 shadow-sm"
          placeholder="Enter name"
          name="userName"
          value={userName}
          onChange={(e) => chngUserName(e.target.value)}
        />
        <input
          type="password"
          className="p-2 border-2 rounded-md border-gray-200 w-full shadow-sm outline-0"
          placeholder="Enter password"
          name="password"
          value={userPassword}
          onChange={(e) => chngUserPwd(e.target.value)}
        />
        <button
          className="bg-blue-500 rounded-lg py-2 px-4 text-white cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
