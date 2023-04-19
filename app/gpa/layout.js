import { FooterOnly } from '../../components';

const GPALayout = ({ children }) => (
  <>
    {children}
    <FooterOnly />
  </>
);

export default GPALayout;
