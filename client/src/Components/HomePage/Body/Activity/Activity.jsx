import React, { useState, useEffect } from "react";
import "./Activity.scss";
import img1 from "../../../../Assets/Video Projects/a52.jpg";
import GameList from "./GameList/GameList";

const ListGame = () => {
  const [gamesData, setGamesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataFromMongoDB();
  }, []);

  const fetchDataFromMongoDB = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/getdata");
      if (response.ok) {
        const data = await response.json();
        setGamesData(data);
        setIsLoading(false);
      } else {
        console.log("Error fetching data from MongoDB");
      }
    } catch (error) {
      console.log("Error fetching data from MongoDB:", error);
    }
  };
  useEffect(() => {
    console.log(gamesData);
  }, [gamesData]);
  const name = "Game-X";
  const description = "aaaa";

  return (
    <div className="Body flex">
      <ul className="GameBoxes grid">
        {isLoading ? (
          <p>Loading...</p>
        ) : gamesData && gamesData.gameData.length > 0 ? (
          gamesData.gameData.map((game) => <GameList key={game.id} gameName={game.name} />)
        ) : (
          <p>No games available</p>
        )}
        <GameList key="default-game" imgSrc={img1} gameName={name} description={description} />
        <GameList key="default-game" imgSrc={img1} gameName={name} description={description} />
        <GameList key="default-game" imgSrc={img1} gameName={name} description={description} />
      </ul>
    </div>
  );
};

export default ListGame;