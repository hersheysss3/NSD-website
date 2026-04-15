import React, { useState, useEffect } from 'react';

// Custom hook for scroll position
function useScrollPosition() {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return scrollY;
}

// TestimonialCard component
function TestimonialCard({ testimonial, expanded, onExpand, onCollapse }) {
    // For accessibility: allow keyboard expansion
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            expanded ? onCollapse() : onExpand();
        }
    };

    return (
        <div
            tabIndex={0}
            role="button"
            aria-pressed={expanded}
            className={`transition-all duration-900 ease-in-out cursor-pointer 
                ${expanded ? 'scale-105 z-20 shadow-2xl' : 'hover:scale-105 shadow-lg'}
                glass-solid p-6 w-full max-w-xs mx-auto
                `}
            onMouseEnter={onExpand}
            onMouseLeave={onCollapse}
            onFocus={onExpand}
            onBlur={onCollapse}
            onClick={expanded ? onCollapse : onExpand}
            onKeyDown={handleKeyDown}
            style={{
                minHeight: expanded ? 320 : 192,
                outline: expanded ? '2px solid #fb923c' : 'none',
                position: 'relative',
            }}
        >
            <div className="flex flex-col items-center text-center space-y-3 h-full">
                <div className="relative">
                    <div className={`rounded-full overflow-hidden border-4 ${expanded ? 'w-20 h-20' : 'w-16 h-16'} border-orange-200 shadow-lg transition-all duration-300`}>
                        <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div className={`absolute ${expanded ? '-top-2 -right-2 w-8 h-8' : '-bottom-1 -right-1 w-6 h-6'} bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-all duration-300`}>
                        <span className="text-white text-xs font-bold">{expanded ? '★' : '✓'}</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="text-gray-800 font-bold text-sm">{testimonial.name}</div>
                    <div className="text-gray-600 text-xs font-medium">{testimonial.position}</div>
                    <div className="text-gray-500 text-xs">{testimonial.company}</div>
                </div>
                <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className={`text-${expanded ? 'yellow' : 'orange'}-500 text-${expanded ? 'lg' : 'sm'}`}>★</span>
                    ))}
                </div>
                {expanded && (
                    <div className="mt-4 text-orange-700 text-base font-medium leading-relaxed">{testimonial.quote}</div>
                )}
            </div>
        </div>
    );
}

