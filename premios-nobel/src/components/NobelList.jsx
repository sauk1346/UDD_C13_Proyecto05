import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NobelList = () => {
  const [nobelPrizes, setNobelPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomPrize, setRandomPrize] = useState(null);

  useEffect(() => {
    fetch('https://api.nobelprize.org/v1/prize.json')
      .then(response => response.json())
      .then(data => {
        setNobelPrizes(data.prizes);
        setLoading(false);
        getRandomPrize(data.prizes);
      })
      .catch(error => console.error('Error fetching the Nobel Prizes:', error));
  }, []);

  const getRandomPrize = (prizes) => {
    const randomIndex = Math.floor(Math.random() * prizes.length);
    setRandomPrize(prizes[randomIndex]);
  };

  const handleRandomPrize = () => {
    getRandomPrize(nobelPrizes);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Nobel Prizes</h1>
      {randomPrize && (
        <div>
          <h2>{randomPrize.year} - {randomPrize.category}</h2>
          <ul>
            {randomPrize.laureates.map(laureate => (
              <li key={laureate.id}>
                <Link to={`/nobel/${laureate.id}`}>
                  {laureate.firstname} {laureate.surname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleRandomPrize}>Show Random Prize</button>
    </div>
  );
};

export default NobelList;