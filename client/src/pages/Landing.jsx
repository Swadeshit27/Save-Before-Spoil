import React from "react";
import landing from "../assets/img/landing.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundImage: `url(${landing})` }}
    >
      <div className="flex flex-col justify-center items-center px-4 h-[100vh] bg-cover bg-center text-center text-white bg-gradient-to-t from-black ">
        <div className="p-4 py-6 border-b-[1px] bg-gradient-to-t from-gray-800 backdrop-blur-md  border-white rounded-lg">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-green-500">Save </span>
            <span>Before </span>
            <span className="text-orange-400">Spoil</span>
          </h1> 
          <p className="text-lg max-w-2xl my-8">
            Welcome to Save Before Spoil! Reduce food waste with our expiration alerts, recipe suggestions, donation connections, and waste analytics. Join us to make smarter food choices and help nourish our communities. Sign up today!
          </p>
          <Button
            className="bg-blue-500 text-white py-2 px-6 rounded-md"
            onClick={() => {
              navigate("/login");
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
