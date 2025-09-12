"use client";

import { useState, useEffect } from "react";
import { IoSendSharp } from "react-icons/io5";

import FooterSteps from "./Steps";
import { countries } from "../../../data/contact-data/CountriesList";
import { CustomSelect } from "./CustomSelect";
import { sendContactForm } from "../../../lib/api";
import { CircularProgress } from "@mui/material";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

function Contact({ headerData, contactForm }) {
  const formConfig = contactForm;
  const { title, description } = headerData;
  const [emailError, setEmailError] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dynamicMenuItems =
    formConfig?.inputOptions?.map((option) => ({
      value: option.value,
      label: option.label,
    })) || [];

  const inputLabels = {
    firstName: formConfig?.Input?.[0]?.label,
    lastName: formConfig?.Input?.[1]?.label,
    email: formConfig?.Input?.[2]?.label,
    company: formConfig?.Input?.[3]?.label,
    country: formConfig?.Input?.[4]?.label,
    hearAbout: formConfig?.Input?.[5]?.label,
    serviceInterest: formConfig?.Input?.[6].label,
    message: formConfig?.Input?.[7]?.label,
  };
  const servicesTitle =
    formConfig?.serviceTitles?.map((item) => ({
      value: item.title,
      label: item.title,
    })) || [];

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    country: "",
    aboutUs: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 820);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e, field) => {
    setFormValues({
      ...formValues,
      [field]: e.target ? e.target.value : e,
    });

    if (field === "email" && emailError) {
      setEmailError("");
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (!validateEmail(formValues.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await sendContactForm(formValues);
      if (response.success) {
        console.log("Form submitted:", formValues);
        setIsSubmitted(true);
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          country: "",
          aboutUs: "",
          service: "",
          message: "",
        });
        setEmailError("");
        // Reset the button state after 2 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 2000);
      } else {
        throw new Error(response.message || "Failed to send email");
      }
    } catch (error) {
      alert(
        "Submission failed: " + (error.message || "Please try again later.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-auto shadow-md relative py-16 md:py-24  bg-gradient-to-l  from-white to-backgroundColor  ">
      <div className=" absolute opacity-50 inset-0  ">
        {/* ✅ Dynamic Background Image */}
        <Image
          src="/contact-bg.png"
          alt="Services background" 
          fill
          className="object-cover "
          priority
        />
      </div>
      <div className="px-5 md:px-[50px] font-poppins  text-center">
        <h2 className="heading-text text-textColor  ">Contact Us</h2>
      </div>
      <div className="container mt-10 mx-auto md:px-8">
        <div className="flex flex-col  services-card   lg:flex-row ">
          <div className="w-2/5 max-lg:w-full bg-secondaryColor  z-10  px-5 lg:px-16 py-8">
            <div>
              <h1 className="heading-text  !text-white mb-[15px] text-left">
                {title}
              </h1>
              <p className="pt-[5px] pb-[25px] text-justify w-full text-white font-poppins text-lg md:text-left max-md:mt-3">
                {description}
              </p>
              <FooterSteps />
            </div>
          </div>
          <div id="contact" className="w-3/5 z-10 bg-white  max-lg:w-full">
            <div className="m-8" sx={{ m: { xs: "30px", md: "40px" } }}>
              <form onSubmit={handleFormSubmission} className="w-full">
                <div
                  className={`mb-8 grid ${
                    isSmallScreen ? "grid-cols-1 gap-8" : "grid-cols-2 gap-8"
                  }`}
                >
                  <div className="relative">
                  <input
                    id="first-name"
                    className="h-[52px] w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-secondaryColor focus:border-2"
                    value={formValues.firstName}
                    onChange={(e) => handleInputChange(e, "firstName")}
                    onFocus={() => handleFocus("firstName")}
                    onBlur={handleBlur}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="first-name"
                    className={`absolute left-3 ${
                      focusedField === "firstName" || formValues.firstName
                        ? "-top-2.5 text-xs bg-white px-1"
                        : "top-3.5"
                    } transition-all duration-200 pointer-events-none ${
                      focusedField === "firstName"
                        ? "text-secondaryColor"
                        : "text-gray-500"
                    }`}
                  >
                    {inputLabels.firstName}
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                </div>

                   <div className="relative">
                  <input
                    id="last-name"
                    className="h-[52px] w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:border-secondaryColor focus:border-2"
                    value={formValues.lastName}
                    onChange={(e) => handleInputChange(e, "lastName")}
                    onFocus={() => handleFocus("lastName")}
                    onBlur={handleBlur}
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="last-name"
                    className={`absolute left-3 ${
                      focusedField === "lastName" || formValues.lastName
                        ? "-top-2.5 text-xs bg-white px-1"
                        : "top-3.5"
                    } transition-all duration-200 pointer-events-none ${
                      focusedField === "lastName"
                        ? "text-secondaryColor"
                        : "text-gray-500"
                    }`}
                  >
                    {inputLabels.lastName}
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                </div>
                </div>

                <div
                  className={`mb-8 grid ${
                    isSmallScreen ? "grid-cols-1 gap-8" : "grid-cols-2 gap-8"
                  }`}
                >
                  <div className="relative">
                    <input
                      id="email"
                      className={`h-[52px] w-full rounded border ${
                        emailError ? "border-red-500" : "border-gray-300"
                      } px-3 py-2 text-sm focus:outline-none focus:border-2 ${
                        emailError
                          ? "focus:border-red-500"
                          : "focus:border-secondaryColor"
                      }`}
                      value={formValues.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-3 ${
                        focusedField === "email" || formValues.email
                          ? "-top-2.5 text-xs bg-white px-1"
                          : "top-3.5"
                      } transition-all duration-200 pointer-events-none ${
                        emailError
                          ? "text-red-500"
                          : focusedField === "email"
                          ? "text-secondaryColor"
                          : "text-gray-500"
                      }`}
                    >
                      {emailError ? "Invalid email" : inputLabels.email}
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="company"
                      className="h-[52px] w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-secondaryColor focus:border-2"
                      value={formValues.company}
                      onChange={(e) => handleInputChange(e, "company")}
                      onFocus={() => handleFocus("company")}
                      onBlur={handleBlur}
                      placeholder=" "
                    />
                    <label
                      htmlFor="company"
                      className={`absolute left-3 ${
                        focusedField === "company" || formValues.company
                          ? "-top-2.5 text-xs bg-white px-1"
                          : "top-3.5"
                      } transition-all duration-200 pointer-events-none ${
                        focusedField === "company"
                          ? "text-secondaryColor"
                          : "text-gray-500"
                      }`}
                    >
                      {inputLabels.company}
                    </label>
                  </div>
                </div>

                <div
                  className={`mb-8 grid ${
                    isSmallScreen ? "grid-cols-1 gap-8" : "grid-cols-2 gap-8"
                  }`}
                >
                  <CustomSelect
                    id="country"
                    label={inputLabels.country}
                    value={formValues.country}
                    options={countries}
                    onChange={(value) => handleInputChange(value, "country")}
                    required
                    searchable
                  />

                  <CustomSelect
                    id="about-us"
                    label={inputLabels.hearAbout}
                    value={formValues.aboutUs}
                    // value={formValues.aboutUs}
                    options={dynamicMenuItems}
                    onChange={(value) => handleInputChange(value, "aboutUs")}
                    required
                  />
                </div>

                <div className="mb-8">
                  <CustomSelect
                    id="service"
                    label={inputLabels.serviceInterest}
                    value={formValues.service}
                    options={servicesTitle}
                    onChange={(value) => handleInputChange(value, "service")}
                    required
                  />
                </div>

                <div className="mb-8 relative">
                  <textarea
                    id="message"
                    className="min-h-[160px] w-full rounded border border-gray-300 px-3 py-4 text-sm focus:outline-none focus:border-secondaryColor focus:border-2"
                    value={formValues.message}
                    onChange={(e) => handleInputChange(e, "message")}
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                    placeholder=" "
                    required
                    rows={5}
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-3 ${
                      focusedField === "message" || formValues.message
                        ? "-top-2.5 text-xs bg-white px-1"
                        : "top-3.5"
                    } transition-all duration-200 pointer-events-none ${
                      focusedField === "message"
                        ? "text-secondaryColor"
                        : "text-gray-500"
                    }`}
                  >
                    {inputLabels.message}
                    <span className="text-red-500 ml-0.5">*</span>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-1 px-8 primaryButton  flex flex-row items-center gap-2 "
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        size={24}
                        thickness={4}
                        sx={{ color: "#105085", mx: 3 }}
                      />
                    ) : isSubmitted ? (
                      <>
                      </>
                    ) : (
                      <>
                        Submit 
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
