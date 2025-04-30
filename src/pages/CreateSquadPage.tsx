
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CreateSquadPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [squadName, setSquadName] = useState("");
  const [squadTag, setSquadTag] = useState("");
  const [tier, setTier] = useState("Amateur");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would make an API call to create the squad
    // For now, we'll just simulate success
    
    if (!squadName.trim() || !squadTag.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Squad Created!",
      description: `${squadName} has been successfully created`,
      variant: "default",
    });
    
    // Navigate to the squad page after creating
    navigate("/squad");
  };
  
  return (
    <div className="min-h-screen bg-grindzone-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/squad")}
          >
            ← Back to Squads
          </Button>
          
          <PageTitle 
            title="Create a New Squad"
            subtitle="Form your dream team and dominate the competition"
          />
        </div>
        
        <Card className="max-w-2xl mx-auto bg-grindzone-card border-border">
          <CardHeader>
            <CardTitle>Squad Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="squadName" className="text-sm font-medium">
                  Squad Name*
                </label>
                <input
                  id="squadName"
                  type="text"
                  value={squadName}
                  onChange={(e) => setSquadName(e.target.value)}
                  className="w-full p-2 bg-grindzone-darker border border-border rounded-md focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="Enter squad name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="squadTag" className="text-sm font-medium">
                  Squad Tag* (2-6 characters)
                </label>
                <input
                  id="squadTag"
                  type="text"
                  value={squadTag}
                  onChange={(e) => setSquadTag(e.target.value.toUpperCase().slice(0, 6))}
                  className="w-full p-2 bg-grindzone-darker border border-border rounded-md focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="e.g. ALPHA"
                  maxLength={6}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tier" className="text-sm font-medium">
                  Tier
                </label>
                <select
                  id="tier"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full p-2 bg-grindzone-darker border border-border rounded-md focus:ring-1 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="Amateur">Amateur</option>
                  <option value="Semi-Pro">Semi-Pro</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="squadLogo" className="text-sm font-medium">
                  Squad Logo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer border-border hover:border-purple-500 bg-grindzone-darker">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG (MAX. 800x800px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full p-2 bg-grindzone-darker border border-border rounded-md focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  placeholder="Tell us about your squad"
                ></textarea>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => navigate("/squad")}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit} 
              className="bg-grindzone-blue hover:bg-grindzone-blue-light"
            >
              Create Squad
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CreateSquadPage;
