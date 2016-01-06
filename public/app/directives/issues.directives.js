angular.module('issuefy')
  .directive('issue', function() {
    return {
      restrict: 'E',
      template: 'ID: {{issue._id}} | {{issue.number}} | {{issues.title}}'
    };
  });
