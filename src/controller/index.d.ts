interface StandardResponseBody<T = any>{
    status: "success" | "error" | "system error",
    msg: string,
    content?: T
}