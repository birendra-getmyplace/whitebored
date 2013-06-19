'use strict';

angular.module('wb').service('$canvas', [
  function() {
    var canvas = $("canvas")

    var self = this;
    self.element = canvas;
    self.context = canvas[0].getContext("2d")

    // Line styles
    self.context.strokeStyle = "#000"
    self.context.lineCap = "round"
    self.context.lineWidth = 2;

    // Text styles
    self.context.textAlign = "left"
    self.context.textBaseline = "bottom"
    self.context.font = "bold 24px Helvetica"

    this.startLine = function(point) {
      self.context.beginPath()
      self.context.moveTo(point.x, point.y)
    }

    this.drawSegment = function(point) {
      self.context.lineTo(point.x, point.y)
      self.context.stroke()
    }

    this.drawText = function(string, point) {
      self.context.fillText(string, point.x, point.y);
    }

    this.endLine = function() {
      self.context.closePath()
    }

    this.drawLine = function(points) {
      self.startLine(points[0], self.context)
      points.slice(1).forEach(function(point) {
        self.drawSegment(point, self.context)
      })
      self.endLine(self.context)
    }

    this.clear = function() {
      self.context.clearRect(0,0,canvas.width(), canvas.height())
    }

    this.cursor = function(cursorStyle) {
      self.element.attr("data-cursor", cursorStyle)
    }
  }
])
