'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLCOLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var similarListElement = document.querySelector('.setup-similar-list');

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  //  ************************* module5-task2
  var artifactsShop = document.querySelector('.setup-artifacts-shop');
  var bag = document.querySelector('.setup-artifacts');
  var draggedItem = null;
  //  *********************

  var wizards = [];
  var createWizards = function () {
    var vizardsNameslength = NAMES.length;
    var vizardsCoatColorlength = COATCOLORS.length;
    var vizardsEyesColorlength = EYESCOLORS.length;
    var wizardsArr = [];
    for (var i = 0; i < 4; i++) {
      var randomIndexForName = Math.floor(Math.random() * (vizardsNameslength - 1));
      wizardsArr[i] = {
        name: NAMES[randomIndexForName] + ' ' + SURNAMES[randomIndexForName],
        coatColor: COATCOLORS[Math.floor(Math.random() * (vizardsCoatColorlength - 1))],
        eyesColor: EYESCOLORS[Math.floor(Math.random() * (vizardsEyesColorlength - 1))]
      };
    }
    return wizardsArr;
  };
  wizards = createWizards();

  var createWizardDomElement = function (wizard) {
    var wizardDomElement = document.querySelector('#similar-wizard-template').content.cloneNode(true);

    wizardDomElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardDomElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardDomElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardDomElement;
  };

  var createSimilarListDomElement = function (wizardsArr) {
    var fragment = document.createDocumentFragment();
    var wizardsArrLength = wizardsArr.length;
    for (var i = 0; i < wizardsArrLength; i++) {
      fragment.appendChild(createWizardDomElement(wizardsArr[i]));
    }
    return fragment;
  };
  //  ******************************
  function openPopup(evt) {
    if ('keyCode' in evt) {
      if (evt.keyCode !== ENTER_KEYCODE) {
        return;
      }
    }
    setup.classList.remove('hidden');

    if (similarListElement.children.length === 0) {
      similarListElement.appendChild(createSimilarListDomElement(wizards));
      document.querySelector('.setup-similar').classList.remove('hidden');
    }

    setupClose.addEventListener('click', closePopup);
    setupClose.addEventListener('keydown', onCloseEnterPress);
    document.addEventListener('keydown', onPopupEscPress);

    window.dialog.registerEventHandlers(setup);
  }
  function closePopup() {
    setup.classList.add('hidden');
    setupClose.removeEventListener('click', closePopup);
    setupClose.removeEventListener('keydown', closePopup);
    document.addEventListener('keydown', onPopupEscPress);

    setup.style.left = (window.dialog.defaultCoords.x) + 'px';
    setup.style.top = (window.dialog.defaultCoords.y) + 'px';
  }
  function onPopupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (!document.activeElement.classList.contains('setup-user-name')) {
        closePopup();
      }
    }
  }
  function onCloseEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  }
  function onWizardClick(evt) {
    var fill;
    if (evt.target === wizardCoat) {
      fill = window.utils.getRandValue(COATCOLORS, {start: 0, end: COATCOLORS.length - 1});
    } else if (evt.target === wizardEyes) {
      fill = window.utils.getRandValue(EYESCOLORS, {start: 0, end: EYESCOLORS.length - 1});
    } else if (evt.target === wizardFireball) {
      wizardFireball.style['background-color'] = window.utils.getRandValue(FIREBALLCOLORS, {start: 0, end: FIREBALLCOLORS.length - 1});
    }
    evt.target.style.fill = fill;
  }
  function onFireballClick() {
    wizardFireball.style['background-color'] = window.utils.getRandValue(FIREBALLCOLORS, {start: 0, end: FIREBALLCOLORS.length - 1});
  }

  //  ************************* module5-task2
  function dragItem(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);

      bag.style['outline'] = '2px dashed red';

    }
  }
  function dragover(evt) {
    evt.preventDefault();
    return false;
  }
  function bagEnter(evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  }

  function bagLeave(evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  }
  function bagDrop(evt) {
    if (evt.target.tagName.toLowerCase() !== 'img') {
      evt.target.style.backgroundColor = '';
      evt.target.appendChild(draggedItem);
      evt.preventDefault();

      bag.style['outline'] = '';


      if (!artifactsShop.querySelector('img')) {
        var parent = artifactsShop.querySelector('.setup-artifacts-cell');
        var copyDraggedItem = draggedItem.cloneNode(true);
        parent.appendChild(copyDraggedItem);
      }
    }
  }
  //  *****************************
  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', openPopup);

  wizardCoat.addEventListener('click', onWizardClick);
  wizardEyes.addEventListener('click', onWizardClick);
  wizardFireball.addEventListener('click', onFireballClick);

  //  ************************* module5-task2
  artifactsShop.addEventListener('dragstart', dragItem);
  bag.addEventListener('dragover', dragover);
  bag.addEventListener('dragenter', bagEnter);
  bag.addEventListener('dragleave', bagLeave);
  bag.addEventListener('drop', bagDrop);
  bag.addEventListener('dragstart', dragItem);
})();
