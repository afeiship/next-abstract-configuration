(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var NxDataOperator = nx.DataOperator || require('@jswork/next-object-operator');
  var nxDeepEach = nx.deepEach || require('@jswork/next-deep-each');
  var nxDeepAssign = nx.deepAssgin || require('@jswork/next-deep-assign');
  var nxSecretTmpl = nx.secretTmpl || require('@jswork/next-secret-tmpl');
  var fs = require('fs');
  var DEFAULT_OPTIONS = { path: '', context: nx.noop };
  var VAR_RE = /\${{(.*?)}}/;

  var NxAbstractConfiguration = nx.declare('nx.AbstractConfiguration', {
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, DEFAULT_OPTIONS, this.defaults(), inOptions);
        this.reload();
      },
      'set,sets,get,gets': function (name) {
        return function () {
          var ctx = this.operator;
          return ctx[name].apply(ctx, arguments);
        };
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
        return null;
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
            parent[key] = nxSecretTmpl(value, ctx) || value;
          }
        });
      },
      context: function () {
        return nxDeepAssign(
          {
            env: process.env
          },
          this.data,
          this.options.context()
        );
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAbstractConfiguration;
  }
})();
