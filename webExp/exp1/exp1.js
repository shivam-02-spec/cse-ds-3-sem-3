

//   const EventEmitter = require('events');
// const myEmitter = new EventEmitter();

//  myEmitter.on('greet',(name) => {
//      console.log(`Hello,${name}! Welcome to Node.js.`);
//  });

//   myEmitter.on('exit',() => {
//     console.log("Application Closed.");
//   });

//   myEmitter.emit('greet', '2nd year');
//   myEmitter.emit('exit');






import { EventEmitter } from 'events';

class Button extends EventEmitter {}

const myButton = new Button();

myButton.on('click', () => {
    console.log("Button clicked!");
});

myButton.on('mouseover', () => {
    console.log("Mouse over button!");
});

myButton.emit('click');
myButton.emit('mouseover');


  



// const EventEmitter = require('events');
// class Button extends EventEmitter{}
// const button = new Button();
// button.on('click',() => console.log('Button clicked!'));
// button.on('mouseover',() => console.log('Mouse is over the button.'));
// button.emit('click');
// button.emit('mouseover');