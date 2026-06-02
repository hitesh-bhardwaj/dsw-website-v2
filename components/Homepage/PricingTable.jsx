"use client";

import React, { useRef, useState } from "react";
import HeadingAnim from "../Animations/HeadingAnim";
import Copy from "../Animations/Copy";

const CheckIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto h-[2vw] w-[2vw] max-md:h-[4vw] max-md:w-[4vw] max-sm:h-[6vw] max-sm:w-[6vw]"
  >
    <path
      d="M9 17.5L14.3 22.8L25.5 11.5"
      stroke="#0205FA"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RobotIcon = () => (

  <svg width="47" height="41" viewBox="0 0 47 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[2vw] w-[2vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <path fillRule="evenodd" clipRule="evenodd" d="M20.8165 4.41161C20.8165 3.04908 21.9211 1.94453 23.2836 1.94453C24.6461 1.94453 25.7507 3.04908 25.7507 4.41161C25.7507 5.77415 24.6461 6.8787 23.2836 6.8787C21.9211 6.8787 20.8165 5.77415 20.8165 4.41161ZM23.2836 0.299805C21.0127 0.299805 19.1718 2.14072 19.1718 4.41161C19.1718 6.40086 20.5844 8.06019 22.4613 8.44118V12.3395H9.02937C7.36405 12.3395 6.01404 13.6896 6.01404 15.3548V18.9858C5.85285 18.9419 5.68321 18.9184 5.50809 18.9184H2.21864C1.1589 18.9184 0.299805 19.7775 0.299805 20.8372V31.8021C0.299805 32.8618 1.1589 33.7209 2.21864 33.7209H5.50809C5.68321 33.7209 5.85285 33.6974 6.01404 33.6535V37.2845C6.01404 38.9498 7.36405 40.2998 9.02937 40.2998H37.5379C39.2032 40.2998 40.5532 38.9498 40.5532 37.2845V33.6536C40.7144 33.6976 40.884 33.721 41.0593 33.721H44.3487C45.4084 33.721 46.2675 32.8619 46.2675 31.8022V20.8374C46.2675 19.7776 45.4084 18.9185 44.3487 18.9185H41.0593C40.884 18.9185 40.7144 18.942 40.5532 18.9859V15.3548C40.5532 13.6896 39.2032 12.3395 37.5379 12.3395H24.106V8.44118C25.9828 8.06019 27.3954 6.40086 27.3954 4.41161C27.3954 2.14072 25.5546 0.299805 23.2836 0.299805ZM2.21864 20.5631C2.06725 20.5631 1.94452 20.6858 1.94452 20.8372V31.8021C1.94452 31.9535 2.06725 32.0762 2.21864 32.0762H5.50809C5.65949 32.0762 5.78221 31.9535 5.78221 31.8021V20.8372C5.78221 20.6858 5.65949 20.5631 5.50809 20.5631H2.21864ZM41.0593 20.5632C40.9078 20.5632 40.7851 20.6859 40.7851 20.8374V31.8022C40.7851 31.9535 40.9078 32.0763 41.0593 32.0763H44.3487C44.5 32.0763 44.6228 31.9535 44.6228 31.8022V20.8374C44.6228 20.6859 44.5 20.5632 44.3487 20.5632H41.0593ZM9.02937 13.9842C8.2724 13.9842 7.65876 14.5979 7.65876 15.3548V37.2845C7.65876 38.0415 8.2724 38.6551 9.02937 38.6551H37.5379C38.2949 38.6551 38.9085 38.0415 38.9085 37.2845V15.3548C38.9085 14.5979 38.2949 13.9842 37.5379 13.9842H9.02937ZM16.7047 26.3198C16.7047 27.2281 15.9683 27.9645 15.06 27.9645C14.1516 27.9645 13.4153 27.2281 13.4153 26.3198C13.4153 25.4113 14.1516 24.675 15.06 24.675C15.9683 24.675 16.7047 25.4113 16.7047 26.3198ZM18.3495 26.3198C18.3495 28.1364 16.8767 29.6092 15.06 29.6092C13.2433 29.6092 11.7706 28.1364 11.7706 26.3198C11.7706 24.503 13.2433 23.0303 15.06 23.0303C16.8767 23.0303 18.3495 24.503 18.3495 26.3198ZM31.5072 27.9645C32.4156 27.9645 33.152 27.2281 33.152 26.3198C33.152 25.4113 32.4156 24.675 31.5072 24.675C30.5988 24.675 29.8625 25.4113 29.8625 26.3198C29.8625 27.2281 30.5988 27.9645 31.5072 27.9645ZM31.5072 29.6092C33.3239 29.6092 34.7967 28.1364 34.7967 26.3198C34.7967 24.503 33.3239 23.0303 31.5072 23.0303C29.6905 23.0303 28.2178 24.503 28.2178 26.3198C28.2178 28.1364 29.6905 29.6092 31.5072 29.6092Z" fill="#1727FF" stroke="#1727FF" strokeWidth="0.6" />
  </svg>

);