function OurTeam() {
    const [hoveredMember, setHoveredMember] = useState(null);
    const [expandedTestimonial, setExpandedTestimonial] = useState(null);
    const scrollY = useScrollPosition();

    const teamMembers = [
        {
            role: "Founder",
            name: "UJWALA CHINTALA",
            description: "Visionary leader with 10+ years of experience in tech innovation and entrepreneurship. Passionate about building impactful digital products that shape the future.",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
            skills: ["Leadership", "Strategy", "Innovation"],
            quote: "Innovation isn't just about technology—it's about solving real problems."
        },
        {
            role: "Chief Technology Officer",
            name: "SNEHA IYER",
            description: "Software architect and AI expert, Sneha leads the engineering team with a focus on scalable solutions and cutting-edge technology.",
            photo: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
            skills: ["AI/ML", "Architecture", "Team Leadership"],
            quote: "Great code is like poetry—it should be beautiful and functional."
        },
        {
            role: "Head of Design",
            name: "RISHI MALHOTRA",
            description: "Creative visionary who crafts the brand's identity, turns complex ideas into user-centric, modern, and visually compelling designs.",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            skills: ["UI/UX", "Branding", "Product Design"],
            quote: "Design is not just what it looks like—design is how it works."
        }
    ];

    const testimonials = [
        {
            id: 1,
            name: "Sarah Thompson",
            position: "Fleet Marketing Lead",
            company: "Tesla",
            photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            quote: "Great customer care is key to exceptional service and community engagement. These creative campaigns have delivered outstanding content and continue to succeed beyond our expectations.",
            rating: 5
        },
        {
            id: 2,
            name: "Mark Rodriguez",
            position: "Full Stack Developer",
            company: "Audi",
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            quote: "The technical expertise and innovative solutions provided have transformed our development workflow. Exceptional collaboration and delivery every time.",
            rating: 5
        },
        {
            id: 3,
            name: "Emma Chen",
            position: "Content Strategist",
            company: "Mena Group",
            photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
            quote: "Outstanding creative vision and attention to detail. The team's ability to understand our brand and translate it into compelling content is remarkable.",
            rating: 5
        },
        {
            id: 4,
            name: "David Wilson",
            position: "Product Manager",
            company: "Microsoft",
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            quote: "Strategic thinking combined with flawless execution. Their innovative approach has helped us achieve goals we didn't think were possible.",
            rating: 5
        },
        {
            id: 5,
            name: "Lisa Park",
            position: "Design Director",
            company: "Adobe",
            photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            quote: "Incredible design sensibility and user experience expertise. They've elevated our brand identity to new heights with their creative solutions.",
            rating: 5
        },
        {
            id: 6,
            name: "James Mitchell",
            position: "Tech Lead",
            company: "Google",
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            quote: "Top-tier technical skills and problem-solving abilities. Their solutions are not just functional but elegant and scalable for future growth.",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            {/* Floating Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Header */}
            <div className="relative overflow-hidden">
                <div
                    className="absolute inset-0 glass-solid/80"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                ></div>

                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        ></div>
                    ))}
                </div>

                <div className="relative z-10 text-center py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Meet Our
                            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                Dream Team
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto font-light leading-relaxed">
                            Passionate innovators dedicated to creating exceptional digital experiences that transform businesses and delight users
                        </p>
                        <div className="mt-10 flex justify-center space-x-2">
                            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Members Section */}
            <div className="relative max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                        The Visionaries
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        Our diverse team brings together expertise from technology, design, and business to deliver innovative solutions that drive success
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className={`group relative transition-all duration-700 ${hoveredMember === index ? 'transform scale-105' : ''
                                }`}
                            onMouseEnter={() => setHoveredMember(index)}
                            onMouseLeave={() => setHoveredMember(null)}
                        >
                            {/* Card */}
                            <div className="glass-solid transition-all duration-700 overflow-hidden">
                                {/* Header with floating image */}
                                <div className="relative h-48 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                                    {/* Floating geometric shapes */}
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-lg transform rotate-45 animate-pulse"></div>
                                    <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/30 rounded-full animate-bounce"></div>

                                    {/* Profile image */}
                                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full border-6 border-white shadow-2xl overflow-hidden bg-white">
                                                <img
                                                    src={member.photo}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">✓</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="pt-20 pb-8 px-8 text-center">
                                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-sm font-bold rounded-full mb-4 border border-orange-200">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                                        {member.role}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">
                                        {member.name}
                                    </h3>

                                    <div className="text-4xl text-orange-300 mb-3">"</div>
                                    <p className="text-orange-600 italic text-sm mb-4 font-medium">
                                        {member.quote}
                                    </p>

                                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                        {member.description}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                                        {member.skills.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs rounded-full font-medium hover:from-orange-200 hover:to-red-200 transition-all duration-300 border border-orange-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Connect Button */}
                                    <button className="group/btn relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 hover:from-orange-700 hover:to-red-700 transform hover:scale-105">
                                        <span className="relative z-10 flex items-center justify-center">
                                            Connect
                                            <span className="ml-2 transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                            Client Love Stories
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Don't just take our word for it—hear from the amazing people who've trusted us with their vision
                        </p>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {testimonials.map((t) => (
                            <TestimonialCard
                                key={t.id}
                                testimonial={t}
                                expanded={expandedTestimonial === t.id}
                                onExpand={() => setExpandedTestimonial(t.id)}
                                onCollapse={() => setExpandedTestimonial(null)}
                            />
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {[
                            { number: "150+", label: "Happy Clients", icon: "😊" },
                            { number: "300+", label: "Projects Completed", icon: "🚀" },
                            { number: "98%", label: "Success Rate", icon: "🎯" },
                            { number: "5★", label: "Average Rating", icon: "⭐" }
                        ].map((stat, index) => (
                            <div key={index} className="glass-solid p-8 text-center group hover:scale-105">
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <button className="group relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                            <span className="relative z-10 flex items-center justify-center">
                                Join Our Happy Clients
                                <span className="ml-3 transform transition-transform duration-300 group-hover:translate-x-2">✨</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-red-700 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurTeam;
