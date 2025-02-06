import { EditorState } from "draft-js";

export type ContentType = "text" | "image" | "video";

export type Tab = "Создать курс" | "Создать модуль" | "Создать урок";

export interface module {
	id: number;
	name: string;
}
export interface course {
	id: number;
	name: string;
}

export interface ContentBlock {
	id: string;
	type: ContentType;
	value?: string;
	editorState?: EditorState;
}
