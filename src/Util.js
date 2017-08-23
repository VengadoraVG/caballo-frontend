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
    }
  };
})();

export default Util;
