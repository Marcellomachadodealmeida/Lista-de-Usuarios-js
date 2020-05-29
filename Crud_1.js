window.addEventListener('load', start);

var ListaDeNomes = [];
var NomesAdd = null;
var isEditing = false;
var currentIndex = null;

function start() {
  NomesAdd = document.querySelector('#name1');
  NomesAdd.focus();

  var form = document.querySelector('.Form1');
  form.addEventListener('submit', PreventPage);

  function PreventPage(event) {
    event.preventDefault();
  }

  CaptureImputName();
}

function CaptureImputName() {
  NomesAdd.addEventListener('keyup', handleCapture);

  function uptdateName(newName) {
    ListaDeNomes[currentIndex] = newName;
  }

  function handleCapture(event) {
    // torna uma valor verdadeira mente true ou valor falsamente falso
    var eventNull = !!event.target.value && event.target.value.trim() !== '';

    if (!eventNull) {
      clearinput();
      return;
    }

    if (event.key === 'Enter') {
      if (isEditing) {
        uptdateName(event.target.value);
        render();
      } else {
        ListaDeNomes.push(event.target.value);
        render();
      }

      isEditing = false;
      clearinput();
    }
  }
}

function render() {
  var ListName = document.querySelector('#name2');
  ListName.innerHTML = ' ';

  function creatdeletename(event) {
    var button = document.createElement('button');
    button.addEventListener('click', deleteName);
    function deleteName() {
      ListaDeNomes.splice(event, 1);
      render();
    }
    return button;
  }

  function creatSpan(currentName, index) {
    function EditSpanList() {
      NomesAdd.value = currentName;
      NomesAdd.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clicavel');
    span.textContent = currentName;
    span.addEventListener('click', EditSpanList);

    return span;
  }

  var ul = document.createElement('ul');

  for (i = 0; i < ListaDeNomes.length; i++) {
    var currentName = ListaDeNomes[i];

    var li = document.createElement('li');

    var button = creatdeletename(i);
    var span = creatSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  ListName.appendChild(ul);
  clearinput();
}

function clearinput() {
  NomesAdd.value = '';
  NomesAdd.focus();
}
