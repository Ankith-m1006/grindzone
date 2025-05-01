
/**
 * Tournament Service
 * Provides utility functions for managing tournament data across the application
 */

export interface Tournament {
  id: string;
  name: string;
  game: string;
  date: string;
  tier?: string;
  participants: string;
  image?: string;
  prizePool?: string;
  entryFee?: string;
  status?: string;
  description?: string;
  rules?: string | string[];
  isFull?: boolean;
}

export interface Payment {
  id: string;
  team: string;
  tournament: string;
  amount: string;
  date: string;
}

/**
 * Get all tournaments from localStorage
 */
export const getAllTournaments = (): Tournament[] => {
  try {
    const storedTournaments = localStorage.getItem("tournaments");
    if (storedTournaments) {
      return JSON.parse(storedTournaments);
    }
    return [];
  } catch (error) {
    console.error("Error getting tournaments:", error);
    return [];
  }
};

/**
 * Get a specific tournament by ID
 */
export const getTournamentById = (id: string): Tournament | null => {
  try {
    const tournaments = getAllTournaments();
    return tournaments.find(tournament => tournament.id === id) || null;
  } catch (error) {
    console.error("Error getting tournament by ID:", error);
    return null;
  }
};

/**
 * Save tournaments to localStorage
 */
export const saveTournaments = (tournaments: Tournament[]): void => {
  try {
    localStorage.setItem("tournaments", JSON.stringify(tournaments));
  } catch (error) {
    console.error("Error saving tournaments:", error);
  }
};

/**
 * Add a new tournament
 */
export const addTournament = (tournament: Tournament): void => {
  try {
    const tournaments = getAllTournaments();
    tournaments.unshift(tournament); // Add to beginning of array
    saveTournaments(tournaments);
  } catch (error) {
    console.error("Error adding tournament:", error);
  }
};

/**
 * Update an existing tournament
 */
export const updateTournament = (updatedTournament: Tournament): boolean => {
  try {
    const tournaments = getAllTournaments();
    const index = tournaments.findIndex(t => t.id === updatedTournament.id);
    
    if (index !== -1) {
      tournaments[index] = updatedTournament;
      saveTournaments(tournaments);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating tournament:", error);
    return false;
  }
};

/**
 * Delete a tournament by ID
 */
export const deleteTournament = (id: string): boolean => {
  try {
    const tournaments = getAllTournaments();
    const updatedTournaments = tournaments.filter(tournament => tournament.id !== id);
    
    if (updatedTournaments.length !== tournaments.length) {
      saveTournaments(updatedTournaments);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting tournament:", error);
    return false;
  }
};

/**
 * Determine tournament status based on date
 */
export const determineTournamentStatus = (dateString: string): string => {
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

/**
 * Check if a tournament is full
 */
export const isTournamentFull = (participants: string): boolean => {
  if (!participants) return false;
  
  const match = participants.match(/(\d+)\/(\d+)/);
  if (match && match.length >= 3) {
    const current = parseInt(match[1]);
    const max = parseInt(match[2]);
    return current >= max;
  }
  return false;
};

/**
 * Get all payments from localStorage
 */
export const getAllPayments = (): Payment[] => {
  try {
    const storedPayments = localStorage.getItem("payments");
    if (storedPayments) {
      return JSON.parse(storedPayments);
    }
    return [];
  } catch (error) {
    console.error("Error getting payments:", error);
    return [];
  }
};

/**
 * Add a new payment
 */
export const addPayment = (payment: Payment): void => {
  try {
    const payments = getAllPayments();
    payments.unshift(payment); // Add to beginning of array
    localStorage.setItem("payments", JSON.stringify(payments));
  } catch (error) {
    console.error("Error adding payment:", error);
  }
};

/**
 * Generate default tournaments if none exist
 */
export const generateDefaultTournaments = (): Tournament[] => {
  const defaultTournaments: Tournament[] = [
    {
      id: "t1",
      name: "FreeFire Champions Cup",
      game: "Free Fire",
      date: "2025-05-10",
      tier: "Professional",
      participants: "32/32 teams",
      prizePool: "$5,000",
      entryFee: "$50",
      status: "Ongoing",
      description: "Join the most prestigious Free Fire tournament in the region. Test your skills against the best teams and compete for the grand prize.",
      rules: "Teams must consist of 4 active players. All participants must be at least 16 years old. Double elimination format."
    },
    {
      id: "t2",
      name: "PUBG Mobile Invitational",
      game: "PUBG",
      date: "2025-05-20",
      tier: "Professional",
      participants: "48/48 teams",
      prizePool: "$8,000",
      entryFee: "$70",
      status: "Upcoming",
      description: "The PUBG Mobile Invitational brings together the best professional teams for an action-packed competition.",
      rules: "Teams must consist of 4 active players. Round-robin group stage followed by double elimination."
    },
    {
      id: "t3",
      name: "Valorant Pro League",
      game: "Valorant",
      date: "2025-04-15",
      tier: "Semi-Pro",
      participants: "16/16 teams",
      prizePool: "$3,000",
      entryFee: "$30",
      status: "Completed",
      description: "The Valorant Pro League featured intense tactical gameplay among the region's top semi-pro teams.",
      rules: "Teams must consist of 5 active players. Single elimination format with best-of-three semifinals and finals."
    },
    {
      id: "t4",
      name: "COD Mobile Showdown",
      game: "COD",
      date: "2025-05-05",
      tier: "Amateur",
      participants: "24/24 teams",
      prizePool: "$4,500",
      entryFee: "$40",
      status: "Registration",
      description: "The Call of Duty Mobile Showdown is perfect for amateur teams looking to make their mark in competitive gaming.",
      rules: "Teams must consist of 5 active players. All participants must be at least 14 years old. Single elimination format."
    }
  ];
  
  return defaultTournaments;
};

/**
 * Initialize the application with default data if needed
 */
export const initializeAppData = (): void => {
  // Initialize tournaments if none exist
  if (!localStorage.getItem("tournaments")) {
    const defaultTournaments = generateDefaultTournaments();
    saveTournaments(defaultTournaments);
  }
  
  // Initialize payments if none exist
  if (!localStorage.getItem("payments")) {
    const defaultPayments: Payment[] = [
      { id: "p1", team: "Phoenix Esports", tournament: "FreeFire Cup", amount: "$250", date: "2025-04-25" },
      { id: "p2", team: "Viper Gaming", tournament: "PUBG Mobile", amount: "$300", date: "2025-04-24" },
      { id: "p3", team: "DarkKnights", tournament: "Valorant Pro", amount: "$200", date: "2025-04-23" },
      { id: "p4", team: "Elite Squad", tournament: "COD Mobile", amount: "$250", date: "2025-04-22" },
    ];
    localStorage.setItem("payments", JSON.stringify(defaultPayments));
  }
};
