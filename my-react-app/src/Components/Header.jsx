import './Header.css';

function Header({ currentPage, onNavigate, cartCount }) {
  const tabs = [
    { id: 'list', label: 'Shop' },
    { id: 'cart', label: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}` },
    { id: 'checkout', label: 'Checkout' },
  ];

  return (
    <header className='header'>
      <div className='header__inner'>
        <button
          className='header__logo'
          onClick={() => onNavigate('list')}
          aria-label='Verdant home'
        >
          Kal's Shop
        </button>

        <nav className='header__nav' aria-label='Main'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={
                'header__tab' +
                (currentPage === tab.id ? ' header__tab--active' : '')
              }
              onClick={() => onNavigate(tab.id)}
              aria-current={currentPage === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
