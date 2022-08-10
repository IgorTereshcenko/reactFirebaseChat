import './chat.scss';
import { useState } from 'react';
import { collection, addDoc, query,orderBy, serverTimestamp } from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import { useCollectionData} from "react-firebase-hooks/firestore";
import { db } from '../../firebaseConfig';
import { auth } from '../../firebaseConfig';
import Loader from '../loader/Loader';
import MemoMessage from '../message/Message';

const Chat = () => {

    let [user] = useAuthState(auth);
    const messagesColection = collection(db, "messages");
    const queryMessages = query(messagesColection, orderBy("createdAt"));
    const [messages, loading] = query(useCollectionData(queryMessages, orderBy('createdAt')));
    const [value, setValue] = useState('');
 
    const sendMessage = async () => {
        await addDoc(messagesColection, {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: serverTimestamp(),
    });
    
        setValue('');
    }
    
    if (loading) {
        return <Loader/>
    }

    const onKeyPressed = (e) => {
        if (e.key === 'Enter' && value.length > 0) {
            sendMessage();
        }
    } 

    return (
        <div className="chat">
             <div className="chat__btnWrapper">
                <button onClick={() => auth.signOut()} className="chat__exit">Выйти</button> 
            </div>
            
                <div className="chat__messages">
                    <MemoMessage messages = {messages}/>
                </div>   
        
            <div className="chat__typing">
                {value ? `${user.displayName} набирает сообщение...` : null}
            </div>

            <div className="chat__textareaWrapper">
                <textarea
                    wrap='soft' 
                    type="text" 
                    className="chat__input"
                    value={value}
                    onChange = {e => setValue(e.target.value)}
                    onKeyDown = {onKeyPressed}
                    />
                <button onClick={sendMessage} className={value.length > 0 ? "chat__btn" : "chat__btn chat__btn_none"}>отправить</button>
            </div>     
        </div>
    )
    
}

export default Chat;