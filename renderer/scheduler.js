import { Schedule } from "./confirm.mjs"; 

let prevMonth = document.getElementById('prevMonth');
let nextMonth = document.getElementById('nextMonth');
let viewEvents = document.getElementById('viewEvents');
let closeEventsButton = document.getElementById('closeEventsButton');
let scheduleView = document.getElementById('scheduleView')

let changeMonth = 0;

closeEventsButton.addEventListener('click', () => {
    viewEvents.style.display = 'none'
})
prevMonth.addEventListener('click', () => {
    changeMonth = changeMonth - 1;
    addDays(changeMonth)
})

nextMonth.addEventListener('click', () => {
    changeMonth = changeMonth + 1
    addDays(changeMonth)
})

async function addDays(changeMonth){
    let dates = document.getElementById('dates');
    let month = document.getElementById('Month');
    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    let date = new Date();

    let getMonth = date.getMonth();
    let getYear = date.getFullYear();
    let firstDay = new Date(getYear, getMonth, 1)
    let weekdayName = firstDay.toLocaleDateString('en-GB', { weekday: 'long' });
    let daysInMonth = new Date(getYear, getMonth + 1, 0).getDate()

    let monthStart = weekdays.indexOf(weekdayName);

    month.textContent = date.toLocaleDateString('en-GB', { month: 'long' }) + ' ' + getYear;

    if(changeMonth != undefined) {
        getMonth = getMonth + changeMonth;
        firstDay = new Date(getYear, getMonth, 1)
        daysInMonth = new Date(getYear, getMonth + 1, 0).getDate()
        month.textContent = new Date(getYear, getMonth + 1, 0).toLocaleDateString('en-GB', { month: 'long' }) + ' ' + new Date(getYear, getMonth + 1, 0).toLocaleDateString('en-GB', { year: 'numeric' });
        weekdayName = firstDay.toLocaleDateString('en-GB', { weekday: 'long' });
        monthStart = weekdays.indexOf(weekdayName);
    }

    let data = await listEvents.eventsView()
    dates.innerHTML = ''
    let d = 1;
    for(let i = 0; i <= daysInMonth + monthStart; i++){
        let checkDate = new Date(getYear, getMonth, d + 1).toISOString().substring(0, 10);
        let div = document.createElement('div')
        let p = document.createElement('p')

        if(i < monthStart){
            div.className = 'day'
            div.appendChild(p)
            dates.appendChild(div)
        }

        if(i > monthStart){
            let eventUl = document.createElement('ul')
            div.appendChild(p)
            dates.appendChild(div)
            div.appendChild(eventUl)

            div.addEventListener('dblclick', () => {
                Schedule.open({
                    onok: () => {
                        let res = addEvent()
                        console.log(res)
                    },
                    oncancel: () => {
                        console.log('click cancel');
                    },
                })
                document.getElementById('date').value = checkDate 
            })
            div.addEventListener('click', () => {
                viewEvents.style.display = 'flex';
                scheduleView.innerHTML = '';
                viewDaysEvents(checkDate);
            })

            for(let j = 0; j < data.length; j++) {
                let eventLi = document.createElement('li')
            
                if(checkDate == data[j].date){
                    eventUl.appendChild(eventLi)
                    eventLi.style.backgroundColor = (data[j].color)? data[j].color : '#69e6ff'
                }
            }
            p.innerHTML = d;
            div.className = 'day'
            eventUl.classList.add('eventCol')
            d++;
        }

    }

} 


async function addEvent(){
    let eventName = document.getElementById('eventName');
    let date = document.getElementById('date');
    let from = document.getElementById('from');
    let till = document.getElementById('till');
    let note = document.getElementById('notes');
    let color = document.getElementById('col');

    if(note.value == ''){
        note.value = 'No Extra Notes'
    }

    let data = {
        eventName: eventName.value,
        date: date.value,
        from: (from.value == '')? 'All Day' : from.value,
        till: (till.value == '')? 'All Day' : till.value,
        note: note.value,
        color: color.value
    }
    console.log(data);
    let res = await dbScheduler.create(data)
    return res
}

console.log(new Date())

addDays();

