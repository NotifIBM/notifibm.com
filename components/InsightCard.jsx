'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { fadeIn } from '../utils/motion';

const InsightCard = ({ imgUrl, title, subtitle, url, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.5, 1)}
    className="flex md:flex-row flex-col gap-4"
  >
    <Image
      src={imgUrl}
      width={1869}
      height={750}
      alt="planet-01"
      className="md:w-[270px] w-full h-[250px] rounded-[32px] object-cover"
    />
    <div className="w-full flex justify-between items-center">
      <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
        <h3 className="font-normal lg:text-[35px] text-[26px] text-white">
          {title}
        </h3>
        <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-secondary-white">
          {subtitle}
        </p>
        <a href={url} title={`blog-post-${title.replace(' ', '-')}`} target="_blank" rel="noreferrer">
          <p className="md:hidden text-[14px] pt-1 text-secondary-white underline">
            Read more <span className="sr-only">about {title}</span>
          </p>
        </a>
      </div>
      <a href={url} title={`blog-post-${title}`} target="_blank" rel="noreferrer">
        <div
          className="lg:flex hidden items-center justify-center w-[100px] h-[100px] rounded-full bg-transparent border-[1px] border-white"
        >

          <img
            src="/arrow.svg"
            alt="arrow"
            className="w-[40%] h-[40%] object-contain"
          />

        </div>
      </a>
    </div>
  </motion.div>
);

export default InsightCard;
