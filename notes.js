// --- a state ---

// a state is like a variable but if it changes it will rerender the current page

// --- local state ---

import { useState } from 'react';

const [ state, setState ] = useState('state')

// the state is only avaliable inside the function
// the inital state is set in the brackets 


// --- Gloabl State ---

import { useGlobal } from 'reactn';

useGlobal('foo') // this is a global state, you can access it from anywhere in the app
// to access a global variable u need to put the name of it in the brackets

const [ state, setState ] = useGlobal('foo')
// a state will return a variable and a function
// the first object in the array is the variable for reading the state
// the second object in the array is the function for setting the state

console.log(state) // read the state
setState('broooo') // set the state

// state and setState can be whatever you want to call it

// --- Loading function ---

import { useEffect } from 'react';

useEffect(() => { 
    // any code inside these will only be run once
 }, [false]); // the variable in the square brackets can be set to a state or varibale and if it changes the code inside the useEffect will be run again
    // any code outside will be run everytime a state is updated