async function viewDaysEvents(date){
    let data = await checkEvents.exist(date)
    
    console.log(data)
    for(let i = 0; i < data.length; i++){
        let event = {
            eventName:data[i].eventName,
            date:data[i].date,
            from:data[i].from,
            till:data[i].till,
            note:data[i].note,
            color: (data[i].color)? data[i].color : '#69e6ff',
            _id: data[i]._id,
            _rev: data[i]._rev
        }
        console.log('hello')

        let eventList = document.createElement('li')
        let eventButton = document.createElement('button')
        let eventCol = document.createElement('div')
        let eventNoteHolder = document.createElement('div')
        let editButton = document.createElement('button')

        eventList.classList.add('eventList')
        eventButton.classList.add('eventExpand')
        eventCol.classList.add('eventColor')
        eventNoteHolder.classList.add('eventDetails')

        eventCol.style.backgroundColor = event.color;
        eventNoteHolder.style.backgroundColor = event.color;

        editButton.innerHTML = 'edit'
        editButton.classList.add('editEvent');

        let eventName = document.createElement('p')
        eventName.innerHTML = event.eventName

        let eventDate = document.createElement('p')
        eventDate.innerHTML = 'Date: ' + event.date

        let eventFrom = document.createElement('p')
        eventFrom.innerHTML = 'From: ' + event.from

        let eventTill = document.createElement('p')
        eventTill.innerHTML = 'Till: ' + event.till

        let eventNote = document.createElement('p')
        eventNote.innerHTML = 'Note: ' + event.note

        let id = document.createElement('p')
        id.id = 'id'
        id.innerHTML = event._id
        id.hidden = true

        let rev = document.createElement('p')
        rev.id = 'rev'
        rev.innerHTML = event._rev
        rev.hidden = true

        // clientButton.classList.add('clientBtn')
        // eventButton.innerHTML = event.eventName + ' ' + event.date;
        eventCol.style.backgroundColor = event.color;

        eventList.appendChild(id)
        eventList.appendChild(rev)
        eventList.appendChild(eventButton)

        scheduleView.appendChild(eventList)
        scheduleView.appendChild(eventNoteHolder)

        eventButton.appendChild(eventCol);
        eventButton.appendChild(eventName);
        
        // divEdit.append(editButton)
        eventButton.appendChild(editButton)

        eventNoteHolder.appendChild(eventDate);
        eventNoteHolder.appendChild(eventFrom);
        eventNoteHolder.appendChild(eventTill);
        eventNoteHolder.appendChild(eventNote);

        eventNoteHolder.style.display = 'none';
        editButton.style.display = 'none'

        editButton.addEventListener('click', function(){
            Schedule.open({
                onok:async function () {
                    let eventName = document.getElementById('eventName');
                    let date = document.getElementById('date');
                    let from = document.getElementById('from');
                    let till = document.getElementById('till');
                    let note = document.getElementById('notes');
                    let color = document.getElementById('col');
                    let rev = document.getElementById('rev');
                    let id = document.getElementById('id');
                    let data = {
                        eventName: eventName.value,
                        date: date.value,
                        from: from.value,
                        till: till.value,
                        note: note.value,
                        color: color.value,
                        _rev: rev.textContent,
                        _id: id.textContent
                    }
                    let res = await updateEvent.update(data);
                    console.log(res);
                },
                oncancel: function (){}
            })
            let eventName = document.getElementById('eventName');
            let date = document.getElementById('date');
            let from = document.getElementById('from');
            let till = document.getElementById('till');
            let note = document.getElementById('notes');
            let color = document.getElementById('col');

            eventName.value = event.eventName
            date.value = event.date
            from.value = event.from
            till.value = event.till
            note.value = event.note
            color.value = event.color
        })
        
        eventButton.addEventListener("click", function(){
            if(eventNoteHolder.style.display == 'block'){
                eventButton.classList.remove('viewing')
                editButton.style.display = 'none'
                eventNoteHolder.style.display = 'none';
            }
            else{
                eventNoteHolder.style.display = 'block'
                editButton.style.display = 'block'
                eventButton.classList.add('viewing');
            }
        });
        if(scheduleView.hasChildNodes() == false){
            document.getElementById('emptySchedule').style.display = 'block';
        }
        else{
            document.getElementById('emptySchedule').style.display = 'none';
        }
    }
}

