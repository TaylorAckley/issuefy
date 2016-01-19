;(function() {

    angular
      .module('issuefy')
      .controller('IssueCtrl', IssueCtrl)
      .controller('NewIssueCtrl', NewIssueCtrl);

    IssueCtrl.$inject = ['$scope', '$http', '$location', '$stateParams', 'LocalStorage', 'QueryService', 'Issues', 'Projects', 'projectContext'];
    NewIssueCtrl.$inject = ['$scope', '$http', '$location', '$stateParams', 'LocalStorage', 'QueryService', 'Issues', 'Projects', 'Upload', 'cloudinary'];


    function IssueCtrl($scope, $http, $location, $stateParams, LocalStorage, QueryService, Issues, Projects, projectContext) {
      $scope.getIssue = Issues.getIssue(projectContext._id, $stateParams.number)
          .then(function(response) {
            console.log(response.data);
            $scope.issue = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });
    }

    function NewIssueCtrl($scope, $http, $location, $stateParams, LocalStorage, QueryService, Issues, Projects, Upload, cloudinary) {

      $scope.attachments = [];

      $scope.data = {
        project: null,
        attachments: []
      };

      $scope.getProjects = Projects.getProjects()
          .then(function(response) {
            console.log(response.data);
            $scope.projects = response.data;
          })
          .catch(function(response) {
            toastr.error(response.data.message, response.status);
          });

          $scope.getProjectFields =  function() {
            console.log($scope.data.project);
          Projects.getProjectFields($scope.data.project.prefix)
              .then(function(response) {
                console.log(response.data);
                $scope.fieldsObj = response.data;
              })
              .catch(function(response) {
                toastr.error(response.data.message, response.status);
              });
            };


            // cloudinary
            var d = new Date();
  $scope.imgTitle = "Image (" + d.getDate() + " - " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")";
  //$scope.$watch('files', function() {
  $scope.uploadFiles = function(files){
    $scope.files = files;
    if (!$scope.files) return;
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
