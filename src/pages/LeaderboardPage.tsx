
import React, { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import LeaderboardFilters from "@/components/filters/LeaderboardFilters";
import LeaderboardTable from "@/components/tables/LeaderboardTable";

const LeaderboardPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      teamName: "InvictusGaming",
      teamLogo: "/lovable-uploads/1870522f-377e-47ed-a81d-69c9f1a40855.png",
      wins: 58,
      losses: 12,
      winPercentage: "82.9%",
      tier: "Professional",
      region: "Global",
      game: "Free Fire"
    },
    {
      rank: 2,
      teamName: "TeamLiquid",
      teamLogo: "/lovable-uploads/c5971abd-922a-41aa-aae8-8790974a7631.png",
      wins: 52,
      losses: 18,
      winPercentage: "74.3%",
      tier: "Professional",
      region: "NA",
      game: "Free Fire"
    },
    {
      rank: 3,
      teamName: "FaZe Clan",
      wins: 49,
      losses: 21,
      winPercentage: "70.0%",
      tier: "Professional",
      region: "EU",
      game: "PUBG Mobile"
    },
    {
      rank: 4,
      teamName: "T1",
      wins: 47,
      losses: 23,
      winPercentage: "67.1%",
      tier: "Professional",
      region: "APAC",
      game: "Free Fire"
    },
    {
      rank: 5,
      teamName: "G2 Esports",
      wins: 42,
      losses: 28,
      winPercentage: "60.0%",
      tier: "Professional",
      region: "EU",
      game: "PUBG Mobile"
    }
  ];

  const handleFilterChange = (filter: string, value: string) => {
    switch (filter) {
      case "game":
        setSelectedGame(value);
        break;
      case "region":
        setSelectedRegion(value);
        break;
      case "tier":
        setSelectedTier(value);
        break;
      default:
        break;
    }
  };

  // In a real application, we would filter the data based on the selected filters
  // For now, we'll just use the mock data as is
  const filteredData = leaderboardData;

  return (
    <div className="min-h-screen bg-grindzone-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <PageTitle 
          title="Leaderboard"
          subtitle="Top performing teams and players"
        />
        
        <LeaderboardFilters 
          onFilterChange={handleFilterChange}
          selectedGame={selectedGame}
          selectedRegion={selectedRegion}
          selectedTier={selectedTier}
        />
        
        <LeaderboardTable data={filteredData} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
