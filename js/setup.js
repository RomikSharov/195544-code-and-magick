'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLCOLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

function getRandomNumber(min, max) {
  var rand = min + Math.floor(Math.random() * (max - min + 1));
  return rand;
}

function getRandValue(arr, counter) { // { start: 1, end: 2}
  var index = getRandomNumber(counter.start, counter.end);
  var tmp = arr[index];
  arr[index] = arr[0];
  arr[0] = tmp;
  return tmp;
}

var wizards = [];
(function createWizards(wizardsArr) {
  var vizardsNameslength = NAMES.length;
  var vizardsCoatColorlength = COATCOLORS.length;
  var vizardsEyesColorlength = EYESCOLORS.length;
  for (var i = 0; i < 4; i++) {
    var randomIndexForName = Math.floor(Math.random() * (vizardsNameslength - 1));
    wizardsArr[i] = {
      name: NAMES[randomIndexForName] + ' ' + SURNAMES[randomIndexForName],
      coatColor: COATCOLORS[Math.floor(Math.random() * (vizardsCoatColorlength - 1))],
      eyesColor: EYESCOLORS[Math.floor(Math.random() * (vizardsEyesColorlength - 1))]
    };
  }
})(wizards);

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
  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', onCloseEnterPress);
  document.addEventListener('keydown', onPopupEscPress);
}
function closePopup() {
  setup.classList.add('hidden');
  setupClose.removeEventListener('click', closePopup);
  setupClose.removeEventListener('keydown', closePopup);
  document.addEventListener('keydown', onPopupEscPress);
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
    fill = getRandValue(COATCOLORS, {start: 0, end: COATCOLORS.length - 1});
  } else if (evt.target === wizardEyes) {
    fill = getRandValue(EYESCOLORS, {start: 0, end: EYESCOLORS.length - 1});
  } else if (evt.target === wizardFireball) {
    wizardFireball.style['background-color'] = getRandValue(FIREBALLCOLORS, {start: 0, end: FIREBALLCOLORS.length - 1});
  }
  evt.target.style.fill = fill;
}
function onFireballClick() {
  wizardFireball.style['background-color'] = getRandValue(FIREBALLCOLORS, {start: 0, end: FIREBALLCOLORS.length - 1});
}
//  *************************/
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', openPopup);

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
wizardCoat.addEventListener('click', onWizardClick);
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
wizardEyes.addEventListener('click', onWizardClick);
var wizardFireball = document.querySelector('.setup-fireball-wrap');
wizardFireball.addEventListener('click', onFireballClick);
