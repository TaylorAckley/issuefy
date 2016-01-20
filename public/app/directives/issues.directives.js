angular.module('issuefy')
  .directive('issue', function() {
    return {
      restrict: 'E',
      template: '<div class="well"> <a href="/#/issue/{{issue.project.prefix}}-{{issue.number}}">{{issue.project.prefix}}-{{issue.number}}</a>&nbsp;{{issue.title}} </div>'
    };
  })
  .directive('issuefocus', function() {
    return {
      restrict: 'E',
      template: '<h4>Issue</h4><div class="well"> <a href="/#/issue/{{issue.project.prefix}}-{{issue.number}}">{{issue.project.prefix}}-{{issue.number}}</a>{{issue.title}} </div>'
    };
  })
  .directive('dynamicModel', ['$compile', '$parse', function ($compile, $parse) {
    return {
        restrict: 'A',
        terminal: true,
        priority: 100000,
        link: function (scope, elem) {
            var name = $parse(elem.attr('dynamic-model'))(scope);
            elem.removeAttr('dynamic-model');
            elem.attr('ng-model', name);
            $compile(elem)(scope);
        }
    };
}]);
