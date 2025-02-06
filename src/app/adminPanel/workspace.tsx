"use client";

import { JSX, useState } from "react";
import MenuSelections from "@/components/menuSelectors";
import { CreateCourse } from "@/components/CreateCourse";

export function Workspace() {
	const [selectedComponent, setSelectedComponent] = useState<JSX.Element>(
		<CreateCourse />
	);
	return (
		<div className="flex flex-col items-center min-h-screen bg-[#FFF2E1] p-8  font-[family-name:var(--font-geist-sans)]">
			<div className="w-full h-[42rem] 2xl:h-[58rem] bg-[#EAD8C0] rounded shadow flex flex-row justify-between ">
				<div className="w-1/5 h-full bg-gray rounded shadow flex flex-col justify-center p-8">
					<MenuSelections onComponentSelect={setSelectedComponent} />
				</div>
				<div className="w-full max-h-full rounded shadow flex flex-col  items-center p-2">
					{selectedComponent}
				</div>
			</div>
		</div>
	);
}
