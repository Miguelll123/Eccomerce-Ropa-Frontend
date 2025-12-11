import React,{useState} from 'react'
import {useDispatch} from 'react-redux';
import {register} from '../../features/auth/authSlice';

const Register = ()=> {
    const [FormData,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })

    const {name,email,password,password2} = FormData

    const dispatch = useDispatch();

    const onChange= (e)=> {
        setFormData({
            ...FormData,
            [e.target.name]:e.target.value,
        })
    }

    const onSubmit = (e)=> {
        e.preventDeFault()
        dispatch(register(user))
    }
}



