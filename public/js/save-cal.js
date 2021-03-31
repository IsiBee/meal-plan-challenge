async function saveCalHandler(event) {
    event.preventDefault();

    let sunElement = document.querySelector('#Sunday');
    sunElement = sunElement.getElementsByTagName('article');
    if (sunElement.length === 0) {
        sunElement = null;
    }
    else {
        sunElement = sunElement[0].getAttribute('id');
    }


    let monElement = document.querySelector('#Monday');
    monElement = monElement.getElementsByTagName('article');
    if (monElement.length === 0) {
        monElement = null;
    }
    else {
        monElement = monElement[0].getAttribute('id');
    }

    let tuesElement = document.querySelector('#Tuesday');
    tuesElement = tuesElement.getElementsByTagName('article');
    if (tuesElement.length === 0) {
        tuesElement = null;
    }
    else {
        tuesElement = tuesElement[0].getAttribute('id');
    }

    let wedsElement = document.querySelector('#Wednesday');
    wedsElement = wedsElement.getElementsByTagName('article');
    if (wedsElement.length === 0) {
        wedsElement = null;
    }
    else {
        wedsElement = wedsElement[0].getAttribute('id');
    }

    let thurElement = document.querySelector('#Thursday');
    thurElement = thurElement.getElementsByTagName('article');
    if (thurElement.length === 0) {
        thurElement = null;
    }
    else {
        thurElement = thurElement[0].getAttribute('id');
    }

    let friElement = document.querySelector('#Friday');
    friElement = friElement.getElementsByTagName('article');
    if (friElement.length === 0) {
        friElement = null;
    }
    else {
        friElement = friElement[0].getAttribute('id');
    }

    let satElement = document.querySelector('#Saturday');
    satElement = satElement.getElementsByTagName('article');
    if (satElement.length === 0) {
        satElement = null;
    }
    else {
        satElement = satElement[0].getAttribute('id');
    }

    const sunday = sunElement;
    const monday = monElement;
    const tuesday = tuesElement;
    const wednesday = wedsElement;
    const thursday = thurElement;
    const friday = friElement;
    const saturday = satElement;


    if (sunday || monday || tuesday || wednesday || thursday
        || friday || saturday) {
        const getSchedule = await fetch(`/api/schedules`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(scheduleObj => scheduleObj.json())
            .then(data => {
                if (data.length) {
                    const updateSchedule = fetch(`/api/schedules/${data[0].user_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            sunday,
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(updatedCal => {
                            const getNewSchedule = fetch(`/api/schedules`, {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' }
                            })
                                .then(CalObj => CalObj.json())
                                .then(CalData => console.log(CalData));
                        })
                        .then(console.log("Wow"));
                }

                else {
                    const createSchedule = fetch(`/api/schedules`, {
                        method: 'POST',
                        body: JSON.stringify({
                            sunday,
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday
                        }),
                        headers: { 'Content-Type': 'application/json' }

                    })
                        .then(/*fill in here*/);
                }
            })
    }
};

document.querySelector('.saveCal').addEventListener('click', saveCalHandler);