angular.module('issuefy')
  .directive('issue', function() {
    return {
      restrict: 'E',
      template: '<div class="well"> <a href="/#/issue/{{issue.project_docs[0].prefix}}-{{issue.number}}">{{issue.project_docs[0].prefix}}-{{issue.number}}</a>&nbsp;{{issue.title}} </div>'
    };
  })
  .directive('issuefocus', function() {
    return {
      restrict: 'E',
      template: '<h4>Issue</h4><div class="well"> <a href="/#/issue/{{issue.project.prefix}}-{{issue.number}}">{{issue.project.prefix}}-{{issue.number}}</a>{{issue.title}} </div>'
    };
  });
