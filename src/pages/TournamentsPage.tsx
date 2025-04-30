
import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import TournamentCard from "@/components/cards/TournamentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TournamentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock tournament data
  const upcomingTournaments = [
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
  ];

  const ongoingTournaments = [
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
  ];

  const pastTournaments = [
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
  ];

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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TournamentsPage;
