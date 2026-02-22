import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate=useNavigate();
  const [userName, chngUserName] = useState("");
  const [userPassword, chngUserPwd] = useState("");
  const Register = async (ev) => {
    ev.preventDefault();
    const formdata = { userName: userName, password: userPassword };
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
      credentials:"include",
    });
    let msg=await response.json();
    alert(msg.message);
    if(response.ok){
      navigate("/login");
    }
    
  };
  return (
    <div className="max-w-100 mx-auto">
      <h1 className="text-4xl font-bold mt-20 mb-3 text-center">Register</h1>
      <form className="flex flex-col gap-2" onSubmit={Register}>
        <input
          type="text"
          className="p-2 border-2 rounded-md border-gray-200 w-full outline-0 shadow-sm"
          placeholder="Enter name"
          name="username"
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
          className="bg-blue-500 rounded-lg py-2 px-4 text-white "
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
