angular.module('issuefy')
  .directive('projects', function() {
    return {
      restrict: 'E',
      template: '<a href="/project/{{project.prefix}}">{{project.name}}</a>'
    };
  });
