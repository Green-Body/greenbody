import './App.css';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MyPage from './pages/MyPage';
import MyLogPage from './pages/MyLogPage';
import CommunityPage from './pages/CommunityPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/join" component={JoinPage}/>
        <Route path="/myPage" component={MyPage}/>
        <Route path="/myLog" component={MyLogPage}/>
        <Route path="/community" component={CommunityPage}/>
    </Router>
  );
}

export default App;