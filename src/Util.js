var Util = (() => {
  return {
    add (a, b, polarity = 1) {
      var r = {
        x: a.x + b.x * polarity,
        y: a.y + b.y * polarity
      };
      return r;
    },

    dot (a, b) {
      return a.x * b.x + a.y * b.y;
    },

    scale (vector, scalar) {
      return {
        x: vector.x * scalar,
        y: vector.y * scalar
      };
    },

    magnitude (v) {
      return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2), 2);
    },

    isInBox (a, b, point) {
      return Math.min(a.x, b.x) < point.x &&
        point.x < Math.max(a.x, b.x) &&
        Math.min(a.y, b.y) < point.y &&
        point.y < Math.max(a.y, b.y);
    }
  };
})();

export default Util;
