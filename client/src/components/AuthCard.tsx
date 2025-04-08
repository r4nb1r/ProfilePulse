import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";

interface AuthCardProps {
  isAuthenticated: boolean;
}

const AuthCard = ({ isAuthenticated }: AuthCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await logout();
      // Invalidate all queries to refetch data
      queryClient.invalidateQueries();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your Google account.",
      });
      // Refresh the page to ensure state is updated
      window.location.href = '/';
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "Could not log you out. Please try again.",
      });
    }
  };

  return (
    <div className="mt-6 px-4 sm:px-0">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-slate-900">
              Google Account Connection
            </h3>
            {isAuthenticated && (
              <span className="text-xs font-medium text-green-800 bg-green-100 px-2 py-1 rounded">
                Connected
              </span>
            )}
          </div>
          <div className="mt-2 max-w-xl text-sm text-slate-500">
            <p>
              Connect your Google account to access and manage Google Business Profiles.
            </p>
          </div>
          
          {isAuthenticated && (
            <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-200">
              <p className="text-sm text-blue-600">
                <span className="font-semibold">ℹ️ Note:</span> For full functionality, Google API credentials will need to be added to your environment variables.
                Currently using a fallback mode that allows you to test the interface.
              </p>
            </div>
          )}
          
          <div className="mt-5">
            {!isAuthenticated ? (
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <svg className="-ml-1 mr-1.5 h-2 w-2 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Not Connected
                </span>
                <Link href="/auth" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Connect Google Account
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg className="-ml-1 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Connected
                </span>
                <button 
                  type="button" 
                  className="inline-flex items-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={handleLogout}
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
