
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import TournamentCard from "@/components/cards/TournamentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

const TournamentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingTournaments, setUpcomingTournaments] = useState<Tournament[]>([]);
  const [ongoingTournaments, setOngoingTournaments] = useState<Tournament[]>([]);
  const [pastTournaments, setPastTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    // Load tournaments from localStorage or use default data
    const loadTournaments = () => {
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
            // Ensure status is correct
            status: tournament.status || determineStatus(tournament.date)
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
        // Use default data if no tournaments in localStorage
        setUpcomingTournaments([
          {
            id: "1",
            name: "Free Fire Pro League",
            game: "Free Fire",
            date: "May 15, 2025",
            tier: "Professional",
            participants: "45/64 teams",
            image: "/lovable-uploads/f37ac391-6e24-4f2b-932b-c4e713603787.png"
          },
          {
            id: "2",
            name: "PUBG Mobile Open",
            game: "PUBG Mobile",
            date: "May 8, 2025",
            tier: "Semi-Pro",
            participants: "32/32 teams",
            image: "/lovable-uploads/c5971abd-922a-41aa-aae8-8790974a7631.png",
            isFull: true
          },
          {
            id: "3",
            name: "Valorant Rising Stars",
            game: "Valorant",
            date: "May 22, 2025",
            tier: "Amateur",
            participants: "28/32 teams"
          },
          {
            id: "4",
            name: "Apex Legends Cup",
            game: "Apex Legends",
            date: "June 5, 2025",
            tier: "Professional",
            participants: "12/20 teams"
          }
        ]);

        setOngoingTournaments([
          {
            id: "5",
            name: "Call of Duty Championship",
            game: "Call of Duty Mobile",
            date: "Ends May 3, 2025",
            tier: "Professional",
            participants: "16/16 teams",
            isFull: true
          },
          {
            id: "6",
            name: "League of Legends Wildrift Invitational",
            game: "League of Legends",
            date: "Ends May 7, 2025",
            tier: "Professional",
            participants: "8/8 teams",
            isFull: true
          }
        ]);

        setPastTournaments([
          {
            id: "7",
            name: "Free Fire World Series",
            game: "Free Fire",
            date: "April 15, 2025",
            tier: "Professional",
            participants: "16/16 teams",
            isFull: true
          },
          {
            id: "8",
            name: "PUBG Mobile Global Championship",
            game: "PUBG Mobile",
            date: "April 8, 2025",
            tier: "Professional",
            participants: "24/24 teams",
            isFull: true
          },
          {
            id: "9",
            name: "Valorant Champions Tour",
            game: "Valorant", 
            date: "March 22, 2025",
            tier: "Professional",
            participants: "16/16 teams",
            isFull: true
          }
        ]);
      }
    };
    
    loadTournaments();
  }, []);

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
