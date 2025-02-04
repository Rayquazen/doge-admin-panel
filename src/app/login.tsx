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

		router.push("/adminPanel");

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
		<div className="flex flex-col items-center justify-center  min-h-screen bg-[#FFF2E1] p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<div
				id="login"
				className="w-80 h-96 bg-[#EAD8C0] rounded shadow flex flex-col justify-between p-3"
			>
				<form
					className="text-[#A79277]"
					action=""
					method="post"
					onSubmit={submit}
				>
					<fieldset className="border-4 border-dotted border-[#A79277] p-5">
						<legend className="px-2 italic -mx-2">Welcome again!</legend>
						<label
							className="text-xs font-bold after:content-['*'] after:text-red-400"
							htmlFor="email"
						>
							Mail{" "}
						</label>
						<input
							className="w-full p-2 mb-4 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label
							className="text-xs font-bold after:content-['*'] after:text-red-400"
							htmlFor="password"
						>
							Password{" "}
						</label>
						<input
							className="w-full p-2 mb-4 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<a
							href="#"
							className="block text-right text-xs text-indigo-500 text-right mb-12"
						>
							Forgot Password?
						</a>
						<button className="w-full rounded bg-[#A79277] text-indigo-50 p-3 text-center font-bold hover:bg-[#D1BB9E]">
							Log In
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
