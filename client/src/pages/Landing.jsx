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
          <p className="text-lg max-w-2xl mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            dolore, laboriosam iure consequatur laudantium minus ex ab dolor
            esse voluptatem incidunt voluptas, quia modi quisquam. Eos aperiam
            vel quod veritatis accusamus praesentium enim dolorum nesciunt quas
            quia fugit ex quaerat obcaecati, ipsum blanditiis ratione quasi
            porro rem! Delectus atque, voluptates asperiores assumenda ullam sit
            obcaecati reprehenderit, aperiam nobis laboriosam ab.
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
