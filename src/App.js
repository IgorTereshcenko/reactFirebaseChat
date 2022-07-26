import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import { getAuth } from 'firebase/auth';
import {useAuthState} from "react-firebase-hooks/auth";

const App = () => {

    const auth = getAuth();
    const [user] = useAuthState(auth);

    return (
        user ? <Chat/> : <Login/>
    )
      
}

export default App;