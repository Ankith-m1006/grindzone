
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeaderboardFiltersProps {
  onFilterChange: (filter: string, value: string) => void;
  selectedGame: string;
  selectedRegion: string;
  selectedTier: string;
}

const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  onFilterChange,
  selectedGame,
  selectedRegion,
  selectedTier,
}) => {
  const games = [
    { value: "all", label: "All Games" },
    { value: "freeFire", label: "Free Fire" },
    { value: "pubgMobile", label: "PUBG Mobile" },
    { value: "valorant", label: "Valorant" },
    { value: "apexLegends", label: "Apex Legends" },
  ];

  const regions = [
    { value: "all", label: "All Regions" },
    { value: "global", label: "Global" },
    { value: "na", label: "NA" },
    { value: "eu", label: "EU" },
    { value: "apac", label: "APAC" },
  ];

  const tiers = [
    { value: "all", label: "All Tiers" },
    { value: "professional", label: "Professional" },
    { value: "semiPro", label: "Semi-Pro" },
    { value: "amateur", label: "Amateur" },
    { value: "rookie", label: "Rookie" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Select
        value={selectedGame}
        onValueChange={(value) => onFilterChange("game", value)}
      >
        <SelectTrigger className="bg-grindzone-darker border-border">
          <SelectValue placeholder="Select Game" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Games</SelectLabel>
            {games.map((game) => (
              <SelectItem key={game.value} value={game.value}>
                {game.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={selectedRegion}
        onValueChange={(value) => onFilterChange("region", value)}
      >
        <SelectTrigger className="bg-grindzone-darker border-border">
          <SelectValue placeholder="Select Region" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Regions</SelectLabel>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={selectedTier}
        onValueChange={(value) => onFilterChange("tier", value)}
      >
        <SelectTrigger className="bg-grindzone-darker border-border">
          <SelectValue placeholder="Select Tier" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tiers</SelectLabel>
            {tiers.map((tier) => (
              <SelectItem key={tier.value} value={tier.value}>
                {tier.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeaderboardFilters;
