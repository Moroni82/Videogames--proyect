import React from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import LandingPage from "../components/LandingPage";
import Home from "../components/Home";
import Create from "../components/Create";
import { GameDetails } from "../components/GameDetails";

function App() {
  return (
   <Switch>
     <Route exact path="/" component={LandingPage}/>
     <Route exact path="/home" component={Home}/>
     <Route exact path="/create" component={Create}/>
     <Route exact path="/detail/:id" render={({ match }) => {
       return <GameDetails id={match.params.id}/>
     }}/>
   </Switch>
  );
}

export default App;
