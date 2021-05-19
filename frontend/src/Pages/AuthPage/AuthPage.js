import {useEffect,useRef,useState} from "react";
import axios from "../../Axios/Axios";
import "./AuthPage.css"

export default function AuthPage(props){

  const emailEl = useRef();
  const passwordEl = useRef();
  const [isLogin,setMode] = useState(false);

  const switchModeHandler = ()=>{
    setMode(state=>state==true?false:true);
  }

  const submitHandler = async(event)=>{
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if(email.trim().length === 0 || password.trim().length === 0){
      return ;
    }

    let requestBody;

      if(!isLogin){
        requestBody = {query:`
          mutation{
            createUser(userInput:{email:"${email}",password:"${password}"}){
              _id
              email
            }
          }
          `}
      }else{
        requestBody = {query:`
          query{
            login(email:"${email}",password:"${password}"){
              token
              userId
              tokenExpiry
            }
          }`
        }
    }

    try{
      const result = await axios.post("/graphql",JSON.stringify(requestBody));
      console.log(result);
    }catch(e){
      console.log(e);
    }

  }

  return(
    <>
    <div className="header">
      {isLogin ? <h2>Login!</h2> : <h2>SignUp</h2>}
    </div>
    <form className="auth-form" onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={switchModeHandler}>
            Switch to {isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    </>
  )
}
