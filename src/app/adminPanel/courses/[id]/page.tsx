"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/authService";

export default function EditCoursePage() {
	const { id } = useParams();
	const router = useRouter();

	const [course, setCourse] = useState({
		id: 1,
		name: "",
		description: "",
		amount: 1,
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

	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			"Вы уверены, что хотите удалить этот курс? Это действие нельзя отменить."
		);
		if (!confirmDelete) return;

		try {
			const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
			const response = await fetchWithAuth(`${host}/admin/courses/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Ошибка при удалении курса");

			alert("Курс удален!");
			router.push("/adminPanel"); // Возвращаемся в админку
		} catch (error) {
			console.error("Ошибка:", error);
			alert("Не удалось удалить курс!");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center h-screen bg-[#FFF2E1] p-8  font-[family-name:var(--font-geist-sans)] "
		>
			<div className="w-full h-[42rem] 2xl:h-[56rem] bg-[#EAD8C0] rounded shadow flex flex-col justify-center items-center gap-10 text-lg">
				<h1 className="block text-gray-800 font-semibold text-2xl">
					Редактирование курса
				</h1>

				{/* Название курса */}
				<div>
					<label
						htmlFor="courseName"
						className="block text-gray-800 font-semibold"
					>
						Название курса
					</label>
					<input
						type="text"
						id="courseName"
						value={course.name}
						onChange={(e) => setCourse({ ...course, name: e.target.value })}
						className="mt-2 block w-[60rem] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black"
						required
					/>
				</div>

				{/* Описание курса */}
				<div>
					<label
						htmlFor="courseDescription"
						className="block text-gray-800 font-semibold text-lg"
					>
						Описание курса
					</label>
					<textarea
						id="courseDescription"
						value={course.description}
						onChange={(e) =>
							setCourse({ ...course, description: e.target.value })
						}
						rows={6}
						className="mt-2 block w-[60rem] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black text-lg resize-none"
						required
					/>
				</div>
				{/* Цена */}
				<div>
					<label
						htmlFor="coursePrice"
						className="block text-gray-800 font-semibold text-lg"
					>
						Цена (без знаков валют)
					</label>
					<input
						type="number"
						id="coursePrice"
						value={course.amount}
						onChange={(e) =>
							setCourse({ ...course, amount: parseInt(e.target.value) })
						}
						className="mt-2 block w-[60rem] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black"
						required
					/>
				</div>

				{/* Наличие модуля */}
				<div className="flex items-center gap-3">
					<label
						htmlFor="withModules"
						className="text-gray-800 font-semibold text-lg"
					>
						Наличие модуля
					</label>
					<input
						id="withModules"
						type="checkbox"
						checked={course.with_modules}
						onChange={() =>
							setCourse({ ...course, with_modules: !course.with_modules })
						}
						className="w-7 h-7"
					/>
				</div>

				{/* Кнопки */}
				<div className="flex gap-5">
					<button
						type="submit"
						className="bg-green-500 text-white p-2 rounded w-[15rem]"
					>
						Сохранить изменения
					</button>
					<button
						type="button"
						onClick={() => router.push("/adminPanel")}
						className="bg-gray-400 text-white p-2 rounded w-[10rem]"
					>
						Назад
					</button>
					<button
						type="button"
						onClick={handleDelete}
						className="bg-red-400 text-white p-2 rounded w-[15rem]"
					>
						Удалить курс
					</button>
				</div>
			</div>
		</form>
	);
}
