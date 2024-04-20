import './App.css';
import { LeerrouteWorkspace } from 'leerroutes'

function App() {
  const items = [
    { id: 1, title: 'Item 1', relatedItemIds: [2] },
    { id: 2, title: 'Item 2', relatedItemIds: [3] },
    { id: 3, title: 'Item 3', relatedItemIds: [] },
  ];

  return (
    <div className="App">
      <LeerrouteWorkspace items={items} />
    </div>
  );
}

export default App;
