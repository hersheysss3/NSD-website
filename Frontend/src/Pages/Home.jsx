import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Users, Globe, Menu, X, ArrowRight, ArrowLeft, Phone, MessageCircle, Award, Shield, PawPrint } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import ScrollAnimate from '../Animation/ScrollAnimate';

// Animated counter hook
const useCountUp = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const ref = useRef(null);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return [count, ref];
};

// Hero Imagessrc/assets/home2.jpg
import home2 from "../assets/home2.jpg";
import feedingDrive from "../assets/feedingDrive.jpg";

// Initiative Images
import waterPot from "../assets/waterPot.jpg";
import radiumBelt from "../assets/radiumBelt.jpg";
import vaccination from "../assets/vaccination.jpg";
import adoption from "../assets/adoption.jpg";
import communityEvent from "../assets/communityEvent.jpg";

import goodDoggy from "/home1.png";
import donateIntro from "/home2.png";


// Other Images
// import goodDoggy from "../../public/home1.png"; // Updated path to match the new structure
// import donateIntro from "../../public/home2.png"; // Updated path to match the new structure
// ../../public/New photo/New photo/IMG-20250603-WA0046~2.jpg
// Volunteer Photos C:\Users\RBU\Desktop\Wooferz1\Frontend\public\New photo\IMG-20240918-WA0039(1).jpg
// import volunteer1 from "../../public/New photo/IMG-20250603-WA0046~2.jpg"; // Updated path to match the new structure
// import volunteer2 from "../../public/New photo/IMG-20241206-WA0109~2.jpg";
// import volunteer3 from "../../public/New photo/IMG-20250603-WA0050~2.jpg";
// import volunteer4 from "../../public/New photo/IMG-20250604-WA0012~2.jpg";
// import volunteer5 from "../../public/New photo/IMG-20250604-WA0024~2.jpg";
// import volunteer6 from "../../public/New photo/IMG-20250604-WA0090.jpg";
// import volunteer7 from "../../public/New photo/IMG-20250604-WA0091.jpg";
// import volunteer8 from "../../public/New photo/IMG-20250604-WA0101.jpg";
// import volunteer9 from "../../public/New photo/IMG-20250604-WA0111(1).jpg";
// import volunteer10 from "../../public/New photo/IMG-20250604-WA0124~2.jpg";
// import volunteer11 from "../../public/New photo/IMG-20250604-WA0125~2.jpg";
// import volunteer12 from "../../public/New photo/IMG-20250604-WA0140.jpg";
// import volunteer13 from "../../public/New photo/IMG-20250604-WA0142.jpg";
// import volunteer14 from "../../public/New photo/IMG-20250604-WA0148.jpg";

import volunteer1 from "/New photo/IMG-20250603-WA0046~2.jpg";
import volunteer2 from "/New photo/IMG-20241206-WA0109~2.jpg";
import volunteer3 from "/New photo/IMG-20250603-WA0050~2.jpg";
import volunteer4 from "/New photo/IMG-20250604-WA0012~2.jpg";
import volunteer5 from "/New photo/IMG-20250604-WA0024~2.jpg";
import volunteer6 from "/New photo/IMG-20250604-WA0090.jpg";
import volunteer7 from "/New photo/IMG-20250604-WA0091.jpg";
import volunteer8 from "/New photo/IMG-20250604-WA0101.jpg";
import volunteer9 from "/New photo/IMG-20250604-WA0111(1).jpg";
import volunteer10 from "/New photo/IMG-20250604-WA0124~2.jpg";
import volunteer11 from "/New photo/IMG-20250604-WA0125~2.jpg";
import volunteer12 from "/New photo/IMG-20250604-WA0140.jpg";
import volunteer13 from "/New photo/IMG-20250604-WA0142.jpg";
import volunteer14 from "/New photo/IMG-20250604-WA0148.jpg";


