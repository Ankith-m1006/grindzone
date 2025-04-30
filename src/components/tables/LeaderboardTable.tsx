
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TeamData = {
  rank: number;
  teamName: string;
  teamLogo?: string;
  wins: number;
  losses: number;
  winPercentage: string;
  tier: string;
  region: string;
  game: string;
};

interface LeaderboardTableProps {
  data: TeamData[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden border border-border rounded-lg">
      <Table>
        <TableHeader className="bg-grindzone-darker">
          <TableRow>
            <TableHead className="text-center w-12">Rank</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-center">Wins</TableHead>
            <TableHead className="text-center">Losses</TableHead>
            <TableHead className="text-center">Win %</TableHead>
            <TableHead className="hidden md:table-cell">Tier</TableHead>
            <TableHead className="hidden md:table-cell">Region</TableHead>
            <TableHead className="hidden md:table-cell">Game</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((team) => (
            <TableRow key={team.rank} className="hover:bg-grindzone-blue/5">
              <TableCell className="text-center font-medium">
                <div className="w-8 h-8 rounded-full bg-grindzone-darker border border-border flex items-center justify-center mx-auto">
                  {team.rank}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  {team.teamLogo ? (
                    <img
                      src={team.teamLogo}
                      alt={team.teamName}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-grindzone-blue/20 flex items-center justify-center">
                      {team.teamName.charAt(0)}
                    </div>
                  )}
                  <span className="font-medium">{team.teamName}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">{team.wins}</TableCell>
              <TableCell className="text-center">{team.losses}</TableCell>
              <TableCell className="text-center">{team.winPercentage}</TableCell>
              <TableCell className="hidden md:table-cell">{team.tier}</TableCell>
              <TableCell className="hidden md:table-cell">{team.region}</TableCell>
              <TableCell className="hidden md:table-cell">{team.game}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
