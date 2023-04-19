import {
  About,
  Explore,
  Feedback,
  Insights,
  GetStarted,
  Hero,
  WhatsNew,
} from '../sections';
import Footer from '../components/Footer';

const Page = () => (
  <div className="bg-primary-black overflow-hidden">
    {/* <Navbar /> */}
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
    </div>
    <div className="relative">
      <GetStarted />
      <div className="gradient-04 z-0" />
      <WhatsNew />
    </div>
    {/* <World /> */}
    <div className="relative">
      <Insights />
      <div className="gradient-04 z-0" />
      <Feedback />
    </div>
    <Footer />
  </div>
);

export default Page;
