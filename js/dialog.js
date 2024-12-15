'use strict';
(function () {

  window.dialog = {
    defaultCoords: {},
    registerEventHandlers: function (setup) {
      var setupUserPic = setup.querySelector('.upload');
      setupUserPic.setAttribute('draggable', 'true');

      window.dialog.defaultCoords.x = setup.offsetLeft;
      window.dialog.defaultCoords.y = setup.offsetTop;

      var onSetupUserPicMousedown = function (evt) {
        evt.preventDefault();

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };
        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };
          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          setup.style.left = (setup.offsetLeft - shift.x) + 'px';
          setup.style.top = (setup.offsetTop - shift.y) + 'px';
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      setupUserPic.addEventListener('mousedown', onSetupUserPicMousedown);

    }
  };

})();
