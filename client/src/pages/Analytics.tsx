import { useQuery } from "@tanstack/react-query";
import AppHeader from "@/components/AppHeader";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer,
  PieChart as RechartsPieChart, 
  Pie as RechartsPie,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  AreaChart as RechartsAreaChart,
  Area as RechartsArea,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AnalyticsProps {
  isAuthenticated: boolean;
}

const Analytics = ({ isAuthenticated }: AnalyticsProps) => {

  // Get stats if authenticated
  const { data: stats } = useQuery<{ total: number; optimized: number; pending: number }>({
    queryKey: ['/api/stats'],
    enabled: isAuthenticated,
    refetchOnWindowFocus: false
  });

  // Simulate analytics data for demo purposes
  const simulatedAnalytics = {
    // Views over time data (30 days)
    timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
      name: `Day ${i + 1}`,
      views: Math.floor(Math.random() * 50) + 50,
      interactions: Math.floor(Math.random() * 25) + 10,
    })),
    
    // Distribution data
    distributionData: [
      { name: 'Google Search', value: 65 },
      { name: 'Maps', value: 25 },
      { name: 'Direct', value: 10 },
    ],
    
    // Engagement data
    engagementData: [
      { name: 'Calls', value: 42 },
      { name: 'Direction Requests', value: 68 },
      { name: 'Website Clicks', value: 53 },
      { name: 'Message Requests', value: 27 },
    ],
    
    // Ratings data
    ratingsData: [
      { name: '5 Stars', value: 48 },
      { name: '4 Stars', value: 27 },
      { name: '3 Stars', value: 15 },
      { name: '2 Stars', value: 7 },
      { name: '1 Star', value: 3 },
    ],
  };

  return (
    <div className="bg-slate-50 font-sans min-h-screen">
      <AppHeader isAuthenticated={isAuthenticated} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <PageHeader 
            title="Analytics Dashboard" 
            description="Monitor performance of your Google Business Profiles" 
          />
          <div className="hidden sm:block">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isAuthenticated ? (
          <>
            {/* Analytics Overview */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <MetricCard 
                title="Total Views" 
                value="1,543" 
                change="+12.5%" 
                trend="up" 
                description="vs. previous period" 
              />
              <MetricCard 
                title="Profile Interactions" 
                value="687" 
                change="+8.3%" 
                trend="up" 
                description="vs. previous period" 
              />
              <MetricCard 
                title="Average Rating" 
                value="4.7" 
                change="+0.2" 
                trend="up" 
                description="vs. previous period" 
              />
              <MetricCard 
                title="Review Count" 
                value="124" 
                change="+15" 
                trend="up" 
                description="new reviews" 
              />
            </div>
            
            {/* Tabs for different analytics views */}
            <Tabs defaultValue="traffic" className="mb-6">
              <TabsList>
                <TabsTrigger value="traffic">Traffic</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="traffic" className="mt-4">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Profile Views Over Time</CardTitle>
                      <CardDescription>
                        Track how your profile is performing in search and Maps
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsAreaChart
                            data={simulatedAnalytics.timeSeriesData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <RechartsArea dataKey="views" fill="#0ea5e9" stroke="#0ea5e9" />
                            <RechartsArea dataKey="interactions" fill="#8b5cf6" stroke="#8b5cf6" />
                          </RechartsAreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-1">
                    <CardHeader>
                      <CardTitle>Views by Platform</CardTitle>
                      <CardDescription>
                        Distribution across platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Tooltip />
                            <Legend />
                            <RechartsPie
                              data={simulatedAnalytics.distributionData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              fill="#8884d8"
                            >
                              {simulatedAnalytics.distributionData.map((entry, index) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={index === 0 ? "#0ea5e9" : index === 1 ? "#8b5cf6" : "#10b981"} 
                                />
                              ))}
                            </RechartsPie>
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle>Weekly vs Monthly Trends</CardTitle>
                      <CardDescription>
                        Compare recent performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={[
                              { name: "Mon", thisWeek: 45, lastWeek: 38 },
                              { name: "Tue", thisWeek: 52, lastWeek: 43 },
                              { name: "Wed", thisWeek: 49, lastWeek: 52 },
                              { name: "Thu", thisWeek: 63, lastWeek: 47 },
                              { name: "Fri", thisWeek: 72, lastWeek: 61 },
                              { name: "Sat", thisWeek: 81, lastWeek: 69 },
                              { name: "Sun", thisWeek: 56, lastWeek: 48 },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <RechartsBar dataKey="thisWeek" fill="#0ea5e9" />
                            <RechartsBar dataKey="lastWeek" fill="#8b5cf6" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="engagement" className="mt-4">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Actions</CardTitle>
                      <CardDescription>
                        How customers are interacting with your business
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={simulatedAnalytics.engagementData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <RechartsBar dataKey="value" fill="#0ea5e9" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement Insights</CardTitle>
                      <CardDescription>
                        Key engagement metrics explained
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-b pb-3">
                          <h4 className="font-medium text-slate-900">Calls are up 15%</h4>
                          <p className="text-sm text-slate-500 mt-1">
                            More customers are calling your business directly from your GBP listing.
                          </p>
                        </div>
                        <div className="border-b pb-3">
                          <h4 className="font-medium text-slate-900">Direction requests increased</h4>
                          <p className="text-sm text-slate-500 mt-1">
                            68 customers requested directions to your business this month, a 22% increase.
                          </p>
                        </div>
                        <div className="border-b pb-3">
                          <h4 className="font-medium text-slate-900">Website clicks are steady</h4>
                          <p className="text-sm text-slate-500 mt-1">
                            Your website link received 53 clicks, similar to last month's 51 clicks.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">Messaging is an opportunity</h4>
                          <p className="text-sm text-slate-500 mt-1">
                            Consider enabling messaging features to increase customer engagement.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Rating Distribution</CardTitle>
                      <CardDescription>
                        Breakdown of ratings by star count
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={simulatedAnalytics.ratingsData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <RechartsBar dataKey="value" fill="#0ea5e9" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Summary</CardTitle>
                      <CardDescription>
                        Overall review performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center pt-6">
                        <div className="text-5xl font-bold text-primary">4.7</div>
                        <div className="flex items-center mt-2 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star} 
                              className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-yellow-200'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm text-slate-500">124 reviews</span>
                        </div>
                        <div className="w-full space-y-2">
                          <div className="flex items-center">
                            <span className="w-10 text-sm text-slate-600">5★</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: '70%' }}></div>
                            </div>
                            <span className="w-10 text-sm text-slate-600 text-right">48</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-10 text-sm text-slate-600">4★</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: '40%' }}></div>
                            </div>
                            <span className="w-10 text-sm text-slate-600 text-right">27</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-10 text-sm text-slate-600">3★</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: '20%' }}></div>
                            </div>
                            <span className="w-10 text-sm text-slate-600 text-right">15</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-10 text-sm text-slate-600">2★</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: '10%' }}></div>
                            </div>
                            <span className="w-10 text-sm text-slate-600 text-right">7</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-10 text-sm text-slate-600">1★</span>
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: '5%' }}></div>
                            </div>
                            <span className="w-10 text-sm text-slate-600 text-right">3</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="photos" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Photo Performance</CardTitle>
                    <CardDescription>
                      How your business photos are performing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Photo Views</h3>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsAreaChart
                              data={Array.from({ length: 14 }, (_, i) => ({
                                name: `Day ${i + 1}`,
                                views: Math.floor(Math.random() * 30) + 20,
                              }))}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <RechartsArea dataKey="views" fill="#0ea5e9" stroke="#0ea5e9" />
                            </RechartsAreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-md">
                          <h4 className="font-medium text-slate-900">Photo Insights</h4>
                          <div className="mt-3 space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Total photos</span>
                              <span className="text-sm font-semibold">24</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Owner added</span>
                              <span className="text-sm font-semibold">18</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Customer added</span>
                              <span className="text-sm font-semibold">6</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Most viewed photo</span>
                              <span className="text-sm font-semibold">87 views</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-md">
                          <h4 className="font-medium text-slate-900">Recommendations</h4>
                          <ul className="mt-3 space-y-2 text-sm text-slate-600">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Add photos of your products/services
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Update exterior photos
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Add team/staff photos
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-slate-600">Please sign in to view analytics</p>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="sm:hidden mt-6">
          <Select defaultValue="30days">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </main>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

const MetricCard = ({ title, value, change, trend, description }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {trend === 'up' && (
            <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {trend === 'down' && (
            <svg className="w-4 h-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          <span 
            className={`text-xs font-medium ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-slate-600'
            }`}
          >
            {change}
          </span>
          <span className="text-xs text-slate-500 ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Analytics;