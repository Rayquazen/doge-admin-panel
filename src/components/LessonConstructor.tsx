"use client";
import { ImageUploader } from "./ImageUploader";
import { VideoUploader } from "./VideoUploader";
import { TextEditor } from "./TextEditor";
import { EditorState } from "draft-js";
import { useState } from "react";
import { fetchWithAuth } from "@/utils/authService";

import { arrayMove } from "@dnd-kit/sortable";

import type { ContentBlock, ContentType } from "@/utils/types";

export function LessonConstructor() {
	const [content, setContent] = useState<ContentBlock[]>([]);
	const [lessonTitle, setLessonTitle] = useState("");

	const addContent = (type: ContentType) => {
		const newBlock: ContentBlock = {
			id: crypto.randomUUID(),
			type,
			editorState: type === "text" ? EditorState.createEmpty() : undefined,
		};
		setContent([...content, newBlock]);
	};

	const removeContent = (id: string) => {
		setContent(content.filter((block) => block.id !== id));
	};

	const moveContent = (index: number, direction: "up" | "down") => {
		if (
			(direction === "up" && index === 0) ||
			(direction === "down" && index === content.length - 1)
		) {
			return;
		}

		const newIndex = direction === "up" ? index - 1 : index + 1;
		setContent(arrayMove(content, index, newIndex));
	};

	// Обработчик кнопки создания курса
	const saveLesson = async () => {
		if (!lessonTitle.trim()) {
			alert("Введите название урока!");
			return;
		}

		{
			/* формирование данных */
		}
		const lessonData = await Promise.all(
			content.map(async (block, index) => {
				if (block.type === "text") {
					return {
						type: block.type,
						content: block.editorState?.getCurrentContent().getPlainText(),
					};
				} else {
					const fileUrl = await uploadMediaPlaceholder(block.type);
					return { type: block.type, content: fileUrl };
				}
			})
		);

		await sendLessonToServer({ title: lessonTitle, content: lessonData });

		console.log("Урок сохранен!", { title: lessonTitle, content: lessonData });

		// Очистка полей формы
		setContent([]);
		setLessonTitle("");

		alert("Урок создан");
	};

	// Заглушка API-запроса для загрузки медиа (замени на реальный API)
	const uploadMediaPlaceholder = async (type: ContentType) => {
		console.log(`Загрузка ${type}...`);

		return new Promise<string>((resolve) =>
			setTimeout(() => {
				const fileUrl = `/uploads/${type}_${crypto.randomUUID()}.mp4`;
				console.log(`Файл загружен: ${fileUrl}`);
				resolve(fileUrl);
			}, 1000)
		);
	};

	// Заглушка API-запроса для сохранения урока
	const sendLessonToServer = async (lesson: {
		title: string;
		content: any;
	}) => {
		console.log("Отправка данных на сервер...", lesson);

		return new Promise<void>((resolve) =>
			setTimeout(() => {
				console.log("Урок успешно сохранен!");
				resolve();
			}, 500)
		);
	};

	{
		/* Раскомментируй что ниже, это именно рабочий запрос , не заглушка на конвертировкание + записывание файла в бд  */
	}

	// const uploadMedia = async (type: ContentType) => {
	// 	try {
	// 		const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
	//
	// 		const response = await fetchWithAuth(`${host}/admin/mediaurl`, {
	// 			method: "POST",
	// 			headers: { "Content-Type": "application/json" },
	// 			body: JSON.stringify({ type }), // Исправлено
	// 		});

	// 		if (!response.ok) {
	// 			const errorText = await response.text();
	// 			throw new Error(`Ошибка загрузки медиа: ${errorText}`);
	// 		}

	// 		const data = await response.json();
	// 		if (!data?.url) throw new Error("Сервер не вернул URL файла");

	// 		return data.url;
	// 	} catch (error) {
	// 		console.error("Ошибка загрузки медиа:", error);
	// 		throw error;
	// 	}
	// };

	{
		/* Раскомментируй что ниже, это именно рабочий запрос , не заглушка на записывание всего урока файла в бд  */
	}

	// const sendLessonToServer = async (lesson: {
	// 	title: string;
	// 	content: any;
	// }) => {
	// 	try {
	// 		const host = process.env.NEXT_PUBLIC_APP_HOSTNAME;
	// 		const response = await fetchWithAuth(`${host}/admin/lesson`, {
	// 			method: "POST",
	// 			headers: { "Content-Type": "application/json" },
	// 			body: JSON.stringify(lesson),
	// 		});

	// 		if (!response.ok) {
	// 			const errorText = await response.text();
	// 			throw new Error(`Ошибка сохранения урока: ${errorText}`);
	// 		}

	// 		console.log("Урок успешно сохранен:", lesson);
	// 	} catch (error) {
	// 		console.error("Ошибка сохранения урока:", error);
	// 		throw error;
	// 	}
	// };

	return (
		<div className="w-full h-5/6 rounded flex flex-col items-center ">
			<div className="w-full  flex flex-row justify-between items-center">
				<div className="flex flex-col w-1/2 items-center">
					<label
						htmlFor="lessonName"
						className="block text-gray-800 font-semibold "
					>
						Название Урока
					</label>

					<input
						type="text"
						id="lessonName"
						className="block w-5/6 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black"
						value={lessonTitle}
						onChange={(e) => setLessonTitle(e.target.value)}
					/>
				</div>
				<div className="min-h-[4rem] w-1/2 flex flex-row justify-center items-center gap-5">
					<button
						onClick={() => addContent("text")}
						className="w-2/6 rounded bg-[#A79277] text-black p-2 font-bold hover:bg-[#D1BB9E]"
					>
						Текст
					</button>
					<button
						onClick={() => addContent("image")}
						className="w-2/6 rounded bg-[#A79277] text-black p-2 font-bold hover:bg-[#D1BB9E]"
					>
						Картинка
					</button>
					<button
						onClick={() => addContent("video")}
						className="w-2/6 rounded bg-[#A79277] text-black p-2 font-bold hover:bg-[#D1BB9E]"
					>
						Видео
					</button>
				</div>
			</div>

			<div className="w-full flex flex-col items-center overflow-y-auto">
				{content.map((block, index) => (
					<div
						key={block.id}
						className="relative w-[60rem] bg-gray-100 p-1.5 rounded-lg mt-4 shadow-md"
					>
						<div className="absolute top-0 right-0 flex gap-2 z-10">
							<button
								onClick={() => moveContent(index, "up")}
								disabled={index === 0}
								className="bg-blue-500 text-white p-1 rounded disabled:opacity-50"
							>
								↑
							</button>
							<button
								onClick={() => moveContent(index, "down")}
								disabled={index === content.length - 1}
								className="bg-blue-500 text-white p-1 rounded disabled:opacity-50"
							>
								↓
							</button>
							<button
								onClick={() => removeContent(block.id)}
								className="bg-red-500 text-white p-1 rounded"
							>
								✕
							</button>
						</div>
						<div className="z-5">
							{/* Компоненты */}
							{block.type === "text" && block.editorState && (
								<TextEditor
									editorState={block.editorState}
									setEditorState={(newState) => {
										const newContent = [...content];
										newContent[index] = { ...block, editorState: newState };
										setContent(newContent);
									}}
								/>
							)}

							{block.type === "image" && <ImageUploader />}
							{block.type === "video" && <VideoUploader />}
						</div>
					</div>
				))}
				{content.length > 0 && (
					<div className="w-full flex justify-center gap-20 mt-5">
						<button
							className="w-2/6 rounded bg-[#A79277] text-black p-2 font-bold hover:bg-[#D1BB9E]"
							onClick={saveLesson}
						>
							Сохранить Урок
						</button>
						<button className="w-2/6 rounded bg-[#A79277] text-black p-2 font-bold hover:bg-[#D1BB9E]">
							Отменить
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
