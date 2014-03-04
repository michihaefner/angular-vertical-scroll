// Code goes here
var app = angular.module('myApp', []);

app.directive('mhVerticalScroll', [ '$window', function(  $window ) {
  return {
    restrict: 'A',
    compile: function(el,attrs) {
      //scrollbar
      var scrollbar = $('<div class="mh-scrollbar">');
      var scroller = $('<div class="mh-scroller">');
      
      var parent = el.parent();
      var width = parent.width();
      
      // calculate the real width
      var realWidth = 0;
      el.children().each(function(i) {
        realWidth += $(this).width();
      });
      
      // add a scrollbar only if the content does not fit
      if (realWidth > width) {
        parent.css({
          "position": "relative",
          "overflow": "hidden"
        });
        
        el.css({
          "position": "relative",
          "display": "block",
          "width": realWidth
        });

        scrollbar.css({
          "width": width
        });
        
        var scrollerWidth = width*width/realWidth;
        scroller.css({"width": scrollerWidth});
        
        scrollbar.append(scroller);
        parent.append(scrollbar);
      }
      return function(scope,elem,attrs) {
        //only do something if the content does not fit
        if (realWidth > width) {
          $.data(parent, "verticalScroll", false);
          
          //desktop scrolling
          parent.mousedown(function(ev) {
            $.data(parent, "verticalScroll", true);
            $.data(parent, "startX", ev.pageX );
          });
          
          parent.mousemove(function(ev) {
            if ( $.data(parent, "verticalScroll") ) {
              
              var x = ev.pageX - $.data(parent, "startX");
              $.data(parent, "startX", ev.pageX );
              
              slideVertical(x);
            }
          });
          
          parent.mouseup(function() {
            $.data(parent, "verticalScroll", false);
          });
          
          parent.mouseout(function() {
            $.data(parent, "verticalScroll", false);
          });
          
          
          //touch scrolling
          parent[0].addEventListener("touchstart", function(ev) {
            $.data(parent, "verticalScroll", true);
            $.data(parent, "startX", ev.changedTouches[0].pageX );
          });
          
          parent[0].addEventListener("touchmove", function(ev) {
            if ( $.data(parent, "verticalScroll") ) {
              
              var x = ev.pageX - $.data(parent, "startX");
              $.data(parent, "startX", ev.changedTouches[0].pageX );
              
              slideVertical(x);
            }
          });
          
          parent[0].addEventListener("touchend", function(ev) {
            $.data(parent, "verticalScroll", false);
          });
        }
        
        //slide the content vertically
        function slideVertical(x) {
          var margin = parseInt(elem.css("margin-left"));
          var newMargin = margin + x;
          var minMargin = width - realWidth;
          if (newMargin > 0) {
            newMargin = 0;
          }
          if (newMargin < minMargin) {
            newMargin = minMargin;
          }
          elem.css({"margin-left": newMargin});
          
          var scrollerMargin = width*newMargin*-1/realWidth;
          scroller.css({"margin-left": scrollerMargin});
        }
        
      };
    }
  }
}]);
