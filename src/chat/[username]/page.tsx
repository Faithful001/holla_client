import { ChangeEvent, useState } from "react";
import { io } from "socket.io-client";

const Chat = ({ params }: { params: any }) => {
	const socket = io("http://localhost:4000");
	const [message, setMessage] = useState<string>("");

	socket.emit("send_message", message);

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
					// onClick={sendMessage}
					className="bg-red-600 text-white p-2 px-4 rounded-lg "
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
