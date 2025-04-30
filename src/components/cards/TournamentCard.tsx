
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";

interface TournamentCardProps {
  id: string;
  name: string;
  game: string;
  date: string;
  tier: string;
  participants: string;
  image?: string;
  isFull?: boolean;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  id,
  name,
  game,
  date,
  tier,
  participants,
  image,
  isFull = false
}) => {
  const navigate = useNavigate();
  
  const handleTournamentClick = () => {
    navigate(`/tournaments/${id}`);
  };
  
  return (
    <div className="bg-grindzone-card rounded-xl overflow-hidden card-glow border border-border">
      <div className="bg-indigo-500/30 h-32 flex items-center justify-center p-6">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={game} 
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="text-2xl font-bold text-white">{game.substring(0, 2)}</div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{game}</p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <CalendarIcon size={16} className="mr-1" />
          <span>{date}</span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs bg-grindzone-darker px-3 py-1 rounded-full border border-border">
            {tier}
          </span>
          <span className="text-xs text-muted-foreground">
            {participants}
          </span>
        </div>
        
        {isFull ? (
          <Button disabled className="w-full bg-gray-600 hover:bg-gray-600 cursor-not-allowed">
            Full
          </Button>
        ) : (
          <Button 
            className="w-full bg-grindzone-blue hover:bg-grindzone-blue-light"
            onClick={handleTournamentClick}
          >
            Join Tournament
          </Button>
        )}
      </div>
    </div>
  );
};

export default TournamentCard;
