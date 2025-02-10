"use client";

import { useEffect, useState } from "react";
import { AllContent } from "@/utils/types";

export function ListAllContent() {
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState<AllContent[]>([
		{
			id: 1,
			CourseName: "Дрессировка собак",
			ModuleName: "занятия дома",
			LessonName: "трюк `Кувырок`",
			price: 10000,
		},
		{
			id: 2,
			CourseName: "Course2",
			ModuleName: "Module2",
			LessonName: "Lesson2",
			price: 2000,
		},
		{
			id: 3,
			CourseName: "Course3",
			ModuleName: "Module3",
			LessonName: "Lesson3",
			price: 3000,
		},
	]);

	useEffect(() => {
		async function fetchContent() {
			try {
				const host = process.env.NEXT_PUBLIC_API_URL;
				const response = await fetch(`${host}/api/courses`);

				if (!response.ok) throw new Error("Ошибка загрузки контента");

				const data: AllContent[] = await response.json();
				setContent(data);
			} catch (error) {
				console.error("Ошибка:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchContent();
	}, []);

	const handleDelete = (id: number) => async () => {
		try {
			const host = process.env.NEXT_PUBLIC_API_URL;

			const response = await fetch(`${host}/api/courses/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				alert("Вы успено удалили выбранный объект");
				setContent((prev) => prev.filter((content) => content.id !== id));
			} else {
				alert("Произошла ошибка при удалении объекта");
				setContent((prev) => prev.filter((content) => content.id !== id));
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className="w-full h-[70rem] flex flex-col items-center overflow-y-auto">
			{/* Шапка таблицы */}
			<div className="w-full flex flex-row bg-[#A79277] p-2 rounded-lg shadow-md text-white font-mono items-center gap-10 sticky top-0 z-10">
				<div className="w-2/5 text-center">Действия</div>
				<div className="w-3/5 text-center">Курс</div>
				<div className="w-3/5 text-center">Модуль</div>
				<div className="w-4/5 text-center">Урок</div>
				<div className="w-2/5 text-center">Цена</div>
			</div>

			{/* Контент таблицы */}
			{content.map((content) => (
				<div
					key={content.id}
					className="w-full flex flex-row mt-2 bg-[#D1BB9E] p-1.5 rounded-lg shadow-md text-black font-mono items-center gap-10"
				>
					<div className="flex flex-row gap-2 w-1/5">
						<button className="bg-[#A79277] rounded-md p-1">Изменить</button>
						<button
							className="bg-red-400 rounded-md p-1"
							onClick={() => handleDelete(content.id)}
						>
							Удалить
						</button>
					</div>
					<div className="flex flex-row text-black items-center w-full">
						<div className="w-4/5">{content.CourseName}</div>
						<div className="w-4/5">{content.ModuleName}</div>
						<div className="w-4/5">{content.LessonName}</div>
						<div className="w-1/5">{content.price}</div>
					</div>
				</div>
			))}
		</div>
	);
}
