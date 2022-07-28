import './chat.scss';
import { useState } from 'react';
import { collection, addDoc, query,orderBy, serverTimestamp } from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import { useCollectionData} from "react-firebase-hooks/firestore";
import { db } from '../../firebaseConfig';
import { auth } from '../../firebaseConfig';
import Loader from '../loader/Loader';

const Chat = () => {

    let [user] = useAuthState(auth);
    const messagesColection = collection(db, "messages")
    const queryMessages = query(messagesColection, orderBy("createdAt"));
    const [messages, loading] = query(useCollectionData(queryMessages, orderBy('createdAt')))
    const [value, setValue] = useState('')
    
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
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <div className="chat">
            <div className="chat__btnWrapper">
                    <button onClick={() => auth.signOut()} className="chat__exit">Выйти</button> 
                </div>
            <div className="chat__messages">
                {messages.map(item => {
                    return (
                        <div className={user.uid === item.uid ? 'chat__message chat__message_right' : 'chat__message'}>
                            <div className="chat__namePhotoWrapper">
                                <div className="chat__name">{item.displayName}</div>
                                <img src={item.photoURL} alt={item.photoURL} className="chat__photo" />
                            </div>
                            <div className={user.uid === item.uid ? 'chat__text chat__text_right' : 'chat__text'}>{item.text}</div> 
                        </div> 
                    )   
                })}              
            </div>   
            <div className="chat__typing">
                {value ? `${user.displayName} набирает сообщение...` : null}
            </div>
            <input 
                type="text" 
                className="chat__input"
                value={value}
                onChange = {e => setValue(e.target.value)}
                onKeyDown = {onKeyPressed}
                />
            <button onClick={sendMessage} className="chat__btn">отправить</button>
              
        </div>
    )
}

export default Chat;