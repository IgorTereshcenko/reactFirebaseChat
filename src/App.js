import { getAuth } from 'firebase/auth';
import {useAuthState} from "react-firebase-hooks/auth";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Chat from './components/chat/Chat';
import Login from './components/login/Login';

const App = () => {

    const auth = getAuth();
    const [user] = useAuthState(auth);

    return (
        <Router>
           <Routes>
                <Route path="/" element={user ? <Chat /> : <Login />} />
           </Routes>
        </Router>
    )
      
}

export default App;