import '../styles/globals.css';
import { Footer, Navbar } from '../components';

const RootLayout = ({ children }) => (
  <html lang="en">
    <head>
      <link
        rel="stylesheet"
        href="https://stijndv.com/fonts/Eudoxus-Sans.css"
      />
    </head>
    <body className="overflow-auto scrollbar-hidden bg-primary-black">
      <Navbar />
      {children}
    </body>
  </html>
);

export default RootLayout;
