"use client";
import { ImageUploader } from "./ImageUploader";
import { VideoUploader } from "./VideoUploader";
import { TextEditor } from "./TextEditor";
import { EditorState } from "draft-js";
import { useState } from "react";
import type { ContentBlock, ContentType } from "@/utils/types";

interface Props {
	content: ContentBlock[];
	setContent: (content: ContentBlock[]) => void;
}

export function LessonConstructor() {
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
	const handleEditorChange = (id: string, newState: EditorState) => {
		setContent((prevContent) =>
			prevContent.map((block) =>
				block.id === id ? { ...block, editorState: newState } : block
			)
		);
	};

	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [content, setContent] = useState<ContentBlock[]>([]);

	return (
		<div className="w-full h-4/5 rounded flex flex-col items-center ">
			<div className="w-full min-h-[4rem] flex flex-row justify-center items-center gap-10">
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
			<div className="w-full flex flex-col items-center overflow-y-auto  ">
				{content.map((block) => (
					<div
						key={block.id}
						className="relative w-[60rem] bg-gray-100 p-1.5 rounded-lg mt-4 shadow-md"
					>
						{/* Кнопка удаления */}
						<button
							onClick={() => removeContent(block.id)}
							className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
						>
							✕
						</button>

						{/* Компоненты в зависимости от типа */}
						{block.type === "text" && block.editorState && (
							<TextEditor
								editorState={block.editorState}
								setEditorState={(newState) =>
									handleEditorChange(block.id, newState)
								}
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
