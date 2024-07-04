export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const clearAccessToken = () => {
    localStorage.removeItem("accessToken");
};

export const getUsername = () => {
    return localStorage.getItem("username");
};
