export const Confirm = {
    open (options) {
        //options object is initially empty, second argument is the default,
        // third arguement overides the default
        options = Object.assign({},{
            title: '',
            message: '',
            okText: '',
            cancelText: '',
            onok: function () {},
            oncancel: function () {}
        }, options)

        const html = `
            <div id ="confirm-background" class='confirm-background confirm--open'>
            <div id="confirm" class='confirm confirm--open'>
                <div id="titleBar">
                    <p>${options.title}</p>
                    <button id="confirmClose">&times</button>
                </div>
                <div id="message">
                    <p>${options.message}</p>
                </div>
                <div id="close" >
                    <div style="text-align: right; padding: 0 20px 0 20px;">
                        <button id='buttonOk' class='confirm__button--ok'>${options.okText}</button>
                        <button id='buttonCancel' class='confirm__button--cancel'>${options.cancelText}</button>
                    </div>
                </div>
            </div>
            </div>
            `
            let template = document.createElement('template')
            template.innerHTML = html

            //elements
            const confirmEl = template.content.querySelector('#confirm')
            const closeBtn = template.content.querySelector('#confirmClose')
            const btnOk = template.content.querySelector('.confirm__button--ok')
            const btnCancel = template.content.querySelector('.confirm__button--cancel')
            const back = template.content.querySelector('#confirm-background')

            btnOk.addEventListener('click', () => {
                options.onok();
                this._close(confirmEl,back);
            })
            
            btnCancel.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl,back);
            })
            
            closeBtn.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl,back);
            })
            document.body.appendChild(template.content)
    }, 

    _close (confirmE1,back) {
        confirmE1.classList.remove('confirm--open')
        confirmE1.classList.add('confirm--close');
        back.classList.remove('confirm--open');
        back.classList.add('confirm--close');
        confirmE1.addEventListener('animationend', () => {
            document.body.removeChild(back);
        })

    }
}

export const Warn = {
    open (options) {
        //options object is initially empty, second argument is the default,
        // third arguement overides the default
        options = Object.assign({},{
            title: '',
            message: '',
            okText: '',
            cancelText: '',
            onok: function () {}
        }, options)

        const html = `
            <div id="confirm" class='confirm confirm--open' style='z-index:2;'>
                <div id="titleBar">
                    <p>${options.title}</p>
                    <button id="confirmClose">&times</button>
                </div>
                <div id="message" style='text-align: center;'>
                    <p>${options.message}</p>
                    <div style='display: flex: padding'>
                        <label>name:</label><input type='text' style='width: calc(100% - 10px); text-align:center'>
                        <label>surname:</label><input type='text' style='width: calc(100% - 10px); text-align:center'>
                    </div>
                    
                </div>
                <div id="close" style="background-color: red; justify-content: space-around">
                    <div style="padding: 0 20px 0 20px;">
                        <button id='buttonOk' class='confirm__button--ok'>${options.okText}</button>
                        <button id='buttonCancel' class='confirm__button--cancel'>${options.cancelText}</button>
                    </div>
                </div>
            </div>
            `
            let template = document.createElement('template')
            template.innerHTML = html

            //elements
            const confirmEl = template.content.querySelector('#confirm')
            const closeBtn = template.content.querySelector('#confirmClose')
            const btnOk = template.content.querySelector('.confirm__button--ok')

            btnOk.addEventListener('click', () => {
                options.onok();
                this._close(confirmEl);
            })
            
            closeBtn.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            })
            document.body.appendChild(template.content)
    }, 

    _close (confirmE1) {
        confirmE1.classList.remove('confirm--open')
        confirmE1.classList.add('confirm--close');
        confirmE1.addEventListener('animationend', () => {
            document.body.removeChild(confirmE1);
        })

    }
}



