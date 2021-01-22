
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Chat from './components/Chats/Chat'
import Login from './components/login/Login'
import ChatDetails from './components/Chats/ChatDetails'

function App() {
  return (
    <div>
      <BrowserRouter><Switch>
      <Route exact path ="/" component={Login} />
        <Route exact path="/chats" component={Chat} />
        <Route exact path="/chat" component={ChatDetails} />
      </Switch></BrowserRouter>
    </div>
  );
}

export default App;
