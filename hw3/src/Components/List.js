import '../styles.css';

function List({inputState}) {
    
    function check (e) {
        const num = e.target.getAttribute("id")
        const ID = document.getElementsByClassName('todo-app__item-detail')[num]
        if(document.getElementsByClassName('Cbox')[num].checked === true){
            ID.style.textDecoration = "line-through";
            ID.style.opacity = "0.5";
        }else{
            ID.style.textDecoration = "none";
            ID.style.opacity = "1";
        }
            
        
    };

    return(
        <ul id="todo-list" class="todo-app__list">
            {
                inputState[0].map((value, index) => <li className="todo-app__item">
                                    <div className="todo-app__checkbox">
                                        <input id={index} className = "Cbox" type="checkbox" onClick={check} />
                                        <label for={index}></label>
                                    </div>
                                    <h1 className="todo-app__item-detail">
                                        {value}
                                    </h1>
                                    <img className="todo-app__item-x" src={require('../img/x.png')} />
                                </li>)
            }
        </ul>
    );
  }

  export default List;