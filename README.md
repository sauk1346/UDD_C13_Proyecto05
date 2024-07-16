

# Creación proyecto

## 1. Crear proyecto con vite
- Se crea proyecto llamado  `proyecto05`

```sh
npm create vite@latest premios-nobel --template react
```

## 2. Instalar dependencias
- Ir a `premios-nobel` e instalar dependencias necesarias

```sh
cd premios-nobel
npm install
```

## 3. Instalar React Router

```sh
npm install react-router-dom
```

## 4. Configuración Inicial

- Se realiza la siguiente jerarquía de archivos para poder orientarse mejor en el diseño del proyecto y sus componentes.

```
premios-nobel/
├── public/
├── src/
│   ├── components/
│   │   ├── NobelList.jsx
│   │   ├── NobelDetail.jsx
│   │   ├── Header.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── package.json
├── vite.config.js
```

## 5. Crear Componentes

Se crean los siguiente componentes según la configuración inicial: `Header.jsx`, `NobelList.jsx`, `NobelDetail.jsc`, 

### `Header.jsx`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/nobel">Nobel Prizes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
```

### `NobelList.jsx`

```jsx
import React, { useState, useEffect } from 'react';

const NobelList = () => {
  const [nobelPrizes, setNobelPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.nobelprize.org/v1/prize.json')
      .then(response => response.json())
      .then(data => {
        setNobelPrizes(data.prizes);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching the Nobel Prizes:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Nobel Prizes</h1>
      <ul>
        {nobelPrizes.map((prize, index) => (
          <li key={index}>
            {prize.year} - {prize.category} - {prize.laureates.map(laureate => laureate.firstname + ' ' + laureate.surname).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NobelList;
```

### `NobelDetail.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const NobelDetail = () => {
  const { id } = useParams();
  const [nobelLaureate, setNobelLaureate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.nobelprize.org/v1/laureate/${id}.json`)
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
```