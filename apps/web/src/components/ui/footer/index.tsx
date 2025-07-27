"use client";

import { Copyright, Github, Heart, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/utils/cn";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Compare", href: "/compare" },
      { name: "Countries", href: "/countries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Blog", href: "/blog" },
      { name: "FAQs", href: "/faqs" },
      { name: "Support", href: "/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/hijraah",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/hijraah",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:hello@hijraah.com",
    icon: Mail,
  },
];

/**
 * Footer component
 *
 * @example
 * ```tsx
 * <Footer>Content</Footer>
 * ```
 */
export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-background/50 backdrop-blur-sm w-full mt-auto print:hidden"
      data-slot="footer"
    >
      <div
        className="container py-10 px-4 sm:px-6 lg:px-8 mx-auto"
        data-slot="footer-content"
      >
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4" data-slot="footer-brand">
            <Link
              href="/"
              className="flex items-center"
              aria-label="Hijraah Home"
            >
              <span className="font-bold text-xl">Hijraah</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Compare immigration policies across countries with AI-powered
              insights and personalized guidance.
            </p>
            <div className="flex space-x-3 pt-2" data-slot="footer-social">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  data-slot="social-link"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section) => (
            <div
              key={section.title}
              className="flex flex-col space-y-4"
              data-slot="footer-links-section"
            >
              <h3 className="font-semibold text-sm tracking-wider uppercase text-foreground">
                {section.title}
              </h3>
              <ul
                className="flex flex-col space-y-2.5"
                data-slot="footer-links"
              >
                {section.links.map((link) => (
                  <li key={link.name} data-slot="footer-link-item">
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5",
                        pathname === link.href && "text-foreground font-medium"
                      )}
                      data-active={pathname === link.href ? "true" : undefined}
                    >
                      <>
                        {link.name}
                        {pathname === link.href && (
                          <span className="size-1.5 rounded-full bg-foreground/70" />
                        )}
                      </>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer with copyright */}
        <div
          className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-border text-center md:text-left"
          data-slot="footer-bottom"
        >
          <div
            className="flex items-center text-sm text-muted-foreground mb-3 md:mb-0"
            data-slot="footer-copyright"
          >
            <Copyright className="h-4 w-4 mr-2" />
            <span>{currentYear} Hijraah. All rights reserved.</span>
          </div>
          <div
            className="flex items-center text-sm text-muted-foreground"
            data-slot="footer-tagline"
          >
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1.5 text-destructive animate-pulse" />
            <span>by Hijraah Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
