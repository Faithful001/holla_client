"use client";
import { useUser } from "@/components/providers/contexts/UserContext";
import { ChangeEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
	const socket = io("http://localhost:4000");
	const { username, setUsername, room, setRoom } = useUser();
	const [message, setMessage] = useState<string>("");
	const [messageList, setMessageList] = useState<string[]>([]);
	console.log(messageList);

	const messageData = {
		author: username,
		room_id: room,
		message,
		time:
			new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
	};

	function sendMessage() {
		if (message !== "") {
			socket.emit("send_message", messageData);
		}
	}
	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((prevMessage) => [...prevMessage, data]);
		});
	}, [message]);

	return (
		<div className="chat">
			<div>
				<input
					type="text"
					className="border border-black py-1 text-black"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setMessage(e.target.value)
					}
				/>
				<button
					onClick={sendMessage}
					className="bg-red-600 text-white p-2 px-4 rounded-lg "
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
