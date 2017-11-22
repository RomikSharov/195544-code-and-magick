'use strict';

var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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

var startDialog = document.querySelector('.setup');
startDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(createSimilarListDomElement(wizards));
document.querySelector('.setup-similar').classList.remove('hidden');
