import { FooterOnly } from '../../components';

const TermsLayout = ({ children }) => (
  <div className="overflow-auto overflow-x-hidden overflow-y-hidden scrollbar-hidden">
    {children}
    <FooterOnly />
  </div>
);

export default TermsLayout;
