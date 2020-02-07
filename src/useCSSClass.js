import { useEffect, useMemo } from "react"
import { createClass } from "./createClass"

export function useCSSClass(str) {
    const { className, renderStyle, disposeStyle } = useMemo(() =>
        createClass(str), []
    )

    useEffect(() => {
        renderStyle(str)
        return () => disposeStyle()
    }, [str])

    return className
}

export const css = function useCSS(...str) {
    return useCSSClass(String.raw(...str))
}
