"use client";

import { Input } from "../ui/input";
import { useState } from "react";

const Newsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage({
        type: "error",
        text: "Please enter your name.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: data.message || "Successfully subscribed!",
        });
        setName("");
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Subscription failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative max-sm:w-full max-sm:mt-0 max-md:w-[60%]">
      <p className="text-24 max-sm:text-24 max-md:text-[2.5vw] font-sans mb-[3vw]">
        Subscribe to our newsletter for the latest tech insights and updates.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-full max-sm:max-w-full max-md:max-w-[80%] relative bg-transparent"
      >
        <div className="group relative w-full max-sm:w-[80%] max-md:w-[80%]">
          <label
            htmlFor="newsletter-name"
            className={`
              origin-start pointer-events-none font-medium absolute left-0 px-2 transition-all duration-200
              ${
                name
                  ? "top-[-25%] -translate-y-0 text-xs"
                  : "top-1/2 -translate-y-1/2 text-sm"
              }
              group-focus-within:top-[-25%]
              group-focus-within:-translate-y-0
              group-focus-within:text-xs
            `}
          >
            <span className="inline-flex max-sm:text-[3vw] max-md:text-[2vw] text-20 capitalize text-foreground/40">
              Enter your name
            </span>
          </label>
          <Input
            id="newsletter-name"
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            className="bg-transparent! border text-lg border-white border-l-0 border-r-0 border-t-0 !rounded-xs"
          />
        </div>

        <div className="group relative w-full max-sm:w-[80%] max-md:w-[80%]">
          <label
            htmlFor="newsletter-input"
            className={`
              origin-start pointer-events-none font-medium absolute left-0 px-2 transition-all duration-200
              ${
                email
                  ? "top-[-25%] -translate-y-0 text-xs"
                  : "top-1/2 -translate-y-1/2 text-sm"
              }
              group-focus-within:top-[-25%]
              group-focus-within:-translate-y-0 
              group-focus-within:text-xs
            `}
          >
            <span className="inline-flex max-sm:text-[3vw] max-md:text-[2vw] text-20 capitalize text-foreground/40">
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
            className="bg-transparent! border text-lg border-white border-l-0 border-r-0 border-t-0 !rounded-xs"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-[1.5vw] py-[0.5vw] max-sm:mt-2 max-md:mt-[2vw] max-md:px-[5vw] max-md:py-[1.5vw] cursor-pointer rounded-full text-white text-[1vw] max-md:text-[2.5vw] font-sans transition-all hover:opacity-90 max-sm:text-[4vw] max-sm:px-[7vw] max-sm:py-[2vw] max-md:w-fit max-sm:mx-auto bg-[#F16B0D] disabled:opacity-50 disabled:cursor-not-allowed w-fit"
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>

        {message.text && (
          <p
            className={`text-sm mt-2 max-sm:text-[3vw] max-md:text-[2vw] ${
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