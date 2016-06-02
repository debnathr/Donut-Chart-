'use strict';


angular.module('donutChart')
    .controller('MainController', MainController)
    .directive('donutCircle', donutCircle);

MainController.$inject = ['$scope', '$rootScope', '$location', '$routeParams', 'ApiService', '$window'];

function MainController($scope, $rootScope, $location, $routeParams, ApiService, $window) {
    var vm = this;

    ApiService.getAll('data/' + dataId).then(function(response) {
        vm.data = response.data;
    
        ApiService.getAll('records/' + rollID + '/test/' + recordId).then(function(response) {
            vm.data = response.data;
            vm.marks = response.data.records.test.concat(response.data.records.exam);

            //to display the donut chart in one row
            var result = vm.marks;

            if ($(window).width() >= 700) {
                var arr = [];
                $scope.result = [];
                for (var i = 0; i < result.length; i++) {

                    arr.push(result[i]);
                    if (arr.length == 4) {
                        $scope.result.push(arr);
                        arr = [];
                    }
                    if (arr.length < 4 && i == (result.length - 1)) {
                        $scope.result.push(arr);
                    }
                }
            } else if (screen.width < 700) {
                var arr = [];
                  var result = vm.result;
                $scope.result = [];
                for (var i = 0; i < result.length; i++) {
                    arr.push(result[i]);
                    if (arr.length == 2) {
                        $scope.result.push(arr);
                        arr = [];
                    }
                    if (arr.length < 2 && i == (result.length - 1)) {
                        $scope.result.push(arr);
                    }
                }
            }

        });

    });

    vm.goback = function() {
        $window.history.back();
    }
}


function donutCircle() {
    return {
        template: '<svg><g writing-mode="tb"><circle class="innercircle" stroke-width="10" stroke="#ecf0f1" fill="none" stroke-dasharray="{{strokeGreyDasharray}}"/></circle><circle class="circle_animation" stroke-width="10" fill="none" stroke="{{stroke}}" stroke-dasharray="{{strokeDasharray}}"/><text x="50%" y="50%" class="text" font-family="sans-serif" font-size="25px" text-anchor="middle" alignment-baseline="middle">{{perct | number : 0}}%</text></circle></g></svg>',
        restrict: 'E',
        replace: true,
        scope: true,
        link: function postLink($scope, element, attrs) {
            var strokeDasharray = attrs.strokeDasharray; //our percetage input value
            $scope.perct = strokeDasharray;
            var width = element.parent().width();
            var height = element.parent().width();
            var radius = element.parent().width() * 40 / 100;
            element.parent().height(element.parent().width() + 100);
            var cy = (height / 2);
            var cx = (height / 2);

            // var strokeAcad;
            // var strokeApt;
            var stroke;

            var circumfrence = 2 * Math.PI * radius;
            $scope.strokeDasharray = (circumfrence * strokeDasharray / 100) + "," + circumfrence;
            $scope.strokeGreyDasharray = circumfrence + "," + circumfrence;

            //set the element values
            var svg = angular.element(element);
            svg.attr('width', width);
            svg.attr('height', height);

            //set the circle values
            var circles = svg.children().children();
            var greyCircle = angular.element(circles[0]);
            greyCircle.attr("r", radius);
            greyCircle.attr("cy", cy);
            greyCircle.attr("cx", cx);

            var colorCircle = angular.element(circles[1]);
            colorCircle.attr("r", radius);
            colorCircle.attr("cy", cy);
            colorCircle.attr("cx", cx);
            colorCircle.attr("stroke", stroke);

        }
    };
}
