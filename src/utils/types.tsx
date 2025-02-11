import { EditorState } from "draft-js";

export type ContentType = "text" | "image" | "video";

export type Tab =
	| "Создать курс"
	| "Создать модуль"
	| "Создать урок"
	| "Список всех материалов";

// Объект получаемых модулей
export interface module {
	id: number;
	name: string;
}
// Объект получаемых курсов
export interface course {
	id: number;
	name: string;
	with_modules: boolean;
}

// Объект контента в конструкторе
export interface ContentBlock {
	id: string;
	type: ContentType;
	value?: string;
	editorState?: EditorState;
}

export interface LoginResponse {
	access_token: string;
	refresh_token: string;
}

// Объект получаемых всех материалов
export interface AllContent {
	id: number;
	CourseName: string;
	ModuleName: string;
	LessonName: string;
	price: number;
}
