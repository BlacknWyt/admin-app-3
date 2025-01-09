export const Confirm = {
    open (options) {
        //options object is initially empty, second argument is the default,
        // third arguement overides the default
        options = Object.assign({},{
            title: '',
            message: '',
            colour: 'rgb(222, 240, 255)',
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
                <div id="close" style="background-color:${options.colour}">
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
            <div id="confirm" class='confirm confirm--open' style='z-index:2; width: 400px;'>
                <div id="titleBar">
                    <p>${options.title}</p>
                    <button id="confirmClose">&times</button>
                </div>
                <div id="message" style='text-align: center;'>
                    <p>${options.message}</p>
                    <div style='display: flex; padding '>
                            <table>
                                <tr>
                                    <th><label>name:</label></th>
                                    <th><label>surname:</label></th>
                                </tr>
                                <tr>
                                    <td><input id='deleteName' type='text' style='width: calc(100% - 10px); text-align:center'></td>
                                    <td><input id='deleteSurname' type='text' style='width: calc(100% - 10px); text-align:center'></td>
                                </tr>
                            </table>
                    </div>
                    
                </div>
                <div id="close" style="background-color: red; justify-content: space-around">
                    <div style="padding: 0 20px 0 20px;">
                        <button id='buttonOk' class='confirm__button--ok' style='width:100px'>${options.okText}</button>
                        <button id='buttonCancel' class='confirm__button--cancel' style='width:100px'>${options.cancelText}</button>
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


export const Schedule = {
    open (options) {
        options = Object.assign({},{
            onok: function () {},
            oncancel: function (){}
        },options)

        const html =
            `
            <form id='back' style="position: absolute; top:0; bottom: 0; right: 0; left: 0; background-color: rgba(0, 0, 0, 0.199);" required>
                <div id="saveSchedule">
                    <div id="scheduleTitleBar">
                        <div id='colDiv'>
                            <input id='col' type='color' value='#69e6ff'>
                        </div>
                        <button type="button" id="confirm_Close">&times</button>
                    </div>
                    <div class='schedDiv'>
                        <label class='required inp'>Event Name: </label>
                        <input id="eventName" type="text" required>
                    </div>
                    <div class='schedDiv'>
                        <label class='required inp'>Date: </label>
                        <input id="date" type="date" required>
                    </div>
                    <div class='schedDiv'>
                        <label class='inp'>From: </label>
                        <input id="from" type="time">
                    </div>
                    <div class='schedDiv'>
                        <label class='inp'>Till: </label>
                        <input id="till" type="time">
                    </div>
                    <div class='schedDiv'>
                        <label class='inp'>Notes: </label>
                        <textarea id="notes" type=""></textarea>
                    </div>
                    <div id="divButtons">
                        <button type="submit" id='save' class="saveCancel">Save</button>
                        <button type="button" id='cancel' class="saveCancel">Cancel</button>
                    </div>
                </div>
            </form>
            `

        let template = document.createElement('template')
        template.innerHTML = html

        const from = template.content.querySelector('#from')
        const till = template.content.querySelector('#till')
        const back = template.content.querySelector('#back')
        const save = template.content.querySelector('#save')
        const cancel = template.content.querySelector('#cancel')
        const closeBtn = template.content.querySelector('#confirm_Close');

        // if(document.getElementById('from') > document.getElementById('till')){

        // }
        [ from, till ].forEach(
            function (el){
                el.addEventListener('change', () => {
                let from = document.getElementById('from');
                let till = document.getElementById('till');
                if(from.value != ''){
                    till.min = from.value;
                    from.required = true;
                    till.required = true;
                }
                if(till.value != ''){
                    from.max = till.value;
                    from.required = true;
                    till.required = true;
                }
                if(till.value == '' && from.value == ''){
                    from.required = false;
                    till.required = false;
                }
            });
        });

        save.addEventListener('click', (e) => {
            e.preventDefault();
            options.onok();
            let eventName = document.getElementById('eventName');
            let date = document.getElementById('date');
            let from = document.getElementById('from');
            let till = document.getElementById('till');

            if(eventName.value == '' || date.value == ''){
                date.reportValidity();
                eventName.reportValidity(); 
            }
            else if(till.min != '' || from.max != ''){
                if(till.reportValidity() == false || from.reportValidity() == false){
                    till.reportValidity()
                    from.reportValidity()
                }
                else{
                    this._close(back);
                }
            }
            else{
                this._close(back); 
            }
        })

        cancel.addEventListener('click', (e) => {
            e.preventDefault();
            options.oncancel();
            this._close(back);
        })

        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            options.oncancel();
            this._close(back);
        })

        document.body.appendChild(template.content);
    },
    
    _close (back) {
        document.body.removeChild(back);
    }
}


