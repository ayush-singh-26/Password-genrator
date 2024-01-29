import {useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length,setLength] =useState(8);
  const [numallowed,setNumallowed]=useState(false);
  const [charallowed,setCharallowed]=useState(false);
  const [password,setPassword]=useState(false);

  const passwordref=useRef(null)
  const passwordgenrator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed){
      str =str + "0123456789";
    }
    if(charallowed){
      str=str + "!@#$%^&*(){}[]~`_+"
    }
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,numallowed,charallowed,setPassword])

  useEffect(()=>{passwordgenrator()},[length,numallowed,charallowed,passwordgenrator])
  const copytoclipboard=useCallback(()=>{
    passwordref.current?.select()
    // passwordref.current?.setSelectionRange()
    window.navigator.clipboard.writeText(password)
  },[password])
  return (

    <div className=' w-full max-w-md mx-auto shadow-md px-4 py-3 my-8 text-cyan-600 rounded-lg bg-gray-700'>
      <h1 className='text-red-600 text-center mb-4'>PASSWORD GENRATOR</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>

      <input type="text" 
      value={password}
      placeholder='Enter password'
      className='outline-none w-full rounded-l px-3 py-1'
      readOnly
      ref={passwordref}
      />
      <button
      onClick={copytoclipboard} className='bg-red-600 text-white px-2 py-0.5'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2 '>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={50}
          value={length}
          className=' cursor-pointer '
          onChange={(e)=>{setLength(e.target.value)}} />
          <label> Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={numallowed}
          id='numberinput'
          onChange={(e)=>{setNumallowed((prev)=>!prev)}} />
          <label className='text-white'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked={charallowed}
          id='charinput'
          onChange={(e)=>{setCharallowed((prev)=>!prev)}} />
          <label className='text-white'> Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
