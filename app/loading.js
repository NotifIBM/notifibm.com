import Image from 'next/image';

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Image src="/assets/notifibm-logo-white.svg"
      alt="notifibm-logo"
      width={150}
      height={150}
      className="animate-pulse bg-blend-overlay mx-auto my-auto"
    />
  </div>
);
export default Loading;
