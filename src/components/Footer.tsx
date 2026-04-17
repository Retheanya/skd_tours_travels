import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary pt-16 pb-6">
      <div className="container mx-auto px-4">
        {/* CTA Banner */}
        <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center mb-16 -mt-32 relative z-10 shadow-elevated">
          <h2 className="text-2xl md:text-4xl font-bold font-display text-primary-foreground mb-4">
            Life is short & the world is wide!
          </h2>
          <p className="text-primary-foreground/80 font-body mb-6">
            Book your South India tour today and create memories that last forever.
          </p>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-full font-semibold font-body hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            Book Now
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-secondary-foreground/80">
          <div>
            <h3 className="text-xl font-bold font-display text-secondary-foreground mb-4">
              SDK <span className="text-primary">Tours</span> & Travels
            </h3>
            <p className="text-sm font-body leading-relaxed">
              Your trusted travel partner for exploring the incredible beauty of South India.
              We craft unforgettable journeys tailored to your dreams.
            </p>
          </div>

          <div>
            <h4 className="font-semibold font-display text-secondary-foreground mb-4">South India Packages</h4>
            <ul className="space-y-2 text-sm font-body">
              <li><Link to="/packages" className="hover:text-primary transition-colors">Kerala Tour Packages</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors">Tamil Nadu Tour Packages</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors">Karnataka Tour Packages</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors">Andhra Pradesh Packages</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors">Pondicherry Packages</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors">Telangana Tour Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-display text-secondary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm font-body">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/packages" className="hover:text-primary transition-colors">All Packages</Link></li>
              <li><Link to="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold font-display text-secondary-foreground mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm font-body">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p>123, Main Road, Near Bus Stand,<br />Chennai, Tamil Nadu 600001</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:info@sdktours.com" className="hover:text-primary transition-colors">info@sdktours.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-6 text-center">
          <p className="text-sm text-secondary-foreground/50 font-body">
            © 2026 SDK Tours & Travels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
