import {useState,useEffect,useRef} from "react"
import "/src/index.css";
function Items({id,name,del}){
  return(
    <div style={{marginTop:"50px"}}>

    
    <div style={{width:"460px"}}>
      
    <li className="notepara" style={{textAlign:"left",paddingTop:"10px"}}>
      {name}<br/>
      <div style={{display:"flex",flexdirection:"row",gap:"5px",marginTop:"15px",justifyContent:"flex-end"}}>
      <button style={{backgroundColor:"#434142",border:"none",borderRadius:"2px",width:"80px",height:"30px"}}
        onClick={() => del(id)}
        className="deletebutton"
      >
        Delete
      </button><br/>
      <button className="editbtn"style={{backgroundColor:"#2b7c49",border:"none",borderRadius:"2px",width:"80px",height:"30px"}}>Edit</button>
      </div>
    </li>
    </div>
    </div>
  )
}
 export function Notes(){
  const [successModal,setSuccessModal]=useState(false);
  
  const [data,setData]=useState(()=>{
    return JSON.parse(localStorage.getItem("posts"))|| [];
  });
  
 
    
  
 
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(data));
  }, [data]);
const inputRef=useRef([{}]);

const Delete = (id) => {
  setData((prev) => prev.filter((item) => item.id !== id));
  alert("Are you sure to delete or I will save this localstorage!")
  localStorage.setItem("posts", JSON.stringify(data));
};


const Add=()=>{

 const Note=[inputRef.current.value];
 const newItems={
  id:Date.now(),Note
 }
 
 setSuccessModal(true);
 setTimeout(()=>{
  setSuccessModal(false)
 },3000)
// const remove=(id)=>{
//  setData(data.filter((items) => items.id !== id))
// }
//  const del=(id)=>{
//     setData(prev=>
//         {return prev.filter(item=>item.id!==id)});
 setData(prev=>[newItems,...prev])
 console.log(localStorage.setItem("note",JSON.stringify(Note)|| []));
 alert("You add note successfully")
 
}

    return(


        
              <div className="noteform" style={{position:"relative",marginLeft:"30%"}}>
              <form style={{width:"510px",position:"fixed",backgroundColor:"black",boxShadow:"1px solid white"}} onSubmit={(e)=>{
                e.preventDefault();
                Add()
              
                e.currentTarget.reset()
                

              }}>
                
                  <label>
                    <p style={{marginTop:"20px",textAlign:"left",paddingTop:"20px"}}>Note what's in your mind?</p> <textarea className="typenote" placeholder="Type your notes" ref={inputRef} style={{resize:"none",overFlowY:"auto",border:"1px solid #cc",width:"500px",height:"90px"}}required></textarea>
                   <button type="submit"  style={{width:"100px",height:"30px",backgroundColor:"rgb(6, 209, 132)",fontSize:"12px",marginLeft:"34em",border:"none",color:"grey",}}>Add note</button>
                  </label>
                </form>
               <p style={{fontSize:"20px",fontWeight:"lighter",marginTop:"220px",backgroundColor:'#a41d89',color:"white",textAlign:"center",width:"510px",height:"40px",paddingTop:"10px"}}>Your notes</p>
               <p style={{fontSize:"13px",fontWeight:"lighter",marginRight:"85%",marginTop:"20px",color:"white",position:"fixed",width:"200px",background:"grey",borderRadius:"10px",height:"30px"}}>You have {data.length}_notes 
                
               </p>

                <ul className="decor" style={{color:"white",overFlowY:"auto"}}>
                  {data.map((item) => (
  <Items 
    key={item.id}
    name={item.Note}
    id={item.id}
    del={Delete}
  />
))}
                </ul>
               {successModal && (
    <div className="success-overlay">
        <div className="success-modal">

            <div className="success-icon">
                ✓
            </div>

            <h2>Account Created!</h2>

            <p>
                Welcome to Home-in-Japan 🎉
            </p>

            <p className="success-small">
                Taking you to your dashboard...
            </p>

        </div>
    </div>
)}
                </div>
              
            
  )
  }