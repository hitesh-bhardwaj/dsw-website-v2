/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
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
// import { useModal } from "../Common/ModalProvider";
import { isEmailDomainBlocked } from "@/lib/blockedEmailDomains";
import { useModal } from "../ModalProvider";

/* ---------------- SCHEMA ---------------- */
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  number: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  designation: z.string().min(2, { message: "Designation is required." }),
  company: z.string().min(2, { message: "Company name is required." }),
});

export default function WalkthroughForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      number: "",
      designation: "",
      company: "",
    },
  });

  const { control, handleSubmit, setError, clearErrors } = form;

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setIsSubmitted] = useState(false);
  const [notsubmitted, setIsNotSubmitted] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  /* 🔑 MODAL CONTROLS */
  const {
   walkthroughTarget,
    markWalkthroughCompleted,
    setOpenWalkThrough,
    setOpenWalkthroughIframe, // 👈 NEW (STATE ONLY)
  } = useModal();

  /* ---------------- EMAIL VERIFICATION ---------------- */
  const verifyEmail = useCallback(
    async (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setEmailVerified(false);
        return false;
      }

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
        }

        setEmailVerified(false);
        setError("email", {
          type: "manual",
          message: "Please enter a valid business email address.",
        });
        return false;
      } catch (error) {
        setEmailVerified(true);
        clearErrors("email");
        return true;
      } finally {
        setEmailVerifying(false);
      }
    },
    [setError, clearErrors]
  );

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data) => {
    if (!emailVerified && !emailVerifying) {
      const ok = await verifyEmail(data.email);
      if (!ok) return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/walkthroughform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          pageUrl: window.location.href,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      /* 🔑 ONLY NEW LOGIC (NO UI CHANGE) */
      markWalkthroughCompleted(walkthroughTarget);
      setOpenWalkThrough(false);         // close form
      setTimeout(() => {
        setOpenWalkthroughIframe(true);     // open iframe
      }, 300);

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);

      form.reset();
    } catch (error) {
      setIsNotSubmitted(true);
      setTimeout(() => setIsNotSubmitted(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <section
        className="overflow-hidden h-fit max-md:pb-[4%] max-sm:pb-0"
        id="formoem"
      >
      
        <div className="w-full flex flex-col gap-[2vw]">
            <Form {...form}>
              <form
                autoComplete="off"
                className="space-y-[1vw] max-sm:space-y-[4vw] max-md:space-y-[3vw]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="formfade">
                <FormField name="name" control={control}  render={({ field }) => (
                  <FormItem><FormControl>
                    <Input placeholder="Name*" autoComplete="off" {...field}
                      className="placeholder:text-[1.05vw] pl-[2vw] bg-black/5 border border-white/30 rounded-full placeholder:text-[#e8e8e8] max-sm:placeholder:text-[3.5vw] max-md:placeholder:text-[2.7vw] max-md:pl-[4vw] max-sm:pl-[5vw]" />
                  </FormControl><FormMessage /></FormItem>
                )} />

                </div>
                <div className="formfade">

                <FormField name="email" control={control}  render={({ field }) => (
                  <FormItem><FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Business Email*"
                        autoComplete="off"
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          // handleEmailBlur(e.target.value);
                        }}
                        className="placeholder:text-[1.05vw] pl-[2vw] bg-black/5 border border-white/30 rounded-full placeholder:text-[#e8e8e8] max-sm:placeholder:text-[3.5vw] max-md:placeholder:text-[2.7vw] max-md:pl-[4vw] max-sm:pl-[5vw]"
                      />
                      {emailVerifying && (
                        <span className="absolute right-[2vw] top-1/2 transform -translate-y-1/2 text-[#e8e8e8] text-[0.9vw] max-sm:text-[3vw] max-md:text-[2vw] max-md:right-[4vw]">
                          Verifying...
                        </span>
                      )}
                    </div>
                  </FormControl><FormMessage /></FormItem>
                )} />
                </div>

                <div className="formfade">

                <FormField name="designation" control={control}  render={({ field }) => (
                  <FormItem><FormControl>
                    <Input placeholder="Designation*" autoComplete="off" {...field}
                      className="placeholder:text-[1.05vw] pl-[2vw] bg-black/5 border border-white/30 rounded-full placeholder:text-[#e8e8e8] max-sm:placeholder:text-[3.5vw] max-md:placeholder:text-[2.7vw] max-md:pl-[4vw] max-sm:pl-[5vw]" />
                  </FormControl><FormMessage /></FormItem>
                )} />
                </div>

                <div className="formfade">

                <FormField name="company" control={control}  render={({ field }) => (
                  <FormItem><FormControl>
                    <Input placeholder="Company Name*" autoComplete="off" {...field}
                      className="placeholder:text-[1.05vw] pl-[2vw] bg-black/5 border border-white/30 rounded-full placeholder:text-[#e8e8e8] max-sm:placeholder:text-[3.5vw] max-md:placeholder:text-[2.7vw] max-md:pl-[4vw] max-sm:pl-[5vw]" />
                  </FormControl><FormMessage /></FormItem>
                )} />
                </div>

                <div className="formfade">

                <FormField name="number" control={control}  render={({ field }) => (
                  <FormItem><FormControl>
                    <PhoneInput placeholder="Phone Number*" autoComplete="off" defaultCountry="IN" international {...field}
                      className="placeholder:text-[1.05vw] placeholder:text-[#e8e8e8] max-sm:placeholder:text-[3.5vw] max-md:placeholder:text-[2.7vw] demophone" />
                  </FormControl><FormMessage /></FormItem>
                )} />
                </div>
               <div className="formfade">
                <Button type="submit" aria-label="submit form" 
                  className="cursor-pointer mt-[3vw] max-md:mt-[5vw] pb-[3vw] max-sm:mt-[10vw] max-sm:pb-[8vw] px-0 ">
                  <div className="relative inline-flex items-center h-[4vw] min-w-[10vw] px-[2vw] gap-3 rounded-full overflow-hidden text-white-200 group max-sm:h-fit max-sm:py-[4vw] max-sm:px-[6vw] max-sm:min-w-[30vw] max-md:px-[4.5vw] max-md:py-[3vw] max-md:h-fit max-sm:gap-[4vw]">
                    <span className="bg-foreground rounded-full h-2 w-2 max-sm:w-[2.5vw] max-sm:h-[2.5vw] z-[1] max-md:w-[1.2vw] max-md:h-[1.2vw]" />
                    <div className="overflow-clip leading-[1.4] mt-[-4px] max-sm:mt-0 z-[1]">
                      <p className="text-[1.145vw] leading-[1.4] buttonTextShadow max-sm:text-[4vw] max-md:text-[2.7vw]">
                        {isLoading ? "Sending..." : "Submit"}
                      </p>
                    </div>
                    <span className="absolute inset-0 group-hover:scale-95 transition-transform duration-500 bg-gradient-to-r from-primary-2 to-primary-3 rounded-full" />
                  </div>
                </Button>

               </div>
              </form>
            </Form>
          </div>
      </section>

      {submitted && (
        <p className="fixed top-[20%] left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded">
          Form submitted successfully!
        </p>
      )}

      {notsubmitted && (
        <p className="fixed top-[20%] left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded">
          ❌ Error sending message. Please try again.
        </p>
      )}
    </>
  );
}
