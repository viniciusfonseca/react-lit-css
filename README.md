react-lit-css
=============

Small library with a React hook and utils for component styling with tagged template literals

__Demo:__ https://codesandbox.io/s/lit-css-jzgzy

## Usage

First install it with `npm` or `yarn`:

```
$ npm install --save react-lit-css
```

Then use it in your React components. Import the `css` tagged template function (which is also a hook) and write CSS with it. It returns an unique `className` with scoped CSS rules. Note that if you want to apply the class rules, you have to specify the `:host` pseudo-selector:

```jsx
import React from 'react'
import { css } from 'react-lit-css'

function App() {

    const rootClass = css`
        :host {
            background-color: #001D7F;
            border-radius: 12px;
            padding: 16px;
        }
        :host span {
            font-size: 24px;
            font-weight: bold;
            color: #FFF;
        }
    `

    return (
        <div className={rootClass}>
            <span> Hello React Lit CSS </span>
        </div>
    )
}
```

If you use VSCode, you can install the [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=mf.vscode-styled-components) plugin for CSS syntax highlight.

Under the hood, it only replaces all occurences of `:host` by the `className` in the CSS literal, injecting it into a `style` HTML Element and appending it to the DOM. Note that it also invokes a effect hook that watches the CSS literal, and updates its `style` element when changed.

You can even create an object with several rules:

```jsx
const classes = {
    container: css`
        :host {
            background-color: #001D7F;
            border-radius: 12px;
            padding: 16px;
        }
    `,
    content: css`
        :host {
            font-size: 24px;
            font-weight: bold;
            color: #FFF;
        }
    `
}

return (
    <div className={classes.container}>
        <span className={classes.content}> Hello React Lit CSS </span>
    </div>
)
```

Other pseudo-selectors as well as media queries are also supported. Animation keyframes are also scoped:

```jsx
const rootClass = css`
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0px);
        }
    }
    :host {
        background-color: #001D7F;
        border-radius: 12px;
        padding: 16px;
        animation-name: fade-in;
        animation-duration: 300ms;
    }
    :host:hover {
        background-color: #FFF;
    }
    :host:hover span {
        background-color: #000;
    }
    :host span {
        font-size: 24px;
        font-weight: bold;
        color: #FFF;
    }
    @media (max-width: 400px) {
        :host span {
            font-size: 18px;
        }
    }
`
```