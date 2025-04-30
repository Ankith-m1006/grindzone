
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SquadPage: React.FC = () => {
  // Mock squad data
  const mySquads = [
    {
      id: "1",
      name: "Phantom Esports",
      logo: "/placeholder.svg",
      tier: "Professional",
      members: 5,
      wins: 48,
      losses: 12,
      roster: [
        { name: "PhantomSniper", role: "Captain", joinDate: "Jan 15, 2023" },
        { name: "ShadowBlade", role: "Fragger", joinDate: "Jan 20, 2023" },
        { name: "NightHawk", role: "Support", joinDate: "Feb 5, 2023" },
        { name: "VenomStrike", role: "Sniper", joinDate: "Mar 12, 2023" },
        { name: "StormRider", role: "Scout", joinDate: "Apr 8, 2023" }
      ]
    }
  ];
  
  const recommendedSquads = [
    {
      id: "2",
      name: "Elite Warriors",
      logo: "/placeholder.svg",
      tier: "Semi-Pro",
      members: 4,
      openSlots: 1
    },
    {
      id: "3",
      name: "Nova Esports",
      logo: "/placeholder.svg",
      tier: "Professional",
      members: 5,
      openSlots: 0
    },
    {
      id: "4",
      name: "Apex Predators",
      logo: "/placeholder.svg",
      tier: "Amateur",
      members: 3,
      openSlots: 2
    }
  ];
  
  const [selectedSquad, setSelectedSquad] = React.useState(mySquads[0]);
  
  return (
    <div className="min-h-screen bg-grindzone-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <PageTitle 
          title="Squad"
          subtitle="Manage your teams and find new teammates"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">My Squads</h3>
              {mySquads.map((squad) => (
                <Card 
                  key={squad.id} 
                  className={`mb-4 cursor-pointer hover:border-grindzone-blue transition-colors ${
                    selectedSquad?.id === squad.id ? 'border-grindzone-blue shadow-glow-sm' : 'bg-grindzone-card'
                  }`}
                  onClick={() => setSelectedSquad(squad)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-grindzone-darker rounded-full flex items-center justify-center mr-4">
                        {squad.logo ? (
                          <img 
                            src={squad.logo} 
                            alt={squad.name} 
                            className="h-8 w-8"
                          />
                        ) : (
                          <span className="text-xl font-bold">{squad.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{squad.name}</h4>
                        <p className="text-sm text-muted-foreground">{squad.tier} • {squad.members} members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button className="w-full mt-4 bg-grindzone-blue hover:bg-grindzone-blue-light">
                Create New Squad
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Recommended Squads</h3>
              {recommendedSquads.map((squad) => (
                <Card key={squad.id} className="mb-4 bg-grindzone-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-grindzone-darker rounded-full flex items-center justify-center mr-4">
                          {squad.logo ? (
                            <img 
                              src={squad.logo} 
                              alt={squad.name} 
                              className="h-8 w-8"
                            />
                          ) : (
                            <span className="text-xl font-bold">{squad.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{squad.name}</h4>
                          <p className="text-sm text-muted-foreground">{squad.tier} • {squad.members} members</p>
                        </div>
                      </div>
                      {squad.openSlots > 0 ? (
                        <Button size="sm" className="bg-grindzone-blue hover:bg-grindzone-blue-light">
                          Join
                        </Button>
                      ) : (
                        <Button size="sm" disabled>
                          Full
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedSquad && (
              <>
                <Card className="bg-grindzone-card mb-6">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-16 w-16 bg-grindzone-darker rounded-full flex items-center justify-center mr-4">
                          {selectedSquad.logo ? (
                            <img 
                              src={selectedSquad.logo} 
                              alt={selectedSquad.name} 
                              className="h-12 w-12"
                            />
                          ) : (
                            <span className="text-2xl font-bold">{selectedSquad.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <CardTitle>{selectedSquad.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{selectedSquad.tier} Tier</p>
                        </div>
                      </div>
                      <Button variant="outline">Edit Squad</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="bg-grindzone-darker p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Wins</p>
                        <p className="text-2xl font-bold text-grindzone-blue">{selectedSquad.wins}</p>
                      </div>
                      <div className="bg-grindzone-darker p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Losses</p>
                        <p className="text-2xl font-bold">{selectedSquad.losses}</p>
                      </div>
                      <div className="bg-grindzone-darker p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Win Rate</p>
                        <p className="text-2xl font-bold text-grindzone-blue">
                          {((selectedSquad.wins / (selectedSquad.wins + selectedSquad.losses)) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-grindzone-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Squad Roster</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader className="bg-grindzone-darker">
                        <TableRow>
                          <TableHead>Player Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Join Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedSquad.roster.map((player, index) => (
                          <TableRow key={index} className="hover:bg-grindzone-blue/5">
                            <TableCell className="font-medium">{player.name}</TableCell>
                            <TableCell>{player.role}</TableCell>
                            <TableCell>{player.joinDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadPage;
