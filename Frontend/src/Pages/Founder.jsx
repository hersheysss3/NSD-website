import React from 'react';
import { motion } from 'framer-motion';

const defaultAvatar = '../assets/1.jpg'; 

export default function Founder() {
  return (
    <div className="bg-orange-50 min-h-screen w-full flex flex-col md:flex-row items-center justify-center pt-8 pb-16 md:pb-24">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-0 md:gap-8">
        <motion.div
          className="w-full md:w-[48%] flex items-center justify-center relative"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ minHeight: '400px', marginTop: '-500px' }}
        >
          <img
            src={defaultAvatar}
            alt="Aniruddh Lakha"
            className="rounded-3xl shadow-2xl w-[90vw] max-w-[500px] h-[340px] md:h-[540px] object-cover object-center"
            style={{ borderRadius: '1.5rem' }}
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-200 rounded-full opacity-30 -z-10"></div>
        </motion.div>
        <motion.div
          className="flex-1 flex flex-col justify-center px-4 md:px-10 w-full"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{ margin: 0, padding: 0 }}
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
              I’m Anirudh Lakha, the founder of Nagpur Street Dogs (NSD), and I started this journey back in 2020 when I was just 16 years old. Since childhood, I’ve always been a dog lover, but due to family restrictions, I was never allowed to keep dogs at home. So, I found my companions on the streets—playing, bonding, and spending time with street dogs in my area.
            </p>
            <p>
              During the first wave of COVID-19, when the entire country went into lockdown, I witnessed something heartbreaking. The street animals who depended on local shops and restaurants for their daily meals were left starving. That was the moment I decided to step up. I began feeding 10–15 dogs in my locality, and without even realizing it, that number grew to over 150.
            </p>
            <p>
              In 2022, a friend suggested I share my efforts on Instagram. That one suggestion changed everything. Gradually, people began to notice and support the cause. I found a team, and we started handling rescue cases together. From a one-man initiative, we grew to a dedicated team of over 100 volunteers.
            </p>
            <p>
              Together, we’ve launched several impactful initiatives in Nagpur—like Free Water Pot Distribution in 2022, Feeding Drives and Vaccination Camps in 2023, and the Radium Belt Project, which helped reduce street animal accidents by 30–40%. In 2024 and beyond, we continue expanding our efforts with the same passion and commitment.
            </p>
            <p>
              Today, I’m no longer alone in this mission. I’m joined by incredible individuals who care deeply about animals, just like I do. I may have started this journey, but the impact we’ve created is the result of the collective dedication of my entire team. Together, we are building a safer, kinder world for street animals—one step at a time.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

