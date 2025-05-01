
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import TournamentCard from "@/components/cards/TournamentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface Tournament {
  id: string;
  name: string;
  game: string;
  date: string;
  tier: string;
  participants: string;
  image?: string;
  isFull?: boolean;
  status?: string;
  prizePool?: string;
  entryFee?: string;
  description?: string;
  rules?: string;
}

const TournamentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingTournaments, setUpcomingTournaments] = useState<Tournament[]>([]);
  const [ongoingTournaments, setOngoingTournaments] = useState<Tournament[]>([]);
  const [pastTournaments, setPastTournaments] = useState<Tournament[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load tournaments from localStorage
    loadTournaments();
  }, []);

  // Load tournaments from localStorage or use default data
  const loadTournaments = () => {
    try {
      const storedTournaments = localStorage.getItem("tournaments");
      
      if (storedTournaments) {
        const allTournaments: Tournament[] = JSON.parse(storedTournaments);
        
        // Sort tournaments into the right categories
        const upcoming: Tournament[] = [];
        const ongoing: Tournament[] = [];
        const past: Tournament[] = [];
        
        allTournaments.forEach(tournament => {
          // Convert tournament to proper format if necessary
          const processedTournament = {
            ...tournament,
            // Ensure status is correct if not already set
            status: tournament.status || determineStatus(tournament.date),
            // Set isFull property based on participants
            isFull: isFullTournament(tournament.participants)
          };
          
          if (processedTournament.status === "Upcoming" || processedTournament.status === "Registration") {
            upcoming.push(processedTournament);
          } else if (processedTournament.status === "Ongoing") {
            ongoing.push(processedTournament);
          } else {
            past.push(processedTournament);
          }
        });
        
        setUpcomingTournaments(upcoming);
        setOngoingTournaments(ongoing);
        setPastTournaments(past);
      } else {
        // Create default tournaments if none exist in localStorage
        createDefaultTournaments();
      }
    } catch (error) {
      console.error("Error loading tournaments:", error);
      toast({
        title: "Error loading tournaments",
        description: "There was a problem loading tournament data",
        variant: "destructive"
      });
    }
  };

  // Check if a tournament is full based on participants string
  const isFullTournament = (participants: string): boolean => {
    if (!participants) return false;
    
    const match = participants.match(/(\d+)\/(\d+)/);
    if (match && match.length >= 3) {
      const current = parseInt(match[1]);
      const max = parseInt(match[2]);
      return current >= max;
    }
    return false;
  };

  // Helper function to determine tournament status based on date
  const determineStatus = (dateString: string): string => {
    if (!dateString) return "Upcoming";
    
    const now = new Date();
    let tournamentDate: Date;
    
    // Check if date is in format "May 15, 2025" or "2025-05-15"
    if (dateString.includes(",")) {
      tournamentDate = new Date(dateString);
    } else {
      tournamentDate = new Date(dateString);
    }
    
    if (isNaN(tournamentDate.getTime())) {
      return "Upcoming"; // Default if date is invalid
    }
    
    // Set the date 3 days before for registration period
    const regStartDate = new Date(tournamentDate);
    regStartDate.setDate(tournamentDate.getDate() - 3);
    
    // Set the date 1 day after for completion
    const endDate = new Date(tournamentDate);
    endDate.setDate(tournamentDate.getDate() + 1);
    
    if (now < regStartDate) {
      return "Upcoming";
    } else if (now >= regStartDate && now < tournamentDate) {
      return "Registration";
    } else if (now >= tournamentDate && now < endDate) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  };

  // Create default tournaments if none exist in localStorage
  const createDefaultTournaments = () => {
    const defaultTournaments = [
      {
        id: "1",
        name: "Free Fire Pro League",
        game: "Free Fire",
        date: "2025-05-15",
        tier: "Professional",
        participants: "45/64 teams",
        image: "/lovable-uploads/f37ac391-6e24-4f2b-932b-c4e713603787.png",
        prizePool: "$10,000",
        entryFee: "$50",
        status: "Registration",
        description: "Join the most prestigious Free Fire tournament in the region. Test your skills against the best teams and compete for the grand prize.",
        rules: "Teams must consist of 4 active players. All participants must be at least 16 years old. Double elimination format."
      },
      {
        id: "2",
        name: "PUBG Mobile Open",
        game: "PUBG Mobile",
        date: "2025-05-08",
        tier: "Semi-Pro",
        participants: "32/32 teams",
        image: "/lovable-uploads/c5971abd-922a-41aa-aae8-8790974a7631.png",
        prizePool: "$5,000",
        entryFee: "$30",
        status: "Upcoming",
        isFull: true,
        description: "The PUBG Mobile Open tournament brings together the best semi-professional teams for an action-packed competition.",
        rules: "Teams must consist of 4 active players. Round-robin group stage followed by single elimination."
      },
      {
        id: "3",
        name: "Valorant Rising Stars",
        game: "Valorant",
        date: "2025-05-22",
        tier: "Amateur",
        participants: "28/32 teams",
        prizePool: "$2,000",
        entryFee: "$20",
        status: "Upcoming",
        description: "A tournament designed for up-and-coming Valorant teams. Build your reputation in this exciting event.",
        rules: "Teams must consist of 5 active players. All participants must be at least 14 years old. Single elimination format."
      }
    ];
    
    // Save to localStorage
    localStorage.setItem("tournaments", JSON.stringify(defaultTournaments));
    
    // Update state
    setUpcomingTournaments(defaultTournaments.filter(t => t.status === "Upcoming" || t.status === "Registration"));
    setOngoingTournaments(defaultTournaments.filter(t => t.status === "Ongoing"));
    setPastTournaments(defaultTournaments.filter(t => t.status === "Completed"));
  };

  return (
    <div className="min-h-screen bg-grindzone-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <PageTitle 
          title="Tournaments"
          subtitle="Join competitions and prove your skills"
        />
        
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {upcomingTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} {...tournament} />
              ))}
              {upcomingTournaments.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No upcoming tournaments at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ongoing">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ongoingTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} {...tournament} />
              ))}
              {ongoingTournaments.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No ongoing tournaments at the moment.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pastTournaments.map((tournament) => (
                <TournamentCard key={tournament.id} {...tournament} />
              ))}
              {pastTournaments.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No past tournaments available.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentsPage;
