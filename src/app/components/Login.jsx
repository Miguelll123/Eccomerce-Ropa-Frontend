import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {login} from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [formData,setFormData] = useState({
    email:'',
    password:''
  })

  const {email,password} = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector(state=>state.auth)

  useEffect(()=> {
    if(user) {
    navigate("/")
    }
  },[user,navigate])

  const onChange = (e)=> {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
  };


  const onSubmit = (e) => {
    e.preventDefault();
    console.log('formdata', formData);
    dispatch(login(formData));
  }


  return (
    <form onSubmit={onSubmit} className='Form'>
        <input type='email' name='email' placeholder='nombre' value={email} onChange={onChange}></input>
        <input type='password' name='password' placeholder='escribe tu contraseña...' value={password} onChange={onChange}></input>
        <button type='submit'>Login</button>
    </form>
  )
}



export default Login