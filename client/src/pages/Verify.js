import React, { useContext, useState } from 'react' 
import { IoMdEye } from "react-icons/io"; 
import { Link, useNavigate } from 'react-router-dom'; 
import { SummaryApi } from '../common'; 
//import { toast } from 'react-toastify'; 
 
function Verify() { 
  const [data, setData] = useState({ 
    code: "", 
    email:window.localStorage.getItem('email') 
  }) 
  const navigate = useNavigate() 
  //const {fetchUserDetails} = useContext(Context) 
  const handleChange = (e) => { 
    const { name, value } = e.target 
    setData((prev) => { 
      return { 
        ...prev, 
        [name]: value 
      } 
    }) 
  } 
 
  const handleSubmit = async (e) => { 
    e.preventDefault() 
    //console.log(data) 
    const res = await fetch(SummaryApi.auth.verify.url, { method:SummaryApi.auth.verify.method,body:JSON.stringify(data),headers:{'content-type':'application/json'} }) 
    const _data = await res.json() 
    console.log(_data ) 
    if (_data.token) { 
      window.localStorage.setItem('token', _data.token) 
      // localStorage.setItem('userId',data.user.id) 
      navigate("/") 
    } 
    else { 
 
    } 
  } 
 
  return ( 
    <section id="login"> 
      <div className="mx-auto container p-10"> 
        <div className="bg-white p-8 w-full max-w-sm mx-auto shadow-lg"> 
          <div className="h-20 mx-auto pt-4 text-lg leading-4 "> 
            <h1 className="text-center text-yellow-600 font-bold">OTP VERIFICATION</h1> 
            <div className="h-[60px] bg-yellow-200 opacity mt-3 p-3 mx-auto my-auto rounded-md text-pretty text-[16px]"> 
            <p className="text-black z-10">We’ve sent a verification code to 
            your email - someone@gmail.com</p> 
            </div> 
          </div> 
 
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}> 
            <div className="grid"> 
              {/* <label>Email : </label> */} 
              <div className="bg-slate-100 p-2 rounded-lg mt-5"> 
                <input 
                  type="number" 
                  placeholder="Enter verification code" 
                  name="code" 
                  value={data.code} 
                  onChange={handleChange} 
                  className="w-full h-full outline-none bg-transparent" 
                /> 
              </div> 
            </div> 
 
            
 
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4"> 
              Submit  
            </button> 
 
                <Link to={"/register"} className="text-blue-500 mx-auto"> 
                    Don’t receive the code? 
                </Link> 
 
                <Link to={"/register"} className="mx-auto font-semibold"> 
                    Re-register 
                </Link> 
          </form> 
        </div> 
      </div> 
    </section> 
  ) 
} 
 
export default Verify 
