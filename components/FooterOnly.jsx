'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { socials } from '../constants';

import styles from '../styles';
import { footerVariants } from '../utils/motion';

const FooterOnly = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white">
            NOTIFIBM
          </h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2023 | NotifIBM. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                <img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  className="w-[24px] h-[24px] object-contain cursor-pointer"
                />
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="font-normal text-[14px] text-white opacity-50">
            Made with
            {' '}
            <span className="text-[#FF0000] animate-pulse">❤</span>
            {' '}
            by
            {' '}
            <a href="https://supunsathsara.com" target="_blank" rel="noreferrer">Supun Sathsara</a>
          </p>

          <div className="font-normal text-[14px] text-white opacity-50 flex flex-row gap-2">
            <Link href="/privacy-policy">
              <p className="cursor-pointer">Privacy Policy</p>
            </Link>
            |
            <Link href="/terms">
              <p className="cursor-pointer">Terms of Service</p>
            </Link>
            |
            <a href="http://status.notifibm.com" target="_blank" rel="noopener noreferrer">status <span className="opacity-100 animate-pulse">🟢</span></a>
          </div>

        </div>
      </div>
    </div>
  </motion.footer>
);

export default FooterOnly;
