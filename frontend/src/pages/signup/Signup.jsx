import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'


const Signup = () => {
    const [inputs, SetInputs] = useState({
        fullName:  '',
        username: '',
        password: '',
        confirmPassword:'',
        gender:'',
    })
    const {loading, signup} = useSignup();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        await signup(inputs)
    }



  return (
    <>
        <div className="navbar bg-black shadow-sm">
    <a className="btn btn-ghost text-xl text-yellow-300">FIDEL<span className='text-white'>.IO</span></a>
</div>
     <div className='p-4 h-screen flex items-center justify-center'>
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-md border border-white/20'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Sign Up
            </h1>
        

            <form onSubmit={handleSubmit}>
                <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-white'>Full name <span className='text-red-600'>*</span></span>
                </label>
                <input type="text" placeholder="Full name" className="w-full input input-bordered h-10"
                value={inputs.fullName}
                onChange={(e) => SetInputs({...inputs, fullName: e.target.value})}/>
                </div>
                <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-white'>Username<span className='text-red-600'>*</span></span>
                </label>
                <input type="text" placeholder="Enter your username" className="w-full input input-bordered h-10"
                value={inputs.username}
                onChange={(e) => SetInputs({...inputs, username: e.target.value})}/>
                </div>
                <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-white'>Password<span className='text-red-600'>*</span></span>
                </label>
                <input type="password" placeholder="Enter your password" className="w-full input input-bordered h-10"
                value={inputs.password}
                onChange={(e) => SetInputs({...inputs, password: e.target.value})}/>
                </div>
                <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-white'>Confirm Password<span className='text-red-600'>*</span></span>
                </label>
                <input type="password" placeholder="Enter your password again" className="w-full input input-bordered h-10"
                value={inputs.confirmPassword}
                onChange={(e) => SetInputs({...inputs, confirmPassword: e.target.value})}/>
                </div>
                <div>
                <label className='label p-2'>
                    <span className='text-base label-text text-white'>Gender<span className='text-red-600'>*</span></span>
                </label>
                {/*Gracias a Andrea Díaz por darme la idea de las fotos basadas en el género, TQ*/}
                <select 
                className="select select-bordered w-full max-w-xs" 
                value={inputs.gender}
                onChange={(e) => SetInputs({...inputs, gender: e.target.value})}
                >
                <option value="" disabled>What do you identify as?</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="DontSay">I prefer not to say</option>
                </select>

                </div>
                <div>
                <Link to={'/login'} className='text-sm text-white hover:underline hover:text-blue-300 mt-2 inline-block'>
                Already have an account?
               </Link>
               </div>
               <div className='flex justify-center'> 
               <button class="btn btn-soft btn-info" disabled={loading}>{loading ? <span className='loading loading-spinner'></span> : "Sign up"}</button>
               </div>
            </form>
        </div>
      
    </div>
    </div>
    </>
  )
}

export default Signup
