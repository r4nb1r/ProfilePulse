import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import PageHeader from "@/components/PageHeader";
import BusinessProfileForm from "@/components/BusinessProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type BusinessProfile } from "@shared/schema";

interface ProfilesProps {
  isAuthenticated: boolean;
}

const Profiles = ({ isAuthenticated }: ProfilesProps) => {
  const [showForm, setShowForm] = useState(false);

  // Get profiles if authenticated
  const { data: profiles, isLoading } = useQuery<BusinessProfile[]>({
    queryKey: ['/api/profiles'],
    enabled: isAuthenticated,
    refetchOnWindowFocus: false
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'claimed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="bg-slate-50 font-sans min-h-screen">
      <AppHeader isAuthenticated={isAuthenticated} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <PageHeader 
            title="Business Profiles" 
            description="Manage your Google Business Profiles" 
          />
          {isAuthenticated && (
            <Button 
              onClick={handleToggleForm}
              className="hidden sm:block"
            >
              {showForm ? 'Hide Form' : 'Add New Profile'}
            </Button>
          )}
        </div>
        
        {isAuthenticated ? (
          <>
            {showForm && <BusinessProfileForm />}
            
            <Tabs defaultValue="all" className="mt-6">
              <TabsList>
                <TabsTrigger value="all">All Profiles</TabsTrigger>
                <TabsTrigger value="optimized">Optimized</TabsTrigger>
                <TabsTrigger value="claimed">Claimed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <BusinessProfilesGrid profiles={profiles || []} isLoading={isLoading} />
              </TabsContent>
              
              <TabsContent value="optimized" className="mt-4">
                <BusinessProfilesGrid 
                  profiles={(profiles || []).filter((p: BusinessProfile) => p.status === 'optimized')} 
                  isLoading={isLoading} 
                />
              </TabsContent>
              
              <TabsContent value="claimed" className="mt-4">
                <BusinessProfilesGrid 
                  profiles={(profiles || []).filter((p: BusinessProfile) => p.status === 'claimed')} 
                  isLoading={isLoading} 
                />
              </TabsContent>
              
              <TabsContent value="pending" className="mt-4">
                <BusinessProfilesGrid 
                  profiles={(profiles || []).filter((p: BusinessProfile) => p.status === 'pending')} 
                  isLoading={isLoading} 
                />
              </TabsContent>
            </Tabs>
            
            <div className="sm:hidden mt-6">
              <Button onClick={handleToggleForm} className="w-full">
                {showForm ? 'Hide Form' : 'Add New Profile'}
              </Button>
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-slate-600">Please sign in to manage business profiles</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

interface BusinessProfilesGridProps {
  profiles: BusinessProfile[];
  isLoading: boolean;
}

const BusinessProfilesGrid = ({ profiles, isLoading }: BusinessProfilesGridProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimized':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'claimed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-slate-600">No business profiles found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <Card key={profile.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg font-bold">{profile.businessName}</CardTitle>
              <Badge variant="outline" className={getStatusColor(profile.status)}>
                {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-slate-500">Address</p>
                <p className="text-sm">{profile.address}</p>
              </div>
              
              {profile.phone && (
                <div>
                  <p className="text-sm font-medium text-slate-500">Phone</p>
                  <p className="text-sm">{profile.phone}</p>
                </div>
              )}
              
              {profile.website && (
                <div>
                  <p className="text-sm font-medium text-slate-500">Website</p>
                  <p className="text-sm truncate">
                    <a 
                      href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {profile.website}
                    </a>
                  </p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-slate-500">Business Hours</p>
                <p className="text-sm">Mon: {profile.mondayOpen} - {profile.mondayClose}</p>
                <p className="text-sm">Tue: {profile.tuesdayOpen} - {profile.tuesdayClose}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Profiles;