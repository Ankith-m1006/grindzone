
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Trophy, Users, Coins } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";

const AdminPage: React.FC = () => {
  // Mock data for admin dashboard
  const stats = {
    activeTournaments: 12,
    registeredTeams: 248,
    totalPayments: 25750,
    recentTournaments: [
      { id: "t1", name: "FreeFire Champions Cup", teams: 32, prize: "$5,000", status: "Ongoing" },
      { id: "t2", name: "PUBG Mobile Invitational", teams: 48, prize: "$8,000", status: "Upcoming" },
      { id: "t3", name: "Valorant Pro League", teams: 16, prize: "$3,000", status: "Completed" },
      { id: "t4", name: "COD Mobile Showdown", teams: 24, prize: "$4,500", status: "Registration" },
    ],
    recentPayments: [
      { id: "p1", team: "Phoenix Esports", tournament: "FreeFire Cup", amount: "$250", date: "2025-04-25" },
      { id: "p2", team: "Viper Gaming", tournament: "PUBG Mobile", amount: "$300", date: "2025-04-24" },
      { id: "p3", team: "DarkKnights", tournament: "Valorant Pro", amount: "$200", date: "2025-04-23" },
      { id: "p4", team: "Elite Squad", tournament: "COD Mobile", amount: "$250", date: "2025-04-22" },
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-purple-500">Welcome, Chandan</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="flex items-center p-6">
              <div className="bg-purple-900/30 p-4 rounded-full mr-4">
                <Trophy size={24} className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Active Tournaments</p>
                <h3 className="text-2xl font-bold">{stats.activeTournaments}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="flex items-center p-6">
              <div className="bg-purple-900/30 p-4 rounded-full mr-4">
                <Users size={24} className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Registered Teams</p>
                <h3 className="text-2xl font-bold">{stats.registeredTeams}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="flex items-center p-6">
              <div className="bg-purple-900/30 p-4 rounded-full mr-4">
                <Coins size={24} className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Payments</p>
                <h3 className="text-2xl font-bold">${stats.totalPayments}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tournaments Table */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Recent Tournaments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead>Tournament Name</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Prize Pool</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentTournaments.map((tournament) => (
                  <TableRow key={tournament.id} className="border-zinc-800">
                    <TableCell className="font-medium">{tournament.name}</TableCell>
                    <TableCell>{tournament.teams}</TableCell>
                    <TableCell>{tournament.prize}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        tournament.status === "Ongoing" ? "bg-green-500/20 text-green-400" :
                        tournament.status === "Upcoming" ? "bg-blue-500/20 text-blue-400" :
                        tournament.status === "Registration" ? "bg-purple-500/20 text-purple-400" :
                        "bg-zinc-500/20 text-zinc-400"
                      }`}>
                        {tournament.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Payments Table */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-xl">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead>Team</TableHead>
                  <TableHead>Tournament</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentPayments.map((payment) => (
                  <TableRow key={payment.id} className="border-zinc-800">
                    <TableCell className="font-medium">{payment.team}</TableCell>
                    <TableCell>{payment.tournament}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPage;
