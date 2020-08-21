(($) => {
  let methods = {
    create: (arguments) => {
      let color = methods.getColorModal(arguments.type);
      let html = `
    <div id="${arguments.id}" style="display: none;position: fixed;z-index: 1;padding-top: 100px;left: 0;top: 0;width: 100%;height: 100%;overflow: auto;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);transition: 300ms;">
      <div style="text-align:center;position: relative;background-color: #fefefe;margin: auto;padding: 0;border: 1px solid #888;width: 80%;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);max-width: 600px;">
        <div class="jqueryModalType" style=" padding: 16px;background-color: ${color};color: white;font-size: 24px;">
          <span class="close" style="color: white;float: right;font-size: 28px;font-weight: bold; cursor:pointer;" onMouseOver="this.style.color='#000'" onMouseOut="this.style.color='white'">&times;</span>
          <h2 class="jqueryModalTitle">${arguments.title}</h2>
        </div>
        <div style="padding: 2px 16px;">
          <p class="jqueryModalText" style="font-size: 18px;padding: 15px 0 0 0;">${arguments.text}</p>
        </div>
        <div style="padding: 10px 16px;color: white;">
        <button class="jqueryModalOk" onMouseOver="this.style.color='#000'" onMouseOut="this.style.color='white'" style="font-size: 24px;padding: 10px 20px;color: white;background: #5cb85c;outline: none;border: none;border-radius: 5px;cursor: pointer;width: 180px;">OK</button>
        <button class="jqueryModalCancel" onMouseOver="this.style.color='#000'" onMouseOut="this.style.color='white'" style="font-size: 24px;padding: 10px 20px;color: white;background: #ec5353;outline: none;border: none;border-radius: 5px;cursor: pointer;width: 180px;">CANCEL</button>
        </div>
      </div>
    </div>`;
      $('body').append(html);
      methods.modalOnEvents(arguments.id);
    },
    open: (arguments) => {
      $('#' + arguments.id).show();
      if (arguments) {
        methods.update(arguments);
      }
      $(`#${arguments.id} .jqueryModalOk`).off('click');
      $(`#${arguments.id} .jqueryModalOk`).click(() => {
        methods.close(arguments.id);
        if (arguments && arguments.hasOwnProperty('callback')) {
          arguments.callback(arguments.data);
        }
      });
    },
    update: (arguments) => {
      $(`#${arguments.id} .jqueryModalType`).css("background-color", methods.getColorModal(arguments.type));
      $(`#${arguments.id} .jqueryModalTitle`).text(arguments.title);
      $(`#${arguments.id} .jqueryModalText`).text(arguments.text);
      if (arguments.disableCancel) {
        $(`#${arguments.id} .jqueryModalCancel`).hide();
      } else {
        $(`#${arguments.id} .jqueryModalCancel`).show();
      }
    },
    close: (id) => {
      $('#' + id).hide();
    },
    getColorModal: (type) => {
      let color = '#5cb85c';
      switch (type) {
        case 'error':
          color = '#ec5353';
          break;
        case 'info':
          color = '#5396ec';
          break;
        case 'success':
          color = '#5cb85c';
          break;
      }
      return color;
    },
    modalOnEvents: (id) => {
      $(`#${id} .close`).click(() => {
        methods.close(id);
      });
      $(window).click((event) => {
        if (event.target == $('#' + id)[0]) {
          methods.close(id);
        }
      });
      $(document).keyup((event) => {
        if (event.keyCode === 27) methods.close(id); // Esc
      });
      $(`#${id} .jqueryModalCancel`).click(() => {
        methods.close(id);
      });
    }
  };

  $.fn.Modal = (method, args) => {
    switch (method) {
      case 'create':
        methods.create(args);
        break;
      case 'open':
        methods.open(args);
        break;
      case 'change':
        methods.change(args);
        break;
      case 'close':
        methods.close();
        break;
    }
    return this;
  };
})(jQuery);

$('body').Modal('create', {
  id: 'blogModalMain',
  title: 'TITLE',
  text: 'TexT',
  type: 'info'
});
