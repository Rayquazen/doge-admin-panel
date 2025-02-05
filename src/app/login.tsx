"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		router.push("/adminPanel"); // убрать отсюда после подключения бэка

		// // Апишка с env
		// const apiUrl = "ourAPI";

		// // Проверка на валидность полей (email, password)
		// // Если нет, показывать ошибки в полях
		// const response = await fetch(`${apiUrl}/login`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({ email: email, password: password }),
		// })
		// 	.then((response) => {
		// 		if (response.ok) {
		// 			router.push("/adminPanel");
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error("An error occurred", error);
		// 	});
	};

	return (
		<div className="flex flex-col items-center justify-center text-lg min-h-screen bg-[#FFF2E1] p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<div
				id="login"
				className="w-1/4 h-[30rem] bg-[#EAD8C0] rounded shadow flex flex-col  p-3"
			>
				<form
					className="text-[#A79277]"
					action=""
					method="post"
					onSubmit={submit}
				>
					<fieldset className="border-4 border-dotted border-[#A79277] p-7">
						<legend className="px-2 italic -mx-2">Welcome again!</legend>
						<label
							className="text-base font-bold after:content-['*'] after:text-red-400"
							htmlFor="email"
						>
							Mail{" "}
						</label>
						<input
							className="w-full p-2 mb-10 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label
							className="text-base font-bold after:content-['*'] after:text-red-400"
							htmlFor="password"
						>
							Password{" "}
						</label>
						<input
							className="w-full p-2 mb-10 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>

						<button className="w-full mt-20 rounded bg-[#A79277] text-indigo-50 p-3 text-center font-bold hover:bg-[#D1BB9E]">
							Log In
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
