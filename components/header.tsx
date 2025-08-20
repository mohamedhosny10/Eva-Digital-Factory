"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/eva-pharma-logo-alt.png"
              alt="Hero"
              width={60}
              height={40}
              className="w-[60px] h-[40px]" // keep ratio
            />
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Eva Digital Factory
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="#home"
              scroll={false}
              className="text-gray-900 dark:text-white hover:text-yellow-primary transition-colors"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-900 dark:text-white hover:text-yellow-primary transition-colors">
                <span>Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <Link
              href="#news"
              scroll={false}
              className="text-gray-900 dark:text-white hover:text-yellow-primary transition-colors"
            >
              News
            </Link>
            <Link
              href="#about"
              scroll={false}
              className="text-gray-900 dark:text-white hover:text-yellow-primary transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 dark:text-white p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-900 dark:text-white hover:text-yellow-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/solutions"
                className="text-gray-900 dark:text-white hover:text-yellow-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="/news"
                className="text-gray-900 dark:text-white hover:text-yellow-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              <Link
                href="/about"
                className="text-gray-900 dark:text-white hover:text-yellow-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
