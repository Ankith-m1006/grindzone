
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  const handleSave = (formType: string) => {
    toast({
      title: "Settings updated",
      description: `Your ${formType} settings have been updated successfully.`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-grindzone-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <PageTitle 
          title="Settings"
          subtitle="Manage your account preferences"
        />
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account">
            <div className="space-y-6">
              <Card className="bg-grindzone-card">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="PhantomSniper" className="form-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="phantom@example.com" className="form-input" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        className="form-input min-h-[100px] resize-none"
                        defaultValue="Professional Free Fire player. Team captain for Phantom Esports."
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      className="bg-grindzone-blue hover:bg-grindzone-blue-light"
                      onClick={() => handleSave("personal")}
                    >
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="bg-grindzone-card">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="form-input" />
                    </div>
                    
                    <Button 
                      type="button" 
                      className="bg-grindzone-blue hover:bg-grindzone-blue-light"
                      onClick={() => handleSave("password")}
                    >
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="bg-grindzone-card border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive">Delete Account</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="bg-grindzone-card">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Tournament Announcements</h4>
                      <p className="text-sm text-muted-foreground">Get notified about new tournaments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Match Reminders</h4>
                      <p className="text-sm text-muted-foreground">Receive reminders before your matches</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Squad Invites</h4>
                      <p className="text-sm text-muted-foreground">Get notified when you're invited to a squad</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-muted-foreground">Receive updates about GrindZone features and events</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Button 
                    className="mt-4 bg-grindzone-blue hover:bg-grindzone-blue-light"
                    onClick={() => handleSave("notification")}
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card className="bg-grindzone-card">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control how your information is shared</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Public Profile</h4>
                      <p className="text-sm text-muted-foreground">Allow others to view your profile</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Stats</h4>
                      <p className="text-sm text-muted-foreground">Display your game statistics on your profile</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show Online Status</h4>
                      <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Allow Friend Requests</h4>
                      <p className="text-sm text-muted-foreground">Let others send you friend requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button 
                    className="mt-4 bg-grindzone-blue hover:bg-grindzone-blue-light"
                    onClick={() => handleSave("privacy")}
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-grindzone-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle size={18} />
                  Data Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We value your privacy and are committed to protecting your personal data. You can request a copy of your data or delete your account at any time.
                </p>
                
                <div className="flex gap-4">
                  <Button variant="outline">Request Data</Button>
                  <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">
                    Delete All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
