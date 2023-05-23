'use client';

import { motion } from 'framer-motion';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles';
import { slideIn, staggerContainer, textVariant } from '../utils/motion';

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6 h-screen `}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className="flex justify-center items-center flex-col relative z-10">
        <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
          NotifIBM
        </motion.h1>
        <motion.div
          variants={textVariant(1.2)}
          className="flex flex-row justify-center items-center"
        >
          <h2 className={styles.heroSubHeading}>Notification, Inspiration, Better Marks</h2>
        </motion.div>
      </div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="relative w-full md:-mt-[20px] -mt-[12px]"
      >
        <div className="w-full flex justify-end sm:-mt-[70px] pr-[40px]  z-10 pb-12 lg:pb-0 bottom-2">
          <a href="https://app.notifibm.com" title="Register With NotifIBM">
            <Image
              src="/stamp.png"
              loading="eager"
              width={155}
              height={155}
              quality={100}
              alt="stamp"
              className="sm:w-[155px] w-[100px] sm:h-[155px] h-[100px] object-contain stamp-animate bottom-5 rounded-full" style={{ '--animation-duration': '1s' }}
            />
          </a>

        </div>
        {/* <div className="flex justify-center items-center">
          <a href="/gpa">
            <button type="button" className="mx-auto bg-transparent hover:bg-white text-white font-semibold hover:text-[#1a2330] py-2 px-8 border border-blue-500 hover:border-transparent rounded">
              GPA Calculator
            </button>
          </a>
        </div> */}
      </motion.div>
      <motion.div
        variants={textVariant(1.2)}
        className="flex flex-col justify-center items-center gap-5 my-10 md:my-0 lg:-mt-16 z-10"
      >
        <a href="https://app.notifibm.com" title="Get Started">
          <button type="button" className="mx-auto bg-gradient-to-b w-max text-primary-black font-semibold from-slate-50 to-blue-100 px-10 py-3 rounded-2xl shadow-blue-400 shadow-md hover border-b border-blue-200 hover:shadow-sm transition-all duration-500">
            Get Started
          </button>
        </a>

        <Link href="/gpa" title="GPA Calculator">
          <button type="button" className="mx-auto bg-transparent hover:bg-white text-white font-semibold hover:text-[#1a2330] py-2 px-7 border border-blue-500 hover:border-transparent rounded">
            GPA Calculator
          </button>
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
