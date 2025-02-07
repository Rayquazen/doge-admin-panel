"use client";
import { ImageUploader } from "./ImageUploader";
import { VideoUploader } from "./VideoUploader";
import { TextEditor } from "./TextEditor";
import { EditorState } from "draft-js";
import { useState } from "react";

import { arrayMove } from "@dnd-kit/sortable";

import type { ContentBlock, ContentType } from "@/utils/types";

export function LessonConstructor() {
	const [content, setContent] = useState<ContentBlock[]>([]);

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

	return (
		<div className="w-full h-5/6 rounded flex flex-col items-center">
			<div className="w-full  flex flex-row justify-between items-center">
				<div className="flex flex-col w-1/2 items-center">
					<label
						htmlFor="lessonName"
						className="block text-gray-800 font-semibold"
					>
						Название Урока
					</label>
					<input
						type="text"
						id="lessonName"
						className="block w-5/6 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 text-black"
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
						<div className="absolute top-0 right-0 flex gap-2">
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
				))}
			</div>
		</div>
	);
}
