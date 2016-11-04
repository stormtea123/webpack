webpack
===============

```js
require.ensure(["./lib/fundCity.json"], function(require) {
    var area = require("./lib/fundCity.json");
},"fundCity");
```
