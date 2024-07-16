import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NobelDetail = () => {
  const { id } = useParams();
  const [nobelLaureate, setNobelLaureate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.nobelprize.org/v1/laureate.json?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log('API response',data);//verificar datos entregados por api
        if (data.laureates && data.laureates.length > 0) {
          setNobelLaureate(data.laureates[0]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the Nobel Prize details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!nobelLaureate) {
    return <div>No details available</div>;
  }

  return (
    <div>
      <br/>
      <br/>
      <h2>{nobelLaureate.firstname} {nobelLaureate.surname}</h2>
      <p><strong>Born:</strong> {nobelLaureate.born || 'N/A'}</p>
      <p><strong>Died:</strong> {nobelLaureate.died || 'N/A'}</p>
      <h3>Prizes:</h3>
      <ul>
        {nobelLaureate.prizes.map(prize => (
          <li key={prize.year + prize.category}>
            {prize.year} - {prize.category} - {prize.motivation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NobelDetail;