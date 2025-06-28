import type { SigninSchema } from "@uc02/medium-common"
import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"

const SignIn = () => {
  const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState<SigninSchema>({
    emai: "",
    password: ""
  })

 async function sendRequest() {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin}`, postInputs)
    const jwt = response.data;
    localStorage.setItem("token",jwt);
    navigate("/blogs")

  } catch (e) {
    alert("signin failed")
  }
 }
  return (
    <div className="h-screen flex justify-center flex-col ">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              Create an account
            </div>
            <div className="text-slate-500">
              Don't have an account
              <Link className="pl-2 underline hover:text-blue-500" to={"/signup"}>
                Sign up
              </Link>
            </div>
          </div>

          <div className="pt-8">

            <LabelledInput label="Email" placeholder="Enter Your name" onChange={(e) => {
              setPostInputs({
                ...postInputs,
                emai: e.target.value
              })
            }} /> 
            
            <LabelledInput label="Password" type={"password"} placeholder="Set the password" onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value
              })
            }} />
          </div>

          <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8">
            Sign In
          </button>

        </div>
      </div>
    </div>
  )
}

interface labelledInputType {
  label: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: labelledInputType) {
  return <div>
    <label className="block mb-2 text-lg  text-black font-semibold pt-4">{label}</label>
    <input
      onChange={onChange}
      type={type || "text"}
      className=" bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg block w-full p-2.5"
      placeholder={placeholder} required />
  </div>
}

export default SignIn;
