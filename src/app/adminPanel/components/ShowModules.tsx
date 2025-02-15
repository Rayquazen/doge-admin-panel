"use client";

import { useEffect, useState } from "react";
// import { LessonConstructor } from "./LessonConstructor";
import { module } from "@/utils/types";
import { fetchWithAuth } from "@/utils/authService";
import { useRouter } from "next/navigation";

interface Props {}

export function ShowModules({}: Props) {
	const router = useRouter();
	const [modules, setmodules] = useState<module[]>([]);

	useEffect(() => {
		async function fetchmodules() {
			try {
				const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
				const response = await fetchWithAuth(`${host}/admin/modules`);
				if (!response.ok) throw new Error("Ошибка загрузки курсов");

				const data: module[] = await response.json();
				setmodules(data);
			} catch (error) {
				console.error("Ошибка:", error);
			}
		}

		fetchmodules();
	}, []);

	const handleOpenModule = (id: number) => {
		router.push(`/adminPanel/modules/${id}`); // Теперь ведет в правильное место
	};

	return (
		<div className="w-full h-[70rem] flex flex-col items-center overflow-y-auto ">
			{/* Шапка таблицы */}
			<div className="w-full flex flex-row bg-[#A79277] p-2 rounded-lg shadow-md text-white font-mono items-center gap-10 sticky top-0 z-10 ">
				<div className="w-[6rem] text-center">Действия</div>
				<div className="w-2/5 text-center ">Модуль</div>
				<div className="w-2/5 text-center">Курс</div>
				<div className="w-3/5 text-center">Описание</div>
			</div>

			{/* Контент таблицы */}
			{modules.map((module) => (
				<div
					key={module.id}
					className="w-full flex flex-row mt-2 bg-[#D1BB9E] p-1.5 rounded-lg shadow-md text-black font-mono items-center "
				>
					<div className="flex flex-row w-[6rem]">
						<button
							className="bg-[#A79277] rounded-md p-1"
							onClick={() => handleOpenModule(module.id)}
						>
							Открыть
						</button>
					</div>
					<div className="flex flex-row text-black items-center w-full divide-x divide divide-gray-500">
						<div className="w-2/5 flex justify-center text-center">
							{module.name}
						</div>
						<div className="w-2/5 flex justify-center text-center">
							{module.course_name}
						</div>
						<div className="w-3/5 flex justify-center text-center">
							{module.description}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
