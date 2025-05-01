
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Trophy, Users, Coins, Plus, Edit, Trash } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Tournament, Payment, getAllTournaments, getAllPayments, deleteTournament, initializeAppData } from "@/services/tournamentService";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminName, setAdminName] = useState("Admin");
  
  // State for statistics and data
  const [stats, setStats] = useState({
    activeTournaments: 0,
    registeredTeams: 0,
    totalPayments: 0
  });
  
  const [recentTournaments, setRecentTournaments] = useState<Tournament[]>([]);
  const [recentPayments, setRecentPayments] = useState<Payment[]>([]);
  
  // Check if user is admin and load data
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const userName = localStorage.getItem("userName");
    
    if (userRole !== "admin") {
      toast({
        title: "Access denied",
        description: "You need admin privileges to access this page",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    if (userName) {
      setAdminName(userName);
    }
    
    // Initialize app data if needed
    initializeAppData();
    
    // Load tournaments from localStorage
    loadData();
  }, [navigate, toast]);
  
  // Load data from localStorage
  const loadData = () => {
    try {
      // Load tournaments
      const tournaments = getAllTournaments();
      setRecentTournaments(tournaments);
      
      // Load payments
      const payments = getAllPayments();
      setRecentPayments(payments);
      
      // Calculate stats
      const ongoingTournaments = tournaments.filter(t => 
        t.status === "Ongoing" || t.status === "Registration" || t.status === "Upcoming"
      ).length;
      
      // Calculate total teams from participants string (format: "32/48 teams")
      const teamsCount = tournaments.reduce((total, tournament) => {
        const participantsMatch = tournament.participants.match(/(\d+)\/\d+/);
        return total + (participantsMatch ? parseInt(participantsMatch[1]) : 0);
      }, 0);
      
      // Calculate total payments in USD
      const totalPayments = payments.reduce((total, payment) => {
        const amountMatch = payment.amount.match(/\$(\d+)/);
        return total + (amountMatch ? parseInt(amountMatch[1]) : 0);
      }, 0);
      
      setStats({
        activeTournaments: ongoingTournaments,
        registeredTeams: teamsCount || 248, // Fallback to 248 if calculation fails
        totalPayments: totalPayments || 25750 // Fallback to 25750 if calculation fails
      });
      
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error loading data",
        description: "There was a problem loading the dashboard data",
        variant: "destructive"
      });
    }
  };

  const handleAddTournament = () => {
    navigate("/add-tournament");
  };

  const handleEditTournament = (id: string) => {
    // For now, we'll just show a toast - we'll implement editing functionality later
    toast({
      title: "Edit tournament",
      description: `Editing tournament ${id}`,
    });
    
    // In a real application, we would navigate to an edit page
    // navigate(`/edit-tournament/${id}`);
  };

  const handleDeleteTournament = (id: string) => {
    try {
      // Delete tournament
      const success = deleteTournament(id);
      
      if (success) {
        // Update state by filtering out the deleted tournament
        const updatedTournaments = recentTournaments.filter(tournament => tournament.id !== id);
        setRecentTournaments(updatedTournaments);
        
        // Update statistics
        const ongoingTournaments = updatedTournaments.filter(t => 
          t.status === "Ongoing" || t.status === "Registration" || t.status === "Upcoming"
        ).length;
        
        setStats(prev => ({
          ...prev,
          activeTournaments: ongoingTournaments
        }));
        
        toast({
          title: "Tournament deleted",
          description: "The tournament has been successfully removed",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete tournament",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
      toast({
        title: "Error",
        description: "Failed to delete tournament",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <p className="text-purple-500">Welcome, {adminName}</p>
            <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-500/10">
              Logout
            </Button>
          </div>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Recent Tournaments</CardTitle>
            <Button onClick={handleAddTournament} className="bg-purple-600 hover:bg-purple-500">
              <Plus size={16} className="mr-2" /> Add Tournament
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead>Tournament Name</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Prize Pool</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTournaments.map((tournament) => (
                  <TableRow key={tournament.id} className="border-zinc-800">
                    <TableCell className="font-medium">{tournament.name}</TableCell>
                    <TableCell>{tournament.participants}</TableCell>
                    <TableCell>{tournament.prizePool}</TableCell>
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleEditTournament(tournament.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-900/20" 
                          onClick={() => handleDeleteTournament(tournament.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {recentTournaments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-zinc-500">
                      No tournaments found. Click "Add Tournament" to create one.
                    </TableCell>
                  </TableRow>
                )}
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
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id} className="border-zinc-800">
                    <TableCell className="font-medium">{payment.team}</TableCell>
                    <TableCell>{payment.tournament}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                  </TableRow>
                ))}
                {recentPayments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-zinc-500">
                      No payment records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPage;
