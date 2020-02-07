/**
 *
 * @function css Takes a CSS string as input and converts it to a CSSStyleDelcaration type object.
 *
 * @param  {...string} parts
 * @returns {CSSStyleDeclaration}
 *
 * @example
 * const FancyDiv = ({ children }) =>
 *  <div style={
 *      css`{
 *          border-radius: 3px;
 *          background-color: #001D7F;
 *          color: #FFF;
 *      }`
 *  }>
 *      { children }
 *  </div>
 *
 * const someStyle = css`{
 *  color: #00F;
 *  font-weight: bold;
 * }`
 * --> { color: "00F", fontWeight: "bold" }
 *
 */

export function createStyle(str) {
    if (typeof str !== "string") str = String.raw(str);

    function* compile(input) {
        let match, key, value;
        const ruleRe = /([a-z-]+):([^;}]+);?/g;
        while (true) {
            match = ruleRe.exec(input);
            if (!match) {
                return;
            }
            [, key, value] = match;
            key = key.trim();
            value = value.trim();
            yield [key, value];
        }
    }

    function toCamelCase(input) {
        return input.replace(/-\w/gi, m => m.replace("-", "").toUpperCase());
    }

    const declaration = {};
    for (const [key, value] of compile(str)) {
        declaration[toCamelCase(key)] = value;
    }
    return declaration;
}

createStyle.css = (...str) => createStyle(String.raw(...str));
