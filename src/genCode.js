export const genCode = (function () {
    var c = 0

    return function () {
        return (+new Date() - +new Date("2019-01-01") + c++)
            .toString(16)
            .split("")
            .reverse()
            .join("")
            .toUpperCase()
    }
})()
