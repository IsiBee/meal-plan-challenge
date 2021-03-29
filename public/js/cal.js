// .saveCal
async function calHandler(event) {
    event.preventDefault();
    //grab user id
    //grab the days of the week

    const user_id = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // if (email && password) {
    //     const response = await fetch('/api/users/login', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             email,
    //             password
    //         }),
    //         headers: { 'Content-Type': 'application/json' }
    //     });

    //     if (response.ok) {
    //         document.location.replace('/dashboard');
    //     } else {
    //         alert(response.statusText);
    //     }
    // }

    //create an obj based on userinput

    // {
    //     mon:[],
    //     tues:[],
    //     weds:[],
    // }

    //set to local storage
    //key = user_data
    //value= // {
    //     mon:[],
    //     tues:[],
    //     weds:[],
    // }
}

//function to set local  straoge
//ftn to get local storage
//call local storage
//gt all from cal app

document.querySelector('.saveCal').addEventListener('submit', calHandler);
