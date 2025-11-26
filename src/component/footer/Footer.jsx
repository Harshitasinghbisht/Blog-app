import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
   return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-slate-800 text-white py-10 border-t border-white/10">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="-m-6 flex flex-wrap">
          {/* Brand + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 flex items-center gap-2">
                <Logo width="100px" />
                <span className="text-lg font-semibold tracking-wide">DevBlog</span>
              </div>
              <p className="text-sm text-gray-300">
                &copy; {new Date().getFullYear()} DevBlog. All rights reserved.
              </p>
            </div>
          </div>

          {/* Company Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-300 tracking-wider">
                Company
              </h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-gray-200 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-300 tracking-wider">
                Support
              </h3>
              <ul className="space-y-3">
                {["Account", "Help", "Contact Us", "Customer Support"].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-gray-200 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legals Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="mb-4 text-sm font-semibold uppercase text-gray-300 tracking-wider">
                Legals
              </h3>
              <ul className="space-y-3">
                {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item) => (
                  <li key={item}>
                    <Link
                      to="/"
                      className="text-gray-200 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom line */}
      <div className="mt-8 border-t border-white/10 pt-4 text-center text-sm text-gray-300">
        Made with ❤️ using React & Appwrite
      </div>
    </footer>
  );
}


export default Footer