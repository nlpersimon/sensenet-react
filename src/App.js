import { Panel } from "./Layout";
import ReverseDictionary from "./ReverseDictionary";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/:q?">
        <main className="h-screen w-screen">
          <Panel>
            <ReverseDictionary />
          </Panel>
        </main>
      </Route>
    </Router>
  );
}

export default App;