// Animated stat card component
const StatCard = ({ icon, end, suffix, label }) => {
  const [count, ref] = useCountUp(end);
  return (
    <div ref={ref} className="glass-solid p-8 text-center">
      <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold text-orange-500 mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

function Home() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reset carousel position when switching between mobile/desktop
    useEffect(() => {
        setCurrentSlide(0);
    }, [isMobile]);

    const heroImages = [
        {
            image: home2,
            title: "Every Little Help Counts",
            subtitle: "Together we can create a better future for street animals."
        },
        {
            image: feedingDrive,
            title: "Providing Medical Care",
            subtitle: "Professional veterinary treatment for every rescued animal"
        }
    ];

    const initiatives = [
        {
            image: feedingDrive,
            title: "Daily feeding drives",
            description: "NSD nourish the lives of over 150+ street dogs with love, care, and hope. It's not just a routine; it's a mission to make their world brighter and kinder."
        },
        {
            image: waterPot,
            title: "Free water pots distribution",
            description: "Every summer, NSD distributes free water pots to ensure no street dog suffers from thirst or dehydration. It's our mission to keep them safe and hydrated, making sure no paws is left behind."
        },
        {
            image: radiumBelt,
            title: "Radium belts drive",
            description: "NSD is transforming street safety by outfitting dogs with reflective radium belts, reducing accidents by 30% in Nagpur. We're brightening the night to protect every street dog and ensure they're seen and safe."
        },
        {
            image: vaccination,
            title: "Rescue and vaccination",
            description: "NSD is committed to rescuing all animals in need—whether it's dogs, cows, cats, birds, or any other creatures. We believe every life matters and work tirelessly to offer help and hope to every animal, no matter the species."
        },
        {
            image: adoption,
            title: "Adoption camp",
            description: "From the streets to safe homes — our adoption camps connect abandoned and stray dogs with loving families."
        },
        {
            image: communityEvent,
            title: "Community events",
            description: "We organize events to bring together the pet community, fostering unity and creating a strong, supportive network for all pet lovers. Our goal is to build a community where everyone can connect, share, and grow together."
        }
    ];

    const volunteerPhotos = [
        volunteer1,
        volunteer2,
        volunteer3,
        volunteer4,
        volunteer5,
        volunteer6,
        volunteer7,
        volunteer8,
        volunteer9,
        volunteer10,
        volunteer11,
        volunteer12,
        volunteer13,
        volunteer14,
    ];

    // --- Initiatives Carousel ---
    const itemsPerSlide = isMobile ? 1 : 3;
    const maxSlide = isMobile 
        ? initiatives.length - 1 
        : Math.max(0, initiatives.length - itemsPerSlide);

    // Auto-slide for initiatives
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => {
                if (prev >= maxSlide) return 0;
                return prev + 1;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [maxSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => {
            if (prev >= maxSlide) return 0;
            return prev + 1;
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => {
            if (prev === 0) return maxSlide;
            return prev - 1;
        });
    };

    // Touch swipe support for mobile carousel
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    };

    // Auto-slide for hero section
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Enhanced Hero Section with Image Swiping */}
            <section id="home" className="relative min-h-screen overflow-hidden">
                <div className="absolute inset-0">
                    {heroImages.map((hero, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${currentHeroSlide === index ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${hero.image}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    ))}
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex items-center min-h-screen pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-3xl">
                            <div className="mb-6">
                                <span className="inline-flex items-center px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium backdrop-blur-sm">
                                    <Heart className="w-4 h-4 mr-2" />
                                    Support That Drives Hope
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                {heroImages[currentHeroSlide].title}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                                {heroImages[currentHeroSlide].subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={() => navigate('/donate')}>
                                    Donate Now!
                                </button>
                                <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300" onClick={() => navigate('/about')}>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Navigation Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex space-x-3">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentHeroSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentHeroSlide === index
                                        ? 'bg-orange-500 w-8'
                                        : 'bg-white/50 hover:bg-white/70'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Stats Section */}
            <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
                <div className="blob-orb-1 -top-20 -left-20 opacity-20"></div>
                <div className="blob-orb-2 -bottom-20 -right-20 opacity-20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <ScrollAnimate animation="fade-up">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
                            <p className="text-xl text-gray-600">Making a difference, one life at a time</p>
                        </div>
                    </ScrollAnimate>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        <ScrollAnimate animation="zoom-in" delay={0}><StatCard icon={<Heart className="w-8 h-8 text-orange-500" />} end={950} suffix="+" label="Rescue Cases" /></ScrollAnimate>
                        <ScrollAnimate animation="zoom-in" delay={100}><StatCard icon={<Award className="w-8 h-8 text-orange-500" />} end={500} suffix="+" label="Adoptions" /></ScrollAnimate>
                        <ScrollAnimate animation="zoom-in" delay={200}><StatCard icon={<Shield className="w-8 h-8 text-orange-500" />} end={3000} suffix="+" label="Radium Belts Distributed" /></ScrollAnimate>
                        <ScrollAnimate animation="zoom-in" delay={300}><StatCard icon={<Users className="w-8 h-8 text-orange-500" />} end={150} suffix="+" label="Volunteer Team" /></ScrollAnimate>
                        <ScrollAnimate animation="zoom-in" delay={400}><StatCard icon={<Globe className="w-8 h-8 text-orange-500" />} end={5} suffix="k+" label="Community Members" /></ScrollAnimate>
                    </div>
                </div>
            </section>

            {/* Enhanced About Us Section */}
            <section id="about" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <ScrollAnimate animation="fade-right">
                            <div className="relative">
                                <img
                                    src={goodDoggy}
                                    alt="About us"
                                />
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-orange-200 rounded-full opacity-30 -z-10"></div>
                                <div className="absolute -top-8 -left-8 w-24 h-24 bg-orange-300 rounded-full opacity-20 -z-10"></div>
                            </div>
                        </ScrollAnimate>
                        <ScrollAnimate animation="fade-left" delay={200}>
                            <div>
                                <div className="mb-6">
                                    <span className="text-orange-500 font-semibold text-lg">Our Story</span>
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-8">About Us</h2>
                                </div>
                                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                                    <p>
                                        Nagpur street dogs is a self funded youth community founded by a 16 year old boy in 2020.
                                        We focus on providing food , medical care, free water pots every summer, shelter and many more to the animals in need.
                                        Through our dedicated efforts, we aim to create a safer and kinder environment for street Animals.
                                    </p>
                                    <p>
                                        We focus on providing comprehensive care including food, water, medical treatment, and shelter. Our dedicated team works tirelessly to make every summer and winter more comfortable for street animals while advocating for better policies to create a stable, nurturing environment for all animals in need.
                                    </p>
                                    <div className="flex items-center space-x-6 pt-4">
                                        <div className="flex items-center">
                                            <Heart className="w-6 h-6 text-orange-500 mr-2" />
                                            <span className="font-semibold">Compassionate Care</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Users className="w-6 h-6 text-orange-500 mr-2" />
                                            <span className="font-semibold">Community Driven</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimate>
                    </div>
                </div>
            </section>

            {/* Enhanced Our Initiatives Section */}
            <section id="initiatives" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollAnimate animation="fade-up">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Initiatives</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive programs designed to rescue, rehabilitate, and rehome street animals
                            </p>
                        </div>
                    </ScrollAnimate>

                    <div className="relative">
                        <div className="overflow-hidden rounded-3xl shadow-2xl"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * (isMobile ? 100 : 100 / 3)}%)` }}>
                                {initiatives.map((initiative, index) => (
                                    <div
                                        key={index}
                                        className={`flex-shrink-0 relative px-2 group cursor-pointer ${isMobile ? 'w-full' : 'w-1/3'}`}
                                        style={{ zIndex: 1 }}
                                    >
                                        <img
                                            src={initiative.image}
                                            alt={initiative.title}
                                            className="w-full h-80 md:h-[500px] object-cover rounded-2xl transition-all duration-500 group-hover:opacity-60"
                                        />
                                        <div className="absolute inset-0 rounded-2xl bg-black/40 flex flex-col justify-end items-start p-6 md:p-8 transition-all duration-500">
                                            <h3 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 z-10 transition-all duration-500 group-hover:mb-0 text-orange-500 group-hover:text-orange-400 drop-shadow-lg">
                                                {initiative.title}
                                            </h3>
                                            <p
                                                className={`text-sm md:text-lg text-white z-10 overflow-hidden transition-all duration-500 ${
                                                    isMobile
                                                        ? 'opacity-100 max-h-40'
                                                        : 'opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40'
                                                }`}
                                            >
                                                {initiative.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 bg-white/90 text-orange-500 p-3 md:p-4 rounded-full hover:bg-white transition-all duration-300 shadow-lg z-10"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 bg-white/90 text-orange-500 p-3 md:p-4 rounded-full hover:bg-white transition-all duration-300 shadow-lg z-10"
                        >
                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-8 space-x-3">
                            {Array.from({ length: isMobile ? initiatives.length : Math.ceil(initiatives.length / 3) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(isMobile ? index : index)}
                                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-500 w-6 md:w-8' : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Donation Section */}
            <section id="donate" className="py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <ScrollAnimate animation="fade-right">
                        <div>
                            <div className="mb-8">
                                <span className="text-orange-500 font-semibold text-lg">Make a Difference</span>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                                    Together we can save lives
                                </h2>
                                <p className="text-2xl font-semibold text-orange-500 mb-6">
                                    Be The Reason Someone Smiles Today
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button className="bg-orange-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    ₹150
                                </button>
                                <button className="bg-orange-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    ₹500
                                </button>
                                <button className="bg-orange-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    ₹1000
                                </button>
                                <button className="bg-orange-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    ₹5000
                                </button>
                            </div>

                            <div className="bg-orange-100 p-6 rounded-2xl">
                                <p className="text-gray-700 text-lg font-medium">
                                    💝 "Want To Know Where Your Donation Goes? Just Ask!"
                                </p>
                                <p className="text-gray-600 mt-2">
                                    Complete transparency on how your contribution helps save lives
                                </p>
                            </div>
                        </div>
                        </ScrollAnimate>

                        <ScrollAnimate animation="fade-left" delay={200}>
                        <div className="relative">
                            <img
                                src={donateIntro}
                                alt="Happy rescued dog"
                                className="rounded-3xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-200 rounded-full opacity-30 -z-10"></div>
                        </div>
                        </ScrollAnimate>
                    </div>
                </div>
            </section>

            {/* Enhanced WhatsApp Community Section */}
            <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollAnimate animation="flip-up">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Join Our Community
                        </h3>
                        <p className="text-xl text-gray-300 mb-8">
                            Connect with like-minded animal lovers, get updates on rescues, and be part of our mission to create a better world for street animals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <MessageCircle className="mr-3 w-6 h-6" />
                                Join WhatsApp Community
                            </button>
                            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                                Follow on Social Media
                            </button>
                        </div>
                    </div>
                    </ScrollAnimate>
                </div>
            </section>
            
            {/* Call to Action */}
            <ScrollAnimate animation="zoom-in">
            <div className="mt-20 text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h3>
                    <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-3xl mx-auto">
                        Join our mission to save lives and create happy endings for dogs in need.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button onClick={() => { navigate("/adopt") }} className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            Adopt a Dog
                        </button>
                        <button onClick={() => { navigate("/volunteer") }} className="bg-amber-400 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-500 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Become a Volunteer
                        </button>
                        <button onClick={() => { navigate("/donate") }} className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-all transform hover:scale-105 flex items-center gap-2">
                            <PawPrint className="w-5 h-5" />
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>
            </ScrollAnimate>

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <ScrollAnimate animation="fade-up">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Gallery</h2>
                </ScrollAnimate>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 p-2 md:p-5 pb-16">
                    {/* Large featured photo */}
                    <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700">
                        <img
                            src={volunteerPhotos[0]}
                            alt="Featured volunteer moment"
                            className="w-full h-full min-h-[280px] md:min-h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                            <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">Making Impact Together</h3>
                        </div>
                    </div>

                    {/* Medium photos */}
                    {volunteerPhotos.slice(1, 3).map((photo, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                            <img
                                src={photo}
                                alt="Volunteer moment"
                                className="w-full h-32 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 md:pb-6">
                                <Heart className="w-6 h-6 md:w-10 md:h-10 text-white fill-current" />
                            </div>
                        </div>
                    ))}

                    {/* Small photos */}
                    {volunteerPhotos.slice(3, 13).map((photo, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
                            <img
                                src={photo}
                                alt="Volunteer moment"
                                className="w-full h-32 md:h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-orange-600/80 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="text-white font-semibold text-center text-xs md:text-base px-2 md:px-4">Making Impact Together</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    );
}

export default Home;