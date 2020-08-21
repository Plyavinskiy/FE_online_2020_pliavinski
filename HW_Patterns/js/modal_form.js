const initModalForm = (() => {
  // eslint-disable-next-line no-undef
  const $ = jQuery;

  function validate(title) {
    return /(^[A-Z]{1}[A-Za-z,.!?:— \\-]{5,59})$/.test(title);
  }

  function createFormData(event) {
    const {
      time,
    } = event.target;
    const formData = new FormData(event.target);
    formData.append('comments', 5);
    formData.append('avatar', './img/blog/user.png');
    formData.append('time', `${time.value} min read`);
    return formData;
  }

  function sendRequestCreatePost(formData, modalContent, success) {
    formData.delete('_id');
    fetch('http://localhost:3000/api/create-article', {
      method: 'POST',
      body: formData,
    })
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        modalContent.style.display = 'none';
        success.style.display = 'block';
        $('#form').trigger('reset');
        setTimeout(() => {
          location.href = `${location.origin}/post.html?id=${json.id}`;
        }, 1500);
      });
  }

  function sendRequestUpdatePost(formData, modalContent, success) {
    fetch(`http://localhost:3000/api/list/${formData.get('_id')}`, {
      method: 'PUT',
      body: formData,
    })
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        modalContent.style.display = 'none';
        success.style.display = 'block';
        $('#form').trigger('reset');
        setTimeout(() => {
          location.href = `${location.origin}/post.html?id=${json.id}`;
        }, 1500);
      });
  }

  fetch('./modal_form.html')
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML('beforeend', data);
    })
    .then(() => {
      const modalForm = document.getElementById('modalForm');
      const openModal = document.getElementById('open_modal');
      const close = document.getElementById('close_modal');
      const modalContent = document.getElementsByClassName('modal-content')[0];
      const success = document.getElementById('success');
      const valid = document.getElementById('valid');
      const validHeader = document.querySelector('#valid h2');
      const closeSuccess = document.getElementById('closeSuccess');
      const closeValid = document.getElementById('closeValid');

      openModal.onclick = function () {
        // eslint-disable-next-line no-undef
        $('#form').trigger('reset');
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
        const {
          header,
        } = event.target;
        const formData = createFormData(event);
        const isValidTitle = validate(header.value);
        if (isValidTitle) {
          const id = document.getElementById('_id');
          if (id.value) {
            sendRequestUpdatePost(formData, modalContent, success);
          } else {
            sendRequestCreatePost(formData, modalContent, success);
          }
        } else {
          header.focus();
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
