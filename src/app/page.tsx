"use client";

import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
	const socket = io("http://localhost:4000");

	const [room, setRoom] = useState<string>("");
	const [username, setUserName] = useState<string>("");
	const router = useRouter();

	const joinRoom = () => {
		socket.emit("join_room", room);
		router.push(`/chat/${username}`);
	};
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex items-center bg-gray-300 rounded-md h-40 justify-center p-10 gap-3">
				<div className="flex flex-col gap-2">
					<input
						type="text"
						placeholder="enter room id"
						className="py-1 text-black focus:outline rounded-md p-2"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRoom(e.target.value)
						}
					/>
					<input
						type="text"
						placeholder="enter your username"
						className="py-1 text-black focus:outline rounded-md p-2"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUserName(e.target.value)
						}
					/>
					<button
						onClick={joinRoom}
						className="bg-red-600 text-white p-2 px-4 rounded-lg "
					>
						Join room
					</button>
				</div>
			</div>
		</main>
	);
}
