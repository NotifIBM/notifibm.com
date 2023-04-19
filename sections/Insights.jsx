'use client';

import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';
import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { InsightCard, TitleText, TypingText } from '../components';

async function fetchBlogs() {
  const res = await fetch('/api/blogs');
  const data = await res.json();
  // console.log(data)
  // return data;
  const blogs = data.slice(0, 3);
  return blogs.map((item) => ({
    imgUrl: item.cover_image,
    title: item.title,
    subtitle: item.description,
    url: item.link,
  }));
}

const Insights = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBlogs().then((blogData) => {
      setData(blogData);
    });
  }, []);

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Insight" textStyles="text-center" />
        <TitleText title={<>Insight about NotifIBM</>} textStyles="text-center" />

        <div className="mt-[50px] flex flex-col gap-[30px]">
          {/* {insights.map((item, index) => (
          <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
        ))} */}
          {data.map((item, index) => (
            <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
          ))}
          {/* @ts-expect-error Async Server Component */}
          {/* <Blogs /> */}

        </div>
      </motion.div>
    </section>
  );
};

export default Insights;
