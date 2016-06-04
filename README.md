# Donut-Chart-

Donut chart is one of the most popular and widely used chart for displaying data. 
It looks more cool when shown with little bit of animation. 
But the problem comes when we have to design the circle without using any external library. 

I was asked to work on a dial chart with animation without using any external library during my project work at Vidyartha. 
Vidyartha is an online career guidance program for K8 to K12. I am working for the development of Version 3 website which is about to release.

In this repository I updated the HTML, CSS and JS for the development of donut chart from scratch. I used angularJS directive to design the donut chart.
It is good to design it in a directive so that it can be used anywhere throughout your project. 

/* In the index.html file I used ng-repeat to repeat the circle based on the data of JSON. 

I used the directive twice to get two diiferent color charts. There are two strokes based on the ng-if condition to display two different color dials basde on the type of data.

<body>
    <div class="margin-top-30" ng-if="vm.result">
        <div class="row" ng-repeat="r in result track by $index">
            <div class="donut col-sm-3 col-xs-6" ng-repeat="test in  r track by $index">  /* to repeat the circle */
                <donut-circle ng-if="test.school" stroke="#3498db" stroke-dasharray="{{test.securedPct | number : 1}}"></donut-circle>  /* This is the directive which you can add anywhere in your html */
                <donut-circle ng-if="exam.school" stroke="#2ecc71" stroke-dasharray="{{exam.securedPct | number : 1}}"></donut-circle>
                <ul>  // This is used to display the name below the dial.
                    <li ng-if="test.school">
                        {{test.subject.name}}
                    </li>
                    <li ng-if="exam.school">
                        {{exam.subject.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>


Coming to the directive. The following code you can add in your controller or directive to use the donut circle. 

I am calculating the width, height and radius of the circle based on the screen size to make it responsive. cx and cy is the default coordinates of svg element.
It is also calculated depending on the height and width.
I created two circles, one innercircle and one  circle_animation to show two different color circle. The data will be shown in green or blue color and the remaining portion comes in grey color.
The innercircle is the one which is grey in color. So, I kept the stroke color as grey which is stroke="#ecf0f1". 
The circumference of innercircle is always the full circumference and hence is calculated as shown below - strokeGreyDasharray.
The circumference of colored or our data circle is calculated as strokeDasharray. The value of strokeDasharray is set from the html. 


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


Hope it helps those who wants some insight to create donut circle or dial chart from scratch. 
