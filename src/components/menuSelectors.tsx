"use client";

import { JSX, useState } from "react";
import { CreateCourse } from "./CreateCourse";
import { CreateModule } from "./CreateModule";
import { CreateLesson } from "./CreateLesson";

type Tab = "Создать курс" | "Создать модуль" | "Создать урок";

interface MenuSelectionsProps {
	onComponentSelect: (component: JSX.Element) => void;
}

export default function MenuSelections({
	onComponentSelect,
}: MenuSelectionsProps) {
	const [activeSection, setActiveSection] = useState<Tab>("Создать курс");

	const handleSelect = (component: JSX.Element, section: Tab) => {
		setActiveSection(section);
		onComponentSelect(component);
	};

	return (
		<nav className="flex flex-col space-y-2 gap-10 font-bold">
			<button
				onClick={() => handleSelect(<CreateCourse />, "Создать курс")}
				className={` flex justify-center p-3 text-left rounded text-black font-mono text-lg  ${
					activeSection === "Создать курс" ? "bg-[#A79277] " : "bg-[#D1BB9E]"
				}`}
			>
				Создать курс
			</button>

			<button
				onClick={() => handleSelect(<CreateModule />, "Создать модуль")}
				className={` flex justify-center p-3 text-left rounded text-black font-mono text-lg ${
					activeSection === "Создать модуль" ? "bg-[#A79277] " : "bg-[#D1BB9E]"
				}`}
			>
				Создать модуль
			</button>

			<button
				onClick={() => handleSelect(<CreateLesson />, "Создать урок")}
				className={`flex justify-center p-3 text-left rounded text-black font-mono text-lg ${
					activeSection === "Создать урок" ? "bg-[#A79277] " : "bg-[#D1BB9E]"
				}`}
			>
				Создать урок
			</button>
		</nav>
	);
}
