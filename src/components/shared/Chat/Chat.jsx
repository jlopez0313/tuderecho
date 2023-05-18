import React, { useEffect, useRef, useState } from 'react'
import styles from './Chat.module.scss';
import { ChatFooter } from './ChatFooter';
import { ChatBody } from './ChatBody';
import { ChatHeader } from './ChatHeader';
import { allMessages } from '@/services/Messages';

export const Chat = ({ socket, user, chat, onHideChat }) => {
    
    const lastMessageRef = useRef(null);

    
    const [headerStyles, setHeaderStyles] = useState({ background: 'bg-danger', textColor: 'text-white' });
    const [messages, setMessages] = useState([]);
    const [minimize, setMinimize] = useState(false);
    
    const [typingStatus, setTypingStatus] = useState('');

    const getMessages = async () => {
        const list = await allMessages( chat.room );
        if ( list ) {
            setMessages( list )
        }
    }

    const onMinimizeChat = (minimize) => {
        if ( !minimize) {
            const timer = setTimeout( () => {
                goToBottom();
            }, 200)

            // clearTimeout(timer)
        }

        setMinimize(minimize)
    }

    useEffect(() => {
        socket.on('getMessage', (data) => {
            const { room } =  data ;
            if ( room === chat.room ) {
                setMessages([...messages, data])
            }
        });
    }, [socket, messages]);

    useEffect(() => {
        socket.on('typingResponse', (data) => {
            const { room } =  data ;
            if ( room === chat.room ) {
                setTypingStatus(data.text)
            }
        });
    }, [socket]);

    const changeHeaderStyles = () => {

        setHeaderStyles( { background: 'bg-outline-danger', textColor: 'text-dark' } )

        const timer = setTimeout( () => {
            setHeaderStyles( { background: 'bg-danger', textColor: 'text-white' } )
        }, 500)
        
        // clearTimeout(timer)
    }

    const goToBottom = () => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        if ( minimize ) {
            changeHeaderStyles();
            const timer = setTimeout(()=> {
                changeHeaderStyles();
            }, 1000)

            // clearTimeout(timer)
        } else {
            goToBottom();
        }
      }, [messages]);

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <div className={`${styles.chat} border rounded-top`}>
            <ChatHeader
                recipient={chat.user}
                minimize={minimize}
                headerStyles={headerStyles}
                onHideChat={onHideChat}
                onMinimizeChat={onMinimizeChat}
            />
            {
                minimize
                ? null 
                :
                    <>
                        <ChatBody
                            user={user} 
                            messages={messages}
                            typingStatus={typingStatus}
                            lastMessageRef={lastMessageRef}
                        />
                        <ChatFooter
                            chat={chat}
                            user={user}
                            socket={socket}
                        />
                    </>
            }
            
        </div>
    )
}
