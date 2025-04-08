import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckIcon } from 'lucide-react';

// Form schema
const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters."
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters."
  }),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  category: z.string(),
  mondayOpen: z.string(),
  mondayClose: z.string(),
  tuesdayOpen: z.string(),
  tuesdayClose: z.string()
});

type FormValues = z.infer<typeof formSchema>;

const BusinessProfileForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      address: '',
      phone: '',
      website: '',
      category: 'gcid:local_business',
      mondayOpen: '09:00',
      mondayClose: '17:00',
      tuesdayOpen: '09:00',
      tuesdayClose: '17:00'
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/profiles', data);
      
      // Reset form
      form.reset();
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/profiles'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      
      toast({
        title: "Success!",
        description: "Business submitted for GBP automation!",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your business profile.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 px-4 sm:px-0">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-slate-900">
            Add New Business Profile
          </h3>
          <div className="mt-2 max-w-xl text-sm text-slate-500">
            <p>
              Enter your business information to claim and optimize your Google Business Profile.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 sm:flex sm:items-start sm:flex-col">
              <div className="w-full space-y-4">
                {/* Business Name */}
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Acme Corporation" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Business Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. 123 Main St, City, State, ZIP" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Business Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Phone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. (555) 123-4567" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Business Website */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Website</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. https://example.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Business Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gcid:local_business">Local Business</SelectItem>
                          <SelectItem value="gcid:restaurant">Restaurant</SelectItem>
                          <SelectItem value="gcid:retail">Retail Store</SelectItem>
                          <SelectItem value="gcid:service">Service Provider</SelectItem>
                          <SelectItem value="gcid:professional">Professional Services</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Business Hours */}
                <div>
                  <span className="block text-sm font-medium text-slate-700">Business Hours</span>
                  <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <FormField
                        control={form.control}
                        name="mondayOpen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monday Open</FormLabel>
                            <FormControl>
                              <Input 
                                type="time" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="mondayClose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monday Close</FormLabel>
                            <FormControl>
                              <Input 
                                type="time" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="tuesdayOpen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tuesday Open</FormLabel>
                            <FormControl>
                              <Input 
                                type="time" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="tuesdayClose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tuesday Close</FormLabel>
                            <FormControl>
                              <Input 
                                type="time" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">Add more days in the advanced settings after initial setup.</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="mr-3"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="-ml-1 mr-2 h-5 w-5" />
                      Submit
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileForm;
