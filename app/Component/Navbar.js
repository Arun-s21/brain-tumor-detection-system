import Link from "next/link";

export default function Navbar() {
  return (
    // A semi-transparent header that sticks to the top
    <header className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Increased height for a more substantial feel */}
        <div className="flex items-center justify-between h-24">
          {/* Title with a reasonable font size */}
          <div className="text-2xl font-semibold tracking-wider">
            <Link className="text-green-800 hover:text-green-900" href="/">CerebroScan</Link>
          </div>

          {/* Navigation links */}
          <nav className=" md:flex items-center space-x-10">
            {/* Larger, more readable links with a better hover effect */}
            <a
              href="/#about"
              className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              Information
            </a>
            <a
              href="/#results"
              className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              Results
            </a>
            <a
              href="/#contact"
              className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              About Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
