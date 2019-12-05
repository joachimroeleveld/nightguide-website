import { useEffect, useCallback, useState } from 'react';

export function useChat() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.getElementById('zsiqbtn')) {
        setInitialized(true);
        clearInterval(interval);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (document.getElementById('zsiqbtn')) {
      return;
    }

    let dataScript = document.createElement('script');
    dataScript.setAttribute('id', 'zsiqscript-data');
    dataScript.type = 'text/javascript';
    dataScript.innerHTML = `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || 
{widgetcode:"2ec8007b909bea50fdf290d463df875ae63a33a1b36c413de416285a6db6e780", values:{}, ready: function(){}};`;
    document.getElementsByTagName('head')[0].appendChild(dataScript);

    let loaderScript = document.createElement('script');
    loaderScript.setAttribute('id', 'zsiqscript');
    loaderScript.type = 'text/javascript';
    loaderScript.defer = true;
    loaderScript.src = 'https://salesiq.zoho.com/widget';
    document.getElementsByTagName('head')[0].appendChild(loaderScript);

    let elem = document.createElement('div');
    elem.setAttribute('id', 'zsiqwidget');
    document.body.appendChild(elem);

    setInitialized(true);
  }, []);

  const showChat = useCallback(() => {
    document.getElementById('zsiqbtn').click();
  });

  return {
    initialized,
    showChat,
  };
}
