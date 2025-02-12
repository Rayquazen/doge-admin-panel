"use client";

import { useEffect, useState } from "react";
import { LessonConstructor } from "./LessonConstructor";
import { module, course } from "@/utils/types";
import { fetchWithAuth } from "@/utils/authService";

export function CreateLesson() {
	const [courses, setCourses] = useState<course[]>([]);
	const [modules, setModules] = useState<module[]>([]);
	const [selectedOption1, setSelectedOption1] = useState<string | "">("");
	const [selectedOption2, setSelectedOption2] = useState<string | "">("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchCourses() {
			try {
				const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
				const response = await fetchWithAuth(`${host}/admin/courses`);
				if (!response.ok) throw new Error("Ошибка загрузки курсов");

				const data: course[] = await response.json();
				setCourses(data);

				const response = await fetchWithAuth(`${host}/admin/modules`);
				if (!response.ok) throw new Error("Ошибка загрузки модулей");

				const data: module[] = await response.json();
				setModules(data);
			} catch (error) {
				console.error("Ошибка:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchCourses();
	}, []);

	// Функции для обработки выбора
	const handleSelect1 = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption1(e.target.value);
		if (e.target.value) {
			setSelectedOption2(""); // сбрасываем выбор во втором select
		}
	};

	const handleSelect2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption2(e.target.value);
		if (e.target.value) {
			setSelectedOption1(""); // сбрасываем выбор в первом select
		}
	};

	return (
		<div className="w-full h-[42rem] 2xl:h-[55rem] divide-y-2 divide-dashed divide-gray-500 rounded flex flex-col ">
			<div className="w-full h-1/6 flex flex-row justify-center items-center">
				{/* Левая колонка */}
				<div className="w-1/2 h-full flex flex-col items-center">
					<h2 className="text-2xl font-bold text-black mb-2">
						Создание урока с модулем
					</h2>
					<div className="flex flex-row gap-5">
						<div>
							<label
								htmlFor="module1"
								className="block text-gray-800 font-semibold text-md"
							>
								Выберите курс
							</label>
							<select
								id="module1"
								value={selectedOption1}
								onChange={handleSelect1}
								className="mt-1 block w-[22rem] rounded-md py-1 px-3 ring-1 ring-inset ring-gray-400 text-black bg-white"
							>
								<option value="" disabled>
									{loading ? "Загрузка модулей..." : "Выберите модуль"}
								</option>
								{courses.map(
									(courses) =>
										courses.with_modules && (
											<option
												key={courses.id}
												value={courses.id}
												disabled={!!selectedOption2} // Блокируем, если выбран модуль в правой части
											>
												{courses.name}
											</option>
										)
								)}
							</select>
						</div>
						<div>
							<label
								htmlFor="module1"
								className="block text-gray-800 font-semibold text-md"
							>
								Выберите модуль
							</label>
							<select
								id="module1"
								value={selectedOption1}
								onChange={handleSelect1}
								className="mt-1 block w-[22rem] rounded-md py-1 px-3 ring-1 ring-inset ring-gray-400 text-black bg-white"
							>
								<option value="" disabled>
									{loading ? "Загрузка модулей..." : "Выберите модуль"}
								</option>
								{modules.map((module) => (
									<option
										key={module.id}
										value={module.id}
										disabled={!!selectedOption2} // Блокируем, если выбран модуль в правой части
									>
										{module.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Правая колонка */}
				<div className="w-1/2 h-full flex flex-col items-center gap-5">
					<h2 className="text-2xl font-bold text-black">
						Создание урока без модуля
					</h2>
					<div>
						<label
							htmlFor="module2"
							className="block text-gray-800 font-semibold"
						>
							Выберите курс
						</label>
						<select
							id="module2"
							value={selectedOption2}
							onChange={handleSelect2}
							className="mt-1 block 2lg:w-[40rem] w-[20rem] rounded-md py-1 px-3 ring-1 ring-inset ring-gray-400 text-black bg-white"
						>
							<option value="" disabled>
								{loading ? "Загрузка модулей..." : "Выберите модуль"}
							</option>
							{courses.map(
									(courses) =>
										!courses.with_modules && (
											<option
												key={courses.id}
												value={courses.id}
												disabled={!!selectedOption1} // Блокируем, если выбран модуль в правой части
											>
												{courses.name}
											</option>
										)
								)}
						</select>
					</div>
				</div>
			</div>

			{/* Lesson constructor */}
			<LessonConstructor />
		</div>
	);
}
