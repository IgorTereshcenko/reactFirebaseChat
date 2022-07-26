import './login.scss';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Login = () => {

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const {user} = await signInWithPopup(auth, provider)
        console.log(user);
    }
    
    return (
        <div className="login">
            <div className="login__wrapper">
                <button onClick={signIn} className="login__btn">
                    Войти через Google
                </button>
            </div>
            
        </div>
    )
}

export default Login;