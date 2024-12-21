export default function Button ({children}){
    return(
        <button className="bg-blue-700 w-96 px-5 rounded-lg text-white py-2">
            {children}
        </button>
    )
}