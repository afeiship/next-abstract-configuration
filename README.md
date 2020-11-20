# next-abstract-configuration
> Abstract configuration.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-abstract-configuration
```

## apis
| api    | params       | description              |
| ------ | ------------ | ------------------------ |
| get    | path         | Get value from path      |
| gets   | -            | Get all values.          |
| set    | (path,value) | Set value by path.       |
| sets   | object       | Set multi value by path. |
| update | ojbect       | Set value and save.      |
| save   | -            | Save to path.            |


## usage
```js
import NxAbstractConfiguration from '@jswork/next-abstract-configuration';

// code goes here:
const conf = new NxAbstractConfiguration();
conf.set('name','@jswork/next-abstract-configuration');
conf.get('scirpts.build','gulp');
conf.sets({ name: 'fei', age: 100});
conf.gets();
```


## license
Code released under [the MIT license](https://github.com/afeiship/next-abstract-configuration/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-abstract-configuration
[version-url]: https://npmjs.org/package/@jswork/next-abstract-configuration

[license-image]: https://img.shields.io/npm/l/@jswork/next-abstract-configuration
[license-url]: https://github.com/afeiship/next-abstract-configuration/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-abstract-configuration
[size-url]: https://github.com/afeiship/next-abstract-configuration/blob/master/dist/next-abstract-configuration.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-abstract-configuration
[download-url]: https://www.npmjs.com/package/@jswork/next-abstract-configuration
