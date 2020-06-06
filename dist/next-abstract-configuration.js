/*!
 * name: @feizheng/next-abstract-configuration
 * description: Abstract configuration.
 * homepage: https://github.com/afeiship/next-abstract-configuration
 * version: 1.0.0
 * date: 2020-06-06T03:23:05.853Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataOperator = nx.DataOperator || require('@feizheng/next-object-operator');


  var NxAbstractConfiguration = nx.declare('nx.AbstractConfiguration', {
    methods: {
      init: function (inOptions) {
        this.initOptions(inOptions);
        this.data = this.__load__();
        this.operator = new NxDataOperator(this.data);
      },
      'set,sets,get,gets': function (name) {
        var self = this;
        return function () {
          self.operator[name].apply(arguments);
        }
      },
      update: function (inObject) {
        this.sets(inObject);
        this.save();
      },
      save: function () {
        var str = this.__dump__();
        fs.writeFileSync(this.options.path, str);
      },
      initOptions: function (inOptions) {
        // @ template method
        this.options = inOptions;
      },
      __load__: function () {
        // @ template method
        return null;
      },
      __dump__: function () {
        // @ template method
        return '';
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAbstractConfiguration;
  }
})();

//# sourceMappingURL=next-abstract-configuration.js.map
