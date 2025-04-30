
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

// Mock data for squads
const mockSquads = [
  {
    id: "1",
    name: "Team Phoenix",
    tag: "PHX",
    tier: "Professional",
    logo: "/placeholder.svg",
    members: 5,
    wins: 24,
    losses: 6
  },
  {
    id: "2",
    name: "Shadow Wolves",
    tag: "SW",
    tier: "Semi-Pro",
    logo: "/placeholder.svg",
    members: 4,
    wins: 15,
    losses: 8
  }
];

const SquadPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSquad, setActiveSquad] = useState(mockSquads[0]);

  const handleCreateSquad = () => {
    navigate("/create-squad");
  };

  return (
    <div className="min-h-screen bg-grindzone-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <PageTitle 
            title="My Squads"
            subtitle="Manage your teams and teammates"
          />
          
          <Button 
            onClick={handleCreateSquad}
            className="bg-grindzone-blue hover:bg-grindzone-blue-light flex items-center gap-2"
          >
            <PlusIcon size={16} />
            Create New Squad
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Squad List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold mb-2">Your Squads</h2>
            
            {mockSquads.map((squad) => (
              <Card 
                key={squad.id} 
                className={`cursor-pointer transition-colors ${
                  activeSquad.id === squad.id 
                    ? "bg-grindzone-blue/20 border-grindzone-blue" 
                    : "bg-grindzone-card hover:bg-grindzone-blue/10"
                }`}
                onClick={() => setActiveSquad(squad)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-grindzone-darker flex items-center justify-center overflow-hidden">
                    {squad.logo ? (
                      <img src={squad.logo} alt={squad.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-sm">{squad.tag}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{squad.name}</h3>
                    <p className="text-xs text-muted-foreground">{squad.tier}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Squad Details */}
          <div className="lg:col-span-3">
            <Card className="bg-grindzone-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-grindzone-darker flex items-center justify-center overflow-hidden">
                    {activeSquad.logo ? (
                      <img src={activeSquad.logo} alt={activeSquad.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold">{activeSquad.tag}</span>
                    )}
                  </div>
                  <div>
                    <CardTitle>{activeSquad.name} [{activeSquad.tag}]</CardTitle>
                    <p className="text-sm text-muted-foreground">{activeSquad.tier} • {activeSquad.members} members</p>
                  </div>
                </div>
                <Button variant="outline">Manage Squad</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="bg-grindzone-darker p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Wins</h4>
                    <p className="text-2xl font-semibold text-green-500">{activeSquad.wins}</p>
                  </div>
                  <div className="bg-grindzone-darker p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Losses</h4>
                    <p className="text-2xl font-semibold text-red-500">{activeSquad.losses}</p>
                  </div>
                  <div className="bg-grindzone-darker p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Win Rate</h4>
                    <p className="text-2xl font-semibold text-purple-500">
                      {((activeSquad.wins / (activeSquad.wins + activeSquad.losses)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4">Squad Members</h3>
                  <div className="bg-grindzone-darker rounded-md overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-grindzone-card/50">
                        <tr>
                          <th className="px-4 py-3 text-sm font-medium">Player</th>
                          <th className="px-4 py-3 text-sm font-medium">Role</th>
                          <th className="px-4 py-3 text-sm font-medium">Joined</th>
                          <th className="px-4 py-3 text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-3 border-t border-grindzone-darker">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-grindzone-blue/20 mr-3"></div>
                              <span>ProGamer123</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">Captain</td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">Jan 15, 2025</td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-500">Online</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-t border-grindzone-darker">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-grindzone-blue/20 mr-3"></div>
                              <span>NinjaWarrior</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">Member</td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">Feb 2, 2025</td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400">Offline</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 border-t border-grindzone-darker">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-grindzone-blue/20 mr-3"></div>
                              <span>ShadowSniper</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">Member</td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">Feb 8, 2025</td>
                          <td className="px-4 py-3 border-t border-grindzone-darker">
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-500">In Game</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline" className="mr-4">Invite Players</Button>
                  <Button className="bg-grindzone-blue hover:bg-grindzone-blue-light">View Matches</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadPage;
