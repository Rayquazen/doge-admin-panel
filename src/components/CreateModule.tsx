"use client";

import { useState, useEffect } from "react";
import { course } from "@/utils/types";

export function CreateModule() {
	const [selectedOption, setSelectedOption] = useState("");
	const [moduleName, setModuleName] = useState("");
	const [moduleDescription, setModuleDescription] = useState("");
	const [loading, setLoading] = useState(true);
	const [courses, setCourses] = useState<course[]>([
		{ id: 1, name: "Дрессировка собак" },
	]);
	const [saving, setSaving] = useState(false); // Для состояния сохранения
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		async function fetchCourses() {
			try {
				const response = await fetch("/api/courses");
				if (!response.ok) throw new Error("Ошибка загрузки курсов");

				const data: course[] = await response.json();
				setCourses(data);
			} catch (error) {
				console.error("Ошибка:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchCourses();
	}, []);

	const handleSubmit = async () => {
		setSaving(true);
		setError(null);
		setSuccess(false);

		const moduleData = {
			name: moduleName,
			description: moduleDescription,
			courseId: selectedOption,
		};

		try {
			const response = await fetch("/api/modules", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(moduleData),
			});

			if (!response.ok) throw new Error("Ошибка при создании модуля");

			setSuccess(true);
			setModuleName("");
			setModuleDescription("");
			setSelectedOption("");
		} catch (error) {
			setError("Не удалось сохранить модуль");
			console.error("Ошибка:", error);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="w-full h-[63rem] rounded flex flex-col justify-center items-center gap-10 text-md">
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
					value={moduleName}
					onChange={(e) => setModuleName(e.target.value)}
					className="mt-2 block w-[60rem] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black"
				/>
			</div>

			{/* Описание модуля */}
			<div>
				<label
					htmlFor="moduleDescription"
					className="block text-gray-800 font-semibold"
				>
					Описание модуля
				</label>
				<textarea
					id="moduleDescription"
					value={moduleDescription}
					onChange={(e) => setModuleDescription(e.target.value)}
					rows={6}
					className="mt-2 block w-[60rem] rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black text-md scale-none resize-none"
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
					{courses.map((course) => (
						<option key={course.id} value={course.id}>
							{course.name}
						</option>
					))}
				</select>
			</div>

			{/* Кнопка отправки */}
			<button
				onClick={handleSubmit}
				disabled={saving}
				className="w-2/6 rounded bg-[#A79277] text-black p-3 text-center font-bold hover:bg-[#D1BB9E] mt-14"
			>
				{saving ? "Сохранение..." : "Сохранить модуль"}
			</button>

			{/* Уведомления */}
			{success && <p className="text-green-600">Модуль успешно сохранен!</p>}
			{error && <p className="text-red-600">{error}</p>}
		</div>
	);
}
