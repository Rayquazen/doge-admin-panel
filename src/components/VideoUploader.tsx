import { useState } from "react";

export function VideoUploader() {
	const [video, setVideo] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setVideo(URL.createObjectURL(file));
		}
	};

	return (
		<div className="flex flex-col items-center">
			{video ? (
				<video
					src={video}
					controls
					className="w-full h-60 object-cover rounded"
				/>
			) : (
				<label className="w-full h-60 border-2 border-dashed border-gray-400 flex flex-col justify-center items-center cursor-pointer">
					<span className="text-gray-500">Загрузите видео</span>
					<input
						type="file"
						accept="video/*"
						onChange={handleFileChange}
						className="hidden"
					/>
				</label>
			)}
		</div>
	);
}
