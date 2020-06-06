# next-abstract-configuration
> Abstract configuration.

## installation
```bash
npm install -S @feizheng/next-abstract-configuration
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
import NxAbstractConfiguration from '@feizheng/next-abstract-configuration';

// code goes here:
const conf = new NxAbstractConfiguration();
conf.set('name','@feizheng/next-abstract-configuration');
conf.get('scirpts.build','gulp');
conf.sets({ name: 'fei', age: 100});
conf.gets();
```
