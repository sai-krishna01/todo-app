import { useNavigate } from "react-router-dom"

function TodosCard(props){
    let Navigate = useNavigate()
    function deleteTaskHandler(){
        console.log('delete atempt!' + props.id)
        fetch(`https://todos-28286-default-rtdb.firebaseio.com/todos/${props.id}.json`,{
            method:'DELETE'
        }).then(()=>{
            // console.log('delete task!')
            Navigate('/')
            window.location.reload()
        })
    }
    return (
        <>
        <div className="card">
            <div>{props.title}</div>
            <button onClick={deleteTaskHandler} className="delete-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg></button>
            
        </div>
        </>
    )
}
export default TodosCard