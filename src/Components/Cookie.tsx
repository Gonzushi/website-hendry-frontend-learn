function setCookie(cookieName: any, cookieValue: any, expireDays: any) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName: any) {
    let name = cookieName + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(cookieName: any) {
    document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export { setCookie, getCookie, deleteCookie }