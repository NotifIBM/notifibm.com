'use client';

// import { motion } from 'framer-motion';
// import { fadeIn, staggerContainer } from '../../../utils/motion';
import { TitleText, TypingText } from '../../../components';

const Page = () => (
  <div className="mx-auto my-8 relative z-10 text-center flex flex-col md:flex-row md:flex-wrap pb-12">
    <div className="m-4 p-5 text-center mx-auto">
      <TitleText title={<>Terms of Service</>} />
    </div>
    <div
      className="m-2 p-5 text-center mx-auto"
    >
      <section>
        <TypingText title="01. Introduction" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          Welcome to NotifIBM, a web application designed to help students at NIBM Sri Lanka. These terms and conditions (the “Terms”) govern your use of the NotifIBM website located at www.notifibm.com (the “Website”) and any related services provided by NotifIBM.

          By using the Website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Website.
        </div>
      </section>

      <section>
        <TypingText title="02. Use of the Website" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          You may use the Website for lawful purposes and in accordance with these Terms. You agree not to use the Website:
          <ul className="list-disc list-inside ml-2">
            <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any “junk mail,” “chain letter,” “spam,” or any other similar solicitation</li>
            <li>To impersonate or attempt to impersonate NotifIBM or a NotifIBM employee, another user, or any other person or entity</li>
            <li>To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the Website, or which, as determined by NotifIBM, may harm NotifIBM or users of the Website, or expose them to liability.</li>
          </ul>
        </div>
      </section>
      <section>
        <TypingText title="03. Disclaimer" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          NotifIBM provides the Website and its services on an “as is” and “as available” basis. NotifIBM makes no representations or warranties of any kind, express or implied, as to the operation of the Website or the information, content, materials, or products included on the Website.
        </div>
      </section>
      <section>
        <TypingText title="04. Limitation of Liability" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          In no event shall NotifIBM, its affiliates, or their respective directors, officers, employees, agents, or content or service providers, be liable for any direct, indirect, special, incidental, consequential, exemplary, or punitive damages arising from, or directly or indirectly related to, the use of, or the inability to use, the Website or the content, materials, and functions related thereto, including, without limitation, loss of revenue, or anticipated profits or lost business or lost sales.
        </div>
      </section>

      <section>
        <TypingText title="05. Indemnification" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          You agree to indemnify, defend, and hold harmless NotifIBM, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys’ fees) arising out of or relating to your violation of these Terms or your use of the Website, including, but not limited to, any use of the Website’s content, services, and products other than as expressly authorized in these Terms.
        </div>
      </section>
      <section>
        <TypingText title="06. Modifications to the Website" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          NotifIBM reserves the right to modify, suspend, or discontinue the Website or any part thereof, with or without notice, at any time and from time to time in its sole discretion.
        </div>
      </section>
      <section>
        <TypingText title="07. Governing Law" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          These Terms and your use of the Website shall be governed by and construed in accordance with the laws of Sri Lanka, without giving effect to any principles of conflicts of law.
        </div>
      </section>
      <section>
        <TypingText title="08. Changes to Terms of Use" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          NotifIBM reserves the right to modify or replace these Terms of Use at any time and without notice. Your continued use of the site or services after any such changes constitutes your acceptance of the new Terms of Use.
        </div>
      </section>

      <section>
        <TypingText title="09. Termination" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          NotifIBM reserves the right to terminate your access to the site or services at any time without notice for any reason whatsoever.
        </div>
      </section>

      <section>
        <TypingText title="10. Entire Agreement" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          These Terms of Use constitute the entire agreement between you and NotifIBM regarding the use of the site or services, superseding any prior agreements between you and NotifIBM relating to your use of the site or services.
        </div>
      </section>

      <section>
        <TypingText title="11. Contact Us" textStyles="text-left ml-5 text-lg font-extrabold" />
        <div
          className="mt-[8px] font-normal sm:text-lg text-sm text-left text-secondary-white pb-10"
        >
          If you have any questions about these Terms of Use, please contact us at <a href="mailto:hi@notifibm.com" aria-label="Contact NotifIBM">hi@notifibm.com</a>.
        </div>
      </section>

    </div>
  </div>
);

export default Page;
