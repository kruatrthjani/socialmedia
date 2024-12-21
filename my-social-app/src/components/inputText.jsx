

export default function InputText({type,name,placeholder,onFocus,value,onChange,onBlur,error,errorName}) {    
  
    return (
      <>
       <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  className="px-4 py-3  rounded-lg border border-gray-300 bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 mx-24"
                  onFocus={onFocus}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {error && (
                  <p className="text-xs text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1" style={{ color: "#f50000" }}></i>
                    {errorName} must be valid
                  </p>
                )}
                
      </>
    );
}
