/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, FormEvent, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { 
  Code2, 
  Layout, 
  Smartphone, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Twitter, 
  Instagram,
  Linkedin, 
  Mail, 
  Menu, 
  X,
  Globe,
  Zap,
  Shield,
  Users,
  Layers,
  Cpu,
  MousePointer2,
  Sparkles,
  Terminal,
  Database,
  Cloud
} from 'lucide-react';

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import About from './pages/About';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

// --- Utilities ---

const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
};

// --- Components ---

const MagneticButton = ({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isTouch) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center of static container
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative"
    >
      <motion.a
        href={href}
        whileTap={{ scale: 0.95 }}
        style={{ x: isTouch ? 0 : springX, y: isTouch ? 0 : springY }}
        className={`relative inline-flex items-center justify-center transition-colors duration-300 ${className}`}
      >
        <span className="relative z-10">{children}</span>
      </motion.a>
    </div>
  );
};

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center ${className}`}>
    <span className="font-display text-2xl tracking-[0.15em] text-slate-900 font-medium uppercase">
      LAVRÉN<span className="text-[#9c845c]">.</span>
    </span>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: isHome ? '#services' : '/#services' },
    { name: 'Process', href: isHome ? '#approach' : '/#approach' },
    { name: 'Tech', href: isHome ? '#tech' : '/#tech' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl py-4 border-b border-slate-100' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div 
          className="hidden md:flex items-center bg-slate-200/20 p-1.5 rounded-2xl backdrop-blur-md border border-white/20"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith('/');
            const Component = isExternal ? Link : 'a';
            const props = isExternal ? { to: link.href } : { href: link.href };

            return (
              <Component 
                key={link.name} 
                {...props}
                className="relative px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 hover:text-slate-900 transition-colors z-10"
                onMouseEnter={() => setHoveredLink(link.name)}
              >
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white shadow-sm border border-slate-100 rounded-xl"
                    initial={false}
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.4
                    }}
                  />
                )}
                <span className="relative z-20">{link.name}</span>
              </Component>
            );
          })}
          <div className="ml-4">
            <MagneticButton href={isHome ? "#contact" : "/#contact"} className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#9c845c] transition-all shadow-lg shadow-slate-200 border border-white/10">
              Contact Us
            </MagneticButton>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] md:hidden flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-6 border-b border-slate-100">
              <Logo />
              <button className="text-slate-900" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center p-8 space-y-8">
              {navLinks.map((link, i) => {
                const isExternal = link.href.startsWith('/');
                const Component = isExternal ? Link : 'a';
                const props = isExternal ? { to: link.href } : { href: link.href };

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Component 
                      {...props}
                      className="text-4xl font-display font-black text-slate-900 uppercase tracking-tighter"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Component>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-8 w-full max-w-xs"
              >
                <Link 
                  to={isHome ? "#contact" : "/#contact"} 
                  className="bg-slate-900 text-white w-full py-5 rounded-2xl text-center font-black text-[10px] uppercase tracking-[0.3em] block"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
            <div className="p-8 border-t border-slate-100 flex justify-center gap-8">
              <Instagram size={20} className="text-slate-400" />
              <Twitter size={20} className="text-slate-400" />
              <Linkedin size={20} className="text-slate-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-40 md:pt-48 overflow-hidden bg-white">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#9c845c]/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">
        <motion.div style={{ y, opacity }} className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="h-[1px] w-8 md:w-12 bg-[#9c845c]" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#9c845c]">
                Premium Engineering Studio
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-[120px] font-display font-medium text-slate-900 leading-[0.95] md:leading-[0.85] tracking-tighter mb-8 md:mb-10 uppercase">
              CRAFTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9c845c] to-[#bca47c]">DIGITAL</span> <br />
              LEGACIES.
            </h1>
            <p className="text-base md:text-xl text-slate-500 mb-10 md:mb-12 leading-relaxed max-w-xl font-medium">
              We build high-end websites for brands that value quality and design.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-slate-200" />
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Scroll</span>
      </motion.div>
    </section>
  );
};

const InteractiveServices = () => {
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: 0,
      title: "System Architecture",
      icon: <Layers size={24} />,
      description: "We design robust, scalable backend infrastructures that handle millions of requests with zero latency.",
      details: ["Microservices", "Cloud Infrastructure", "API Design", "Database Optimization"]
    },
    {
      id: 1,
      title: "Frontend Engineering",
      icon: <Layout size={24} />,
      description: "Pixel-perfect interfaces built with React and Next.js, focused on performance and accessibility.",
      details: ["React / Next.js", "Tailwind CSS", "Motion Graphics", "Web Vitals Optimization"]
    },
    {
      id: 2,
      title: "Product Strategy",
      icon: <Sparkles size={24} />,
      description: "Data-driven product roadmaps that align technical execution with business objectives.",
      details: ["User Research", "MVP Development", "Conversion Strategy", "Growth Analytics"]
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#9c845c] mb-6 block">Capabilities</span>
            <h2 className="text-2xl md:text-5xl font-display font-black text-slate-900 mb-8 md:mb-10 leading-tight uppercase tracking-tight">
              Technical excellence <br className="hidden md:block" /> in every layer.
            </h2>
            
            <div className="space-y-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all border ${activeTab === service.id ? 'bg-slate-900 border-slate-900 text-white shadow-2xl' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${activeTab === service.id ? 'text-[#bca47c]' : 'text-slate-400'}`}>
                        {service.icon}
                      </div>
                      <span className="font-black uppercase tracking-widest text-xs">{service.title}</span>
                    </div>
                    <ArrowRight size={16} className={`transition-transform ${activeTab === service.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="bg-slate-50 p-6 sm:p-10 md:p-16 rounded-[32px] md:rounded-[40px] border border-slate-100 min-h-[400px] md:min-h-[450px] flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 md:p-12 text-[#9c845c]/5">
                  {services[activeTab].icon}
                </div>
                
                <div className="text-[#9c845c] mb-6 md:mb-8">
                  {services[activeTab].icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-slate-900 mb-4 md:mb-6 uppercase tracking-tighter">{services[activeTab].title}</h3>
                <p className="text-base md:text-lg text-slate-500 mb-8 md:mb-10 leading-relaxed font-medium">
                  {services[activeTab].description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {services[activeTab].details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9c845c]" />
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#9c845c] rounded-3xl -z-10 opacity-10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const techs = [
    { name: "React", icon: <Code2 size={20} /> },
    { name: "Next.js", icon: <Zap size={20} /> },
    { name: "TypeScript", icon: <Terminal size={20} /> },
    { name: "Node.js", icon: <Cpu size={20} /> },
    { name: "PostgreSQL", icon: <Database size={20} /> },
    { name: "AWS", icon: <Cloud size={20} /> },
    { name: "Tailwind", icon: <Layout size={20} /> },
    { name: "Framer", icon: <MousePointer2 size={20} /> }
  ];

  return (
    <section id="tech" className="py-16 md:py-20 bg-slate-900 overflow-hidden scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#bca47c] mb-3 md:mb-4 block">Tech</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-tight">Our Core Technologies</h2>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="py-8 md:py-12 animate-marquee whitespace-nowrap flex gap-4 md:gap-8">
          {[...techs, ...techs].map((tech, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-white">
              <span className="text-[#bca47c]">{tech.icon}</span>
              <span className="font-bold uppercase tracking-widest text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Approach = () => {
  const steps = [
    {
      title: "Discovery",
      desc: "Deep technical audit and business alignment. We uncover the core challenges and opportunities of your project.",
      size: "col-span-1 row-span-1",
      icon: <Search size={24} />
    },
    {
      title: "Architecture",
      desc: "Designing the blueprint for scale and security.",
      size: "col-span-1 row-span-1",
      icon: <Layers size={24} />
    },
    {
      title: "Engineering",
      desc: "Clean, modular code with continuous integration. We build with precision and performance in mind.",
      size: "col-span-1 row-span-1",
      icon: <Terminal size={24} />
    },
    {
      title: "Optimization",
      desc: "Rigorous testing and performance tuning. Ensuring your digital asset is ready for the world.",
      size: "col-span-1 row-span-1",
      icon: <Zap size={24} />
    }
  ];

  return (
    <section id="approach" className="py-16 md:py-32 bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#9c845c] mb-4 md:mb-6 block">Our Process</span>
            <h2 className="text-3xl md:text-7xl font-display font-black text-slate-900 leading-[1] md:leading-[0.9] tracking-tighter">
              BUILT FOR <br /> LONGEVITY.
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm text-left md:text-right">
            We don't just build websites; we engineer digital assets that appreciate in value over time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 auto-rows-auto md:auto-rows-[260px] border border-slate-100 rounded-[30px] md:rounded-[40px] overflow-hidden">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={`bg-white p-8 border border-slate-100/50 flex flex-col justify-between group relative overflow-hidden ${step.size}`}
            >
              <div className="absolute top-0 right-0 p-8 text-slate-100 group-hover:text-[#9c845c]/10 transition-colors">
                {step.icon}
              </div>
              
              <div className="relative z-10">
                <div className="text-[10px] font-black text-[#9c845c] mb-2 uppercase tracking-widest">Step 0{index + 1}</div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">{step.title}</h3>
              </div>
              
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs relative z-10">{step.desc}</p>
              
              {/* Decorative Gradient */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#9c845c]/5 rounded-full blur-3xl group-hover:bg-[#9c845c]/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingInteractive = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Standard",
      price: "2000",
      features: ["Custom UI Design", "Responsive Development", "SEO Foundation", "3 Months Support"]
    },
    {
      name: "Enterprise",
      price: "3500",
      features: ["Advanced Architecture", "Custom CMS Integration", "Performance Audit", "12 Months Support", "Priority Updates"],
      highlight: true
    }
  ];

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-20 gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#9c845c] mb-4 md:mb-6 block">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tighter uppercase">TRANSPARENT <br /> INVESTMENT.</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`p-8 md:p-12 rounded-[30px] md:rounded-[40px] border relative overflow-hidden transition-all duration-500 flex flex-col ${plan.highlight ? 'bg-slate-900 border-slate-900 text-white shadow-[0_30px_60px_-15px_rgba(156,132,92,0.3)]' : 'bg-slate-50 border-slate-100 text-slate-900'}`}
            >
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-2 text-[#9c845c]">{plan.name}</h3>
              <div className="mb-10">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter">RM{plan.price}</span>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>One-time investment</span>
              </div>
              
              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-medium">
                    <div className={`w-1.5 h-1.5 rounded-full ${plan.highlight ? 'bg-[#bca47c]' : 'bg-[#9c845c]'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton 
                href="#contact" 
                className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${plan.highlight ? 'bg-[#9c845c] text-white hover:bg-[#bca47c]' : 'bg-slate-900 text-white hover:bg-[#9c845c]'}`}
              >
                Get Started
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TerminalInquiry = () => {
  const [lines, setLines] = useState<string[]>([
    "Initializing LAVRÉN secure shell...",
    "Connection established.",
    "Type 'help' to see available commands."
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLines = [...lines, `> ${input}`];
    
    const cmd = input.toLowerCase().trim();
    if (cmd === 'help') {
      newLines.push("Available commands: services, approach, tech, contact, clear");
    } else if (cmd === 'services') {
      newLines.push("LAVRÉN Services: System Architecture, Frontend Engineering, Product Strategy.");
    } else if (cmd === 'approach') {
      newLines.push("Our Approach: Discovery -> Architecture -> Engineering -> Optimization.");
    } else if (cmd === 'tech') {
      newLines.push("Stack: React, Next.js, TS, Node, PostgreSQL, AWS, Tailwind, Framer.");
    } else if (cmd === 'contact') {
      newLines.push("Redirecting to contact section...");
      window.location.href = '#contact';
    } else if (cmd === 'clear') {
      setLines(["Terminal cleared."]);
      setInput("");
      return;
    } else {
      newLines.push(`Command not found: ${cmd}. Type 'help' for assistance.`);
    }

    setLines(newLines);
    setInput("");
  };

  return (
    <section className="py-20 md:py-32 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#bca47c] mb-6 block">Interactive Shell</span>
            <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-[0.9] tracking-tighter mb-8 md:mb-10 uppercase">
              EXPLORE OUR <br /> ENGINE.
            </h2>
            <p className="text-slate-400 font-medium text-base md:text-lg leading-relaxed max-w-md">
              Interact directly with our studio's core logic. Use the terminal to query our capabilities.
            </p>
          </div>

          <div className="bg-black rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-[#9c845c]/20">
            <div className="bg-white/5 px-6 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30">lavren-studio — bash</div>
            </div>
            <div 
              ref={scrollRef}
              className="p-4 sm:p-8 h-[300px] sm:h-[350px] overflow-y-auto font-mono text-xs md:text-sm text-[#bca47c]/80 space-y-2 scrollbar-hide"
            >
              {lines.map((line, i) => (
                <div key={i} className={line.startsWith('>') ? 'text-white' : ''}>
                  {line}
                </div>
              ))}
              <form onSubmit={handleCommand} className="flex items-center gap-2">
                <span className="text-green-400 font-bold">$</span>
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none text-white w-full"
                  autoFocus
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 mb-10 leading-tight uppercase tracking-tighter">
            Ready to build <br /> your legacy?
          </h2>
          <p className="text-base md:text-lg text-slate-500 mb-12 font-medium leading-relaxed">
            We're open for new projects. Let's talk about your vision.
          </p>
          
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-12">
            <a href="mailto:avlam1511@gmail.com" className="flex items-center gap-4 md:gap-6 group cursor-pointer w-full lg:w-auto justify-center lg:justify-start">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-[#9c845c] group-hover:text-white group-hover:border-[#9c845c] transition-all">
                <Mail size={24} />
              </div>
              <div className="text-left">
                <div className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Email</div>
                <div className="text-lg md:text-xl font-bold text-slate-900">avlam1511@gmail.com</div>
              </div>
            </a>
            <a href="https://www.instagram.com/lavren_1511/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 md:gap-6 group cursor-pointer w-full lg:w-auto justify-center lg:justify-start">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-[#9c845c] group-hover:text-white group-hover:border-[#9c845c] transition-all">
                <Instagram size={24} />
              </div>
              <div className="text-left">
                <div className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Instagram</div>
                <div className="text-lg md:text-xl font-bold text-slate-900">@lavren_1511</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#fcfaf7] pt-20 md:pt-32 pb-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-6 md:mb-8" />
            <p className="text-slate-500 max-w-sm mb-8 md:mb-10 font-medium leading-relaxed text-sm md:text-base">
              Building high-end digital experiences.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/lavren_1511/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#9c845c] transition-colors"><Instagram size={20} /></a>
              <a href="mailto:avlam1511@gmail.com" className="text-slate-400 hover:text-[#9c845c] transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 md:mb-8">Navigation</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/#services" className="text-xs md:text-sm font-bold text-slate-900 hover:text-[#9c845c] transition-colors uppercase tracking-widest">Services</Link></li>
              <li><Link to="/#approach" className="text-xs md:text-sm font-bold text-slate-900 hover:text-[#9c845c] transition-colors uppercase tracking-widest">Process</Link></li>
              <li><Link to="/#tech" className="text-xs md:text-sm font-bold text-slate-900 hover:text-[#9c845c] transition-colors uppercase tracking-widest">Tech</Link></li>
              <li><Link to="/about" className="text-xs md:text-sm font-bold text-slate-900 hover:text-[#9c845c] transition-colors uppercase tracking-widest">About Us</Link></li>
              <li><Link to="/#contact" className="text-xs md:text-sm font-bold text-slate-900 hover:text-[#9c845c] transition-colors uppercase tracking-widest">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 md:pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center md:text-left">
            © {new Date().getFullYear()} LAVRÉN STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#9c845c] transition-colors">Privacy</a>
            <a href="#" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[#9c845c] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const Home = () => {
  return (
    <main>
      <Hero />
      <InteractiveServices />
      <TechStack />
      <Approach />
      <TerminalInquiry />
      <PricingInteractive />
      <Contact />
    </main>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#fcfaf7] font-sans text-slate-900 selection:bg-[#9c845c]/20 selection:text-[#9c845c]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
        
        {/* Custom Styles for Marquee */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
    </Router>
  );
}
