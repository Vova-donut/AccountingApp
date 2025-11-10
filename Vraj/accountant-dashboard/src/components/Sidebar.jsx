import { NavLink } from 'react-router-dom'

const Icon = ({ name }) => {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false,
  }
  switch (name) {
    case 'insights':
      return (
        <svg {...common}>
          <path d="M3 3v18h18"/>
          <path d="M7 15l4-4 3 3 5-5"/>
        </svg>
      )
    case 'reviews':
      return (
        <svg {...common}>
          <path d="M20 15a4 4 0 0 1-4 4H7l-3 3V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4z"/>
          <path d="M9 10l2 2 4-4"/>
        </svg>
      )
    case 'transactions':
      return (
        <svg {...common}>
          <path d="M7 7h10"/>
          <path d="M7 17h10"/>
          <path d="M10 4l-3 3 3 3"/>
          <path d="M14 20l3-3-3-3"/>
        </svg>
      )
    case 'customers':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="3"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    case 'select':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7"/>
          <path d="M21 21l-3.5-3.5"/>
        </svg>
      )
    default:
      return null
  }
}

const items = [
  { to: '/insights', label: 'Transaction Insights', aria: 'Open Transaction Insights', icon: 'insights' },
  { to: '/reviews', label: 'Manage Reviews', aria: 'Open Manage Reviews', icon: 'reviews' },
  { to: '/transactions', label: 'Manage Transactions', aria: 'Open Manage Transactions', icon: 'transactions' },
  { to: '/customers', label: 'Customers', aria: 'Open Customers', icon: 'customers' },
  { to: '/select-customers', label: 'Select Customers', aria: 'Open Select Customers', icon: 'select' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Accountant dashboard navigation">
      <div className="brand">Accountant</div>
      <nav>
        {items.map(i => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            aria-label={i.aria}
          >
            <span className="icon"><Icon name={i.icon} /></span>
            <span className="label">{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
