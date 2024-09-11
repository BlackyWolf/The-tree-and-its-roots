export function isFormRequest(request: Request) {
    return request.headers.get("Content-Type")?.includes("multipart/form-data")
        || request.headers.get("Content-Type")?.includes("application/x-www-form-urlencoded");
}

export function isJsonRequest(request: Request) {
    return request.headers.get("Content-Type")?.includes("text/json")
        || request.headers.get("Content-Type")?.includes("application/json");
}

export function isStaticContent(url: string) {
    const requestUrl = new URL(url);

    return requestUrl.pathname.startsWith("/icons")
        || requestUrl.pathname.startsWith("/images")
        || requestUrl.pathname === "/styles.css"
        || requestUrl.pathname === "/favicon.ico";
}
