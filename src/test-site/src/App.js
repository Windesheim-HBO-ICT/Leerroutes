import './App.css';
import { LeerrouteWorkspace } from 'leerroutes'

function App() {
  const items = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
  ];

  return (
    <div className="App">
      <LeerrouteWorkspace items={items} />
    </div>
  );
}

export default App;
