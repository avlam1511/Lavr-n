import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Users, Target, Award, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 md:pt-40 pb-16 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Hero Section */}
        <div className="mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#9c845c] mb-4 md:mb-6 block">Our Story</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium text-slate-900 leading-[0.95] md:leading-[0.9] tracking-tighter mb-6 md:mb-10 uppercase">
              ENGINEERING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9c845c] to-[#bca47c]">EXCELLENCE</span> <br />
              SINCE 2025.
            </h1>
            <p className="text-base md:text-xl text-slate-500 leading-relaxed font-medium">
              Founded by Jayden and Avinars, LAVRÉN was born from a shared obsession with clean code and high-end digital aesthetics. We bridge the gap between visionary entrepreneurship and rigorous technical execution.
            </p>
          </motion.div>
        </div>

        {/* Founders Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-32">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#9c845c] mb-4 md:mb-6 block">The Visionaries</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-6 md:mb-8 tracking-tighter uppercase">Jayden & Avinars.</h2>
            <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-slate-500 font-medium leading-relaxed">
              <p>
                LAVRÉN started with a simple realization: the web was becoming cluttered with generic solutions. Jayden and Avinars, both lifelong enthusiasts of coding and design, saw an opportunity to build something different.
              </p>
              <p>
                As entrepreneurs at heart, they understood that a website isn't just a digital business card—it's the most powerful asset a brand owns. They combined their technical expertise with a passion for building digital legacies, creating a studio that treats every project as a unique piece of engineering art.
              </p>
              <p>
                Today, they lead a team dedicated to one goal: making sure your brand's first digital impression is its strongest.
              </p>
            </div>
          </div>
          <div className="relative order-1 lg:order-2 px-4 md:px-0">
            <div className="aspect-[4/5] bg-slate-100 rounded-[30px] md:rounded-[40px] overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Founders working" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 text-white text-left">
                <div className="text-[9px] md:text-xs font-black uppercase tracking-widest mb-1 md:mb-2 opacity-70">Studio Founders</div>
                <div className="text-xl md:text-2xl font-display font-bold">Jayden & Avinars</div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-4 md:-top-6 -left-0 md:-left-6 w-24 md:w-32 h-24 md:h-32 border-t-2 border-l-2 border-[#9c845c] rounded-tl-[30px] md:rounded-tl-[40px] -z-10" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-8 md:p-12 rounded-[30px] md:rounded-[40px] border border-slate-100"
          >
            <div className="w-12 h-12 bg-[#9c845c]/10 rounded-2xl flex items-center justify-center text-[#9c845c] mb-8">
              <Target size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-6 uppercase tracking-tighter">Our Mission</h2>
            <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-base">
              To empower visionary brands with technical assets that don't just exist, but perform. We believe in building for longevity, ensuring every line of code serves a strategic purpose.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-8 md:p-12 rounded-[30px] md:rounded-[40px] text-white"
          >
            <div className="w-12 h-12 bg-[#bca47c]/20 rounded-2xl flex items-center justify-center text-[#bca47c] mb-8">
              <Sparkles size={24} />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 uppercase tracking-tighter">Our Vision</h2>
            <p className="text-slate-300 font-medium leading-relaxed text-sm md:text-base">
              To become the global standard for premium digital engineering. We strive to be the studio that brands turn to when they need their most ambitious technical visions realized with precision.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-16 md:mb-32">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#9c845c] mb-4 md:mb-6 block">Core Values</span>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tighter uppercase">What we stand for.</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                title: "Precision",
                desc: "We obsess over the details that others overlook. From pixel-perfect layouts to optimized database queries.",
                icon: <Award size={24} />
              },
              {
                title: "Transparency",
                desc: "Honest communication and clear roadmaps. We treat your project as if it were our own legacy.",
                icon: <Users size={24} />
              },
              {
                title: "Innovation",
                desc: "Constantly pushing the boundaries of what's possible with modern web technologies.",
                icon: <Sparkles size={24} />
              }
            ].map((value, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group p-6 md:p-8 bg-white md:bg-transparent rounded-3xl md:rounded-none border md:border-none border-slate-50 shadow-sm md:shadow-none"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-slate-100 rounded-[28px] md:rounded-[32px] flex items-center justify-center text-slate-900 mx-auto mb-6 md:mb-8 shadow-xl shadow-slate-200/50 group-hover:bg-[#9c845c] group-hover:text-white transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-slate-900 mb-3 md:mb-4">{value.title}</h3>
                <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team / Culture CTA */}
        <div className="bg-[#9c845c] rounded-[30px] md:rounded-[50px] p-10 md:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-6xl font-display font-black mb-8 md:mb-10 leading-tight uppercase tracking-tighter">
              Join us in <br /> building the future.
            </h2>
            <Link to="/#contact" className="bg-white text-slate-900 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-slate-100 transition-all inline-block">
              Work with us
              <ArrowRight className="ml-2 inline-block" size={16} />
            </Link>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default About;
