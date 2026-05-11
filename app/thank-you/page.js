import Copy from "@/components/Animations/Copy";
import HeadingAnim from "@/components/Animations/HeadingAnim";
import Layout from "@/components/Layout/Layout";
import React from "react";

const page = () => {
  return (
    <Layout>
      <section className="w-screen h-screen flex flex-col justify-center items-center">
        <HeadingAnim>

        <h1 className="text-110 text-[#0A1B4B]">Thank You</h1>
        </HeadingAnim>
        <Copy delay={0.5}>
        <p>The form has been submitted</p>
        <p>Our Team will contact you shortly.</p>
        </Copy>
      </section>
    </Layout>
  );
};

export default page;
