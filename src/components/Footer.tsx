import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const headingStyle = {
  fontFamily: "'Cormorant Infant', Arial, Helvetica, sans-serif",
  fontSize: "24px",
  fontWeight: 700,
  color: "#F0870D",
  marginBottom: "16px",
  display: "block",
};

const linkStyleOrange = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  color: "#f97316",
  textDecoration: "none",
};

const linkStyleMuted = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  color: "#ffffff",
  textDecoration: "none",
};

const bodyStyle = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  color: "#ffffff",
  lineHeight: "1.7",
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary pt-16 pb-6">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "20px", fontWeight: 700, color: "#F0870D", marginBottom: "16px" }}>
              SKT tours and travels
            </div>
            <p style={bodyStyle}>
              Your trusted travel partner for exploring the incredible beauty of South India.
              We craft unforgettable journeys tailored to your dreams since 2006.
            </p>
          </div>

          {/* South India Packages */}
          <div>
            <span style={headingStyle}>South India Packages</span>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Kerala Tour Packages", "Tamil Nadu Tour Packages", "Karnataka Tour Packages", "Andhra Pradesh Packages", "Pondicherry Packages"].map((item) => (
                <li key={item}>
                  <Link to="/packages" style={linkStyleOrange}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <span style={headingStyle}>Quick Links</span>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "All Packages", to: "/packages" },
                { label: "Testimonials", to: "/testimonials" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} style={linkStyleMuted}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <span style={headingStyle}>Contact Us</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", ...bodyStyle }}>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#f97316" }} />
                <p style={bodyStyle}>123, Main Road, Near Bus Stand,<br />Chennai, Tamil Nadu 600001</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: "#f97316" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {["+91 98945 55553", "+91 94425 55553", "+91 98947 70505", "+91 98430 51148"].map((num, i) => (
                    <a key={i} href={`tel:${num.replace(/\s/g, "")}`} style={{ ...linkStyleOrange }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                    >{num}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#f97316" }} />
                <a href="mailto:skttravels22@gmail.com" style={linkStyleOrange}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >skttravels22@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 flex-shrink-0" style={{ color: "#f97316" }} />
                <a href="https://www.instagram.com/skt_tours_and_travels_cbe?igsh=MWgzOGZxZzVtdTdxaQ==" target="_blank" rel="noopener noreferrer"
                  style={linkStyleOrange}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "48px", paddingTop: "24px", textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ ...bodyStyle, color: "#ffffff" }}>
            © 2006-2026 SKT tours and travels. All rights reserved.
          </p>
          <p style={{ ...bodyStyle, color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
            Made with <span style={{ color: "#ef4444" }}>♥</span> by{" "}
            <a
              href="https://www.technovuz.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#94a3b8", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f97316")}
              onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
            >
              Technovuz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
