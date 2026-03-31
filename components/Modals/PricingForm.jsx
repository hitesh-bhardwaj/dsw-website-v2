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

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  number: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  designation: z.string().min(2, { message: "Designation is required." }),
  company: z.string().min(2, { message: "Company name is required." }),
});

const inputClassName =
  "placeholder:text-[1.05vw] pl-[2.5vw] bg-white/80 border rounded-full placeholder:text-[#111] text-[#111] h-[4.5vw] max-sm:placeholder:text-[3.5vw] max-md:placeholder:text-[2.7vw] max-md:pl-[4vw] max-sm:pl-[5vw] max-sm:h-[14vw] max-md:h-[9vw] focus:border-primary-blue focus:outline-none transition-colors border-transparent";

export default function PricingForm() {
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

  const { setOpenPricing, setFormSubmitted } = useModal();

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

  const onSubmit = async (data) => {
    if (!emailVerified && !emailVerifying) {
      const ok = await verifyEmail(data.email);
      if (!ok) return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/pricingform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          pageUrl: window.location.href,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setFormSubmitted(true);
      setOpenPricing(false);

      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);

      form.reset();
      setEmailVerified(false);
    } catch (error) {
      setIsNotSubmitted(true);
      setTimeout(() => setIsNotSubmitted(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="h-fit" id="pricing-form">
        <div className="flex w-full flex-col">
          <Form {...form}>
            <form
              autoComplete="off"
              className="space-y-[1.2vw] max-md:space-y-[3vw] max-sm:space-y-[3vw]"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                    <FormMessage className="pl-[1vw] text-[0.9vw] text-red-500 max-md:text-[2vw] max-sm:text-[3vw]" />
                  </FormItem>
                )}
              />

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
                          onBlur={() => field.onBlur()}
                          className={inputClassName}
                        />
                        {emailVerifying && (
                          <span className="absolute right-[2vw] top-1/2 -translate-y-1/2 transform text-[0.9vw] text-[#666] max-md:right-[4vw] max-md:text-[2vw] max-sm:text-[3vw]">
                            Verifying...
                          </span>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="pl-[1vw] text-[0.9vw] text-red-500 max-md:text-[2vw] max-sm:text-[3vw]" />
                  </FormItem>
                )}
              />

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
                    <FormMessage className="pl-[1vw] text-[0.9vw] text-red-500 max-md:text-[2vw] max-sm:text-[3vw]" />
                  </FormItem>
                )}
              />

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
                    <FormMessage className="pl-[1vw] text-[0.9vw] text-red-500 max-md:text-[2vw] max-sm:text-[3vw]" />
                  </FormItem>
                )}
              />

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
                    <FormMessage className="pl-[1vw] text-[0.9vw] text-red-500 max-md:text-[2vw] max-sm:text-[3vw]" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                aria-label="submit pricing form"
                className="mt-[2vw] cursor-pointer rounded-full bg-primary px-0 pb-[2.8vw] pt-[0.8vw] max-md:mt-[8vw] max-md:px-[3.5vw] max-md:py-[4.5vw] max-sm:mx-auto max-sm:mt-0 max-sm:py-[7vw]"
              >
                <div className="group relative flex h-fit min-w-[10vw] items-center justify-center overflow-hidden rounded-full px-[2vw] max-md:h-auto max-md:px-[4.5vw] max-md:py-[3vw] max-sm:min-w-[30vw] max-sm:px-[7vw] max-sm:py-[4vw]">
                  <span className="text-22 z-[1] mt-[2vw] block text-white max-md:mt-0 max-sm:text-[4vw]">
                    {isLoading ? "Sending..." : "Submit"}
                  </span>
                  <span className="absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-95" />
                </div>
              </Button>
            </form>
          </Form>
        </div>
      </section>

      {submitted && (
        <p className="fixed left-1/2 top-[10%] z-[1000] -translate-x-1/2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
          Form submitted successfully!
        </p>
      )}

      {notsubmitted && (
        <p className="fixed left-1/2 top-[10%] z-[1000] -translate-x-1/2 rounded-lg bg-red-500 px-6 py-3 text-white shadow-lg">
          Error sending message. Please try again.
        </p>
      )}
    </>
  );
}