
import React from "react";
import Navbar from "@/components/navigation/Navbar";
import PageTitle from "@/components/ui/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Trophy, Medal } from "lucide-react";

const ProfilePage: React.FC = () => {
  // Mock user data
  const user = {
    id: "1",
    username: "PhantomSniper",
    avatarUrl: "/placeholder.svg",
    tier: "Professional",
    bio: "Professional Free Fire player. Team captain for Phantom Esports.",
    joinDate: "January 15, 2023",
    stats: {
      matchesPlayed: 237,
      wins: 162,
      winRate: "68.4%", 
      tournamentWins: 8,
      highestFinish: "1st Place - Free Fire Pro League"
    },
    badges: [
      { name: "Tournament Champion", description: "Won a professional tournament" },
      { name: "Sharpshooter", description: "Achieved 85%+ accuracy in 10+ matches" },
      { name: "Team Leader", description: "Captain of a professional squad" },
      { name: "MVP", description: "Earned MVP in 25+ matches" }
    ],
    recentMatches: [
      { opponent: "Elite Warriors", result: "Win", score: "3-1", date: "Apr 28, 2025" },
      { opponent: "Nova Esports", result: "Win", score: "3-0", date: "Apr 25, 2025" },
      { opponent: "Team Liquid", result: "Loss", score: "1-3", date: "Apr 20, 2025" },
      { opponent: "Apex Predators", result: "Win", score: "3-2", date: "Apr 15, 2025" },
    ]
  };

  return (
    <div className="min-h-screen bg-grindzone-dark">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-grindzone-card overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-grindzone-blue-dark to-grindzone-blue"></div>
              <CardContent className="-mt-16 relative">
                <div className="h-32 w-32 rounded-full border-4 border-grindzone-card bg-grindzone-darker flex items-center justify-center mx-auto mb-4 relative">
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.username} 
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <span className="text-4xl font-bold">{user.username.charAt(0)}</span>
                  )}
                  <div className="absolute bottom-0 right-0 bg-grindzone-blue rounded-full h-8 w-8 flex items-center justify-center border-2 border-grindzone-card">
                    <Shield size={16} />
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold">{user.username}</h2>
                  <div className="flex items-center justify-center mt-1">
                    <span className="bg-grindzone-blue text-white text-xs px-2 py-1 rounded-full">
                      {user.tier}
                    </span>
                  </div>
                  <p className="mt-4 text-muted-foreground">{user.bio}</p>
                  <p className="text-xs text-muted-foreground mt-4">Member since {user.joinDate}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-grindzone-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy size={18} />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.badges.map((badge, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-grindzone-darker flex items-center justify-center mr-3 mt-1">
                        <Medal size={16} className="text-grindzone-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{badge.name}</h4>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="statistics" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
                <TabsTrigger value="matches">Recent Matches</TabsTrigger>
                <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="statistics">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-grindzone-card">
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">Matches Played</div>
                      <div className="text-2xl font-bold">{user.stats.matchesPlayed}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-grindzone-card">
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">Wins</div>
                      <div className="text-2xl font-bold text-grindzone-blue">{user.stats.wins}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-grindzone-card">
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">Win Rate</div>
                      <div className="text-2xl font-bold">{user.stats.winRate}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-grindzone-card">
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">Tournament Wins</div>
                      <div className="text-2xl font-bold text-grindzone-blue">{user.stats.tournamentWins}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-grindzone-card md:col-span-2">
                    <CardContent className="p-4">
                      <div className="text-muted-foreground text-sm mb-1">Highest Tournament Finish</div>
                      <div className="text-xl font-bold">{user.stats.highestFinish}</div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-grindzone-card">
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">Performance chart will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="matches">
                <Card className="bg-grindzone-card">
                  <CardHeader>
                    <CardTitle>Recent Matches</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.recentMatches.map((match, index) => (
                        <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold">vs {match.opponent}</div>
                              <div className="text-xs text-muted-foreground">{match.date}</div>
                            </div>
                            <div className="flex items-center">
                              <div className={`mr-3 font-semibold ${match.result === 'Win' ? 'text-green-500' : 'text-red-500'}`}>
                                {match.result}
                              </div>
                              <div className="bg-grindzone-darker px-3 py-1 rounded text-sm">
                                {match.score}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tournaments">
                <Card className="bg-grindzone-card">
                  <CardHeader>
                    <CardTitle>Tournament History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-8">Tournament history will be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
