'use client';

import { motion } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div
      className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}
    >
      <Link href="/" className="z-0 my-auto" title="Home">
        <div className="w-[24px] h-[24px] object-contain relative px-10">
          <Image
            src="/assets/logo-N-white.svg"
            fill
            quality={100}
            alt="logo N letter"
            className="w-[24px] h-[24px] object-contain"
          />
        </div>
      </Link>
      <Link href="/" className="z-0 my-auto">
        <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
          NOTIFIBM
        </h2>
      </Link>
      <div className="flex justify-between flex-wrap gap-5 z-0 my-auto">
        <a href="https://app.notifibm.com" className="flex items-center h-fit">
          <button type="button" className="flex items-center h-fit py-4 px-6 bg-transparent outline-1 ring-offset-blue-800 rounded-[32px]">
            <span className="font-normal text-[16px] text-white">
              Login
            </span>
          </button>
        </a>
      </div>
      {/* <div className="w-[24px] h-[24px] object-contain relative">
        <Image
          src="/menu.svg"
          fill
          alt="menu"
          className="w-[24px] h-[24px] object-contain"
        />
      </div> */}
    </div>
  </motion.nav>
);

export default Navbar;
