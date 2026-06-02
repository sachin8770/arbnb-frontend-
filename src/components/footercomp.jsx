import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-sm text-gray-500">
          © 2026 Airbnb Clone. All rights reserved.
        </p>

        <div className="flex items-center gap-5 text-sm text-gray-600">
          <a href="/privacy" className="hover:text-rose-500">
            Privacy
          </a>
          <a href="/terms" className="hover:text-rose-500">
            Terms
          </a>
          <a href="/contact" className="hover:text-rose-500">
            Contact
          </a>
          <a href="/help" className="hover:text-rose-500">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;