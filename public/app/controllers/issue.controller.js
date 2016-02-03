;(function() {

    angular
      .module('issuefy')
      .controller('IssueCtrl', IssueCtrl)
      .controller('NewIssueCtrl', NewIssueCtrl);

    IssueCtrl.$inject = ['$scope', '$http', '$location', '$stateParams', '$sanitize', 'LocalStorage', 'QueryService', 'Issues', 'Projects', 'projectContext', 'toastr'];
    NewIssueCtrl.$inject = ['$scope', '$http', '$location', '$stateParams', '$state', 'LocalStorage', 'QueryService', 'Issues', 'Projects', 'Upload', 'cloudinary', 'toastr', 'Tags'];


    function IssueCtrl($scope, $http, $location, $stateParams, $sanitize, LocalStorage, QueryService, Issues, Projects, projectContext, toastr, Tags) {

      $scope.data = {};
      $scope.fieldsData = {};

      $scope.getProjects = Projects.getProjects()
          .then(function(response) {
            $scope.projects = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });

      $scope.getIssue = Issues.getIssue(projectContext._id, $stateParams.number)
          .then(function(response) {
            console.log(response.data);
            $scope.issue = response.data;
            $scope.safeDescription = $sanitize(response.data.description);
            $scope.data.project = projectContext.prefix;
            $scope.data.fields = _.map(response.data.fields, function(field) {
              return {_id: field._id, value: field.value};
          });
           _.map(response.data.fields, function(field) {
            return $scope.fieldsData[field._id].push(field.value);
        });
          console.log($scope.data.fields);
          $scope.fieldsObj = response.data.fields;
          console.log($scope.fieldsObj);
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });
    }

    function NewIssueCtrl($scope, $http, $location, $stateParams, $state, LocalStorage, QueryService, Issues, Projects, Upload, cloudinary, toastr, Tags) {

      $scope.createIssue = function(mode) {
        console.log($scope.data);
        var fieldsCleaned =  _.map($scope.fieldsData, function(value, _id) {
            return { _id: _id, value: value };
            });

        var tagsCleaned = _.map($scope.data.tags, '_id');
        console.log(tagsCleaned);

        var issueObj = {
          title: $scope.data.title,
          description: $scope.data.description,
          project: $scope.data.project._id,
          attachments: $scope.data.attachments,
          fields: fieldsCleaned,
          tags: tagsCleaned
        };

        Issues.createIssue(issueObj)
        .then(function(response) {
          console.log(response);
          toastr.success("New issue created");
          if (mode) {
          $scope.data = {};
        } else {
          $state.go('/issue/' + $scope.data.project.prefix + '-' + response.data.result.number);
        }
        })
        .catch(function(response) {
          console.log(response.data.message);
        }
        );
      };

      $scope.attachments = [];

      $scope.data = {
        project: null,
        attachments: [],
      };

      $scope.fieldsData = {};

      $scope.getProjects = Projects.getProjects()
          .then(function(response) {
            $scope.projects = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });

          $scope.getProjectFields =  function() {
          Projects.getProjectFields($scope.data.project.prefix)
              .then(function(response) {
                $scope.fieldsObj = response.data;
              })
              .catch(function(response) {
                toastr.error(response.data.message, response.status);
              });
            };

            $scope.getTags =  function() {
                return $http.get('/api/tags/autocomplete');

              };


            // cloudinary
            var d = new Date();
  $scope.imgTitle = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
  //$scope.$watch('files', function() {
  $scope.uploadFiles = function(files){
    $scope.files = files;
    if (!$scope.files) { return;}
    angular.forEach(files, function(file){
      if (file && !file .$error) {
        file.upload = Upload.upload({
          url: "https://api.cloudinary.com/v1_1/highwood-labs/upload",
          skipAuthorization: true,
          data: {
            upload_preset: 'issuefy',
            tags: 'form',
            context: 'photo=' + $scope.imgTitle,
            file: file
          }
        }).progress(function (e) {
          file.progress = Math.round((e.loaded * 100.0) / e.total);
          file.status = "Uploading... " + file.progress + "%";
        }).success(function (data, status, headers, config) {
          data.context = {custom: {photo: $scope.title}};
          file.result = data;
          $scope.data.attachments.push(data);
        }).error(function (data, status, headers, config) {
          file.result = data;
        });
      }
    });
  };
  //});

  /* Modify the look and fill of the dropzone when files are being dragged over it */
  $scope.dragOverClass = function($event) {
    var items = $event.dataTransfer.items;
    var hasFile = false;
    if (items !== null) {
      for (var i = 0 ; i < items.length; i++) {
        if (items[i].kind === 'file') {
          hasFile = true;
          break;
        }
      }
    } else {
      hasFile = true;
    }
    return hasFile ? "dragover" : "dragover-err";
  };

      ////////////  function definitions


      /**
       * Load some data
       * @return {Object} Returned object
       */
      // QueryService.query('GET', 'posts', {}, {})
      //   .then(function(ovocie) {
      //     self.ovocie = ovocie.data;
      //   });
    }
  })();
