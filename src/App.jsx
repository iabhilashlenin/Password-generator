import { useState ,useEffect} from 'react'
import { useCallback ,useRef} from 'react' 


function App() {
   const [length ,setLength] = useState(8)
   const [numberAllowed , setnumberAllowed] = useState(false)
   const [charAllowed, setcharAllowed] = useState(false)
   const [password , setpassword] = useState("");

   //ref hook 
   const passwordRef = useRef(null)

   const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i =1; i < length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      console.log(char);
      pass += str.charAt(char);
    }

    setpassword(pass)

   },[length,numberAllowed,charAllowed,setpassword])

   const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,15)
    window.navigator.clipboard.writeText(password);
   },[password])

   useEffect(()=>{passwordGenerator() },[length, numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md r
    rounded-ld px-4 my-8 text-orange-500 bg-grey '>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input type ="text" 
        value = {password}
        className='outline-none w-full py-1 px-3 my-3 rounded'
        placeholder='password'
        readOnly
        ref = {passwordRef}></input>
        <button className='outline-none bg-blue-700 text-white px-3 py-3 my-3 rounded shrink-0'
        onClick={copyPasswordToClipboard}
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type = "range"
          min={6}
          max ={15}
          value={length}
          className='cursor-pointer'
          onChange={(e) =>{setLength(e.target.value)}}></input>
          <label>Length:{length}</label>
        </div >
        <div className='flex items-center gap-x-1'>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setnumberAllowed((prev) => !prev);
          }}
      />
       <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setcharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
      </div>
    </>
  )
}

export default App
