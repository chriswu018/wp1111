import { useState } from 'react';
import '../styles.css';

function Input({inputState}) {
    const [inputValue, setInputValue] = useState("");

    function push (e){
        if(e.key === "Enter"){
            setInputValue("")
            let arr = [...inputState[0]]
            arr[arr.length] = inputValue
            inputState[1](arr)
        }
    }


    return(
        
        <input 
        className="todo-app__input" 
        value={inputValue}
        onKeyDown={push}
        onChange={(e)=>{setInputValue(e.target.value)}}
        placeholder="What needs to be done?">
        </input>
        
    );
}

  export default Input;

  /*document.getElementsByClassName('todo-app__input')[0].value*/