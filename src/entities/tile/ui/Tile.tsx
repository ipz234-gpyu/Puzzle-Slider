import React from "react";
import "../styles/Tile.css";

interface TileProps {
    number: number;
}

export const Tile: React.FC<TileProps> = ({ number }) => {
    return (
        <div className="tile">
            {number}
        </div>
    );
};