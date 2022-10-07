import '../styles.css';

function Footer({inputData}) {
    let len1 = inputData[0].length - inputData[3];
    let len2 = inputData[0].length - inputData[1] - inputData[3];

    function all () {
        const CID = document.getElementsByClassName('todo-app__checkbox');
        for(let i=0;i<CID.length;i++){
            CID[i].parentNode.style.display = 'flex';  
        }
    }

    function active () {
        const CID = document.getElementsByClassName('todo-app__checkbox');
        for(let i=0;i<CID.length;i++){
            if(CID[i].firstElementChild.checked === true){
                CID[i].parentNode.style.display = 'none';
            }else{
                CID[i].parentNode.style.display = 'flex';
            }
        }
    }

    function complete () {
        const CID = document.getElementsByClassName('todo-app__checkbox');
        for(let i=0;i<CID.length;i++){
            if(CID[i].firstElementChild.checked === false){
                CID[i].parentNode.style.display = 'none';
            }else{
                CID[i].parentNode.style.display = 'flex';
            }
        }
    }

    function clear (e) {
        const CID = document.getElementsByClassName('todo-app__checkbox');
        let num = 0;
        for(let i=0;i<CID.length;i++){
            if(CID[i].firstElementChild.checked === true){
                CID[i].parentNode.remove();
                num++;
            }
        }
        inputData[2](0);
        e.target.style.visibility = 'hidden';
        for(let i=0;i<CID.length;i++){
            if(CID[i].firstElementChild.checked === true){
                CID[i].parentNode.remove();
                num++;
            }
        }
        for(let i=0;i<CID.length;i++){
            if(CID[i].firstElementChild.checked === true){
                CID[i].parentNode.remove();
                num++;
            }
        }
        num += inputData[3];
        inputData[4](num);
        len1 = inputData[0].length - inputData[3];
        len2 = inputData[0].length - inputData[1] - inputData[3];
    }

    if(len1 > 0){
        return(
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">
                    {len2 +"left"}
                </div>
                <ul className="todo-app__view-buttons">
                    <li><button id="todo-all" onClick={all}>All</button></li>
                    <li><button id="todo-active" onClick={active}>Active</button></li>
                    <li><button id="todo-completed" onClick={complete}>Completed</button></li>
                </ul>
                <div className="todo-app__clean">
                    <button id="todo-clear-complete" onClick={clear}>Clear completed</button>
                </div>
            </footer>
        );
    }
    
  }

  export default Footer;