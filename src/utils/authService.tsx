import router from "next/router";

const API_HOST = process.env.NEXT_PUBLIC_APP_HOSTNAME;

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const setTokens = (accessToken: string, refreshToken: string) => {
	localStorage.setItem("accessToken", accessToken);
	localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
	window.location.href = "/"; // Перенаправляем на страницу логина
};

// Функция обновления токена
export const refreshTokens = async () => {
	const refreshToken = getRefreshToken();
	if (!refreshToken) {
		clearTokens();
		throw new Error("No refresh token available");
	}

	try {
		const res = await fetch(`${API_HOST}/refresh`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refresh_token: refreshToken }),
		});

		if (!res.ok) {
			clearTokens();
			throw new Error("Failed to refresh token");
		}

		const data = await res.json();
		setTokens(data.access_token, data.refresh_token);
		return data.access_token;
	} catch (err) {
		clearTokens();
		throw err;
	}
};

// Функция запроса с автообновлением токена
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
	let accessToken = getAccessToken();
	if (!accessToken) {
		clearTokens();
		throw new Error("No access token available");
	}

	const authHeaders = {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
		...options.headers,
	};

	try {
		const response = await fetch(url, { ...options, headers: authHeaders });

		// Если access_token истёк — пробуем обновить
		if (response.status === 401) {
			accessToken = await refreshTokens();

			const retryHeaders = {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
				...options.headers,
			};

			// Повторяем запрос с обновлённым токеном
			return await fetch(url, { ...options, headers: retryHeaders });
		}

		return response;
	} catch (err) {
		clearTokens();
		throw err;
	}
};
