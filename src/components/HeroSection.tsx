import { Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative rounded-[2.5rem] overflow-hidden hero-gradient my-8 animate-fade-in">
      <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight animate-slide-down text-primary-foreground">
            ARCHIPELAGO
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto animate-slide-up stagger-1">
            Addressing Remote Coastal Higher Education Inequalities through Platform Enabled Learning Approaches for a Green and resilient Ocean
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 animate-slide-up stagger-2">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-4 md:px-10 md:py-6 text-base font-semibold transition-all hover:scale-105 shadow-lg">
              Learn More
            </Button>
            <Button 
              variant="outline" 
              className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 rounded-full px-8 py-4 md:px-10 md:py-6 text-base font-medium transition-all hover:scale-105"
            >
              Contact Us
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-6 animate-slide-up stagger-3">
            <a
              href="#twitter"
              className="w-12 h-12 rounded-full border-2 border-primary-foreground/30 hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all flex items-center justify-center hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-primary-foreground" />
            </a>
            <a
              href="#linkedin"
              className="w-12 h-12 rounded-full border-2 border-primary-foreground/30 hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all flex items-center justify-center hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-primary-foreground" />
            </a>
            <a
              href="#email"
              className="w-12 h-12 rounded-full border-2 border-primary-foreground/30 hover:border-primary-foreground hover:bg-primary-foreground/10 transition-all flex items-center justify-center hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-primary-foreground" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative wave pattern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
