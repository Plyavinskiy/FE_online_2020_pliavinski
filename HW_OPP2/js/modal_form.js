const initModalForm = (() => {
  function validate(title) {
    return /(^[A-Z]{1}[A-Za-z,.!?:— \\-]{5,59})$/.test(title);
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
        const {type,file,title,author,date,time,description,quote,rating} = event.target;
        const isValidTitle = validate(title.value);
        if (isValidTitle) {
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
              rating: rating.value,
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
        } else {
          title.focus();
          modalContent.style.display = 'none';
          valid.style.display = 'block';
          success.style.display = 'none';
          validHeader.textContent = `Value in field Title ${isValidTitle}`;
        }
      };
    });
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initModalForm();
  }, 500);
});
