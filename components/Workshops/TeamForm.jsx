/* eslint-disable no-unused-vars */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useState, useCallback } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/motion-checkbox";
import { isEmailDomainBlocked } from "@/lib/blockedEmailDomains";


const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  number: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  designation: z.string().min(2, { message: "Designation is required." }),
  company: z.string().min(2, { message: "Company name is required." }),
  terms: z.boolean().refine((val) => val === true, {
     message: "You must agree to the terms and conditions."
  }),
});

export default function TeamForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      number: "",
      designation: "",
      company: "",
      terms: false,
    },
  });
  const { control, handleSubmit, setError, clearErrors } = form;
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setIsSubmitted] = useState(false);
  const [notsubmitted, setIsNotSubmitted] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Email verification function - only called on blur or submit
  const verifyEmail = useCallback(async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailVerified(false);
      return false;
    }

    // Check if email domain is blocked (free email providers)
    if (isEmailDomainBlocked(email)) {
      setEmailVerified(false);
      setError("email", {
        type: "manual",
        message: "Please use your business email address to continue.",
      });
      return false;
    }

    setEmailVerifying(true);
    clearErrors("email");

    try {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setEmailVerified(true);
        clearErrors("email");
        return true;
      } else {
        setEmailVerified(false);
        let errorMessage = "Please enter a valid business email address.";

        if (data.didYouMean) {
          errorMessage = `Did you mean ${data.didYouMean}?`;
        } else if (data.status === "invalid") {
          errorMessage = "This email address is invalid.";
        } else if (data.status === "spamtrap" || data.status === "abuse") {
          errorMessage = "This email address cannot be used.";
        } else if (data.freeEmail) {
          errorMessage = "Please use your business email address.";
        }

        setError("email", {
          type: "manual",
          message: errorMessage,
        });
        return false;
      }
    } catch (error) {
      console.error("Email verification error:", error);
      setEmailVerified(true);
      clearErrors("email");
      return true;
    } finally {
      setEmailVerifying(false);
    }
  }, [setError, clearErrors]);

  const handleEmailBlur = useCallback(async (email) => {
    await verifyEmail(email);
  }, [verifyEmail]);

  const onSubmit = async (data) => {
    // If email hasn't been verified yet, verify it now
    if (!emailVerified && !emailVerifying) {
      const isValid = await verifyEmail(data.email);
      if (!isValid) {
        return;
      }
    }

    if (emailVerifying) {
      setError("email", {
        type: "manual",
        message: "Please wait for email verification to complete.",
      });
      return;
    }

    if (!emailVerified) {
      setError("email", {
        type: "manual",
        message: "Please enter a valid business email address.",
      });
      return;
    }

    setIsLoading(true);

    const formattedData = {
      ...data,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    };

    // console.log(data);

    try {
      const res = await fetch("/api/workshopform", {
        method: "POST",
        body: JSON.stringify(formattedData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to send message");

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 7000);
      // console.log(data)
      form.reset();
      setEmailVerified(false);
      setEmailVerifying(false);
    } catch (error) {
      setIsNotSubmitted(true);
      setTimeout(() => setIsNotSubmitted(false), 7000);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className="h-fit max-md:pb-[10%] max-sm:pb-0" id="formoem">
      <div className="w-full h-full ">
        <div className="w-full flex flex-col gap-[2vw]  max-md:px-[2vw] fadeup">
          <Form {...form}>
            <form
              autoComplete="off"
              className="space-y-[1vw] max-sm:space-y-[4vw] max-md:space-y-[4vw]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                     
                      <div className='group relative w-full'>
                        <label
                          htmlFor="name"
                          className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium ml-[1.5vw] max-md:ml-[3vw]'
                        >
                          <span className='bg-white inline-flex px-1 text-[1.15vw] max-md:text-[2.7vw] max-sm:text-[3.5vw] text-[#111111]'>Name*</span>
                        </label>
                        <Input {...field} autoComplete="off" id="name" type='text' placeholder=' ' className='dark:bg-transparent border-[#B0B0B080] border  h-15 !bg-white  !rounded-full  pl-[2vw] max-sm:pl-[6vw] max-md:pl-[5vw] ' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='group relative w-full'>
                        <label
                          htmlFor="email"
                          className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium ml-[1.5vw] max-md:ml-[3vw]'
                        >
                          <span className='bg-white inline-flex px-1 text-[1.15vw] max-md:text-[2.7vw] max-sm:text-[3.5vw] text-[#111111]'>Business Email*</span>
                        </label>
                        <Input
                          {...field}
                          autoComplete="off"
                          id="email"
                          type='email'
                          placeholder=' '
                          onBlur={(e) => {
                            field.onBlur();
                            handleEmailBlur(e.target.value);
                          }}
                          className='dark:bg-transparent border-[#B0B0B080] border h-15  !bg-white  !rounded-full  pl-[2vw] max-sm:pl-[6vw] max-md:pl-[5vw] '
                        />
                        {emailVerifying && (
                          <span className="absolute right-[2vw] top-1/2 transform -translate-y-1/2 text-[#111111] text-[0.9vw] max-sm:text-[3vw] max-md:text-[2vw] max-md:right-[4vw]">
                            Verifying...
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='group relative w-full'>
                        <label
                          htmlFor="designation"
                          className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium ml-[1.5vw] max-md:ml-[3vw]'
                        >
                          <span className='bg-white inline-flex px-1 text-[1.15vw] max-md:text-[2.7vw] max-sm:text-[3.5vw] text-[#111111]'>Designation*</span>
                        </label>
                        <Input {...field} autoComplete="off" id="designation" type='text' placeholder=' ' className='dark:bg-transparent border-[#B0B0B080] border  h-15 !bg-white  !rounded-full  pl-[2vw] max-sm:pl-[6vw] max-md:pl-[5vw] ' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='group relative w-full'>
                        <label
                          htmlFor="company"
                          className='origin-start text-muted-foreground group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-2 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium ml-[1.5vw] max-md:ml-[3vw]'
                        >
                          <span className='bg-white inline-flex px-1 text-[1.15vw] max-md:text-[2.7vw] max-sm:text-[3.5vw] text-[#111111]'>Company Name*</span>
                        </label>
                        <Input {...field} autoComplete="off" id="company" type='text' placeholder=' ' className='dark:bg-transparent border-[#B0B0B080] border h-15 !bg-white  !rounded-full  pl-[2vw] max-sm:pl-[6vw] max-md:pl-[5vw] ' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        placeholder="Phone Number*"
                        autoComplete="off"
                        defaultCountry="IN"
                        international
                        {...field}
                        className="placeholder:text-[1.05vw] placeholder:text-[#111111] max-sm:placeholder:text-[3.5vw] max-md:placeholder:text-[2.7vw] allForm !bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex gap-[1vw] justify-start  ">
                <FormField
                  control={control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex items-center justify-center max-md:gap-[3vw] max-sm:gap-3 gap-3 pl-[0.5vw]">
                         <Checkbox id="checkbox-teamform"  aria-label="checkbox"
                          checked={field.value}
                          onCheckedChange={field.onChange}  className="data-[state=checked]:bg-[#f16b0d] mt-[0.5vw]    max-md:scale-[1.5] max-sm:scale-[1] max-md:mt-[2vw] cursor-pointer max-md:rounded-[0.5vw] border-black/60" />
                        <label className="text-[1.15vw] mt-2   text-[#111111] max-sm:text-[3.5vw] max-md:text-[2.7vw] max-md:mt-5">
                          I agree to{" "}
                          <a href="/privacy-policy" className="border-b border-black/40 hover:border-primary-2 duration-300 ease-in transition-all">
                            Privacy Policy{" "}
                          </a>{" "}
                          and{" "}
                          <a href="/terms-and-conditions" className="border-b border-black/40 hover:border-primary-2 duration-300 ease-in transition-all">
                            Terms and Conditions
                          </a>
                          .
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <div className="flex items-center max-sm:mt-[10vw] justify-start max-sm:justify-center">

              <Button
                type="submit"
                aria-label="submit form"
                className="cursor-pointer mt-[3vw]  bg-primary pb-[3vw] px-0 rounded-full  max-sm:mt-0 max-sm:py-[7vw] max-md:mt-[8vw] "
              >
                <div
                  className={` relative flex items-center justify-center h-fit min-w-[13vw] px-[2vw] rounded-full overflow-hidden  group max-md:h-auto  max-md:py-[3vw] max-md:px-[4.5vw] max-sm:min-w-[55vw] max-sm:px-[7vw] max-sm:py-[4vw] text-white `}
                >
                 
                  <div className="overflow-clip leading-[1.4] mt-[2vw]  max-sm:mt-0 z-[1]">
                    <p
                      className={`text-[1.145vw] leading-[1.4] buttonTextShadow max-sm:text-[4vw] max-md:text-[2.7vw] `}
                    >
                      {" "}
                      {isLoading ? "Sending..." : "Submit"}
                    </p>
                  </div>
                 
                </div>
              </Button>
              </div>
              {submitted && (
                <p className="text-[#111111] text-sm mt-2">
                  ✅ Form submitted successfully!
                </p>
              )}

              {notsubmitted && (
                <p className="text-red-600 text-sm mt-2">
                  ❌ Error sending message. Please try again.
                </p>
              )}
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
