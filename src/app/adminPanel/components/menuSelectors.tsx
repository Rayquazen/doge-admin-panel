"use client";

import { JSX, useState } from "react";
import { CreateCourse } from "@/components/CreateCourse";
import { CreateModule } from "@/components/CreateModule";
import { CreateLesson } from "@/components/CreateLesson";
import { Tab } from "@/utils/types";
import { ListAllContent } from "@/components/ListAllContent";
import { ShowCourses } from "./ShowCourses";

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
		<nav className="flex flex-col gap-10 font-bold">
			<div className="flex flex-col gap-5 font-bold border-2 border-[#EAD8C0] border-y-[#8D7B68] border-dashed p-1">
				<button
					onClick={() => handleSelect(<CreateCourse />, "Создать курс")}
					className={` flex justify-center p-3  rounded text-black font-mono text-lg  ${
						activeSection === "Создать курс" ? "bg-[#A79277] " : "bg-[#D1BB9E]"
					}`}
				>
					Создать курс
				</button>
				<button
					onClick={() => handleSelect(<ShowCourses />, "Показать все курсы")}
					className={` flex justify-center p-3  rounded text-black font-mono text-lg  ${
						activeSection === "Показать все курсы"
							? "bg-[#A79277] "
							: "bg-[#D1BB9E]"
					}`}
				>
					Показать все курсы
				</button>
			</div>
			<button
				onClick={() => handleSelect(<CreateModule />, "Создать модуль")}
				className={` flex justify-center p-3  rounded text-black font-mono text-lg ${
					activeSection === "Создать модуль" ? "bg-[#A79277] " : "bg-[#D1BB9E]"
				}`}
			>
				Создать модуль
			</button>

			<button
				onClick={() => handleSelect(<CreateLesson />, "Создать урок")}
				className={`flex justify-center p-3  rounded text-black font-mono text-lg ${
					activeSection === "Создать урок" ? "bg-[#A79277] " : "bg-[#D1BB9E]"
				}`}
			>
				Создать урок
			</button>
			<button
				onClick={() =>
					handleSelect(<ListAllContent />, "Список всех материалов")
				}
				className={`flex justify-center p-3  rounded text-black font-mono text-lg ${
					activeSection === "Список всех материалов"
						? "bg-[#A79277] "
						: "bg-[#D1BB9E]"
				}`}
			>
				Список всех материалов
			</button>
		</nav>
	);
}
