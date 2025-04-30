
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, TrophyIcon, UsersIcon, CreditCardIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock tournament data - in a real app this would come from an API
const tournamentData = {
  "1": {
    id: "1",
    name: "Free Fire Pro League",
    game: "Free Fire",
    date: "May 15, 2025",
    tier: "Professional",
    participants: "45/64 teams",
    image: "/lovable-uploads/f37ac391-6e24-4f2b-932b-c4e713603787.png",
    prize: "$10,000",
    registrationFee: "$50",
    rules: [
      "Teams must consist of 4 active players",
      "All participants must be at least 16 years old",
      "Double elimination format",
      "No cheating or exploits allowed",
      "Players must be available for all scheduled matches"
    ],
    description: "Join the most prestigious Free Fire tournament in the region. Test your skills against the best teams and compete for the grand prize and the title of Free Fire Pro Champion."
  },
  "2": {
    id: "2",
    name: "PUBG Mobile Open",
    game: "PUBG Mobile",
    date: "May 8, 2025",
    tier: "Semi-Pro",
    participants: "32/32 teams",
    image: "/lovable-uploads/c5971abd-922a-41aa-aae8-8790974a7631.png",
    prize: "$5,000",
    registrationFee: "$30",
    rules: [
      "Teams must consist of 4 active players",
      "All participants must be at least 16 years old",
      "Round-robin group stage followed by single elimination",
      "No cheating or exploits allowed",
      "Players must be available for all scheduled matches"
    ],
    description: "The PUBG Mobile Open tournament brings together the best semi-professional teams for an action-packed competition. Show your tactical prowess and aim for the top prize!"
  },
  "3": {
    id: "3",
    name: "Valorant Rising Stars",
    game: "Valorant",
    date: "May 22, 2025",
    tier: "Amateur",
    participants: "28/32 teams",
    prize: "$2,000",
    registrationFee: "$20",
    rules: [
      "Teams must consist of 5 active players",
      "All participants must be at least 14 years old",
      "Single elimination format",
      "No cheating or exploits allowed",
      "Players must be available for all scheduled matches"
    ],
    description: "A tournament designed for up-and-coming Valorant teams. Build your reputation and climb the ranks of competitive play in this exciting event for amateur teams."
  },
  "4": {
    id: "4",
    name: "Apex Legends Cup",
    game: "Apex Legends",
    date: "June 5, 2025",
    tier: "Professional",
    participants: "12/20 teams",
    prize: "$7,500",
    registrationFee: "$40",
    rules: [
      "Teams must consist of 3 active players",
      "All participants must be at least 16 years old",
      "Point-based scoring system across multiple rounds",
      "No cheating or exploits allowed",
      "Players must be available for all scheduled matches"
    ],
    description: "The Apex Legends Cup features the most skilled squads competing for glory and prizes. Show off your movement, aim, and teamwork in this high-octane battle royale tournament."
  },
  "5": {
    id: "5",
    name: "Call of Duty Championship",
    game: "Call of Duty Mobile",
    date: "Ends May 3, 2025",
    tier: "Professional",
    participants: "16/16 teams",
    prize: "$12,000",
    registrationFee: "$60",
    rules: [
      "Teams must consist of 5 active players",
      "All participants must be at least 18 years old",
      "Double elimination format",
      "No cheating or exploits allowed",
      "Players must be available for all scheduled matches"
    ],
    description: "The ultimate Call of Duty Mobile championship featuring the best teams in the world. Compete in various game modes and prove your squad is the best of the best."
  }
};

const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  
  // Get tournament data - in a real app this would be fetched from an API
  const tournament = id ? tournamentData[id] : null;
  
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
  
  const handleJoinTournament = () => {
    setIsPaymentDialogOpen(true);
  };
  
  const handlePayment = () => {
    setIsPaymentDialogOpen(false);
    toast({
      title: "Payment Successful!",
      description: `You have successfully joined ${tournament.name}`,
      variant: "default",
    });
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
                      {tournament.tier}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  {tournament.description}
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
                    <span>Prize Pool: {tournament.prize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCardIcon size={16} className="text-purple-500" />
                    <span>Entry Fee: {tournament.registrationFee}</span>
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
                  {tournament.rules.map((rule, index) => (
                    <li key={index} className="text-muted-foreground">{rule}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {tournament.participants.includes("full") ? (
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
              <p className="text-muted-foreground">Registration Fee: {tournament.registrationFee}</p>
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
              Pay {tournament.registrationFee}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TournamentDetailsPage;
