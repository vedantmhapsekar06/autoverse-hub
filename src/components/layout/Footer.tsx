import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="section-container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Car className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold">AutoVerse</span>
            </Link>
            <p className="mb-4 text-sm text-primary-foreground/70">
              Your trusted partner for car rentals and purchases. Drive your dream today with
              AutoVerse.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/rent" className="transition-colors hover:text-primary-foreground">
                  Rent a Car
                </Link>
              </li>
              <li>
                <Link to="/buy" className="transition-colors hover:text-primary-foreground">
                  Buy a Car
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="transition-colors hover:text-primary-foreground">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="transition-colors hover:text-primary-foreground">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary-foreground">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary-foreground">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary-foreground">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-display text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a
                  href="mailto:autoverse@gmail.com"
                  className="transition-colors hover:text-primary-foreground"
                >
                  autoverse@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a
                  href="tel:+919876543210"
                  className="transition-colors hover:text-primary-foreground"
                >
                  +91 9876543210
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <span>123 Auto Street, Tech Park, Bangalore - 560001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/50">
          <p>© 2024 AutoVerse. All rights reserved. | Drive Your Dream Today</p>
        </div>
      </div>
    </footer>
  );
};
