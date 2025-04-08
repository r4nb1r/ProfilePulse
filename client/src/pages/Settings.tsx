import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface SettingsProps {
  isAuthenticated: boolean;
}

const Settings = ({ isAuthenticated }: SettingsProps) => {
  const { toast } = useToast();

  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const handleSave = () => {
    // Simulating save
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  return (
    <div className="bg-slate-50 font-sans min-h-screen">
      <AppHeader isAuthenticated={isAuthenticated} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <PageHeader 
            title="Settings" 
            description="Manage your account and preferences" 
          />
          
          {showSavedMessage && (
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Settings saved successfully
            </div>
          )}
        </div>
        
        {isAuthenticated ? (
          <Tabs defaultValue="account" className="mb-6">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-4">
              <div className="grid gap-6 grid-cols-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" defaultValue="Acme Inc." />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSave}>Update Password</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Connected Accounts</CardTitle>
                    <CardDescription>
                      Manage your connected services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        <div>
                          <h4 className="font-medium text-slate-900">Google</h4>
                          <p className="text-sm text-slate-500">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <div>
                          <h4 className="font-medium text-slate-900">Facebook</h4>
                          <p className="text-sm text-slate-500">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        <div>
                          <h4 className="font-medium text-slate-900">Twitter</h4>
                          <p className="text-sm text-slate-500">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailPerformance">Performance Reports</Label>
                          <p className="text-sm text-slate-500">Receive weekly performance reports</p>
                        </div>
                        <Switch id="emailPerformance" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailReviews">New Reviews</Label>
                          <p className="text-sm text-slate-500">Get notified when your business receives a new review</p>
                        </div>
                        <Switch id="emailReviews" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailUpdates">Product Updates</Label>
                          <p className="text-sm text-slate-500">Receive news about product features and updates</p>
                        </div>
                        <Switch id="emailUpdates" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="appPerformance">Performance Alerts</Label>
                          <p className="text-sm text-slate-500">Get notified of significant changes in performance</p>
                        </div>
                        <Switch id="appPerformance" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="appReviews">Review Notifications</Label>
                          <p className="text-sm text-slate-500">Receive notifications for new reviews</p>
                        </div>
                        <Switch id="appReviews" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="appMessages">Customer Messages</Label>
                          <p className="text-sm text-slate-500">Get notified when customers send messages</p>
                        </div>
                        <Switch id="appMessages" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="mt-4">
              <div className="grid gap-6 grid-cols-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                          <h3 className="text-xl font-bold text-primary">Professional Plan</h3>
                          <p className="text-sm text-slate-500 mt-1">Billed monthly</p>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">$49</span>
                            <span className="text-slate-500">/month</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button variant="outline">Upgrade Plan</Button>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-slate-900 mb-2">Plan includes:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <li className="flex items-center">
                            <svg className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Up to 25 Business Profiles
                          </li>
                          <li className="flex items-center">
                            <svg className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Advanced Analytics
                          </li>
                          <li className="flex items-center">
                            <svg className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Social Media Integration
                          </li>
                          <li className="flex items-center">
                            <svg className="h-4 w-4 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Priority Support
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Manage your payment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="bg-slate-100 p-2 rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2H4zm0 2h16v12H4V6zm2 3h12v2H6V9zm0 4h4v2H6v-2zm5 0h7v2h-7v-2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Visa ending in 4242</h4>
                          <p className="text-sm text-slate-500">Expires 12/2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                    <CardDescription>
                      View your recent invoices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-4 p-4 text-sm font-medium text-slate-900 border-b">
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div className="text-right">Invoice</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div>Apr 1, 2023</div>
                          <div>$49.00</div>
                          <div className="flex items-center">
                            <span className="inline-flex h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                            Paid
                          </div>
                          <div className="text-right">
                            <Button variant="link" size="sm" className="h-auto p-0">Download</Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div>Mar 1, 2023</div>
                          <div>$49.00</div>
                          <div className="flex items-center">
                            <span className="inline-flex h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                            Paid
                          </div>
                          <div className="text-right">
                            <Button variant="link" size="sm" className="h-auto p-0">Download</Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 p-4 text-sm">
                          <div>Feb 1, 2023</div>
                          <div>$49.00</div>
                          <div className="flex items-center">
                            <span className="inline-flex h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                            Paid
                          </div>
                          <div className="text-right">
                            <Button variant="link" size="sm" className="h-auto p-0">Download</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Settings</CardTitle>
                  <CardDescription>
                    Manage your API access and credentials
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">API Keys</h3>
                    <div className="bg-slate-50 p-4 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-slate-900">Your API Key</Label>
                          <div className="mt-1 flex">
                            <Input 
                              value="sk_test_51LxILWvOQkJfCQda82F5jvLkIEKTIhZYeAj8pSL9" 
                              className="font-mono bg-slate-50" 
                              readOnly
                            />
                            <Button variant="outline" size="sm" className="ml-2 whitespace-nowrap">
                              Copy
                            </Button>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            This key gives access to all API endpoints. Keep it secure!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Webhook Settings</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhookUrl">Webhook URL</Label>
                        <Input 
                          id="webhookUrl" 
                          placeholder="https://your-server.com/webhook" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Webhook Events</Label>
                        <div className="grid gap-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="webhookReviews" />
                            <Label htmlFor="webhookReviews">Review events</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="webhookProfiles" />
                            <Label htmlFor="webhookProfiles">Profile updates</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="webhookMessages" />
                            <Label htmlFor="webhookMessages">Customer messages</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">API Documentation</h3>
                    <p className="text-sm text-slate-600 mb-2">
                      Refer to our comprehensive documentation to integrate with our API.
                    </p>
                    <Button variant="outline">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Documentation
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save API Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-slate-600">Please sign in to access settings</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Settings;