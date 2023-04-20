$(document).ready(function () {
    function $(id) {
        debugger
        return document.getElementById(id);
    }

    dragula([$('drag-elements'), $('drop-target')], {
        revertOnSpill: true
    }).on('drop', function (el) {
        if ($('drop-target').children.length > 0) {
            $('display').innerHTML = $('drop-target').innerHTML;
        } else {
            $('display').innerHTML = "Display";
        }
    });


});