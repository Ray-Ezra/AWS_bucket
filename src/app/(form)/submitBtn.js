"use client"
import { useFormStatus } from 'react-dom'


export default function submitBtn(){
    const {pending} = useFormStatus()
    return(
        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" aria-disabled={pending}>
            File Upload
          </button>
    )
}