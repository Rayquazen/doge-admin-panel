"use client";

import { useState } from "react";
import { fetchWithAuth } from "@/utils/authService";

export function CreateCourse() {
	const [courseName, setCourseName] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [coursePrice, setCoursePrice] = useState("");
	const [withModules, setwithModules] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(false);
		setError(null);

		const courseData = {
			name: courseName,
			description: courseDescription,
			amount: parseFloat(coursePrice),
			with_modules: withModules,
		};

		try {
			const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;

			const response = await fetchWithAuth(`${host}/admin/courses`, {
				method: "POST",
				body: JSON.stringify(courseData),
			});

			if (!response.ok) throw new Error("Ошибка при создании курса");

			setSuccess(true);
			setCourseName("");
			setCourseDescription("");
			setCoursePrice("");
			setwithModules(false);
		} catch (error) {
			setError("Не удалось создать курс");
			console.error("Ошибка:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full h-[63rem] rounded flex flex-col justify-center items-center gap-10 text-lg"
		>
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
					value={courseName}
					onChange={(e) => setCourseName(e.target.value)}
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
					value={courseDescription}
					onChange={(e) => setCourseDescription(e.target.value)}
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
					value={coursePrice}
					onChange={(e) => setCoursePrice(e.target.value)}
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
					checked={withModules}
					onChange={() => setwithModules(!withModules)}
					className="w-7 h-7"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="w-2/6 rounded bg-[#A79277] text-black p-3 text-center font-bold hover:bg-[#D1BB9E] disabled:bg-gray-400"
			>
				{loading ? "Создание..." : "Подтвердить создание"}
			</button>

			{success && <p className="text-green-600">Курс успешно создан!</p>}
			{error && <p className="text-red-600">{error}</p>}
		</form>
	);
}
