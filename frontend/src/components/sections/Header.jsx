import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, profile } from "../../mock";
import { Button } from "../ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#0F1B2D]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-full bg-[#0F1B2D] text-[#FAF7F2] grid place-items-center font-display font-semibold text-sm group-hover:bg-[#C8862B] transition-colors">
            MG
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-base font-semibold tracking-tight">
              {profile.firstName} {profile.lastName}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#0F1B2D]/55">
              {profile.ambition}
            </span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline text-sm font-medium text-[#0F1B2D]/75 hover:text-[#0F1B2D] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-[#0F1B2D] hover:bg-[#C8862B] text-[#FAF7F2] rounded-full px-5 h-10 transition-colors"
          >
            <a href="#contact">Me contacter</a>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden p-2 rounded-md hover:bg-[#0F1B2D]/5"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#0F1B2D]/10 bg-[#FAF7F2]">
          <nav className="flex flex-col px-6 py-5 gap-4">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium py-2 border-b border-[#0F1B2D]/10"
              >
                {item.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 bg-[#0F1B2D] hover:bg-[#C8862B] text-[#FAF7F2] rounded-full"
            >
              <a href="#contact" onClick={() => setOpen(false)}>
                Me contacter
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
