"use client";
import headerLogo from "../../../public/header-logo.png";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { TfiMenu } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { CONTACT_INFO } from "../../utils/SITE_INFO";
import { scroller } from "react-scroll";
import { getStrapiMedia } from "../../lib/api";
import { Cross, CrossIcon, Mail, Phone } from "lucide-react";

export default function Header({ headerData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const router = useRouter();
  const topBarRef = useRef(null);
  const mainHeaderRef = useRef(null);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
  // Check if current page is home
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const measureHeights = () => {
      if (topBarRef.current) {
        setTopBarHeight(topBarRef.current.offsetHeight);
      }
      if (mainHeaderRef.current) {
        setMainHeaderHeight(mainHeaderRef.current.offsetHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", measureHeights);
    measureHeights();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureHeights);
    };
  }, []);

  const totalHeaderHeight = topBarHeight + mainHeaderHeight;
  const scrolledHeaderHeight = mainHeaderHeight;

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -scrolledHeaderHeight,
    });
  };

  const handleNavigation = (item) => {
    const sectionId = item.SectionId;
    const type = item.linkType;
    if (type === "page") {
      router.push(`/${sectionId}`);
    } else {
      const currentPath = window.location.pathname;
      if (currentPath !== "/") {
        router.push("/");
        setTimeout(() => scrollToSection(sectionId), 500);
      } else {
        scrollToSection(sectionId);
      }
    }
  };

  const handleGetStarted = () => {
    setMobileOpen(false);
    scrollToSection("contact");
  };

  const logoUrl = headerData?.logo?.url
    ? getStrapiMedia(headerData.logo.url)
    : null;

  const drawer = (
    <Box sx={{ padding: "0 10px", marginLeft: "10px" }}>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 0px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {logoUrl && (
          <Image
            src={logoUrl || "/placeholder.svg"}
            alt="Logo"
            width={120}
            height={30}
            style={{ objectFit: "contain" }}
            onClick={() => {
              router.push("/");
              setMobileOpen(false);
            }}
          />
        )}
        <IoMdClose
          onClick={() => setMobileOpen(false)}
          className="text-2xl mr-1"
        />
      </Typography>
      <Divider />
      <List className="border-b">
        {headerData?.navItems?.map((item) => (
          <ListItem key={item.id} disablePadding className="border-b">
            <button
              className="my-2 text-primaryColor  text-md tracking-wide font-poppins "
              onClick={() => {
                setMobileOpen(false);
                handleNavigation(item);
              }}
            >
              <p>{item.Label}</p>
            </button>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <button
            className="text-secondaryColor border-secondaryColor py-3 hover:bg-secondaryColor hover:text-white transition-all duration-300 flex items-center gap-2 disabled:opacity-50 px-6 text-[14px] leading-[16px] rounded-md tracking-wider border w-full justify-center my-4"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </ListItem>
      </List>
      <div className="flex flex-row gap-4 py-[12px] items-center">
        <Link
          href={`mailto:${CONTACT_INFO.email}`}
          className="shadow-md p-2 rounded-full"
        >
          <MdEmail className="text-primaryColor text-[20px]" />
        </Link>
        <Link
          href={CONTACT_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="shadow-md p-2 rounded-full"
        >
          <FaLinkedinIn className="text-primaryColor text-[20px]" />
        </Link>
      </div>
    </Box>
  );

  return (
    <header
      className={`z-50 fixed w-full top-0 left-0 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
      style={{
        height: isScrolled
          ? `${scrolledHeaderHeight}px`
          : `${totalHeaderHeight}px`,
      }}
    >
      <div
        className={`lg:hidden w-full py-4 px-5 mx-auto flex bg-white shadow-md justify-between items-center ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <Image
          src={logoUrl}
          alt="Logo"
          width={120}
          height={30}
          onClick={() => router.push("/")}
          style={{ objectFit: "contain" }}
        />
        <TfiMenu
          title="Menu"
          onClick={() => setMobileOpen(true)}
          className="text-xl text-black cursor-pointer"
        />
      </div>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        anchor="right"
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { width: "75%" },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Headers */}
      <div
        className={`hidden lg:block transition-transform duration-500 ease-in-out ${
          isScrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
        style={{
          transform: isScrolled
            ? `translateY(-${topBarHeight}px)`
            : `translateY(0px)`,
        }}
      >
        {/* First Header (Top Bar) */}
        <div
          ref={topBarRef}
          className="bg-gradient-to-r from-custom-blue-dark to-custom-blue-light text-textColor text-sm py-5 px-4 md:px-6"
        >
          <div className="container mx-auto flex justify-end items-center gap-6">
            <Link
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex text-base items-center gap-2 hover:underline"
            >
              <Mail className="h-4 w-4" />
              <span>contact@gigantech.com</span>
            </Link>
          </div>
        </div>

        <div
          ref={mainHeaderRef}
          className={`container  mx-auto bg-white px-8 py-1 ${
            isScrolled ? "bg-white shadow-none" : "shadow-sm "
          }`}
        >
          <div className="flex items-center justify-between py-5">
            <Image
              src={logoUrl || "/placeholder.svg"}
              quality={100}
              width={240}
              height={120}
              onClick={() => router.push("/")}
              alt="Logo"
              style={{ objectFit: "contain" }}
              className="max-md:w-40 object-contain"
            />
            <nav className="flex items-center">
              <ul className="flex gap-6 font-poppins items-center text-lg text-black">
                {headerData?.navItems?.map((item) => (
                  <li
                    key={item.id}
                    className="hover:text-primaryColor cursor-pointer px-3 py-2"
                    onClick={() => handleNavigation(item)}
                  >
                    {item.Label}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
