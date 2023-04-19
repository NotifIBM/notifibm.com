'use client';

import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../../../utils/motion';
import { TitleText, TypingText } from '../../../components';

const Page = () => (
  <div className="container mx-auto my-8 relative z-10 text-center flex flex-col md:flex-row md:flex-wrap pb-12">
    <div className="m-4 p-5 text-center mx-auto">
      <TitleText title={<>Privacy Policy</>} />
    </div>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }} className="m-2 p-5 text-center mx-auto"
    >
      <TypingText title="| We Respect Your Privacy ❤️" textStyles="text-center" />
      <motion.div
        variants={fadeIn('up', 'tween', 0.2, 1)}
        className="mt-[8px] font-normal sm:text-lg text-sm text-center text-secondary-white"
      >
        Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.

        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.

        We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.

        We don’t share any personally identifying information publicly or with third-parties, except when required to by law.

        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.

        You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.

        Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
        <a href="mailto:hi@notifibm.com?subject=Inquiry regarding NotifIBM" aria-label="Contact NotifIBM"><TypingText title="📧 hi@notifibm.com" textStyles="text-center text-xl m-5" /></a>
      </motion.div>
    </motion.div>
  </div>
);

export default Page;
