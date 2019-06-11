import Link from 'next/link';

function Header() {
  return (
    <header className={'container'}>
      <Link href="/nl/utrecht">
        <a>
          <img src="/static/img/logo.svg" alt="NightGuide" className={'logo'} />
        </a>
      </Link>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
        }
        .logo {
          width: 6.5em;
        }
      `}</style>
    </header>
  );
}

export default Header;
