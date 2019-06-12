import Head from 'next/head';
import { useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

export default function Fonts() {
  useEffect(() => {
    const showFont = () => document.documentElement.classList.add('noto-sans');

    if (!localStorage.getItem('noto-sans-loaded')) {
      const notoSans = new FontFaceObserver('noto-sans');

      notoSans.load().then(() => {
        localStorage.setItem('noto-sans-loaded', '1');
        showFont();
      });
    } else {
      showFont();
    }
  }, []);

  return (
    <Head>
      <link rel="preconnect" href="https://use.typekit.net" />
      <link href="https://use.typekit.net/adw5jeb.css" rel="stylesheet" />
    </Head>
  );
}
