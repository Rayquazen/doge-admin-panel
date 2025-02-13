"use client";

import { JSX, useState } from "react";
import { CreateCourse } from "@/app/adminPanel/components/CreateCourse";
import { CreateModule } from "@/app/adminPanel/components/CreateModule";
import { CreateLesson } from "./CreateLesson";
import { Tab } from "@/utils/types";
import { ListAllContent } from "@/components/ListAllContent";
import { ShowCourses } from "./ShowCourses";
import { ShowModules } from "./ShowModules";

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
		<nav className="flex flex-col gap-5 font-bold">
			<div className="flex flex-col gap-5 font-bold border-2 border-[#EAD8C0] border-y-[#8D7B68] border-dotted p-1">
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
			<div className="flex flex-col gap-5 font-bold border-2 border-[#EAD8C0] border-y-[#8D7B68] border-dotted p-1">
				<button
					onClick={() => handleSelect(<CreateModule />, "Создать модуль")}
					className={` flex justify-center p-3  rounded text-black font-mono text-lg ${
						activeSection === "Создать модуль"
							? "bg-[#A79277] "
							: "bg-[#D1BB9E]"
					}`}
				>
					Создать модуль
				</button>

				<button
					onClick={() => handleSelect(<ShowModules />, "Показать все модули")}
					className={` flex justify-center p-3  rounded text-black font-mono text-lg  ${
						activeSection === "Показать все модули"
							? "bg-[#A79277] "
							: "bg-[#D1BB9E]"
					}`}
				>
					Показать все модули
				</button>
			</div>
			<div className="flex flex-col gap-5 font-bold border-2 border-[#EAD8C0] border-y-[#8D7B68] border-dotted p-1">
				<button
					onClick={() => handleSelect(<CreateLesson />, "Создать урок")}
					className={`flex justify-center p-3  rounded text-black font-mono text-lg ${
						activeSection === "Создать урок" ? "bg-[#A79277] " : "bg-[#D1BB9E]"
					}`}
				>
					Создать урок
				</button>
				<button
					onClick={() => handleSelect(<ShowCourses />, "Показать все уроки")}
					className={` flex justify-center p-3  rounded text-black font-mono text-lg  ${
						activeSection === "Показать все уроки"
							? "bg-[#A79277] "
							: "bg-[#D1BB9E]"
					}`}
				>
					Показать все уроки
				</button>
			</div>
		</nav>
	);
}
