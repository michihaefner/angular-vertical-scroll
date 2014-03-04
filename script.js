// Code goes here
var app = angular.module('myApp', []);

app.directive('mhVerticalScroll', function() {
  return {
    restrict: 'A',
    compile: function(el,attrs) {
      //scrollbar
      var scrollbar = $('<div class="mh-scrollbar">');
      var scroller = $('<div class="mh-scroller">');
      
      var parent = el.parent();
      var width = parent.width();
      
      // calculate the real width
      el.css({"position": "absolute"});
      var realWidth = el.width();
      
      parent.css({
        "position": "relative",
        "overflow": "hidden"
      });
      
      el.css({
        "position": "relative",
        "display": "block",
        "width": realWidth
      });
      
      var scrollerWidth = width*width/realWidth;
      scroller.css({"width": scrollerWidth});
      
      scrollbar.append(scroller);
      parent.append(scrollbar);
      
      return function(scope,elem,attrs) {
        //linking function here
        
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
        parent.bind("touchstart", function(ev) {
          $.data(parent, "verticalScroll", true);
          $.data(parent, "startX", ev.pageX );
        });
        
        parent.bind("touchmove", function(ev) {
          if ( $.data(parent, "verticalScroll") ) {
            
            var x = ev.pageX - $.data(parent, "startX");
            $.data(parent, "startX", ev.pageX );
            
            slideVertical(x);
          }
        });
        
        parent.bind("touchend", function(ev) {
          $.data(parent, "verticalScroll", false);
        });
        
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
})
