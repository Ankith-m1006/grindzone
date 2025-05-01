
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, TrophyIcon, UsersIcon, CreditCardIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Tournament {
  id: string;
  name: string;
  game: string;
  date: string;
  tier?: string;
  participants: string;
  image?: string;
  prizePool?: string;
  entryFee?: string;
  status?: string;
  description?: string;
  rules?: string | string[];
}

const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    loadTournamentData();
  }, [id]);
  
  const loadTournamentData = () => {
    setIsLoading(true);
    
    try {
      // Get tournaments from localStorage
      const storedTournaments = localStorage.getItem("tournaments");
      
      if (storedTournaments && id) {
        const allTournaments: Tournament[] = JSON.parse(storedTournaments);
        const foundTournament = allTournaments.find(t => t.id === id);
        
        if (foundTournament) {
          // Process rules if they are stored as a string but should be an array
          if (typeof foundTournament.rules === 'string') {
            foundTournament.rules = foundTournament.rules.split('. ').filter(rule => rule.trim().length > 0);
          } else if (!foundTournament.rules) {
            // Default rules if none available
            foundTournament.rules = [
              "Teams must consist of 4 active players",
              "All participants must be at least 16 years old",
              "No cheating or exploits allowed",
              "Players must be available for all scheduled matches"
            ];
          }
          
          setTournament(foundTournament);
        } else {
          toast({
            title: "Tournament not found",
            description: "The tournament you're looking for does not exist",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Error loading tournament",
          description: "The tournament data could not be loaded",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error loading tournament details:", error);
      toast({
        title: "Error",
        description: "There was a problem loading the tournament details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleJoinTournament = () => {
    setIsPaymentDialogOpen(true);
  };
  
  const handlePayment = () => {
    setIsPaymentDialogOpen(false);
    
    // Update registrations in localStorage
    if (tournament) {
      try {
        // Get current tournaments
        const storedTournaments = localStorage.getItem("tournaments");
        if (storedTournaments) {
          const allTournaments: Tournament[] = JSON.parse(storedTournaments);
          
          // Find the tournament and update participants count
          const updatedTournaments = allTournaments.map(t => {
            if (t.id === tournament.id) {
              // Parse current participants (format: "45/64 teams")
              const participantsMatch = t.participants.match(/(\d+)\/(\d+)/);
              if (participantsMatch && participantsMatch.length >= 3) {
                const current = parseInt(participantsMatch[1]);
                const max = parseInt(participantsMatch[2]);
                // Increment participants count
                const newCount = current < max ? current + 1 : current;
                return {
                  ...t,
                  participants: `${newCount}/${max} teams`,
                  // Mark as full if max reached
                  isFull: newCount >= max
                };
              }
            }
            return t;
          });
          
          // Save updated tournaments
          localStorage.setItem("tournaments", JSON.stringify(updatedTournaments));
          
          // Create a payment record
          const storedPayments = localStorage.getItem("payments") || "[]";
          const payments = JSON.parse(storedPayments);
          const newPayment = {
            id: `p${Date.now()}`,
            team: localStorage.getItem("userName") || "Your Team",
            tournament: tournament.name,
            amount: tournament.entryFee || "$50",
            date: new Date().toISOString().split('T')[0]
          };
          
          payments.unshift(newPayment); // Add to beginning of array
          localStorage.setItem("payments", JSON.stringify(payments));
        }
        
        toast({
          title: "Payment Successful!",
          description: `You have successfully joined ${tournament.name}`,
          variant: "default",
        });
        
        // Reload tournament data to reflect changes
        loadTournamentData();
        
      } catch (error) {
        console.error("Error updating registrations:", error);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-grindzone-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading tournament details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!tournament) {
    return (
      <div className="min-h-screen bg-grindzone-dark">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <PageTitle 
            title="Tournament Not Found"
            subtitle="The tournament you're looking for does not exist"
          />
          <Button onClick={() => navigate("/tournaments")}>
            Back to Tournaments
          </Button>
        </div>
      </div>
    );
  }
  
  // Check if tournament is full based on participants string
  const isTournamentFull = () => {
    if (!tournament.participants) return false;
    
    const match = tournament.participants.match(/(\d+)\/(\d+)/);
    if (match && match.length >= 3) {
      const current = parseInt(match[1]);
      const max = parseInt(match[2]);
      return current >= max;
    }
    return false;
  };
  
  return (
    <div className="min-h-screen bg-grindzone-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/tournaments")}
            className="mb-4 md:mb-0"
          >
            ← Back to Tournaments
          </Button>
          
          <PageTitle 
            title={tournament.name}
            subtitle={`${tournament.game} Tournament`}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tournament Info */}
          <div className="lg:col-span-2">
            <Card className="bg-grindzone-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      {tournament.image ? (
                        <img 
                          src={tournament.image} 
                          alt={tournament.game} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="text-2xl font-bold text-white">{tournament.game.substring(0, 2)}</div>
                      )}
                    </div>
                    <div>
                      <CardTitle>{tournament.name}</CardTitle>
                      <CardDescription>{tournament.game}</CardDescription>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs bg-grindzone-darker px-3 py-1 rounded-full border border-border">
                      {tournament.tier || "Standard"}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  {tournament.description || `Join this exciting ${tournament.game} tournament and compete against the best teams.`}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-purple-500" />
                    <span>{tournament.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon size={16} className="text-purple-500" />
                    <span>{tournament.participants}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrophyIcon size={16} className="text-purple-500" />
                    <span>Prize Pool: {tournament.prizePool || "TBD"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCardIcon size={16} className="text-purple-500" />
                    <span>Entry Fee: {tournament.entryFee || "Free"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tournament Rules */}
          <div>
            <Card className="bg-grindzone-card border-border">
              <CardHeader>
                <CardTitle>Tournament Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {Array.isArray(tournament.rules) ? (
                    tournament.rules.map((rule, index) => (
                      <li key={index} className="text-muted-foreground">{rule}</li>
                    ))
                  ) : (
                    <li className="text-muted-foreground">Standard tournament rules apply</li>
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                {isTournamentFull() ? (
                  <Button disabled className="w-full bg-gray-600 hover:bg-gray-600 cursor-not-allowed">
                    Tournament Full
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-grindzone-blue hover:bg-grindzone-blue-light"
                    onClick={handleJoinTournament}
                  >
                    Join Tournament
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="bg-grindzone-card">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Pay the registration fee to join {tournament.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-grindzone-darker rounded-md">
              <p className="font-semibold">Tournament: {tournament.name}</p>
              <p className="text-muted-foreground">Registration Fee: {tournament.entryFee || "Free"}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm">Card Number</label>
                <input 
                  type="text" 
                  className="w-full p-2 bg-grindzone-darker border border-border rounded-md focus:ring-1 focus:ring-purple-500 focus:outline-none" 
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm">Expiry</label>
                  <input 
                    type="text" 
                    className="w-full p-2 bg-grindzone-darker border border-border rounded-md focus:ring-1 focus:ring-purple-500 focus:outline-none" 
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">CVC</label>
                  <input 
                    type="text" 
                    className="w-full p-2 bg-grindzone-darker border border-border rounded-md focus:ring-1 focus:ring-purple-500 focus:outline-none" 
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePayment} className="bg-grindzone-blue hover:bg-grindzone-blue-light">
              Pay {tournament.entryFee || "Free Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TournamentDetailsPage;
