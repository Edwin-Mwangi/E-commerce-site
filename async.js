//one of the more complex javascript chapters to understand

//const { reject } = require("async");

/* Asynchronous JS defines some of the tasks that take some tym to complete eg
 (getting data from a db) */

 /* asynchronous code means it can start sth now ad finish it later.Javascript is a synchronous language and can only execute 1 statement at
 a tym eg  */
 console.log('hello1');
 console.log('hello2');

 //this func executes the last coz of the 2 sec gap...async code
 //it's not waiting for anything just an example to show how this happens after 2s
setTimeout(() => {
    console.log('callback func fired');
}, 2000);

 console.log('hello3');
 console.log('hello4');
 //these 3 can only be executed in order
 //hence the name single threaded language
 /* where stmts are fetching data say from db a stmt in the line may take time to receive data and thus block the rest of the code
 known as (blocking code) until it gets the data back if u have multiple funcs connected to db this might get even slower check vid
 when revisting this to better understand  */
 /* asyncs js can help the func calling to start earlier and finish while code is finishing thru async funcs(the browser takes 
 request and hanles it outside the single threads scope it also takes a callback func to know to execute later when dat comes back) */
 
//  HTTP requests
// used to get data from another server and connect to API endpoints..these are like URLs that a particular server exposes
// to us do we can get data from them...response is usually received in JSON format and then we can do sth about it...u can
// use json placeholder(a website) to practise

// MAKING HTTP REQUESTS

// xml represents an older data format b4 JSON arrived but can work with any ytpe of data
//the request var created now has diff methods in it such as open...open takes 2 args, a str(type of request eg GET) and an endpoint to get data from
//use jsonplaceholder url as endpoint as an example....the 1 in url is left coz its only for a single todo ie 'https://jsonplaceholder.typicode.com/todos/1'

/* const request = new XMLHttpRequest();

request.addEventListener('readystatechange', () =>{
    console.log(request, request.readyState);//print request obj and the state current request is in. 
});
request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');//request only made not sent so...
request.send(); */


//we don't know in our code when open and send is complete can only access it in f12 browser so....
//we can track progress of request using event listener and an event called READYSTATECHANGE in line 40
//request.readyState return int check mdn docs to see what they mean from 0 - 4
//the event listener prints the whole request and the readystate of the request..if u open the xmlhttprequest u can see the 
//response text in readystate 4 showing the data returned

//readystate in action

/* request.addEventListener('readystatechange', () =>{

    if(request.readyState === 4 && request.status ===200){
        //request.status ensures a succesful response as a condition 
        console.log(request.responseText);//prints all returned JSON obj
    }else if(request.readyState === 4){
        console.log('Could not fetch the data')//if readystate is 4 but status not 200
    }
}); */

//if there was some kind of error with your request,how to handle it
//say yout url has a typo...we won't have access to the responseText...it won't be logged out..
//check the xmlhttprequest in console and status is 404 and response text is empty
//so we need to check status as well as the ready state to be sure no problems...mdndocs lists 
//all status codes so u can check them

//we could wrap up the above code in a func to make it more reusable...above code commented to avoid duplicate

const getToDo = () =>{
    const request = new XMLHttpRequest();

    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
    request.send();

    request.addEventListener('readystatechange', () =>{
        if(request.readyState === 4 && request.status ===200){
            //request.status ensures a succesful response as a condition 
            console.log(request.responseText);
        }else if(request.readyState === 4){
            console.log('Could not fetch the data')
        }
    });
};

getToDo();//so u could call it multiple tyms




//we could specify a diff kind of callback func when we ran todos...to do sth diff
//since the callback is an arg it has to be taken as an param in the func...add param callback(or any other name)

const getToDos = (callback) =>{
    const request = new XMLHttpRequest();

    request.open('GET', 'https://jsonplaceholder.typicode.com/todos');
    request.send();

    request.addEventListener('readystatechange', () =>{
        if(request.readyState === 4 && request.status ===200){
            const data = JSON.parse(request.responseText);      //returns as array Objs
            callback(undefined, data); //call callback when condition is fulfilled
        }else if(request.readyState === 4){
            callback('Could not fetch data',undefined); //we also call it here...no data in these case
        }
    });
};

/* getToDos(() =>{
    console.log('callback fired');
});
 */
//in above callback is still fired even after 404 coz both return the same 
//to diff one where err is will fire sth diff by including 2 params in callback...when we have data it calls param data 
//and when it finishes request but no data we call err...as seen in above code the 1st callback has err as undefined coz no err
//to account for there and returns data while 2nd is to show the err is no data returns(check chap12,6)

console.log(1);
console.log(2);

