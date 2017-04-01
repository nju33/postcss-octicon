# PostCSS Octicon

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

Postcss plugin for [octicons](https://octicons.github.com/).

## Install

```bash
yarn add -D postcss-octicon
```

```js
postcss([octicon])
```

## Usage

### Input

```css
.foo:before {
  /*
    octicon(iconName, fillColor);
   */
  content: octicon(alert, orange);
}
```

### Output

```css
.foo:before {
  content: url(data:image/svg+xml;base64,...);
}
```

## License

The MIT License (MIT)

Copyright (c) 2017 nju33 <nju33.ki@gmail.com>
