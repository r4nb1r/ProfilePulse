import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // If this page loads, it means we're about to start the auth flow
    // or we're returning from it with a code in the URL
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    
    if (code) {
      // We're returning from Google with a code
      toast({
        title: "Authentication successful",
        description: "Redirecting you to the dashboard...",
      });
      navigate('/');
    } else {
      // Start the auth flow
      const startAuth = async () => {
        try {
          const response = await fetch('/api/auth/url');
          const data = await response.json();
          
          if (data.url) {
            window.location.href = data.url;
          } else {
            throw new Error("No auth URL returned");
          }
        } catch (error) {
          console.error("Error starting auth flow:", error);
          toast({
            variant: "destructive",
            title: "Authentication failed",
            description: "Could not start authentication process. Please try again.",
          });
          navigate('/');
        }
      };
      
      startAuth();
    }
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Authenticating with Google</h2>
          <p className="mt-2 text-gray-600">
            Please wait while we connect you to Google Business Profile.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
