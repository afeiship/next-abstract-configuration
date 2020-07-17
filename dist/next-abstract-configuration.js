/*!
 * name: @feizheng/next-abstract-configuration
 * description: Abstract configuration.
 * homepage: https://github.com/afeiship/next-abstract-configuration
 * version: 1.2.1
 * date: 2020-07-17T03:36:35.523Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataOperator = nx.DataOperator || require('@feizheng/next-object-operator');
  var nxDeepEach = nx.deepEach || require('@feizheng/next-deep-each');
  var nxSecretTmpl = nx.secretTmpl || require('@feizheng/next-secret-tmpl');
  var fs = require('fs');
  var DEFAULT_OPTIONS = { path: '' };
  var VAR_RE = /\${{(.*?)}}/;

  var NxAbstractConfiguration = nx.declare('nx.AbstractConfiguration', {
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, this.defaults(), inOptions);
        this.reload();
      },
      'set,sets,get,gets': function (name) {
        return function () {
          var ctx = this.operator;
          return ctx[name].apply(ctx, arguments);
        }
      },
      reload: function () {
        this.data = this.load();
        this.transform();
        this.operator = new NxDataOperator(this.data);
      },
      update: function (inObject) {
        this.sets(inObject);
        this.save();
      },
      save: function () {
        var str = this.dump();
        fs.writeFileSync(this.options.path, str);
      },
      defaults: function () {
        // @ template method
        return DEFAULT_OPTIONS;
      },
      load: function () {
        // @ template method
        return null;
      },
      dump: function () {
        // @ template method
        return '';
      },
      transform: function () {
        var ctx = this.context();
        var data = this.data;
        nxDeepEach(data, function (key, value, parent) {
          if (typeof value === 'string' && VAR_RE.test(value)) {
            parent[key] = nxSecretTmpl(value, ctx)
          }
        });
      },
      context: function () {
        return {
          env: process.env
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAbstractConfiguration;
  }
})();

//# sourceMappingURL=next-abstract-configuration.js.map
