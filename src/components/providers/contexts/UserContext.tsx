"use client";

import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

interface UserInterface {
	username: string | undefined;
	setUsername: Dispatch<SetStateAction<string>>;
	room: string | undefined;
	setRoom: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<Partial<UserInterface>>({});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [username, setUsername] = useState<string>("");
	const [room, setRoom] = useState<string>("");
	return (
		<UserContext.Provider value={{ username, setUsername, room, setRoom }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};
