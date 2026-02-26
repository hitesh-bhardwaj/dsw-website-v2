"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message || "Successfully subscribed!" });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Subscription failed. Please try again." });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage({ type: "error", text: "An error occurred. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-[45%] relative max-sm:w-full max-md:mt-[8vw] max-sm:mt-0 max-md:w-[60%] ">
      <p className="text-24 max-sm:text-24 max-md:text-[2.5vw] font-sans tracking-[0.025vw] mb-[3vw]">
        Subscribe to our newsletter for the latest tech insights and updates.
      </p>
      <form onSubmit={handleSubmit} className="flex items-center max-w-full gap-4 justify-center max-sm:max-w-full max-md:max-w-[80%] max-sm:pl-4 relative">
        <div className="group relative w-[60%] max-sm:w-[80%] max-md:w-[80%]">
          <label
            htmlFor="newsletter-input"
            className="origin-start pointer-events-none font-medium  has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
          >
            <span className="bg-transparent inline-flex text-[0.85vw] max-sm:text-[3vw] max-md:text-[2vw] ">
              Enter your email
            </span>
          </label>
          <Input
            id="newsletter-input"
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="bg-transparent border text-lg border-white border-l-0 border-r-0 border-t-0 !rounded-xs"
          />
        </div>
         <button  type="submit"
          disabled={isLoading} className="px-[1.5vw]  py-[0.5vw] max-sm:mt-2 max-md:mt-[2vw] max-md:px-[5vw] max-md:py-[1.5vw] cursor-pointer rounded-full text-white text-[1vw] max-md:text-[2.5vw] font-sans transition-all hover:opacity-90 max-sm:text-[4vw] max-sm:px-[7vw] max-sm:py-[2vw] max-md:w-fit max-sm:mx-auto  bg-[#F16B0D] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? "Subscribing..." : "Subscribe"}
                  </button>
        {message.text && (
        <p
          className={`text-sm mt-2 top-full max-sm:bottom-0 max-md:left-[0%] left-unset absolute max-sm:text-[3vw] max-md:text-[2vw] ${
            message.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
      </form>
      
    </div>
  );
};

export default Newsletter;