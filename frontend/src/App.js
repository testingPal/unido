import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Ordenes from './components/ordenes/Ordenes.jsx';
import Platos from './components/platos/Platos.jsx';
import Ventas from './components/ventas/Ventas.jsx';
import NoEncontrado from './components/noEncontrado/NoEncontrado.jsx';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/ordenes" component={Ordenes}></Route>
          <Route exact path="/ventas" component={Ventas}></Route>
          <Route exact path="/platos" component={Platos}></Route>
          <Route component={NoEncontrado}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
