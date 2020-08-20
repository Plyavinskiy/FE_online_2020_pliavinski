const initModalForm = (() => {
  function validateTitle(title) {
    if (typeof title !== 'string') {
      return 'Incorrect input data';
    }

    if (title.length < 2 || title.length > 20) {
      return 'INVALID';
    }

    const allowedSymbols = [' ', '!', ':', '-', '?', '.', ','];
    const disAllowedSymbols = ['[', '\\', ']', '^', '_', '`'];

    // eslint-disable-next-line complexity
    const isValidChars = !title.split('').filter((char, index) => {
      const letterUnicodeNumber = char.codePointAt();
      if (!index) {
        return (letterUnicodeNumber < 65 || letterUnicodeNumber > 90);
      }
      return disAllowedSymbols.includes(char) || ((letterUnicodeNumber < 65 || letterUnicodeNumber > 122) && !allowedSymbols.includes(char));
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
      const valid = document.getElementById('valid');
      const validHeader = document.querySelector('#valid h2');
      const closeSuccess = document.getElementById('closeSuccess');
      const closeValid = document.getElementById('closeValid');

      openModal.onclick = function () {
        modalForm.style.display = 'block';
      };

      closeSuccess.onclick = function () {
        modalForm.style.display = 'none';
        modalContent.style.display = 'block';
        success.style.display = 'none';
      };
      closeValid.onclick = function () {
        modalContent.style.display = 'block';
        success.style.display = 'none';
        valid.style.display = 'none';
      };
      close.onclick = function () {
        modalForm.style.display = 'none';
      };

      document.getElementById('form').onsubmit = (event) => {
        event.preventDefault();
        const {type,file,title,author,date,time,description,quote} = event.target;
        const isValidTitle = validateTitle(title.value);
        if (isValidTitle !== 'VALID') {
          title.focus();
          modalContent.style.display = 'none';
          valid.style.display = 'block';
          success.style.display = 'none';
          validHeader.textContent = `Value in field Title ${isValidTitle}`;
        } else if (isValidTitle === 'VALID') {
          fetch('http://localhost:3000/api/create-article', {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            method: 'POST',
            body: JSON.stringify({
              user: author.value,
              date: date.value,
              time: `${time.value} min read`,
              avatar: './img/blog/user.png',
              preview: file.value,
              comments: '',
              header: title.value,
              description: description.value,
              video: type.value === 'video',
              melody: type.value === 'melody',
              picture: type.value === 'picture',
              text: type.value === 'text',
              quote: quote.value,
            }),
          })
            .then((res) => {
              modalContent.style.display = 'none';
              success.style.display = 'block';
              event.target.reset();
              return res.json();
            }).then((data) => {
              setTimeout(() => {
                location.href = `${location.origin}/post.html?id=${data.id}`;
              }, 1500);
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
