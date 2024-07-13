// src/components/client/StickyNavbar.jsx

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { navLinks } from "../../constants";
import style from "../../style";
import { logo } from "../../assets";
import classNames from "classnames";
import {
  Navbar,
  Collapse,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3BottomRightIcon,
} from "@heroicons/react/24/solid";

// nav list component
function NavList({ selectedItem, handleSelect }) {
  return (
    <ul className="mt-2 mb-2 mr-10 flex flex-col gap-6 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navLinks.map((navLink) => {
        const isSelected = selectedItem === navLink.id;
        if (navLink.dropdown) {
          return (
            <Menu key={navLink.id}>
              <MenuHandler>
                <Typography
                  as="a"
                  variant="small"
                  color="gray"
                  className={`font-bold ${style.colors.navbartext}`}
                >
                  <MenuItem
                    className={`flex items-center gap-3 lg:rounded-full hover:bg-white hover:text-amber-900 hover:${
                      style.colors.navbarhighlight
                    } ${
                      isSelected
                        ? `${style.colors.navbarhighlight} ${style.colors.navbarhighlighttext}`
                        : ""
                    }`}
                    onClick={() => handleSelect(navLink.id)}
                  >
                    {navLink.title}
                    <ChevronDownIcon
                      strokeWidth={2}
                      className={`h-3 w-3 transition-transform`}
                    />
                  </MenuItem>
                </Typography>
              </MenuHandler>
              <MenuList className="p-1">
                {navLink.dropdown.map((dropdownItem) => (
                  <Link
                    to={`${dropdownItem.id}`}
                    key={dropdownItem.id}
                    className={`flex items-center gap-3 rounded ${style.colors.navbartext} hover:text-amber-800`}
                    onClick={() => handleDropdownSelect(dropdownItem.id)}
                  >
                    <MenuItem className="flex items-center gap-3 rounded">
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                      >
                        {dropdownItem.title}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          );
        } else {
          return (
            <Typography
              key={navLink.id}
              as="a"
              href={`${navLink.id}`}
              variant="small"
              className={`font-bold ${style.colors.navbartext}`}
              onClick={() => handleSelect(navLink.id)}
            >
              <MenuItem
                className={`flex items-center gap-2 lg:rounded-full hover:bg-white hover:text-amber-900 hover:${
                  style.colors.navbarhighlight
                } ${
                  isSelected
                    ? `${style.colors.navbarhighlight} ${style.colors.navbarhighlighttext}`
                    : ""
                }`}
              >
                {navLink.title}
              </MenuItem>
            </Typography>
          );
        }
      })}
    </ul>
  );
}

const StickyNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const handleSelect = (id) => {
    setSelectedItem(id);
  };

  const handleDropdownSelect = (id) => {
    setSelectedItem(id);
    setIsNavOpen(false); // Close the Collapse
  };
  

  useEffect(() => {
    const path = location.pathname.substring(1);
    if (path === "") {
      setSelectedItem("home");
    } else {
      const currentNavItem = navLinks.find((navLink) => navLink.id === path);
      if (currentNavItem) {
        setSelectedItem(currentNavItem.id);
      } else {
        setSelectedItem(null);
      }
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 960) {
        setIsNavOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col mt-4">
      <div className="w-[80px] h-[80px] ml-2 rounded-full bg-white lg:w-[160px] lg:h-[160px] lg:ml-20 flex items-center justify-center -mt-1 lg:-mb-8 z-50">
        <img
          src={logo}
          alt="VishwaKarmaMandir"
          className="w-[80px] h-[80px] object-contain select-none rounded-full lg:w-[160px] lg:h-[160px]"
        />
      </div>
      <Navbar
        className={classNames(
          `w-full max-w-full -mt-16 lg:-mt-20 z-30 border-transparent p-3 lg:pl-2 ${style.colors.navbarbg} overflow-hidden`,
          {
            "rounded-none": windowWidth >= 960 || !isNavOpen,
            "rounded-xl": windowWidth < 960 && isNavOpen,
          }
        )}
      >
        <div
          className={`flex items-center justify-end ${style.colors.navbartext}`}
        >
          <div className="hidden lg:block">
            <NavList selectedItem={selectedItem} handleSelect={handleSelect} />
          </div>
          <IconButton
            size="sm"
            variant="text"
            onClick={toggleIsNavOpen}
            className={`ml-auto mr-2 lg:hidden ${style.colors.navbartext}`}
          >
            <Bars3BottomRightIcon className="h-6 w-6 text-amber-900" />
          </IconButton>
        </div>
        <Collapse
          open={isNavOpen}
          className={classNames(
            "overflow-scroll transition-all duration-300 ease-in-out",
            { "mt-6": isNavOpen }
          )}
        >
          <NavList selectedItem={selectedItem} handleSelect={handleSelect} />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default StickyNavbar;
