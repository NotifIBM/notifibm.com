'use client';

import { Toaster } from 'react-hot-toast';

const ToastProvider = ({ children }) => (
  <>
    <Toaster position="top-center" reverseOrder={false} />
    {children}
  </>
);

export default ToastProvider;
