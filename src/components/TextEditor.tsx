"use client";

import { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

interface TextEditorProps {
	editorState: EditorState;
	setEditorState: (state: EditorState) => void;
}

export function TextEditor({ editorState, setEditorState }: TextEditorProps) {
	const handleKeyCommand = (command: string) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			setEditorState(newState);
			return "handled";
		}
		return "not-handled";
	};

	const toggleInlineStyle = (style: string) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, style));
	};

	return (
		<div className=" border rounded-lg bg-white shadow">
			<div className="flex gap-2 border-b">
				<button
					onClick={() => toggleInlineStyle("BOLD")}
					className="p-2 rounded text-black hover:bg-gray-200"
				>
					Ж
				</button>
				<button
					onClick={() => toggleInlineStyle("ITALIC")}
					className="p-2 rounded text-black hover:bg-gray-200"
				>
					К
				</button>
				<button
					onClick={() => toggleInlineStyle("UNDERLINE")}
					className="p-2 rounded text-black hover:bg-gray-200"
				>
					П
				</button>
			</div>

			<div className="border p-2 min-h-[5rem] text-black">
				<Editor
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					onChange={setEditorState}
					placeholder="Введите текст..."
				/>
			</div>
		</div>
	);
}
