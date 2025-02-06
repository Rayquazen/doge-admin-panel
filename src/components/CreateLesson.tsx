"use client";

import { useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { VideoUploader } from "./VideoUploader";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

interface module {
	id: string;
	name: string;
}
type ContentType = "text" | "image" | "video";

interface ContentBlock {
	id: string;
	type: ContentType;
	value?: string;
}

export function CreateLesson() {
	const [courseName, setCourseName] = useState("");
	const [modules, setCourses] = useState<module[]>([
		{ id: "1", name: "модуль 1" },
		{ id: "2", name: "модуль 2" },
		{ id: "3", name: "модуль 3" },
	]);
	const [selectedOption, setSelectedOption] = useState("");
	const [loading, setLoading] = useState(true);
	const [lessonDescription, setLessonDescription] = useState("");
	const [content, setContent] = useState<ContentBlock[]>([]);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const addContent = (type: ContentType) => {
		setContent([...content, { id: crypto.randomUUID(), type }]);
	};

	const removeContent = (id: string) => {
		setContent(content.filter((block) => block.id !== id));
	};

	const handleEditorChange = (state: EditorState) => {
		setEditorState(state);
	};
	return (
		<div className="w-full h-[42rem] 2xl:h-[56rem] divide-y-2 divide-dashed divide-gray-500 rounded flex flex-col  ">
			<div className=" w-full h-1/4  flex flex-row justify-center items-center ">
				<div className=" w-1/2 h-full  flex flex-col justify-center items-center ">
					<h2 className="text-2xl font-bold text-black mb-2">
						Создание урока c модулем
					</h2>
					<div>
						<label
							htmlFor="courseName"
							className="block text-gray-800 font-semibold text-sm"
						>
							Выберите курс
						</label>
						<select
							id="module"
							value={selectedOption}
							onChange={(e) => setSelectedOption(e.target.value)}
							className="mt-1 block 2xl:w-[40rem] w-[20rem] rounded-md py-1 px-3 ring-1 ring-inset ring-gray-400 text-black bg-white"
						>
							<option value="" disabled>
								{loading ? "Загрузка модулей..." : "Выберите модуль"}
							</option>
							{modules.map((module) => (
								<option key={module.id} value={module.id}>
									{module.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="module"
							className="block text-gray-800 font-semibold text-sm mt-1"
						>
							Выберите модуль
						</label>
						<select
							id="module"
							value={selectedOption}
							onChange={(e) => setSelectedOption(e.target.value)}
							className="mt-1 block 2xl:w-[40rem] w-[20rem] rounded-md py-1 px-3 ring-1 ring-inset ring-gray-400 text-black bg-white"
						>
							<option value="" disabled>
								{loading ? "Загрузка модулей..." : "Выберите модуль"}
							</option>
							{modules.map((module) => (
								<option key={module.id} value={module.id}>
									{module.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className=" w-1/2 h-full flex flex-col justify-center items-center gap-5 ">
					<h2 className="text-2xl font-bold text-black">
						Создание урока без модуля
					</h2>
					<div>
						<label
							htmlFor="courseName"
							className="block text-gray-800 font-semibold"
						>
							Выберите курс
						</label>
						<select
							id="module"
							value={selectedOption}
							onChange={(e) => setSelectedOption(e.target.value)}
							className="mt-1 block 2lg:w-[40rem] w-[20rem] rounded-md py-1 px-3 ring-1 ring-inset ring-gray-400 text-black bg-white"
						>
							<option value="" disabled>
								{loading ? "Загрузка модулей..." : "Выберите модуль"}
							</option>
							{modules.map((module) => (
								<option key={module.id} value={module.id}>
									{module.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<div className="w-full h-3/4 rounded flex flex-col items-center  max-h-[30rem] ">
				<div className="w-full h-[5rem] flex flex-row justify-center items-center  gap-10">
					<button
						onClick={() => addContent("text")}
						className="w-1/6 rounded bg-[#A79277] text-black p-2 font-bold hover:bg-[#D1BB9E]"
					>
						Текст
					</button>
					<button
						onClick={() => addContent("image")}
						className="w-1/6 rounded bg-[#A79277] text-black p-2 font-bold hover:bg-[#D1BB9E]"
					>
						Картинка
					</button>
					<button
						onClick={() => addContent("video")}
						className="w-1/6 rounded bg-[#A79277] text-black p-2 font-bold hover:bg-[#D1BB9E]"
					>
						Видео
					</button>
				</div>

				{/* Динамический контент */}
				<div className="w-full flex flex-col items-center  overflow-y-auto p-4 ]">
					{content.map((block) => (
						<div
							key={block.id}
							className="relative w-[60rem] bg-gray-100 p-4 rounded-lg mt-4 shadow-md"
						>
							{/* Кнопка удаления */}
							<button
								onClick={() => removeContent(block.id)}
								className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
							>
								✕
							</button>

							{/* Компоненты в зависимости от типа */}
							{block.type === "text" && (
								<div>
									<label className="block text-gray-800 font-semibold ">
										Описание курса
									</label>
									<Editor
										editorState={editorState}
										onChange={handleEditorChange}
										placeholder="Введите описание..."
									/>
								</div>
							)}

							{block.type === "image" && <ImageUploader />}

							{block.type === "video" && <VideoUploader />}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
