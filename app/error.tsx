"use client"

export default function ErrorPage({error,reset}:{error:Error & {digest?:string},reset:()=>void}){
    return <div>
        {error.message}

        <div>Something went wrong.....</div>
    </div>
} 