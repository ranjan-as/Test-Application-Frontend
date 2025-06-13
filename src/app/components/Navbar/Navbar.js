import Link from "next/link";
import Image from "next/image";
import "./navbar.css";

export default function Navbar() {
  return (
    <header className="nta-navbar">
      <div className="nta-navbar-container">
        <Link href="/" className="nta-navbar-logo">
          <Image src="/nta-logo.png" alt="NTA Logo" width={48} height={48} />
          <span className="nta-navbar-title">National Test Platform</span>
        </Link>
        <nav className="nta-navbar-links">
          <Link href="/org/login" className="nta-navbar-link">
            Org Login
          </Link>
          <Link href="/org/register" className="nta-navbar-link">
            Org Register
          </Link>
          <Link href="/student/login" className="nta-navbar-link">
            Student Login
          </Link>
          <Link href="/student/register" className="nta-navbar-link">
            Student Register
          </Link>
          <div className="nta-navbar-dropdown">
            <span className="nta-navbar-link nta-navbar-dropdown-toggle">
              More <span className="arrow">▼</span>
            </span>
            <div className="nta-navbar-dropdown-menu">
              <Link href="/admin" className="nta-navbar-link">
                Admin Panel
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
