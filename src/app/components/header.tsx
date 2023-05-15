"use client";
import React from "react";
import Link from "next/link";

function Header() {
  return (
    <nav
      className="relative flex w-full bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start mb-4"
      data-te-navbar-ref
    >
      <div
        className="!visible hidden grow basis-[100%] items-center lg:!flex lg:basis-auto"
        id="navbarSupportedContentX"
        data-te-collapse-item
      >
        <ul
          className="mr-auto flex flex-col lg:flex-row"
          data-te-navbar-nav-ref
        >
          <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
            <Link
              className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              href="/"
              data-te-nav-link-ref
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Home
            </Link>
          </li>
          <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
            <Link
              className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
              href="/extended-forecast"
              data-te-nav-link-ref
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Extended Forecast
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
