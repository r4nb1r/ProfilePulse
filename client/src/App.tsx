import { Switch, Route } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";
import Auth from "@/pages/Auth";
import Profiles from "@/pages/Profiles";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";

function App() {
  // Check authentication status on app load
  const { data: authData, isLoading } = useQuery<{isAuthenticated: boolean}>({
    queryKey: ['/api/auth/status'],
    refetchOnWindowFocus: true
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAuthenticated = authData?.isAuthenticated || false;

  return (
    <Switch>
      <Route path="/">
        <Dashboard isAuthenticated={isAuthenticated} />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/profiles">
        <Profiles isAuthenticated={isAuthenticated} />
      </Route>
      <Route path="/analytics">
        <Analytics isAuthenticated={isAuthenticated} />
      </Route>
      <Route path="/settings">
        <Settings isAuthenticated={isAuthenticated} />
      </Route>
      <Route path="/notifications">
        <Notifications isAuthenticated={isAuthenticated} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
