import { useQuery } from "@tanstack/react-query";
import AppHeader from "@/components/AppHeader";
import PageHeader from "@/components/PageHeader";
import StatsGrid from "@/components/StatsGrid";
import AuthCard from "@/components/AuthCard";
import BusinessProfileForm from "@/components/BusinessProfileForm";
import RecentSubmissions from "@/components/RecentSubmissions";
import { type BusinessProfile } from "@shared/schema";

interface DashboardProps {
  isAuthenticated: boolean;
}

const Dashboard = ({ isAuthenticated }: DashboardProps) => {

  // Get stats if authenticated
  const { data: stats } = useQuery<{ total: number; optimized: number; pending: number }>({
    queryKey: ['/api/stats'],
    enabled: isAuthenticated,
    refetchOnWindowFocus: false
  });

  // Get profiles if authenticated
  const { data: profiles } = useQuery<BusinessProfile[]>({
    queryKey: ['/api/profiles'],
    enabled: isAuthenticated,
    refetchOnWindowFocus: false
  });

  return (
    <div className="bg-slate-50 font-sans min-h-screen">
      <AppHeader isAuthenticated={isAuthenticated} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <PageHeader 
          title="Google Business Profile Manager" 
          description="Automate claiming and optimizing your Google Business Profiles" 
        />
        
        {isAuthenticated && stats && (
          <StatsGrid stats={stats} />
        )}
        
        <AuthCard isAuthenticated={isAuthenticated} />
        
        {isAuthenticated && (
          <>
            <BusinessProfileForm />
            <RecentSubmissions submissions={profiles || []} />
          </>
        )}
      </main>
      
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center">
              <span className="text-sm text-slate-500">&copy; {new Date().getFullYear()} ProfilePulse. All rights reserved.</span>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <a href="#" className="text-slate-400 hover:text-slate-500">
                  <span className="sr-only">Help</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-500">
                  <span className="sr-only">Privacy Policy</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-slate-500">
                  <span className="sr-only">Support</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
