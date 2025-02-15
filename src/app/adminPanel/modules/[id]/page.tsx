"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/authService";
import { course } from "@/utils/types";

export default function EditModulePage() {
	const { id } = useParams();
	const router = useRouter();

	const [module, setModule] = useState({
		name: "",
		description: "",
		course_id: 1,
	});
	const [courses, setCourses] = useState<course[]>([]); // Храним список курсов
	const [selectedOption, setSelectedOption] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;

				// 1. Загружаем модуль
				const moduleResponse = await fetchWithAuth(
					`${host}/admin/modules/${id}`
				);
				if (!moduleResponse.ok) throw new Error("Ошибка загрузки модуля");
				const moduleData = await moduleResponse.json();
				setModule(moduleData);
				setSelectedOption(moduleData.course_id || "");

				// 2. Загружаем курсы
				const coursesResponse = await fetchWithAuth(`${host}/admin/courses`);
				if (!coursesResponse.ok) throw new Error("Ошибка загрузки курсов");
				const coursesData = await coursesResponse.json();
				setCourses(coursesData);
			} catch (error) {
				console.error("Ошибка:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const moduleData = {
			name: module.name,
			description: module.description,
			course_id: parseInt(selectedOption),
		};

		try {
			const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
			const response = await fetchWithAuth(`${host}/admin/modules/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(moduleData),
			});
			if (!response.ok) throw new Error("Ошибка обновления модуля");

			alert("Модуль обновлен!");
			router.push("/adminPanel"); // Возвращаемся в админку
		} catch (error) {
			console.error("Ошибка:", error);
		}
	};

	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			"Вы уверены, что хотите удалить этот модуль? Это действие нельзя отменить."
		);
		if (!confirmDelete) return;

		try {
			const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
			const response = await fetchWithAuth(`${host}/admin/modules/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("Ошибка при удалении модуля");

			alert("Модуль удален!");
			router.push("/adminPanel");
		} catch (error) {
			console.error("Ошибка:", error);
			alert("Не удалось удалить модуль!");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center h-screen bg-[#FFF2E1] p-8 font-[family-name:var(--font-geist-sans)]"
		>
			<div className="w-full h-[42rem] 2xl:h-[56rem] bg-[#EAD8C0] rounded shadow flex flex-col justify-center items-center gap-10 text-lg">
				<h1 className="block text-gray-800 font-semibold text-2xl">
					Редактирование модуля
				</h1>

				{/* Название модуля */}
				<div>
					<label
						htmlFor="moduleName"
						className="block text-gray-800 font-semibold"
					>
						Название модуля
					</label>
					<input
						type="text"
						id="moduleName"
						value={module.name}
						onChange={(e) => setModule({ ...module, name: e.target.value })}
						className="mt-2 block w-[60rem] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black"
						required
					/>
				</div>

				{/* Описание модуля */}
				<div>
					<label
						htmlFor="moduleDescription"
						className="block text-gray-800 font-semibold text-lg"
					>
						Описание модуля
					</label>
					<textarea
						id="moduleDescription"
						value={module.description}
						onChange={(e) =>
							setModule({ ...module, description: e.target.value })
						}
						rows={6}
						className="mt-2 block w-[60rem] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black text-lg resize-none"
						required
					/>
				</div>

				{/* Выбор курса */}
				<div>
					<label
						htmlFor="course"
						className="block text-gray-800 font-semibold text-md"
					>
						Выберите курс
					</label>
					<select
						id="course"
						value={selectedOption}
						onChange={(e) => setSelectedOption(e.target.value)}
						className="mt-2 block w-[60rem] rounded-md py-2 px-3 ring-1 ring-inset ring-gray-400 text-black bg-white"
					>
						<option value="" disabled>
							{loading ? "Загрузка курсов..." : "Выберите курс"}
						</option>
						{courses.map(
							(course) =>
								course.with_modules && (
									<option key={course.id} value={course.id}>
										{course.name}
									</option>
								)
						)}
					</select>
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
						Удалить модуль
					</button>
				</div>
			</div>
		</form>
	);
}
