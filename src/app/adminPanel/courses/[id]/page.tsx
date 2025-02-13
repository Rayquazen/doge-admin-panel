"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/authService";

export default function EditCoursePage() {
	const { id } = useParams();
	const router = useRouter();

	const [course, setCourse] = useState({
		name: "",
		description: "",
		amount: "",
		with_modules: false,
	});

	useEffect(() => {
		async function fetchCourse() {
			try {
				const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
				const response = await fetchWithAuth(`${host}/admin/courses/${id}`);
				if (!response.ok) throw new Error("Ошибка загрузки курса");

				const data = await response.json();
				setCourse(data);
			} catch (error) {
				console.error("Ошибка:", error);
			}
		}
		fetchCourse();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
			const response = await fetchWithAuth(`${host}/admin/courses/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(course),
			});
			if (!response.ok) throw new Error("Ошибка обновления курса");

			alert("Курс обновлен!");
			router.push("/adminPanel"); // Возвращаемся в админку
		} catch (error) {
			console.error("Ошибка:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full flex flex-col items-center gap-5"
		>
			<h1 className="text-2xl font-bold">Редактирование курса</h1>

			{/* Название курса */}
			<input
				type="text"
				value={course.name}
				onChange={(e) => setCourse({ ...course, name: e.target.value })}
				className="p-2 border rounded w-96"
			/>

			{/* Описание */}
			<textarea
				value={course.description}
				onChange={(e) => setCourse({ ...course, description: e.target.value })}
				className="p-2 border rounded w-96 h-32"
			/>

			{/* Цена */}
			<input
				type="number"
				value={course.amount}
				onChange={(e) => setCourse({ ...course, amount: e.target.value })}
				className="p-2 border rounded w-96"
			/>

			{/* Чекбокс "Есть модули" */}
			<label className="flex items-center gap-2">
				<input
					type="checkbox"
					checked={course.with_modules}
					onChange={() =>
						setCourse({ ...course, with_modules: !course.with_modules })
					}
				/>
				Содержит модули?
			</label>

			{/* Кнопки */}
			<div className="flex gap-3">
				<button type="submit" className="bg-green-500 text-white p-2 rounded">
					Сохранить изменения
				</button>
				<button
					type="button"
					onClick={() => router.push("/adminPanel")}
					className="bg-gray-400 text-white p-2 rounded"
				>
					Назад
				</button>
			</div>
		</form>
	);
}
