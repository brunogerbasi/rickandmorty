
import React from "react";
import { Card } from "../Card/Card";
import { Info } from "../Info/Info";
import { Avatar } from "../Avatar/Avatar";

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: string;
  image: string;
}

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const statusColor =
    character.status === "Alive"
      ? "bg-green-100 text-green-800"
      : character.status === "Dead"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <Card className="p-4 flex flex-col items-center text-center">
      <Avatar src={character.image} alt={character.name} size={100} />
      <h2 className="mt-3 text-lg font-semibold">{character.name}</h2>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Info label={character.status} colorClass={statusColor} />
        <Info label={character.species} />
        <Info label={character.gender} />
      </div>
    </Card>
  );
};
