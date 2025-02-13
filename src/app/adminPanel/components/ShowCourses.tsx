"use client";

import { useEffect, useState } from "react";
// import { LessonConstructor } from "./LessonConstructor";
import { module, course } from "@/utils/types";
import { fetchWithAuth } from "@/utils/authService";
import { useParams, useRouter } from "next/navigation";

interface Props {}

export function ShowCourses({}: Props) {
	const [courses, setCourses] = useState<course[]>([]);
	const router = useRouter();
	useEffect(() => {
		async function fetchCourses() {
			try {
				const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
				const response = await fetchWithAuth(`${host}/admin/courses`);
				if (!response.ok) throw new Error("Ошибка загрузки курсов");

				const data: course[] = await response.json();
				setCourses(data);
			} catch (error) {
				console.error("Ошибка:", error);
			}
		}

		fetchCourses();
	}, []);

	const handleOpenCourse = (id: number) => {
		router.push(`/adminPanel/courses/${id}`); // Теперь ведет в правильное место
	};

	return (
		<div className="w-full h-[70rem] flex flex-col items-center overflow-y-auto text-center">
			{/* Шапка таблицы */}
			<div className="w-full flex flex-row bg-[#A79277] p-2 rounded-lg shadow-md text-white font-mono items-center gap-10 sticky top-0 z-10">
				<div className="w-[6rem] text-center">Действия</div>
				<div className="w-2/5 text-center">Курс</div>
				<div className="w-4/5 text-center">Описание</div>
				<div className="w-1/5 text-center">Цена</div>
				<div className="w-1/5 text-center">Модуль?</div>
			</div>

			{/* Контент таблицы */}
			{courses.map((courses) => (
				<div
					key={courses.id}
					className="w-full flex flex-row mt-2 bg-[#D1BB9E] p-1.5 rounded-lg shadow-md text-black font-mono items-center"
				>
					<div className="flex flex-row w-[6rem]">
						<button
							className="bg-[#A79277] rounded-md p-1"
							onClick={() => handleOpenCourse(courses.id)}
						>
							Открыть
						</button>
					</div>
					<div className="flex flex-row text-black items-center w-full divide-x-2 divide-dashed divide-gray-500">
						<div className="w-2/5 flex justify-center text-center">
							{courses.name}
						</div>
						<div className="w-4/5 flex justify-center text-center">
							{courses.description}
						</div>
						<div className="w-1/5 flex justify-center">{courses.amount}</div>
						<div className="w-1/5 flex justify-center">
							{courses.with_modules ? "✔" : "❌"}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
