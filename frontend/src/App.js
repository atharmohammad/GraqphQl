import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import AuthPage from "./Pages/AuthPage";
import BookingsPage from "./Pages/BookingPage"
import Navbar from "./Components/Navbar/Navbar"
import EventsPage from "./Pages/EventsPage"

function App() {
  return (
    <BrowserRouter>
    <>
      <Navbar/>
        <main style={{margin:"4rem 2.5rem"}}>
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} exact />
            <Route path="/bookings" component={BookingsPage} exact />
            <Route path="/events" component={EventsPage} exact />
          </Switch>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
