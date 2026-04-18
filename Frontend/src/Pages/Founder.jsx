import React from 'react';
import { motion } from 'framer-motion';
import founderImg from '../assets/founderimg.png';

export default function Founder() {
  return (
    <div className="bg-gradient-to-br from-amber-200 via-amber-50 to-amber-200 min-h-screen w-full flex flex-col md:flex-row items-center justify-center pt-8 pb-16 md:pb-24 relative overflow-hidden">
      <div className="blob-orb-1 -top-40 -left-40 opacity-40"></div>
      <div className="blob-orb-3 top-1/3 right-10 opacity-30"></div>
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-0 md:gap-8 relative z-10">
        <motion.div
          className="w-full md:w-[48%] flex items-center justify-center relative"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src={founderImg}
            alt="Aniruddh Lakha"
            className="rounded-3xl shadow-2xl w-[90vw] max-w-[500px] h-[340px] md:h-[540px] object-cover object-center glass-solid"
          />
        </motion.div>
        <motion.div
          className="flex-1 flex flex-col justify-center px-4 md:px-10 w-full"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="mb-2 text-center md:text-left">
            <span className="block text-3xl md:text-4xl font-extrabold text-orange-600 mb-1">
              Aniruddh Lakha
            </span>
            <div className="w-16 h-1 bg-orange-300 rounded mx-auto md:mx-0 mb-1"></div>
            <span className="text-orange-400 font-semibold text-base tracking-wide">
              Founder
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2 mt-2">
            Founder's Note
          </h1>
          <div className="glass-solid p-6 md:p-8 text-gray-700 text-lg text-left space-y-4 max-w-2xl mx-auto">
            <p>
              I'm Aniruddh Lakha, founder of Nagpur Street Dogs (NSD). I started this journey in 2020 at just 16 years old. During the COVID-19 lockdown, I saw street animals starving and decided to step up — feeding 10–15 dogs in my area, which grew to over 150.
            </p>
            <p>
              In 2022, we went public on Instagram, built a team of 100+ volunteers, and launched initiatives like Free Water Pot Distribution, Vaccination Camps, and the Radium Belt Project — reducing street animal accidents by 30–40%. Together, we're building a safer, kinder world for street animals — one step at a time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
