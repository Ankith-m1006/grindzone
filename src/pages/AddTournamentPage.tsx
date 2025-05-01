
import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "lucide-react";

const AddTournamentPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    game: "",
    date: "",
    tier: "",
    maxTeams: "",
    prizePool: "",
    entryFee: "",
    description: "",
    rules: ""
  });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.game || !formData.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Get existing tournaments or initialize empty array
      const existingTournaments = JSON.parse(localStorage.getItem("tournaments") || "[]");
      
      // Create new tournament object
      const newTournament = {
        id: `t${Date.now()}`, // Generate unique ID
        name: formData.name,
        game: formData.game,
        date: formData.date,
        tier: formData.tier,
        participants: `0/${formData.maxTeams} teams`,
        prizePool: formData.prizePool ? `$${formData.prizePool}` : "",
        entryFee: formData.entryFee ? `$${formData.entryFee}` : "",
        status: "Registration",
        description: formData.description,
        rules: formData.rules
      };

      // Add new tournament to list
      existingTournaments.unshift(newTournament);
      
      // Save to localStorage
      localStorage.setItem("tournaments", JSON.stringify(existingTournaments));

      toast({
        title: "Tournament created",
        description: "The tournament has been added successfully",
      });

      // Redirect to admin page
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (error) {
      console.error("Error creating tournament:", error);
      toast({
        title: "Error",
        description: "Failed to create tournament",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Add New Tournament</h1>
          <Button variant="outline" onClick={() => navigate('/admin')}>
            Back to Admin
          </Button>
        </div>
        
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Tournament Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Tournament Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Free Fire Champions Cup"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="game">Game *</Label>
                  <Input
                    id="game"
                    name="game"
                    placeholder="e.g. Free Fire, PUBG Mobile"
                    value={formData.game}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Tournament Date *</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-zinc-950 border-zinc-800"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tier">Tournament Tier</Label>
                  <Input
                    id="tier"
                    name="tier"
                    placeholder="e.g. Professional, Amateur"
                    value={formData.tier}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxTeams">Maximum Teams</Label>
                  <Input
                    id="maxTeams"
                    name="maxTeams"
                    type="number"
                    placeholder="e.g. 32"
                    value={formData.maxTeams}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prizePool">Prize Pool (USD)</Label>
                  <Input
                    id="prizePool"
                    name="prizePool"
                    placeholder="e.g. 5000"
                    value={formData.prizePool}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="entryFee">Entry Fee (USD)</Label>
                  <Input
                    id="entryFee"
                    name="entryFee"
                    placeholder="e.g. 250"
                    value={formData.entryFee}
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-800"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Tournament Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter a detailed description of the tournament..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[120px] bg-zinc-950 border-zinc-800"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rules">Tournament Rules</Label>
                <Textarea
                  id="rules"
                  name="rules"
                  placeholder="Enter the rules and guidelines for the tournament..."
                  value={formData.rules}
                  onChange={handleInputChange}
                  className="min-h-[150px] bg-zinc-950 border-zinc-800"
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => navigate('/admin')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Tournament"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddTournamentPage;
