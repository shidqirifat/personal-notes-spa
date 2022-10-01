import React, { useContext } from 'react';
import ConfigContext from '../../context/ConfigContext';
import LinkExternal from '../global/LinkExternal';
import Text from '../global/Text';

export default function Footer() {
  const { locale } = useContext(ConfigContext);
  return (
    <div className="footer-container">
      <Text type="paragraph" style={{ textAlign: 'center' }}>
        &copy; {locale === 'en' ? 'Create by' : 'Dibuat oleh'}{' '}
        <LinkExternal link="https://shidqirifat-portofolio.vercel.app/">
          Shidqi Rifat Pangestu
        </LinkExternal>
      </Text>
      <Text type="text-date" style={{ textAlign: 'center' }}>
        {locale === 'en' ? 'Assets by' : 'Aset dari'}{' '}
        <LinkExternal link="https://icons8.com/">cons8.com</LinkExternal>
      </Text>
    </div>
  );
}
