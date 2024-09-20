import React, { useState } from "react";
import logo from "../images/Norta 2024 _ Logo 1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('login', { email, password });
      const { data } = res;
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Logged in successfully", { autoClose: 2000 });
      navigate("/customers");
      
    } catch (error) {
      toast.error("Invalid email or password");
      console.log(`error in handleSubmit ${error}`);
    }
  };

  return (
    <div className=" font-[Poppins] bg-[#FAFBFF] h-screen ">
      <div className=" sm:flex h-screen justify-evenly items-center ">
        <div className="max-sm:w-[100px] text-center w-[18%] max-sm:relative max-sm:left-[32%] max-sm:m-2">
          <img src={logo} alt="Logo" />
        </div>
        <div className="border border-[#08A19E] bg-white m-2 max-sm:mt-10 rounded-xl p-5 shadow-2xl ">
          <h1 className="text-[#08A19E] font-medium 2xl:text-3xl text-2xl  text-center mb-2 sm:px-10 pt-5">
            Login to your account
          </h1>
          <p className="2xl:mb-10 mb-7 text-center">
            Welcome back! Please enter your details.
          </p>
          <form
            onSubmit={HandleSubmit}
            
            className="space-y-4 sm:mb-6 mb-"
          >
            <div className="flex flex-col mb-5">
              <label htmlFor="email" className="pb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                placeholder="Enter Your email"
                className="border border-gray-300 2xl:p-2 p-[0.30rem] rounded"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 ">
                Password
              </label>
              <input
                type="text"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                placeholder="Password"
                className="border border-gray-300 2xl:p-2 p-[0.30rem] 2xl:mb-10 mb-7 rounded"
              />
            </div>
           
            <button
              type="submit"
              className="bg-[#08A19E] w-full text-white 2xl:p-2 p-[0.40rem] rounded-lg "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
