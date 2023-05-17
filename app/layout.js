import '../styles/globals.css';
import { Navbar } from '../components';
import ToastProvider from '../components/ui/ToastProvider';

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      {/* <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      /> */}
      <link
        rel="stylesheet"
        href="/fonts/Eudoxus-Sans.css"
      />
    </head>
    <body className="overflow-auto scrollbar-hidden bg-primary-black">
      <ToastProvider>
        <Navbar />
        {children}
      </ToastProvider>
    </body>
  </html>
);

export default RootLayout;
