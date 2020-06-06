(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataOperator = nx.DataOperator || require('@feizheng/next-object-operator');
  var fs = require('fs');
  var DEFAULT_OPTIONS = { path: '' };

  var NxAbstractConfiguration = nx.declare('nx.AbstractConfiguration', {
    methods: {
      init: function (inOptions) {
        this.options = nx.mix(null, this.defaults(), inOptions);
        this.data = this.load();
        this.operator = new NxDataOperator(this.data);
      },
      'set,sets,get,gets': function (name) {
        return function () {
          var ctx = this.operator;
          return ctx[name].apply(ctx, arguments);
        }
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
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAbstractConfiguration;
  }
})();