getToDos((err, data) =>{ //convention to start with error and data 2nd...but not compulsory
    //console.log('callback fired');
    //console.log(err, data);
    if(err){                    //undefined is treated as false in JS so if err is undefined = false
        console.log(err);
    }else{
        console.log(data);
    }
});

console.log(3);
console.log(4);
//u can call getTodos() as many times as u want and change them to do sth diff
// get todo is an example of async code it goes out of thread and the next console.log code fires

// JSON
//JSON in layman...strings formatted as JS objs 
// when browser exchanges data with browser it has and is in text format...reason why JSON is str

//converting json to js obj...to figure out how many todos are in the json
//instead of responsetext we are going to change it to array directly with parse

/* const data = JSON.parse(request.responseText); */ //check it in previous func

// we can create our own JSON data as well create file in async.js as todos.json...
//anything u edit in the file is automatically a str so speechmks unecessary
//one thing to look out strs(both names and values) in objs have to be in double quotes
//integers and boolean are fine not going in double quotes

//now we can do
const localRequest = new XMLHttpRequest();

    localRequest.open('GET', 'todos.json');
    localRequest.send();
    localRequest.addEventListener('readystatechange', () =>{
        // const newData = JSON.parse(localRequest.responseText);
        // console.log(newData);
        console.log(localRequest.responseText); //when u json.parse it brings unexpected end of JSON input
    });


//making requests to diff JSOn files....
//these is common when making requests to diff APIs...1 API to get data then use that data to make request to another API
//resource param is added to the function
const multipleToDos = (resource,callback) =>{
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () =>{
        if(request.readyState === 4 && request.status ===200){
            const data = JSON.parse(request.responseText);      //returns as array Objs
            callback(undefined, data); //call callback when condition is fulfilled
        }else if(request.readyState === 4){
            callback('Could not fetch data',undefined); //we also call it here...no data in these case
        }
    });

    request.open('GET', resource);//resource not in quotes unlike urls
    request.send();
};

//getting the data of the files in moreTodos

multipleToDos('moreTodos/luigi.json', (err, data) =>{ 
    console.log(data);
    multipleToDos('moreTodos/mario.json', (err, data) =>{ 
        console.log(data);
        multipleToDos('moreTodos/braun.json', (err, data) =>{ 
            console.log(data);
        });
    });        
});

//the above code suffers from callback hell, nesting callback within callback within callback
////promise is sth that's going to take sometime to do
//it takes 2 params resolve and reject

//PROMISE
//promise example
const getSomething = () =>{
    //promise takes func as param hence arrowfunc
    return new Promise((resolve, reject) =>{
        //do network request here...only 1 of the 2
        resolve('some data example');   //as of now we arent requesting any data so pass str as dummy data
       // reject('error');// ..if there is error....this are used with conditionals eg if stmts
    });
}

//a promise can either be resolved(we get data) or rejected(we get err)....its basically asying am going to resolve 
//or reject sth so when we get a promise we can tackle a .then method which has 2 params, 1 that takes data from promise
//and another handling reject...in promise it.then handles what happens in the func if a resolve then it executes the 1st param
//reject then executes the 2nd arg

getSomething().then((data) =>{
    console.log(data);
},(err) =>{
    console.log(err);   
});

//instead of 2nd param we can have a catch to simplify and as alternative
//catch method catches err if recorded...looks neater and easier in chaining

getSomething().then(data =>{
    console.log(data);
}).catch(err =>{
    console.log(err); 
});

//it comes full circle in the http request as resourse and callback no longer needed and replaced with resolve and reject
//when promise is used

const promiseToDos = (resource) =>{
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) =>{            //must include new...otherwise it treats it as the one b4

        //all request func goes into the promise
        request.addEventListener('readystatechange', () =>{
            if(request.readyState === 4 && request.status ===200){
                const data = JSON.parse(request.responseText);      //returns as array Objs
                resolve(data);//callback replaced with resolve
            }else if(request.readyState === 4){
                reject('Error getting resource');
            }
        });
        request.open('GET', resource);//resource not in quotes unlike urls
        request.send();
    });
};

//2nd param not need as no callback is fires in promise

promiseToDos('moreTodos/braun.json').then(data =>{
    //resolve
    console.log('promise resolved: ', data);
}).catch(err =>{                                     //using a .catch for reject instead of then
    console.log('promise rejected: ', err);
});

//chaining promises
promiseToDos('moreTodos/braun.json').then(data =>{
    //resolve
    console.log('promise resolved: ', data);
    return promiseToDos('moreTodos/mario.json');        //returns another Promise activating it
}).then(data =>{
    console.log('promise2 resolved', data);
}).catch(err =>{                                     //the catch works for both promiseTodos coz it's a similar err
    console.log('promise rejected: ', err);
});
