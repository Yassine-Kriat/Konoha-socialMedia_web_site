import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../components/AppContext';
import Conversation from '../components/Conversation';
import Messages from '../components/Messages';
import Navbar from '../components/Navbar';
import Login from './Login';
import {io} from "socket.io-client";
import { ContextParent } from '../Store';
import { ContextPage } from '../StoreForPage';


const Message = () => {
	const [pageState, setPageState] = useContext(ContextPage);
    const [conversations, setConversations] = useState([]);
    const [currentChat, SetCurrentChat] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [seeFriend, setSeeFriend] = useState(false);
    const socket = useRef();
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);
	const scrollRef = useRef();
	const [state, setState] = useContext(ContextParent);
    

	/*
	useEffect(() => {
		socket.current = io("ws://localhost:8900");
		socket.current.on("getMessage", (data)=> {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: data.now(),
			})
		})
	}, [socket]);
	*/
	

	useEffect(() => {
		arrivalMessage && 
			currentChat?.membres.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat, messages, state, pageState]);

	

	/*
	useEffect(() => {
		socket.current?.emit("addUser", userData._id);
		socket.current?.on("getUsers", (users)=>{
			console.log(users);
		})
 
	}, [socket, userData]);
	*/

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}conversation/${userData._id}`);
				setConversations(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		getConversations();
	}, [userData._id]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				
				if (pageState.conversation!==null) {
					SetCurrentChat(pageState.conversation)
					setSeeFriend(true)
					
				}
				const res = await axios.get(`${process.env.REACT_APP_API_URL}message/${currentChat?._id}`);
				setMessages(res.data);
				const friendId = currentChat.membres.find((m)=> m!==userData._id);
				const res2 = await axios.get(`${process.env.REACT_APP_API_URL}user/${friendId}`);
				setState(res2.data)
				pageState.conversation=null
				
				
			} catch (err) {
				console.log(err);
			}
		} 
		getMessages();
	}, [currentChat, userData, setState]);
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			"sender": userData._id,
			"text": newMessage,
			"ConversationId": currentChat._id
		};

		const receiverId = currentChat.membres.find(membre=>membre!==userData._id)
		/*socket.current.emit("sendMessage", {
			senderId: userData._id,
			receiverId: receiverId,
			text: newMessage,
		})*/
 
		try {
			const res = await axios.post(`${process.env.REACT_APP_API_URL}message/`, message);
			setMessages([...messages, res.data])
			setNewMessage("")
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		scrollRef.current?.scrollIntoView({behavior: 'smooth'})
	}, [messages]);

	//console.log(currentChat)
	//console.log(pageState)
	//console.log(state)

	

    return (
        <>
            {/*uid ? (*/}
                <>
                    {/*<Navbar />*/}
                    <section>
						<div class="gap gray-bg">
							<div class="container-fluid">
								<div class="row">
									<div class="col-lg-12">
										<div class="row" id="page-contents">
											<div class="col-lg-4">
												<aside class="sidebar static">
													<div class="widget stick-widget">
														<h4 class="widget-title">Discutions</h4>
														<ul class="followers scroll">
															{conversations.map((c) => {
																return (
																	<div onClick={()=>{SetCurrentChat(c); setSeeFriend(true)}} className='pseudo-li'>
																		<Conversation conversation={c} currentUser={userData}/>
																	</div>
																)
																
															})}
														</ul>
													</div>
												</aside>
											</div>
											
											<div class="col-lg-7">
												<div class="central-meta">
													<div class="messages">
														<div class="message-box">
															<div class="peoples-mesg-box" style={{width: "88%;"}}>
																	<div class="conversation-head">
																		{seeFriend===true &&
																			<>
																			<figure><img src={state.picture} alt=""/></figure>
																			<span>{state.name}</span>
																			</>
																		}
																	</div>
																	<ul class="chatting-area scroll1">
																		{messages.map((m)=>(
																			<div ref={scrollRef}>
																				<Messages message={m} own={m.sender===userData._id}/>
																			</div>
																		))}
																	</ul>
																	<div class="message-text-container">
																		{seeFriend===true &&

																			<form method="">
																				<textarea
																					placeholder='votre message...'
																					onChange={(e)=>setNewMessage(e.target.value)}
																					value={newMessage}
																				></textarea>
																				<img src='./img/icons/icons8-send-comment-48.png' title='send' alt='send'  onClick={handleSubmit}/>
																			</form>
																		
																		}
																		
																	</div>
															</div>
														</div>
													</div>	
												</div>	
											</div>	
										</div>	
									</div>
								</div>
							</div>
						</div>	
					</section>
                </>
           {/* ) : (
               <Login /> 
            )*/}
        </>
    );
};

export default Message;