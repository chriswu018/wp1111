import '../styles.css';

function List({inputState}) {
    
    function check (e) {
        const box = e.target;
        const word = box.parentNode.nextSibling;
        if(box.checked === true){
            word.style.textDecoration = "line-through";
            word.style.opacity = "0.5";
            setDone(true);
            document.getElementById('todo-clear-complete').style.visibility = 'visible';
        }else{
            word.style.textDecoration = "none";
            word.style.opacity = "1";
            setDone(false);
        }
    };

    function remove (e) {
        e.target.parentNode.remove();
        if(e.target.parentNode.firstElementChild.firstElementChild.checked === true){
            setDel(true);
            setDone(false);
        }else{
            setDel(true);
        }
        
    }

    function setDone (pn) {
        if(pn){
            let done = inputState[2];
            done += 1;
            inputState[3](done);
        }else{
            let done = inputState[2];
            done -= 1;
            inputState[3](done);
        }
        if (inputState[2] < 2) document.getElementById('todo-clear-complete').style.visibility = 'hidden';
    } 

    function setDel (pn) {
        if(pn){
            let del = inputState[4];
            del++;
            inputState[5](del);
        }else{
            let del = inputState[4];
            del--;
            inputState[5](del);
        }
    }

    return(
        <ul id="todo-list" class="todo-app__list">
            {
                inputState[0].map((value, index) => 
                    <li className="todo-app__item">
                        <div className="todo-app__checkbox">
                            <input id={index}  type="checkbox" onClick={check} />
                            <label for={index} />
                        </div>
                        <h1 className="todo-app__item-detail">
                            {value}
                        </h1>
                        <img className="todo-app__item-x" src={require('../img/x.png')} onClick={remove}/>
                    </li>)
            }
        </ul>
    );
  }

  export default List;