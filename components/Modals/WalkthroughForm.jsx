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

/* ---------------- INPUT STYLES ---------------- */
const inputClassName = "placeholder:text-[1.05vw] pl-[2.5vw] bg-white/80 border border-[#111] rounded-full placeholder:text-[#111] text-[#111] h-[4.5vw] max-sm:placeholder:text-[3.5vw] max-md:placeholder:text-[2.7vw] max-md:pl-[4vw] max-sm:pl-[5vw] max-sm:h-[14vw] max-md:h-[9vw] focus:border-primary-blue focus:outline-none transition-colors";

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

  /* MODAL CONTROLS */
  const {
    walkthroughTarget,
    markWalkthroughCompleted,
    setOpenWalkThrough,
    setOpenWalkthroughIframe,
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

      /* Close form and open iframe */
      markWalkthroughCompleted(walkthroughTarget);
      setOpenWalkThrough(false);
      setTimeout(() => {
        setOpenWalkthroughIframe(true);
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
      <section className="overflow-hidden h-fit" id="walkthrough-form">
        <div className="w-full flex flex-col">
          <Form {...form}>
            <form
              autoComplete="off"
              className="space-y-[1.2vw] max-sm:space-y-[4vw] max-md:space-y-[3vw]"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Name */}
              <FormField
                name="name"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Name*"
                        autoComplete="off"
                        {...field}
                        className={inputClassName}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-[0.9vw] pl-[1vw] max-sm:text-[3vw] max-md:text-[2vw]" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                name="email"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Business Email*"
                          autoComplete="off"
                          {...field}
                          onBlur={(e) => {
                            field.onBlur();
                          }}
                          className={inputClassName}
                        />
                        {emailVerifying && (
                          <span className="absolute right-[2vw] top-1/2 transform -translate-y-1/2 text-[#666] text-[0.9vw] max-sm:text-[3vw] max-md:text-[2vw] max-md:right-[4vw]">
                            Verifying...
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-[0.9vw] pl-[1vw] max-sm:text-[3vw] max-md:text-[2vw]" />
                  </FormItem>
                )}
              />

              {/* Designation */}
              <FormField
                name="designation"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Designation*"
                        autoComplete="off"
                        {...field}
                        className={inputClassName}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-[0.9vw] pl-[1vw] max-sm:text-[3vw] max-md:text-[2vw]" />
                  </FormItem>
                )}
              />

              {/* Company Name */}
              <FormField
                name="company"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Company Name*"
                        autoComplete="off"
                        {...field}
                        className={inputClassName}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-[0.9vw] pl-[1vw] max-sm:text-[3vw] max-md:text-[2vw]" />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                name="number"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        placeholder="Phone Number*"
                        autoComplete="off"
                        defaultCountry="IN"
                        international
                        {...field}
                        className="walkthrough-phone"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-[0.9vw] pl-[1vw] max-sm:text-[3vw] max-md:text-[2vw]" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-[1.5vw] max-sm:pt-[6vw] max-md:pt-[3vw]">
                <Button
                  type="submit"
                  aria-label="submit form"
                  className="cursor-pointer px-0 bg-transparent hover:bg-transparent"
                >
                  <div className="relative inline-flex items-center justify-center h-[4vw] min-w-[16vw] px-[2.5vw] rounded-full overflow-hidden text-white group max-sm:h-[14vw] max-sm:px-[8vw] max-sm:min-w-[40vw] max-md:h-[8vw] max-md:px-[5vw] max-md:min-w-[25vw] hover:scale-95 transition-transform duration-300">
                    <span className="text-[1.3vw] font-heading tracking-wide z-[1] max-sm:text-[4.5vw] max-md:text-[2.8vw]">
                      {isLoading ? "Sending..." : "Submit"}
                    </span>
                    <span className="absolute inset-0 bg-[#f16b0d] rounded-full" />
                  </div>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>

      {/* Success Toast */}
      {submitted && (
        <p className="fixed top-[10%] left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg z-[1000] shadow-lg">
          Form submitted successfully!
        </p>
      )}

      {/* Error Toast */}
      {notsubmitted && (
        <p className="fixed top-[10%] left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg z-[1000] shadow-lg">
          Error sending message. Please try again.
        </p>
      )}
    </>
  );
}
