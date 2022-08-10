import { auth } from '../../firebaseConfig';
import {useAuthState} from "react-firebase-hooks/auth";
import React from 'react';

const Message = ({messages}) => {

    let [user] = useAuthState(auth);
    console.log('render');
    
    return (
        <>
            {messages.map(item => {
                return (
                    <div className={user.uid === item.uid ? 'chat__message chat__message_right' : 'chat__message'}>
                        <div className="chat__namePhotoWrapper">
                            <div className="chat__name">{item.displayName}</div>
                        <img src={item.photoURL} alt={item.photoURL} className="chat__photo"/>
                        </div>
                        <div className={user.uid === item.uid ? 'chat__text chat__text_right' : 'chat__text'}>{item.text}</div> 
                    </div> 
                )   
             })}   
        </>
    )
}

const MemoMessage = React.memo(Message);

export default MemoMessage;