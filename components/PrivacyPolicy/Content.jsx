'use client'

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
import HeadingAnim from "../Animations/HeadingAnim";

export default function Content() {
  const navLinks = [
     { id: "#intro",text: "Introduction",},
      { id: "#collect-and-process", text: " We Collect and process" },
      { id: "#governing-law", text: "Governing law" },
      { id: "#legal-requirements", text: "Legal Requirements" },
      { id: "#control-of-your-information", text: "Control of your information" },
      { id: "#how-we-protect", text: "How we protect your information" },
      { id: "#link-to-other-websites", text: "Links to other websites" },
      { id: "#public-forums", text: "Public forums" },
      { id: "#payment-processing", text: "Payment processing",},
      { id: "#enforcement-and-dispute", text: "Information about enforcement and dispute resolution",},
      { id: "#changes-to-privacy-policy", text: "Changes to this Privacy Policy",},
      { id: "#contact-us", text: "Contact us",},
      { id: "#use-of-cookies", text: "Use of Cookies",},
      { id: "#types-of-cookies", text: "We use the following types of cookies:",},
      {id:"#disabling-cookies", text:"Disabling cookies"}

]

  const [isActive, setIsActive] = useState(null);

  const [mob, setMob] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMob(window.innerWidth <= 1024);
    };
    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = (id) => {
    setIsActive(id);
    gsap.to(window, {
      duration: 2,
      scrollTo: {
        y: id,
        offsetY: 80,
      },
      ease: "power3.inOut",
    });
  };

  useEffect(() => {
     const triggers = navLinks.map((item) => {
          const id = item.id.replace("#", "");
      
          return ScrollTrigger.create({
            trigger:`#${id}`,
            start: "top center",
            end: "bottom center",
            onEnter: () => setIsActive(item.id),
            onEnterBack: () => setIsActive(item.id),
          });
        });
    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
    <section className="mt-[-10vh] max-sm:my-0 relative z-[10]">
    <div className="w-full h-full flex relative  justify-between px-[5vw] py-[7%]">
      {!mob && (
        <div className="w-[25%] flex flex-col gap-[.5vw]  capitalize py-[8vw] sticky top-[6%] h-fit max-md:hidden fadeup">
        {navLinks.map((item) => (
          <p
            key={item.id}
            onClick={() => handleScroll(item.id)}
            className={`nav-link w-fit cursor-pointer duration-300 ease-in text-[1vw] ${
              isActive == item.id ? "text-primary-2" : "text-[#BBBBBB]"
            }`}
          >
            {item.text.length > 20
              ? item.text.split(" ").slice(0, 3).join(" ") + "..."
              : item.text}
            </p>
          ))}
        </div>
      )}
      <div
        className="w-[60%] h-fit py-[8vw] gap-[5vw] text-24 flex flex-col max-md:w-full max-md:gap-[10vw]"
        
      >
        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="intro"> 
        <p className="text-white-300 fadeup">
         This Privacy Policy (“Privacy Policy”) applies to the corporate website accessible at <a href="#" className="text-primary-2"> https://www.datasciencewizards.ai/ </a> (“Website”) and the cloud-based technology learning platform also accessible through that website, the video players used to view Data Science Wizards courses, and the mobile applications (“Platform”, and together with the Website, collectively, the “Site”), all owned and operated by Data Science Wizards Pvt Ltd company, (“Data Science Wizards”, “we”, or “us”). This Privacy Policy describes how Data Science Wizards collects and uses personal information collected through the Website and the Platform. It also describes the choices available to you regarding the use of, your access to, and how to update and correct your personal information. Please read the following carefully to understand our views and practices regarding your personal information and how we will treat it. By engaging with the Website and the Platform you acknowledge you have read and understood this Privacy Policy. Data protection laws require companies to describe their role and responsibility when handling personal information. This Privacy Policy sets out:
         </p>
         <ul className="space-y-[1vw] list-disc marker:text-sm pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw] fadeup text-white-300">
          <li>The information we collect about you</li>
          <li>How we use the information we collect</li>
          <li>Who we give your information to</li>
          <li>Control of your information</li>
          <li>How we protect your information</li>
          <li>Links to other websites</li>
          <li>Public forums</li>
          <li>Payment processing</li>
          <li>Information about enforcement and dispute resolution</li>
          <li>Changes to this Privacy Policy</li>
          <li>Contact us</li>
          <li>Use of Cookies</li>
          <li>When you engage with the Platform because your employer has signed up to a Business plan or Corporate plan (as defined in our Terms of Use at <a href="#" className="text-primary-2">https://www.datasciencewizards.ai/ </a> ), then your employer is the data controller with respect to the user information it provides to us. This information typically includes first name, last name, contact details and business email address.</li>
          <li>When you sign up as a user of the Platform via an Individual Plan (as defined in the Terms of Use), Data Science Wizards is the data controller for all personal information provided by that user and collected by the Platform as the user accesses and uses it.</li>
         </ul>
         <p className="text-white-300 fadeup">The information we collect about you. We value your trust. In order to honour that trust, Data Science Wizards adheres to ethical standards in gathering, using, and safeguarding any information you provide.</p>
        </div>

         <HeadingAnim>


<h2 className="text-44 text-white-200 headingAnim" id="collect-and-process">We collect and process the following personal information from you:</h2>
         </HeadingAnim>
         <div className="space-y-[2vw] max-md:space-y-[4vw]" id="info-you-give"> 
        <h3 className="text-44 text-white-200 fadeup">
        Information you give to us:
        </h3>
        <p className="text-white-300 fadeup">
        This is information about you that you give us directly when you interact with us. You may give it to us by filling out a form on our Site, corresponding with us by phone, e-mail, or at an in-person event. It includes information necessary to register for a subscription, pay for a subscription, or place an order for other services we provide. It also includes information shared when you participate in a discussion board, share on social media via our Site, enter a competition or promotion, submit a query, report feedback about or a problem within our Site, or any of the other Interactive Services (defined in the Terms of Use). When you create an account for our Platform, we require you provide first name, last name, contact details and email address. When you purchase a subscription or courses, we will need payment and billing information, often including an address, payment details and credit card information. Additionally, you can provide additional personal information to complete a profile within our system.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="info-we-collect"> 
        <h3 className="text-44 text-white-200 fadeup">
       Information we collect about you from your use of our Site:
        </h3>
        <p className="text-white-300 fadeup">
         We will automatically collect information from you each time you visit our Site. This includes technical information, information about your visit, and information about your activity on our Site such as courses searched and viewed, page response times, download errors, length of visit to certain pages, page interaction information (such as scrolling, clicks, and mouseovers), methods to browse to and away from a page, and methods used to contact our sales and support teams. Technical information may also include the Internet protocol address used to connect your computer to the Internet, your login information, browser type and version, time zone setting, browser plug-in types and versions, operating systems, and device platform.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="info-we-receive"> 
        <h3 className="text-44 text-white-200 fadeup">
       Information we receive from other sources:
        </h3>
        <p className="text-white-300 fadeup">
         This is information we receive about you from third parties that we work closely with to provide, promote, and improve our services. These third parties include business partners, vendors who assist in technical and payment services, advertising networks, analytics providers, and search information providers. How we use the information we collect
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="info-you-give-2"> 
        <h3 className="text-44 text-white-200 fadeup">
       Information you give to us:
        </h3>
        <p className="text-white-300 fadeup">
         Data Science Wizards uses the personal information you provide in a manner that is consistent with this Privacy Policy. We use your personal information to provide our services on our Site, including services arising from any obligations set forth in a contract between you and us. These services may include providing access to our course library, administration of your account, billing, and notifying you of changes to our service or your account. This data will also be used to allow you to participate in the interactive features of our Site or to provide you with information you may have requested from us, including whitepapers, access to webinars, or the like. We also use your personal information together with other personally non-identifiable information to help us better understand our users, to personalize and improve your experience with our Site, and to improve the content and functionality of our Site. This may include providing information about our goods, products, training material and services that we feel may interest you and enhance your interaction with our Site. We will communicate with you about these goods, products, training and services via email, direct mail, telephone, or on our Site. These communications may include newsletters, promotional emails, product updates, or market research requests. We will use your information for this purpose only if you have given your consent to receive marketing material from us at the point we collected your information, where required by law, or otherwise in our legitimate interests, provided these interests do not override your right to object to such communications.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="info-we-collect-2"> 
        <h3 className="text-44 text-white-200 fadeup">
      Information we collect about you from your use of our Site:
        </h3>
        <p className="text-white-300 fadeup">
         We will use this information in our legitimate interests (where we have considered these are not overridden by your rights), to administer our Site, and for internal operations, including troubleshooting, data analysis, testing, research, and statistical survey purposes. We will also use this information to keep our Site safe and secure, for measuring the effectiveness of how we present content and how we market and advertise. We use Internet protocol addresses and non-personally identifiable information in our log files to analyse trends, to administer our Site, to track users’ movements in and around our Site, and to gather demographic information about our user base as a whole. We also utilize artificial intelligence, machine learning technologies and analytics to understand user behaviours and to provide user-specific recommendations and other personalization of our Site experience.
        </p>
        </div>

         <div className="space-y-[2vw] max-md:space-y-[4vw]" id="info-we-receive-2"> 
        <h3 className="text-44 text-white-200 fadeup">
      Information we receive from other sources:
        </h3>
        <p className="text-white-300 fadeup">
         We will combine this information with information you give to us and information we collect about you in our legitimate interests (where we have considered that these are not overridden by your rights). We will use this information and the combined information for the purposes set out above (depending on the types of information we receive). Who we give your information to We consider your personal information to be a vital part of our relationship with you and do not sell your personal information to third parties. There are, however, certain circumstances in which we may share your personal information with certain third parties, as follows:
        </p>
        </div>

         <div className="space-y-[2vw] max-md:space-y-[4vw]" id="agents-consultants"> 
        <h3 className="text-44 text-white-200 fadeup">
      Agents, Consultants and Related Third Parties:
        </h3>
        <p className="text-white-300 fadeup">
        We sometimes hire other companies to perform certain business-related functions, such as sending email on our behalf, payment processing, or conducting market research. When we employ another company to perform a function of this nature, we only provide them with the information that they need to perform their specific function. These companies are not permitted to use any personal information that we share with them for any other purpose aside from providing services to us. We also share information with third parties about customer engagement on our platform. For example, when you view a course about a technology vendor, we share information such as the number of course minutes viewed, hands-on course engagement, and other related data with that technology vendor. We share this information and receive feedback from those third parties in order to improve the content available on our platform and better collaborate with our partners to jointly help companies and individuals address their skill development needs. Unless we specifically ask for and you grant consent, the data we provide to third parties does not include personal information.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="business-plans"> 
        <h3 className="text-44 text-white-200 fadeup">
      Business Plans and Company Partnership Subscriptions:
        </h3>
        <p className="text-white-300 fadeup">
       We partner with certain third parties to provide our services to their employees or their community members. As part of such partnerships, a third party may pay for the subscription for its employees or community members or otherwise contract with Data Science Wizards to make your subscription available to you, and Data Science Wizards may share information about your use of our services with the third party. If your subscription was provided by your employer or community sponsor (including Company Partnerships as defined in the Terms of Use), we may share information you provide, or information we may otherwise collect through your registration and use of our services, with such third party. This information may include course viewing history, course viewing time, course or assessment completion, course quality ratings and feedback, certifications, performance-related metrics, and other personal information.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="business-transfers"> 
        <h3 className="text-44 text-white-200 fadeup">
      Business Transfers:
        </h3>
        <p className="text-white-300 fadeup">
       As we develop our business, we might sell or buy businesses or assets. Your personal information may be transferred to a buyer or other successor in the event of a corporate sale, merger, reorganization, dissolution, or similar event in which personal information held by us about our Site users is among the assets transferred.
        </p>
        </div>


        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="governing-law"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Governing Law and Dispute Resolution
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       This Policy shall be governed by and construed in accordance with the laws of the Republic of India. Subject to arbitration, the courts at Mumbai shall have exclusive jurisdiction in relation to any disputes arising out of or in connection with this Policy. If any dispute arises between the Company and You in connection with or arising out of the validity, interpretation, implementation or alleged breach of any provision of the Policy, such dispute shall be referred to arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996 for the time being in force. Arbitration shall be conducted by one (1) arbitrator mutually appointed by the Company and You. The seat of arbitration shall be Mumbai, Maharashtra. The language of the arbitration proceedings and of all written decisions and correspondence relating to the arbitration shall be English.
        </p>
        </div>

 <div className="space-y-[2vw] max-md:space-y-[4vw]" id="legal-requirements"> 
   <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Legal Requirements:
        </h2>
   </HeadingAnim>
        <p className="text-white-300 fadeup">
       In certain situations, Data Science Wizards may be required to disclose personal information in response to lawful requests by public authorities, including meeting national security or law enforcement requirements. We reserve the right to disclose your personal information as required by law and when we believe that disclosure is necessary to protect our rights or to comply with a judicial proceeding, court order, or similar legal process served on us or our Site. We will take reasonable steps to ensure that we only collect that personal information that is relevant for the purposes for which it is to be used. Furthermore, we will not process your personal information in a way that is incompatible with these purposes.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="control-of-your-information"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Control of your information
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       If you would like to discontinue receiving communications from us, you may update your email preferences by using the “Unsubscribe” link found in emails we send to you or by contacting us at datasciencewizards.ai. Please note that we may not include the opt-out information in e-mails that are transactional in nature and are not marketing communications (i.e., e-mails concerning your order, the website’s Terms of Use, etc.). You will not have the ability to opt-out of receiving transactional emails. If you have questions or concerns regarding a transactional please contact us.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="how-we-protect"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      How we protect your information
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       The security of your personal information is important to us. When you enter sensitive information (such as a credit card number or payment details) on our checkout page, your information is sent over an authenticated and encrypted connection using Transport Layer Security (TLS) through a  third party payment gateway. We store your personal information only on servers with limited access that are located in controlled facilities and use a variety of technologies and procedures intended to protect your personal information from loss, misuse, unauthorized access, disclosure, alteration and destruction. Nonetheless, no communication via the Internet can ever be 100% secure, and no security measures can ever be assured to be effective. Accordingly, you are advised to use caution and discretion when determining what personal information to disclose to us. If you have any questions about security on our Site, contact us as follows: Email: <a href="mailto:contact@datasciencewizards.ai" className="text-primary-2"> contact@datasciencewizards.ai </a>
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="link-to-other-websites"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Links to other websites
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       This Privacy Policy applies only to our Site. The Site may contain links to other web sites not operated or controlled by us. The policies and procedures described here do not apply to web sites or other services that Data Science Wizards does not operate or control. These links from our Site do not imply that we endorse or have reviewed those web sites or other services. We suggest contacting those services directly for information on their privacy policies.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="public-forums"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Public forums
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       The Site may, from time to time, make chat rooms, message boards, news groups, or other public forums available to its users, whether by way of our own services or by way of the services or features of a third party. Any information that is disclosed in these areas becomes public information and you should exercise caution when using these areas and avoid posting any personal or sensitive information. If a separate login is required to use these areas, please be aware that you may need to also log out separately.
        </p>
        </div>

         <div className="space-y-[2vw] max-md:space-y-[4vw]" id="payment-processing"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Payment processing
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       When you purchase a subscription directly from Data Science Wizards, payment details you provide in the designated checkout page on our Site will be encrypted using the Transport Layer Security (TLS) protocol before they are submitted to us over the internet. Payments made on our Site are made through one of our payment gateway providers like PayPal, banks, payment vault (“Payment Processors”), which may be changed from time to time. You will be providing credit or debit card information directly to the Payment Processor which operates a secure server to process payment details, encrypting your credit/debit card information and authorizing payment. Information which you supply to the Payment Processor is not within our control and is subject to the Payment Processor’s own privacy policy and terms and conditions.
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="enforcement-and-dispute"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Information about enforcement and dispute resolution
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       We will conduct compliance audits of our relevant privacy practices to verify compliance with this Privacy Policy. Any Data Science Wizards employee that we determine has acted in violation of this Privacy Policy will be subject to disciplinary action up to and including termination of employment. Any questions or concerns regarding our use or disclosure of personal information should be addressed to Customer Support at  <a href="mailto:contact@datasciencewizards.ai" className="text-primary-2">contact@datasciencewizards.ai </a>. We will investigate and attempt to resolve any complaints and disputes regarding the use and disclosure of personal information in accordance with the provisions of this Privacy Policy.

        </p>
        </div>


        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="changes-to-privacy-policy"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Changes to this Privacy Policy
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       As our Site evolves, this Privacy Policy will need to evolve as well to cover new situations. To ensure that you are kept informed of changes, check this Privacy Policy periodically as we may or may not update the date at the top of the document any time we make a change. If we make material changes to this Privacy Policy, we will post the revised policy on this page and may send a notice via email or our Site to all registered users of the Platform. Your continued use of our Site after any such changes constitutes your acceptance of the new Privacy Policy. If you do not agree to abide by these or any future version of the Privacy Policy, you do not have permission to use or access (or continue to use or access) our Site.

        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="contact-us"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Contact us
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       Questions or comments regarding this Privacy Policy should be submitted to Data Science Wizards by e-mail as follows: Email: <a href="mailto:contact@datasciencewizards.ai" className="text-primary-2">contact@datasciencewizards.ai </a> 

        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="use-of-cookies"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Use of Cookies
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       Data Science Wizards and its affiliates use cookies or similar technologies to collect and store certain information. These typically involve pieces of information or code that a website transfers to or accesses from your computer hard drive or mobile device to store and sometimes track information about you. Cookies allow us to create a unique device ID, enable you to be remembered when using that computer or device to interact with websites and online services, and can be used to manage a range of features and content, including storing searches and presenting personalized content. The Site uses cookies to distinguish you from other users of our Site. This helps us to provide you with a good and personalized user experience when you interact with our Site and also allows us to improve our Site Most web browsers automatically accept cookies, but if you prefer, you can change your browser to prevent that. We also give you information about how to disable cookies. However,  you may not be able to take full advantage of our Site if you do so. A number of cookies we use last only while you are on our Site and expire when you close your browser or exit our Site. Some cookies are used to remember you when you return to our Site and will last for longer. We use these cookies on the basis that they are necessary for the performance of a contract with you, or because using them is in our legitimate interests (where we have considered that these are not overridden by your rights), and, in some cases, where required by law, where you have consented to their use.
        </p>
        </div>


        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="types-of-cookies"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
     We use the following types of cookies:
        </h2>
           </HeadingAnim>
        <ul className="text-white-300 fadeup space-y-[1vw] list-disc marker:text-sm pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]">
          <li><span className="font-medium">Strictly necessary cookies: </span>These are cookies that are required for the operation of our website and under our terms with you. They include, for example, cookies that enable you to log into secure areas of our website, use a shopping cart or make use of e-billing services.</li>
          <li><span className="font-medium">Analytical/performance cookies: </span>They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us for our legitimate interests of improving the way our website works, for example, by ensuring that users are finding what they are looking for easily.</li>
          <li><span className="font-medium">Functionality cookies: </span>These are used to recognize you when you return to our website. These enable us, subject to your choices and preferences, to personalize our content, greet you by name and remember your preferences (for example, your choice of language or region).</li>
          <li><span className="font-medium">Targeting cookies: </span>These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information subject to your choices and preferences to make our Site and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.
</li>
      
        </ul>
        <p className="text-white-300 fadeup"> We may also work with marketing and advertising networks that gather information about the content on our Site you visit and on information on other websites and services you visit. This may result in you seeing advertisements on our Site or our advertisements when you visit other websites and services of third parties.</p>
        </div>


        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="disabling-cookies"> 
           <HeadingAnim>

        <h2 className="text-44 text-white-200 fadeup">
      Disabling cookies
        </h2>
           </HeadingAnim>
        <p className="text-white-300 fadeup">
       The effect of disabling cookies depends on which cookies you disable but, in general, our Site may not operate properly if all cookies are switched off. If you only disable third party cookies, you will not be prevented from making purchases on our Site. If you disable all cookies, you will be unable to complete a purchase on our Site. If you want to disable cookies on our Site, you need to change your website browser settings to reject cookies. How you can do this will depend on the browser you use. Further details on how to disable cookies for the most popular browsers are set out below:
        </p>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="microsoft-internet-explorer"> 
        <h3 className="text-44 text-white-200 fadeup">
      For Microsoft Internet Explorer:
        </h3>
        <ul className="text-white-300 fadeup space-y-[1vw] list-decimal pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]">
          <li>Choose the menu “tools” then “Internet Options”</li>
          <li>Click on the “privacy” tab</li>
          <li>Select the setting the appropriate setting</li>

        </ul>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="gooogle-chrome"> 
        <h3 className="text-44 text-white-200 fadeup">
      For Google Chrome:
        </h3>
        <ul className="text-white-300 fadeup space-y-[1vw] list-decimal pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]">
          <li>Choose Settings &gt; Advanced</li>
          <li>Under “Privacy and security,” click “Content settings”.</li>
          <li>Click “Cookies”</li>
        </ul>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="safari"> 
        <h3 className="text-44 text-white-200 fadeup">
      For Safari:
        </h3>
        <ul className="text-white-300 fadeup space-y-[1vw] list-decimal pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]">
          <li>Choose Preferences &gt; Privacy</li>
          <li>Click on “Remove all Website Data”</li>
        </ul>
        </div>

        <div className="space-y-[2vw] max-md:space-y-[4vw]" id="mozilla"> 
        <h3 className="text-44 text-white-200 fadeup">
      For Mozilla Firefox:
        </h3>
        <ul className="text-white-300 fadeup space-y-[1vw] list-decimal pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]">
          <li>Choose the menu “tools” then “Options”</li>
          <li>Click on the icon “privacy”</li>
          <li>Find the menu “cookie” and select the relevant options</li>
        </ul>
        </div>

         <div className="space-y-[2vw] max-md:space-y-[4vw]" id="opera"> 
        <h3 className="text-44 text-white-200 fadeup">
      For Opera 6.0 and further:
        </h3>
        <ul className="text-white-300 fadeup space-y-[1vw] list-decimal pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]">
          <li>Choose the menu Files” &gt; “Preferences”</li>
          <li> Privacy</li>
        </ul>
        <p className="text-white-300 fadeup">Where you have not set your permissions, we may also separately prompt you regarding our use of cookies on our Site. Except for essential cookies, all cookies used on our Site will expire after two years.</p>
        </div>
       

        </div>
      </div>
    </section>
    </>
  );
}
