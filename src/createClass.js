import { genCode } from "./genCode"

export function createClass(str) {
    if (typeof str !== "string") str = String.raw(str)

    const className = `_${genCode()}`
    const styleElement = document.createElement("style")

    function appendStyle(css) {
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css
        } else {
            styleElement.innerHTML = css
        }

        document.getElementsByTagName("head")[0].appendChild(styleElement)
    }

    function updateStyle(css) {
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = css
        } else {
            styleElement.innerHTML = ""
            styleElement.appendChild(document.createTextNode(css))
        }
    }

    function replaceHost(str) {
        return str.replace(/:host(.*)?{/g, (_, rest) => `.${className}${rest}{`)
    }

    function scopeAnimationNames(str) {
        const animationNames = []
        str = str.replace(/@keyframes\s+(.*)?\s?{/, (_, animation) => {
            animation = animation.trim()
            animationNames.push(animation)
            return `@keyframes ${className}_${animation} {`
        })
        if (animationNames.length === 0) {
            return str
        }
        return str.replace(
            new RegExp(`(@keyframes)?\\s+(${animationNames.join("|")})`, "g"),
            (match, keyframesDec, animation) =>
                keyframesDec ? match : ` ${className}_${animation}`
        )
    }

    function preprocess(str) {
        str = replaceHost(str)
        str = scopeAnimationNames(str)
        return str
    }

    appendStyle(preprocess(str))

    return {
        className,
        renderStyle(str) {
            const css = preprocess(str)
            if (!styleElement.parentNode) {
                appendStyle(css)
            } else {
                updateStyle(css)
            }
        },
        disposeStyle() {
            styleElement.parentNode.removeChild(styleElement)
        }
    }
}

createClass.css = (...str) => createClass(String.raw(...str))
