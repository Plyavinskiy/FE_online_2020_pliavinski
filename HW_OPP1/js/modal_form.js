const initModalForm = (() => {
  function validateTitle(title) {
    if (typeof title !== 'string') {
      return 'Incorrect input data';
    }

    if (title.length < 2 || title.length > 20) {
      return 'INVALID';
    }

    const allowedSymbols = [' ', '!', ':', '-', '?', '.', ','];

    const isValidChars = !title.split('').filter((char, index) => {
      const letterUnicodeNumber = char.codePointAt();
      if (!index) {
        return (letterUnicodeNumber < 65 || letterUnicodeNumber > 90);
      }
      return ((letterUnicodeNumber < 65 || letterUnicodeNumber > 122) && !allowedSymbols.includes(char));
    }).length;

    return isValidChars ? 'VALID' : 'INVALID';
  }

  fetch('./modal_form.html')
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML('beforeend', data);
    })
    .then(() => {
      const modalForm = document.getElementById('modalForm');
      const openModal = document.getElementById('open_modal');
      const close = document.getElementsByClassName('close')[0];
      const modalContent = document.getElementsByClassName('modal-content')[0];
      const success = document.getElementById('success');
      const closeSuccess = document.getElementById('closeSuccess');

      openModal.onclick = function () {
        modalForm.style.display = 'block';
      };

      closeSuccess.onclick = function () {
        modalForm.style.display = 'none';
        modalContent.style.display = 'block';
        success.style.display = 'none';
      };
      close.onclick = function () {
        modalForm.style.display = 'none';
      };

      document.getElementById('form').onsubmit = (event) => {
        event.preventDefault();
        const type = event.target.type.value;
        const fileUrl = event.target.file.value;
        const title = event.target.title.value;
        const author = event.target.author.value;
        const date = event.target.date.value;
        const time = event.target.time.value;
        const description = event.target.description.value;
        const quote = event.target.quote.value;
        const isValidTitle = validateTitle(event.target.title.value);
        if (isValidTitle !== 'VALID') {
          event.target.title.focus();
          alert(`${isValidTitle} title, please write fine valid Title`);
        } else if (isValidTitle === 'VALID') {
          fetch('http://localhost:3000/api/create-article', {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            method: 'POST',
            body: JSON.stringify({
              user: author,
              date,
              time: `${time} min read`,
              avatar: './img/blog/user.png',
              preview: fileUrl,
              comments: '',
              header: title,
              description,
              video: type === 'video',
              melody: type === 'melody',
              picture: type === 'picture',
              text: type === 'text',
              quote,
            }),
          })
            .then(() => {
              modalContent.style.display = 'none';
              success.style.display = 'block';
              event.target.reset();
            });
        }
      };
    });
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initModalForm();
  }, 500);
});
