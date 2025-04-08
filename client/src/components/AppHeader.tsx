import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import NotificationDropdown from './NotificationDropdown';
import ProfileMenu from './ProfileMenu';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  isAuthenticated: boolean;
}

const AppHeader = ({ isAuthenticated }: AppHeaderProps) => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gradient-to-br from-primary to-primary/60 text-white rounded-md flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="ml-2 text-2xl font-bold text-slate-800">ProfilePulse</span>
                  </div>
                </Link>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className={`${location === '/' ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Dashboard
                </Link>
                <Link href="/profiles" className={`${location === '/profiles' ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Business Profiles
                </Link>
                <Link href="/analytics" className={`${location === '/analytics' ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Analytics
                </Link>
                <Link href="/settings" className={`${location === '/settings' ? 'border-primary text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Settings
                </Link>
              </nav>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center gap-2">
              {isAuthenticated ? (
                <>
                  <NotificationDropdown />
                  <div className="ml-3 relative">
                    <ProfileMenu />
                  </div>
                </>
              ) : (
                <Button asChild>
                  <Link href="/auth">Sign In</Link>
                </Button>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute z-10 w-full bg-white shadow-lg" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className={`${location === '/' ? 'bg-slate-50 border-primary text-primary' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Dashboard
            </Link>
            <Link href="/profiles" className={`${location === '/profiles' ? 'bg-slate-50 border-primary text-primary' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Business Profiles
            </Link>
            <Link href="/analytics" className={`${location === '/analytics' ? 'bg-slate-50 border-primary text-primary' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Analytics
            </Link>
            <Link href="/settings" className={`${location === '/settings' ? 'bg-slate-50 border-primary text-primary' : 'border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
              Settings
            </Link>
          </div>
          
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-slate-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User profile" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-slate-800">John Doe</div>
                  <div className="text-sm font-medium text-slate-500">john.doe@example.com</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link href="/settings" className="block px-4 py-2 text-base font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100">
                  Account Settings
                </Link>
                <button
                  onClick={() => window.location.href = '/api/auth/logout'}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-slate-200">
              <div className="px-4">
                <Link href="/auth" className="block text-center w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90">
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AppHeader;
