import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-black font-bold">E</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Eva Digital Factory</h3>
                <p className="text-gray-400 text-sm">
                  Digital Transformation Arm
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Empowering the fight for health and well-being through digital
              innovation.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Solutions</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Patient Care
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Operational Efficiency
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  AI & Innovation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © 2024 Eva Digital Factory. All rights reserved. A division of Eva
            Pharma.
          </p>
        </div>
      </div>
    </footer>
  );
}