const CurrencyIcon = () => (

  <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[2vw] w-[2vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <g clipPath="url(#clip0_3977_992)">
      <path d="M22.5 0C10.0941 0 0 10.0941 0 22.5C0 34.9059 10.0941 45 22.5 45C34.9059 45 45 34.9059 45 22.5C45 10.0941 34.9059 0 22.5 0ZM22.5 42.1875C11.6466 42.1875 2.8125 33.3563 2.8125 22.5C2.8125 11.6438 11.6466 2.8125 22.5 2.8125C33.3534 2.8125 42.1875 11.6438 42.1875 22.5C42.1875 33.3563 33.3534 42.1875 22.5 42.1875Z" fill="#1727FF" />
      <path d="M29.531 16.875H27.9813C27.7704 15.8288 27.3035 14.8837 26.6819 14.0625H29.531C30.3072 14.0625 30.9372 13.4325 30.9372 12.6562C30.9372 11.88 30.3072 11.25 29.531 11.25H21.0935H15.4685C14.6922 11.25 14.0622 11.88 14.0622 12.6562C14.0622 13.4325 14.6922 14.0625 15.4685 14.0625H21.0935C22.9244 14.0625 24.4713 15.2409 25.0535 16.875H15.4685C14.6922 16.875 14.0622 17.505 14.0622 18.2812C14.0622 19.0575 14.6922 19.6875 15.4685 19.6875H25.0535C24.4713 21.3216 22.9244 22.5 21.0935 22.5H15.4685C15.2857 22.5 15.1029 22.5366 14.9313 22.6069C14.5882 22.7503 14.3125 23.0231 14.1691 23.3691C14.0257 23.7122 14.0257 24.1003 14.1691 24.4434C14.2394 24.6178 14.3435 24.7725 14.4757 24.9019L25.7228 36.1491C25.9985 36.4247 26.3585 36.5625 26.7185 36.5625C27.0785 36.5625 27.4385 36.4247 27.7141 36.1519C28.2625 35.6034 28.2625 34.7119 27.7141 34.1634L18.8632 25.3125H21.0935C24.491 25.3125 27.3288 22.8938 27.9813 19.6875H29.531C30.3072 19.6875 30.9372 19.0575 30.9372 18.2812C30.9372 17.505 30.3072 16.875 29.531 16.875Z" fill="#1727FF" />
    </g>
    <defs>
      <clipPath id="clip0_3977_992">
        <rect width="45" height="45" fill="white" />
      </clipPath>
    </defs>
  </svg>

);

const RocketIcon = () => (

  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[2vw] w-[2vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <path d="M41.9506 3.13538C41.8597 1.46703 40.5328 0.140345 38.8645 0.0492905C35.4981 -0.134623 28.9107 0.0442868 22.6117 3.30231C19.4006 4.96327 16.0045 7.77931 13.2943 11.0284C13.2609 11.0684 13.2284 11.1087 13.1953 11.1488L7.04459 11.6239C6.03217 11.7022 5.1304 12.2329 4.57046 13.0797L0.374246 19.4266C-0.0504286 20.0689 -0.11794 20.8728 0.193531 21.5768C0.505085 22.281 1.14525 22.7717 1.90609 22.8896L7.08807 23.6922C7.06978 23.7929 7.0514 23.8936 7.03458 23.9943C6.86207 25.0262 7.20398 26.0872 7.94931 26.8325L15.1674 34.0506C15.7853 34.6686 16.6203 35.0092 17.4759 35.0092C17.6521 35.0092 17.8293 34.9947 18.0056 34.9653C18.1064 34.9485 18.207 34.9301 18.3078 34.9118L19.1104 40.0938C19.2282 40.8547 19.7189 41.4949 20.4229 41.8064C20.7159 41.936 21.0259 42 21.3345 42C21.7678 41.9999 22.1982 41.8738 22.5732 41.6258L28.9201 37.4295C29.7671 36.8695 30.2977 35.9677 30.3757 34.9553L30.8509 28.8047C30.891 28.7716 30.9313 28.7391 30.9714 28.7057C34.2205 25.9955 37.0367 22.5994 38.6975 19.3883C41.9557 13.089 42.1343 6.50152 41.9506 3.13538ZM27.5629 35.3766L21.4917 39.3906L20.7095 34.3404C23.2754 33.5859 25.8137 32.3776 28.2319 30.7589L27.9224 34.7657C27.9031 35.0156 27.772 35.2383 27.5629 35.3766ZM16.9075 32.3105L9.68935 25.0924C9.50519 24.9081 9.42004 24.6493 9.4618 24.4C9.67639 23.1168 10.0098 21.8953 10.4226 20.7445L21.253 31.5749C19.8709 32.07 18.633 32.3653 17.5998 32.5381C17.3501 32.5796 17.0917 32.4947 16.9075 32.3105ZM7.23417 14.0776L11.2409 13.7681C9.62209 16.1863 8.41377 18.7245 7.65933 21.2905L2.60918 20.5083L6.62328 14.437C6.76159 14.2278 6.9843 14.0968 7.23417 14.0776ZM29.3952 26.8158C27.4074 28.4739 25.4778 29.6732 23.6992 30.541L11.4584 18.3003C12.5952 15.9785 13.9826 14.0451 15.184 12.6048C17.6921 9.59794 20.8115 7.00404 23.7424 5.48811C29.5234 2.49783 35.6143 2.33681 38.7305 2.50645C39.143 2.52892 39.471 2.85696 39.4935 3.2695C39.6634 6.38569 39.502 12.4765 36.5117 18.2576C34.9959 21.1884 32.402 24.3077 29.3952 26.8158Z" fill="#1727FF" />
    <path d="M28.7703 19.3785C30.3455 19.3784 31.9213 18.7787 33.1205 17.5795C34.2826 16.4175 34.9224 14.8726 34.9224 13.2293C34.9224 11.5861 34.2825 10.0411 33.1205 8.87914C30.7218 6.48031 26.8187 6.48047 24.4201 8.87914C23.2581 10.0411 22.6182 11.5861 22.6182 13.2293C22.6182 14.8726 23.2582 16.4175 24.4201 17.5795C25.6196 18.779 27.1946 19.3787 28.7703 19.3785ZM26.1601 10.6192C26.8797 9.89952 27.8249 9.53973 28.7702 9.53973C29.7155 9.53973 30.6607 9.89952 31.3803 10.6192C32.0775 11.3164 32.4614 12.2433 32.4614 13.2292C32.4614 14.2152 32.0775 15.1422 31.3803 15.8394C29.9411 17.2786 27.5992 17.2785 26.16 15.8394C25.4628 15.1422 25.0788 14.2153 25.0788 13.2293C25.0788 12.2434 25.4629 11.3164 26.1601 10.6192Z" fill="#1727FF" />
    <path d="M1.25484 34.6121C1.56975 34.6121 1.88467 34.492 2.12486 34.2516L6.14216 30.2343C6.6227 29.7538 6.6227 28.9747 6.14216 28.4942C5.6617 28.0137 4.88257 28.0137 4.40204 28.4942L0.384817 32.5115C-0.0957203 32.992 -0.0957203 33.7711 0.384817 34.2516C0.625004 34.4919 0.93992 34.6121 1.25484 34.6121Z" fill="#1727FF" />
    <path d="M9.82407 32.1749C9.34361 31.6943 8.56448 31.6943 8.08394 32.1749L0.360403 39.8985C-0.120134 40.379 -0.120134 41.1581 0.360403 41.6386C0.600672 41.8789 0.915506 41.999 1.23042 41.999C1.54534 41.999 1.86026 41.8789 2.10044 41.6385L9.82399 33.915C10.3046 33.4344 10.3046 32.6554 9.82407 32.1749Z" fill="#1727FF" />
    <path d="M11.7654 35.8575L7.7481 39.8748C7.26756 40.3553 7.26756 41.1344 7.7481 41.6149C7.98837 41.8552 8.30328 41.9753 8.61812 41.9753C8.93295 41.9753 9.24795 41.8552 9.48814 41.6149L13.5054 37.5976C13.986 37.1171 13.986 36.338 13.5054 35.8575C13.025 35.3769 12.2459 35.3769 11.7654 35.8575Z" fill="#1727FF" />
  </svg>

);

const SupportIcon = () => (

  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[2vw] w-[2vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <path d="M6.81082 30.708C2.9785 30.4435 0 27.2483 0 23.4034C0 21.5362 0.699815 19.8316 1.85052 18.5385C2.03582 8.25842 10.4346 0 20.7253 0C31.016 0 39.4148 8.25842 39.6001 18.5385C40.7508 19.8316 41.4506 21.5362 41.4506 23.4034C41.4506 25.6503 40.4277 27.7553 38.6711 29.1463C37.7597 35.1998 32.5757 39.7228 26.4582 39.8051C26.0133 41.1023 24.7768 42 23.3908 42H20.7824C19.002 42 17.5413 40.5413 17.5413 38.7589C17.5413 36.9786 19 35.5179 20.7824 35.5179H23.3908C24.7919 35.5179 26.035 36.4262 26.4708 37.7506C30.9807 37.6729 34.9397 34.7045 36.2793 30.4046C35.7557 30.5651 35.2063 30.6687 34.6398 30.708L33.2745 32.4399C33.0882 32.703 32.7812 32.8746 32.4343 32.8746C30.4212 32.8746 28.7777 31.2311 28.7777 29.218V17.5893C28.7777 15.5757 30.4207 13.9327 32.4343 13.9327C32.7504 13.9327 33.0473 14.0781 33.2427 14.3265L34.6398 16.0993C35.6391 16.1679 36.5827 16.4376 37.4315 16.8673C36.4116 8.42908 29.2463 2.05855 20.7253 2.05855C12.2043 2.05855 5.03907 8.42908 4.01914 16.8673C4.8679 16.4376 5.8121 16.1679 6.81082 16.0993L8.17612 14.3674C8.36243 14.1043 8.66942 13.9327 9.0163 13.9327C11.0299 13.9327 12.6729 15.5757 12.6729 17.5893V29.218C12.6729 31.2316 11.0299 32.8746 9.0163 32.8746C8.70022 32.8746 8.40333 32.7292 8.20793 32.4808L6.81082 30.708ZM8.35183 17.4656V29.3417L9.46315 30.7515C10.1387 30.5525 10.6144 29.9259 10.6144 29.218V17.5893C10.6144 16.8814 10.1387 16.2548 9.46315 16.0559L8.35183 17.4656ZM33.0988 29.3417V17.4656L31.9875 16.0559C31.3119 16.2548 30.8363 16.8814 30.8363 17.5893V29.218C30.8363 29.9259 31.3119 30.5525 31.9875 30.7515L33.0988 29.3417ZM23.3908 37.5769H20.7824C20.132 37.5769 19.6004 38.1086 19.6004 38.7589C19.6004 39.4093 20.1315 39.9415 20.7824 39.9415H23.3908C24.0421 39.9415 24.5733 39.4103 24.5733 38.7589C24.5733 38.1111 24.0391 37.5769 23.3908 37.5769ZM35.1579 28.5662C37.6143 28.0789 39.3916 25.9154 39.3916 23.4034C39.3916 20.8919 37.6143 18.7284 35.1579 18.2411V28.5662ZM6.29278 28.5662V18.2411C3.83636 18.7284 2.05905 20.8919 2.05905 23.4034C2.05905 25.9154 3.83636 28.0789 6.29278 28.5662Z" fill="#1727FF" />
  </svg>

);

const UserIcon = () => (

  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[2vw] w-[2vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    {/* <mask id="mask0_3977_1037" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="42" height="42">
      <path d="M0 0H42V42H0V0Z" fill="white" />
    </mask> */}
    <g mask="url(#mask0_3977_1037)">
      <path d="M40.7695 21C40.7695 31.9184 31.9184 40.7695 21 40.7695C10.0814 40.7695 1.23047 31.9184 1.23047 21C1.23047 10.0814 10.0814 1.23047 21 1.23047C31.9184 1.23047 40.7695 10.0814 40.7695 21Z" stroke="#1727FF" strokeWidth="2.46094" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28.9075 18.3637C28.9075 22.731 25.3672 26.2715 20.9997 26.2715C16.632 26.2715 13.0918 22.731 13.0918 18.3637C13.0918 13.9964 16.632 10.4559 20.9997 10.4559C25.3672 10.4559 28.9075 13.9964 28.9075 18.3637Z" stroke="#1727FF" strokeWidth="2.46094" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.20508 36.866C9.83754 30.9104 14.8769 26.2711 21.0001 26.2711C27.1235 26.2711 32.1628 30.9107 32.795 36.8662" stroke="#1727FF" strokeWidth="2.46094" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>

);

const ShieldIcon = () => (

  <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[2vw] w-[2vw] max-md:h-[5vw] max-md:w-[5vw] max-sm:h-[7vw] max-sm:w-[7vw]">
    <path d="M35.2461 10.8142C35.2245 9.68027 35.2039 8.60905 35.2039 7.57272C35.2039 6.76083 34.5459 6.10262 33.7338 6.10262C27.4467 6.10262 22.6598 4.29576 18.6698 0.41626C18.099 -0.138851 17.1906 -0.138655 16.62 0.41626C12.6304 4.29576 7.84431 6.10262 1.55756 6.10262C0.745671 6.10262 0.0874565 6.76083 0.0874565 7.57272C0.0874565 8.60925 0.0670711 9.68085 0.0453135 10.815C-0.156189 21.3676 -0.432175 35.8199 17.1634 41.9188C17.3194 41.9729 17.4821 42 17.6448 42C17.8075 42 17.9704 41.9729 18.1262 41.9188C35.7232 35.8197 35.4476 21.367 35.2461 10.8142ZM17.645 38.9698C2.55449 33.4879 2.78265 21.4791 2.98513 10.871C2.99728 10.2344 3.00904 9.61734 3.01728 9.01245C8.90553 8.7639 13.6142 6.97959 17.645 3.46819C21.6762 6.97959 26.3856 8.7641 32.2743 9.01245C32.2825 9.61715 32.2943 10.2338 32.3064 10.8701C32.5087 21.4785 32.7367 33.4877 17.645 38.9698Z" fill="#1727FF" />
    <path d="M22.7071 15.8924L15.6116 22.9875L12.5837 19.9597C12.0096 19.3858 11.0787 19.3858 10.5048 19.9597C9.93069 20.534 9.93069 21.4647 10.5048 22.0388L14.5721 26.1061C14.8591 26.3931 15.2354 26.5365 15.6116 26.5365C15.9877 26.5365 16.3641 26.3931 16.651 26.1061L24.7858 17.9715C25.3601 17.3974 25.3601 16.4665 24.786 15.8926C24.2121 15.3185 23.2812 15.3183 22.7071 15.8924Z" fill="#1727FF" />
  </svg>

);

const PricingTable = ({ region = "IN" }) => {
  const pricingByRegion = {
    IN: {
      currencyLabel: "INR",
      pricePrefix: "₹",
      plans: [
        {
          name: "Starter",
          useCases: "Upto 5 Use Cases",
          price: "45,00,000",
        },
        {
          name: "Growth",
          useCases: "Upto 15 Use Cases",
          price: "85,00,000",
          popular: true,
        },
        {
          name: "Scale",
          useCases: "Upto 40 Use Cases",
          price: "1,50,00,000",
        },
        {
          name: "Enterprise Edition",
          useCases: "Unlimited Use Cases",
          price: "Contact Sales",
          isContact: true,
        },
      ],
    },
    US: {
      currencyLabel: "USD",
      pricePrefix: "$",
      plans: [
        {
          name: "Starter",
          useCases: "Upto 5 Use Cases",
          price: "50,000",
        },
        {
          name: "Growth",
          useCases: "Upto 15 Use Cases",
          price: "95,000",
          popular: true,
        },
        {
          name: "Scale",
          useCases: "Upto 40 Use Cases",
          price: "1,50,000",
        },
        {
          name: "Enterprise Edition",
          useCases: "Unlimited Use Cases",
          price: "Contact Sales",
          isContact: true,
        },
      ],
    },
  };

  const activePricing = pricingByRegion[region] || pricingByRegion.IN;

  const inclusions = [
    {
      icon: <RobotIcon />,
      label: "AI-ML / Agentic AI Use Cases",
    },
    {
      icon: <CurrencyIcon />,
      label: `Annual Subscription (${activePricing.currencyLabel})`,
    },
    {
      icon: <RocketIcon />,
      label: "Deployment & Activation",
    },
    {
      icon: <SupportIcon />,
      label: "24*7 Enterprise Support",
    },
    {
      icon: <UserIcon />,
      label: "Dedicated Technical Success Manager (TSM)",
    },
    {
      icon: <ShieldIcon />,
      label: "Enterprise Ownership (No Vendor Lock-in)",
    },
  ];

  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    const progress =
      (scrollLeft / (scrollWidth - clientWidth)) * 100;

    setScrollProgress(progress);
  };

  const getPrice = (plan) => {
    if (plan.isContact) return plan.price;

    if (activePricing.currencyLabel === "USD") {
      return `${activePricing.pricePrefix}${plan.price}`;
    }

    return `${activePricing.pricePrefix} ${plan.price}`;
  };

  return (
    <section className="w-full  px-[5vw] pb-[5vw] py-[7%] relative z-100 bg-white max-md:py-[15%] max-md:px-0">
      <HeadingAnim>
        <h2 className="text-center mx-auto text-[#071B52] w-[85%] text-76 leading-[1.2] mb-8 font-normal max-md:text-[5vw] max-md:mb-[8vw] max-sm:text-[9vw] max-sm:mb-[10vw]">
          Scale your AI. Not Cost.
        </h2>
      </HeadingAnim>
      <div className=" mb-[5vw] space-y-[1vw] max-sm:space-y-[4vw]">
        <Copy>
          <p className="w-[70%] mx-auto text-24 text-center max-md:w-[90%] ">
            Most AI vendors charge more every time you add a model, deploy an agent, expand a workflow, or launch a new use case. What begins as a pilot often becomes a growing collection of licenses, subscriptions, and usage-based costs.

          </p>
        </Copy>
        <Copy>
          <p className="w-[70%] mx-auto text-24 text-center max-md:w-[90%] ">
            DSW UnifyAI OS changes that model entirely.
          </p>
        </Copy>
        <Copy>
          <p className="w-[70%] mx-auto text-24 text-center max-md:w-[90%] ">
            With a single subscription and one governed runtime, enterprises can build, deploy, govern, and operate unlimited AI and Agentic AI use cases across the organization. No per-model pricing. No per-agent pricing. No penalties for scaling innovation.

          </p>
        </Copy>
        <Copy>
          <p className="w-[70%] mx-auto text-24 text-center max-md:w-[90%] ">
            Because enterprise AI should scale outcomes, not costs.

          </p>
        </Copy>

      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full overflow-hidden max-md:overflow-x-auto max-md:overflow-y-hidden py-[4vw] max-md:px-[7vw] max-md:py-[10vw] max-sm:pb-[8vw] fadeup"
      >
        <div className="grid grid-cols-[2.05fr_repeat(4,1fr)] gap-[1vw] pb-[16px] max-md:min-w-[200vw] max-sm:min-w-[300vw] max-md:gap-[2vw] max-sm:gap-[4vw] max-sm:grid-cols-[2.3fr_repeat(4,1.5fr)]">
          <div className="overflow-hidden rounded-[1vw] border border-[#D9D9D9] bg-[#EAF4FF] max-md:rounded-[2vw] max-sm:rounded-[4vw]">
            <div className="h-[4.5vw] bg-[#0205FA] flex items-center px-[2vw] max-md:h-[8vw] max-sm:h-[14vw] max-sm:px-[5vw]">
              <h3 className="text-white text-[1.35vw] font-medium max-md:text-[2.5vw] max-sm:text-[5vw]">
                Inclusions
              </h3>
            </div>

            <div>
              {inclusions.map((item, index) => (
                <div
                  key={index}
                  className="h-[5.25vw] flex items-center gap-[1.6vw] px-[2vw] border-b border-[#D9D9D9] last:border-b-0 max-md:h-[9vw] max-md:gap-[3vw] max-sm:h-[17vw] max-sm:gap-[5vw] max-sm:px-[5vw]"
                >
                  <div className="shrink-0">{item.icon}</div>

                  <p className="text-[#111111] text-[1.25vw] leading-[1.15] max-md:text-[2.6vw] max-sm:text-[4.5vw]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {activePricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[1vw] pointer-events-none bg-white border overflow-visible max-md:rounded-[2vw] max-sm:rounded-[4vw] border-[#D9D9D9]`}
            >
              {plan.popular && (
                <div className="w-[105%] h-[110%] rounded-[1vw] border border-[#0205FA] absolute top-[-5%] left-[-2.5%] z-2 max-sm:rounded-[4vw]">

                  <div className="absolute top-[-2%] left-1/2 -translate-x-1/2 z-10 h-[1.8vw] min-w-[9.6vw] rounded-full border border-[#0205FA] bg-white flex items-center justify-center px-[1.2vw] max-md:top-[-1.7vw] max-md:h-[3.4vw] max-md:min-w-[17vw] max-sm:top-[-3.5vw] max-sm:h-[7vw] max-sm:min-w-[35vw]">
                    <span className="text-[#0205FA] text-[1vw] font-medium leading-none max-md:text-[2vw] max-sm:text-[4vw]">
                      Most Popular
                    </span>
                  </div>
                </div>
              )}

              <div className="overflow-hidden rounded-[0.85vw] max-md:rounded-[1.8vw] max-sm:rounded-[3.6vw]">
                <div className="h-[4.5vw] bg-[#0205FA] flex items-center justify-center px-[1vw] max-md:h-[8vw] max-sm:h-[14vw]">
                  <h3 className="text-white text-center text-[1.35vw] font-medium leading-[1.1] max-md:text-[2.5vw] max-sm:text-[4.8vw]">
                    {plan.name}
                  </h3>
                </div>

                <div>
                  <div className="h-[5.25vw] flex items-center justify-center px-[1vw] border-b border-[#D9D9D9] max-md:h-[9vw] max-sm:h-[17vw]">
                    <p className="text-[#111111] text-center text-[1.25vw] leading-[1.15] font-semibold max-md:text-[2.5vw] max-sm:text-[4.6vw]">
                      {plan.useCases}
                    </p>
                  </div>

                  <div className="h-[5.25vw] flex items-center justify-center px-[1vw] border-b border-[#D9D9D9] max-md:h-[9vw] max-sm:h-[17vw]">
                    <p className="text-[#111111] text-center text-[1.25vw] leading-[1.15] max-md:text-[2.5vw] max-sm:text-[4.6vw]">
                      {getPrice(plan)}
                    </p>
                  </div>

                  {[0, 1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-[5.25vw] flex items-center justify-center px-[1vw] border-b border-[#D9D9D9] last:border-b-0 max-md:h-[9vw] max-sm:h-[17vw]"
                    >
                      <CheckIcon />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden max-md:block px-[7vw]">
        <div className="relative h-[6px] w-full rounded-full bg-[#D9D9D9] overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[#0205FA] transition-all duration-150"
            style={{
              width: "25%",
              transform: `translateX(${scrollProgress * 3}%)`,
            }}
          />
        </div>


      </div>

      <Copy>
        <div className="mt-[3vw] text-[#111111] text-[1.35vw] leading-[1.6] max-md:text-[2.5vw] max-md:mt-[5vw] max-sm:text-[4.6vw] max-sm:px-[5vw] max-sm:mt-[6vw] max-md:px-[7vw]">
          <p>* All prices are exclusive of applicable taxes</p>
          <p>* No separate installation or activation charges</p>
        </div>

      </Copy>
    </section>
  );
};

export default PricingTable;