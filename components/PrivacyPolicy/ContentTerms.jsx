"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function ContentTerms() {
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMob(window.innerWidth <= 1024);
    };
    handleResize(); // Set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navLinks = [
    { id: "#welcome", text: "Welcome" },
    { id: "#cookies", text: "Cookies" },
    { id: "#license", text: "License" },
    { id: "#hyperlinking", text: "Hyperlinking to our Content" },
    { id: "#iframes", text: "iFrames" },
    { id: "#content-liability", text: "Content Liability" },
    { id: "#privacy-policy", text: "Your Privacy" },
    { id: "#reservation-of-rights", text: "Reservation of Rights" },
    { id: "#removal-of-links", text: "Removal of links from our website" },
    { id: "#disclaimer", text: "Disclaimer" },
  ];

  const [isActive, setIsActive] = useState(null);

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
        trigger: `#${id}`,
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
      <section className=" relative z-[10]">
        <div className="w-full h-full flex relative px-[5vw] py-[7%] justify-between">
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
          <div className="w-[60%] h-fit py-[8vw] gap-[5vw] flex flex-col max-md:w-full max-md:gap-[10vw]">
            <div className="space-y-[2vw] max-md:space-y-[4vw]" id="welcome">
              <h2 className="text-44 text-white-200 headingAnim">
                Welcome to datasciencewizards
              </h2>
              <p className="text-white-300 fadeup">
                These terms and conditions outline the rules and regulations for
                the use of DATA SCIENCE WIZARDS PVT LTD’s Website, located at
                www.datasciencewizards.ai. By accessing this website we assume
                you accept these terms and conditions. Do not continue to use
                datasciencewizards.in if you do not agree to take all of the
                terms and conditions stated on this page. The following
                terminology applies to these Terms and Conditions, Privacy
                Statement and Disclaimer Notice and all Agreements: “Client”,
                “You” and “Your” refers to you, the person log on this website
                and compliant to the Company’s terms and conditions. “The
                Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our
                Company. “Party”, “Parties”, or “Us”, refers to both the Client
                and ourselves. All terms refer to the offer, acceptance and
                consideration of payment necessary to undertake the process of
                our assistance to the Client in the most appropriate manner for
                the express purpose of meeting the Client’s needs in respect of
                provision of the Company’s stated services, in accordance with
                and subject to, prevailing law of Netherlands. Any use of the
                above terminology or other words in the singular, plural,
                capitalization and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </p>
            </div>

            <div className="space-y-[2vw] max-md:space-y-[4vw]" id="cookies">
              <h2 className="text-44 text-white-200 headingAnim">Cookies</h2>
              <p className="text-white-300 fadeup">
                We employ the use of cookies. By accessing
                datasciencewizards.in, you agreed to use cookies in agreement
                with the DATA SCIENCE WIZARDS PVT LTD’s Privacy and Cookie
                Policy. Most interactive websites use cookies to let us retrieve
                the user’s details for each visit. Cookies are used by our
                website to enable the functionality of certain areas to make it
                easier for people visiting our website. Some of our
                affiliate/advertising partners may also use cookies.
              </p>
            </div>

            <div className="space-y-[2vw] max-md:space-y-[4vw]" id="license">
              <h2 className="text-44 text-white-200 headingAnim">License</h2>
              <div className="space-y-[1.5vw]">
                <div className="fadeup">
                  <p className="text-white-300">
                    Unless otherwise stated, DATA SCIENCE WIZARDS PVT LTD and/or
                    its licensors own the intellectual property rights for all
                    material on{" "}
                    <a href="#" className="text-primary-2">
                      {" "}
                      www.datasciencewizards.ai/{" "}
                    </a>
                    . All intellectual property rights are reserved. You may
                    access this from{" "}
                    <a href="" className="text-primary-2">
                      {" "}
                      www.datasciencewizards.ai/{" "}
                    </a>{" "}
                    for your own personal use subjected to restrictions set in
                    these terms and conditions. You must not:
                  </p>
                  <ul className="space-y-[1vw] list-disc pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]  text-white-300">
                    <li>Republish material from datasciencewizards.ai</li>
                    <li>
                      Sell, rent or sub-license material from
                      datasciencewizards.ai
                    </li>
                    <li>
                      Reproduce, duplicate or copy material from
                      datasciencewizards.ai
                    </li>
                    <li>Redistribute content from datasciencewizards.ai</li>
                  </ul>
                </div>
                <div className="fadeup">
                  <p className="text-white-300">
                    This Agreement shall begin on the date hereof (the effective
                    date – 1st January 2020). Parts of this website offer an
                    opportunity for users to post and exchange opinions and
                    information in certain areas of the website. DATA SCIENCE
                    WIZARDS PVT LTD does not filter, edit, publish or review
                    Comments prior to their presence on the website. Comments do
                    not reflect the views and opinions of DATA SCIENCE WIZARDS
                    PVT LTD, its agents and/or affiliates. Comments reflect the
                    views and opinions of the person who post their views and
                    opinions. To the extent permitted by applicable laws, DATA
                    SCIENCE WIZARDS PVT LTD shall not be liable for the Comments
                    or for any liability, damages or expenses caused and/or
                    suffered as a result of any use of and/or posting of and/or
                    appearance of the Comments on this website. DATA SCIENCE
                    WIZARDS PVT LTD reserves the right to monitor all Comments
                    and to remove any Comments which can be considered
                    inappropriate, offensive or causes breach of these Terms and
                    Conditions. You warrant and represent that:
                  </p>
                  <ul className="space-y-[1vw] list-disc pl-[1.5vw] py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]  text-white-300">
                    <li>
                      You are entitled to post the Comments on our website and
                      have all necessary licenses and consents to do so;
                    </li>
                    <li>
                      The Comments do not invade any intellectual property
                      right, including without limitation copyright, patent or
                      trademark of any third party;
                    </li>
                    <li>
                      The Comments do not contain any defamatory, libellous,
                      offensive, indecent or otherwise unlawful material which
                      is an invasion of privacy
                    </li>
                    <li>
                      The Comments will not be used to solicit or promote
                      business or custom or present commercial activities or
                      unlawful activity.
                    </li>
                  </ul>
                </div>
                <p className="text-white-300 fadeup">
                  You hereby grant DATA SCIENCE WIZARDS PVT LTD a non-exclusive
                  license to use, reproduce, edit and authorize others to use,
                  reproduce and edit any of your Comments in any and all forms,
                  formats or media.
                </p>
              </div>
            </div>

            <div
              className="space-y-[2vw] max-md:space-y-[4vw]"
              id="hyperlinking"
            >
              <h2 className="text-44 text-white-200 headingAnim">
                Hyperlinking to our Content
              </h2>
              <div className="space-y-[1.5vw]">
                <div className="fadeup">
                  <p className="text-white-300">
                    The following organizations may link to our Website without
                    prior written approval:
                  </p>
                  <ul className="space-y-[1vw] pl-[1.5vw] list-disc py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]  text-white-300">
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>
                      Online directory distributors may link to our Website in
                      the same manner as they hyperlink to the Websites of other
                      listed businesses; and
                    </li>
                    <li>
                      System wide Accredited Businesses except soliciting
                      non-profit organizations, charity shopping malls, and
                      charity fundraising groups which may not hyperlink to our
                      Web site.
                    </li>
                  </ul>
                </div>
                <div className="fadeup">
                  <p className="text-white-300">
                    These organizations may link to our home page, to
                    publications or to other Website information so long as the
                    link: (a) is not in any way deceptive; (b) does not falsely
                    imply sponsorship, endorsement or approval of the linking
                    party and its products and/or services; and (c) fits within
                    the context of the linking party’s site. We may consider and
                    approve other link requests from the following types of
                    organizations:
                  </p>
                  <ul className="space-y-[1vw] pl-[1.5vw] list-disc py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw]  text-white-300">
                    <li>
                      commonly-known consumer and/or business information
                      sources;
                    </li>
                    <li>dot.com and dot.in community sites;</li>
                    <li>
                      associations or other groups representing charities;
                    </li>
                    <li>online directory distributors;</li>
                    <li>Sinternet portals;</li>
                    <li>accounting, law and consulting firms; and</li>
                    <li>educational institutions and trade associations.</li>
                  </ul>
                </div>

                <div className="fadeup">
                  <p className="text-white-300">
                    We will approve link requests from these organizations if we
                    decide that: (a) the link would not make us look
                    unfavourably to ourselves or to our accredited businesses;
                    (b) the organization does not have any negative records with
                    us; (c) the benefit to us from the visibility of the
                    hyperlink compensates the absence of DATA SCIENCE WIZARDS
                    PVT LTD; and (d) the link is in the context of general
                    resource information. These organizations may link to our
                    home page so long as the link: (a) is not in any way
                    deceptive; (b) does not falsely imply sponsorship,
                    endorsement or approval of the linking party and its
                    products or services; and (c) fits within the context of the
                    linking party’s site. If you are one of the organizations
                    listed in paragraph 2 above and are interested in linking to
                    our website, you must inform us by sending an e-mail to
                    (contact@datasciencewizards.ai) DATA SCIENCE WIZARDS PVT
                    LTD. Please include your name, your organization name,
                    contact information as well as the URL of your site, a list
                    of any URLs from which you intend to link to our Website,
                    and a list of the URLs on our site to which you would like
                    to link. Wait 4-5 weeks for a response. Approved
                    organizations may hyperlink to our Website as follows:
                  </p>
                  <ul className="space-y-[1vw] pl-[1.5vw] list-disc py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw] text-white-300">
                    <li>By use of our corporate name; or</li>
                    <li>
                      By use of the uniform resource locator being linked to; or
                    </li>
                    <li>
                      By use of any other description of our Website being
                      linked to that makes sense within the context and format
                      of content on the linking party’s site.
                    </li>
                  </ul>
                </div>
                <div className="fadeup">
                  <p className="text-white-300">
                    No use of DATA SCIENCE WIZARDS PVT LTD’s logo or other
                    artwork will be allowed for linking absent a trademark
                    license agreement.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-[2vw] max-md:space-y-[4vw]" id="iframes">
              <h2 className="text-44 text-white-200 headingAnim">iFrames</h2>
              <p className="text-white-300 fadeup">
                Without prior approval and written permission, you may not
                create frames around our Webpages that alter in any way the
                visual presentation or appearance of our Website.
              </p>
            </div>

            <div
              className="space-y-[2vw] max-md:space-y-[4vw]"
              id="content-liability"
            >
              <h2 className="text-44 text-white-200 headingAnim">
                Content Liability
              </h2>
              <p className="text-white-300 fadeup">
                We shall not be hold responsible for any content that appears on
                your Website. You agree to protect and defend us against all
                claims that is rising on your Website. No link(s) should appear
                on any Website that may be interpreted as libellous, obscene or
                criminal, or which infringes, otherwise violates, or advocates
                the infringement or other violation of, any third party rights.
              </p>
            </div>

            <div
              className="space-y-[2vw] max-md:space-y-[4vw]"
              id="privacy-policy"
            >
              <h2 className="text-44 text-white-200 headingAnim">
                Your Privacy
              </h2>
              <p className="text-white-300 fadeup">
                Please read Privacy Policy
              </p>
            </div>

            <div
              className="space-y-[2vw] max-md:space-y-[4vw]"
              id="reservation-of-rights"
            >
              <h2 className="text-44 text-white-200 headingAnim">
                Reservation of Rights
              </h2>
              <p className="text-white-300 fadeup">
                We reserve the right to request that you remove all links or any
                particular link to our Website. You approve to immediately
                remove all links to our Website upon request. We also reserve
                the right to amen these terms and conditions and it’s linking
                policy at any time. By continuously linking to our Website, you
                agree to be bound to and follow these linking terms and
                conditions.
              </p>
            </div>

            <div
              className="space-y-[2vw] max-md:space-y-[4vw]"
              id="removal-of-links"
            >
              <h2 className="text-44 text-white-200 headingAnim">
                Removal of links from our website
              </h2>
              <p className="text-white-300 fadeup">
                If you find any link on our Website that is offensive for any
                reason, you are free to contact and inform us any moment. We
                will consider requests to remove links but we are not obligated
                to or so or to respond to you directly. We do not ensure that
                the information on this website is correct, we do not warrant
                its completeness or accuracy; nor do we promise to ensure that
                the website remains available or that the material on the
                website is kept up to date.
              </p>
            </div>

            <div className="space-y-[2vw] max-md:space-y-[4vw]" id="disclaimer">
              <h2 className="text-44 text-white-200 headingAnim">Disclaimer</h2>
              <p className="text-white-300 fadeup">
                To the maximum extent permitted by applicable law, we exclude
                all representations, warranties and conditions relating to our
                website and the use of this website. Nothing in this disclaimer
                will:
              </p>
              <ul className="space-y-[1vw] pl-[1.5vw] list-disc py-[1vw] max-md:pl-[7vw] max-md:py-[3vw] max-md:space-y-[2vw] fadeup text-white-300">
                <li>
                  limit or exclude our or your liability for death or personal
                  injury;
                </li>
                <li>
                  limit or exclude our or your liability for fraud or fraudulent
                  misrepresentation;
                </li>
                <li>
                  limit any of our or your liabilities in any way that is not
                  permitted under applicable law; or
                </li>
                <li>
                  exclude any of our or your liabilities that may not be
                  excluded under applicable law.
                </li>
              </ul>
              <p className="text-white-300 fadeup">
                The limitations and prohibitions of liability set in this
                Section and elsewhere in this disclaimer: (a) are subject to the
                preceding paragraph; and (b) govern all liabilities arising
                under the disclaimer, including liabilities arising in contract,
                in tort and for breach of statutory duty. As long as the website
                and the information and services on the website are provided
                free of charge, we will not be liable for any loss or damage of
                any nature.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
