dragula([document.getElementById("section1"), document.getElementById("section2")], {
    copy: function (el, source) {
       return source === document.getElementById("section1")
    },
    accepts: function (el, target) {
       return target !== document.getElementById("section1")
    },
 });
