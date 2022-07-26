import './chat.scss';
import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { collection, addDoc, query,orderBy, serverTimestamp } from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import { useCollectionData} from "react-firebase-hooks/firestore";
import { getAuth } from 'firebase/auth'; 
import { db } from '../..';



const Chat = () => {

    const auth = getAuth();
    const [user] = useAuthState(auth);
    const messagesColection = collection(db, "messages")
    const queryMessages = query(messagesColection, orderBy("createdAt"));
    const [messages, loading] = query(useCollectionData(queryMessages, orderBy('createdAt')))
    const [value, setValue] = useState('')
    const [img, setImg] = useState('')
    const [viewImg, setViewImg] = useState('')
    console.log(viewImg)
    const storage = getStorage()
    const storageRef = ref(storage, `newfolder/${img}`);
     
    const sendMessage = async () => {
          await addDoc(messagesColection, {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: serverTimestamp(),
                img,
                viewImg
        });
        
        /* uploadBytes(storageRef)
            .then(getDownloadURL(storageRef))
            .then((url) => {
                console.log(url);
                setViewImg(url)
            }); */

        setValue('');
    }

    if (loading) {
        return <h2>загрузка</h2>
    }

    const onKeyPressed = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <div className="chat">
            <button onClick={() => auth.signOut()} className="chat__exit">Выйти</button>
            <div className="chat__messages">
                {messages.map(item => {
                    return (
                        <div className={user.uid === item.uid ? 'chat__message chat__message_right' : 'chat__message'}>
                            <div className="chat__namePhotoWrapper">
                                <div className="chat__name">{item.displayName}</div>
                                <img src={item.photoURL} alt={item.photoURL} className="chat__photo" />
                            </div>
                            <div className={user.uid === item.uid ? 'chat__text chat__text_right' : 'chat__text'}>{item.text}</div>
                           {/*  <img src={item.viewImg} alt="" className="chat__file" /> */}
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
           {/*  <input 
                type="file" 
                className="chat__file"
                value={img}
                onChange={e => setImg(e.target.value)}/> */}
            <button onClick={sendMessage} className="chat__btn">отправить</button>
            
        </div>
    )
}

export default Chat;