'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { fadeIn } from '../utils/motion';

const StartSteps = ({ number, text, index }) => (
  <motion.div
    variants={fadeIn('left', 'spring', index * 0.5, 0.75)}
    className={`${styles.flexCenter} flex-row`}
  >
    <div
      className={`${styles.flexCenter} w-[70px] h-[70px] rounded-[24px] bg-[#323F5D]`}
    >
      <p className="font-bold text-[20px] text-white">
        {number}
      </p>
    </div>
    <p className="flex-1 ml-[30px] font-normal text-[18px] text-[#B0B0B0] leading-[32.4px]">
      {text}
    </p>
  </motion.div>
);

export default StartSteps;
