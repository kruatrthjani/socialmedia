import Button from "./Button";
import { useState,useEffect } from "react";
import InputText from "./InputText";
//import { signupHandler } from "../service/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const genderOptions = ['male', 'female'];
  const languageOptions = ['English', 'Hindi', 'Gujarati'];
  const branchOptions = ['none', 'computer', 'IT', 'Mechanical', 'Civil'];
  const navigate=useNavigate();
  const [passwordVisible,setPasswordVisible]=useState(false)
  const [userData,setUserData]=useState(null);
  const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        username:'',
        age: '',
        gender: '',
        languages: [],
        branch: 'none', // Default to 'none'
        password: '',
        retypepassword: '',
        address: '',    
  });

  const [validation, setValidation] = useState({
        fname: false,
        lname: false,
        username:false,
        age: false,
        gender: false,
        languages: false,
        branch: false, // Validation for branch
        password: false,
        retypepassword: false,
        address: false
  });
  useEffect(() => {
    // const storedData = fetch('http://localhost:3000/users')
    // .then(response=>response.json())
    // .then(data=>{console.log("datas=",data);return data})
    // .catch((error)=>console.error("Error on product:",error))
    
    // console.log("stored=",storedData)// how to access actual data which i print ed above in console
    // let locate=storedData.loggedIn;
   
    const fetchUserData = async () => {
      try {
          // const response = await fetch(Userurl);
          // const data = await response.json();
          // console.log("Data fetched:", data);
          // setUserData(data);
          // console.log("users=",userData)
      } catch (error) {
          //console.error("Error fetching user data:", error);
      }
  };


 

  fetchUserData();  
}, [location.pathname]);
 


useEffect(() => {
  if (userData && userData[0] && userData[0].loggedIn) {
    //navigate("/products");
  }
}, [userData]);




  const handleInputChange = (name, value) => {
        setFormData({
        ...formData,
        [name]: value
        });

        validatingFocusHandler(name,value)

        if(name=="gender"){
            validatingFocusHandler("gender")
        }
        
  };





  const validatingBlurHandler = (name) => {
    if (name === "fname" || name === "lname") {
        if (formData[name] && formData[name].length < 3) {
            setValidation({ ...validation, [name]: true });
        }
    }
   
    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

        if (formData.password && !passwordRegex.test(formData.password)) {
              setValidation({ ...validation, password: true });
        }
    }

    if (name === "age") {
      if (isNaN(formData[name]) || formData[name] === '') {
            setValidation({ ...validation, [name]: true });
      }
      if(formData.age<0){
            setValidation({ ...validation, [name]: true });
      }
    }

    

    if (name === "gender") {
        if (formData[name]==='') {
            setValidation({ ...validation, [name]: true });
        }
    }


    

    if (name === "branch") {
      if (formData[name] === 'none') { // Validate that branch is not 'none'
            setValidation({ ...validation, [name]: true });
      }
    }

    if (name === "retypepassword") {
    if (formData[name] && (formData[name] !== formData.password)) {
            setValidation({ ...validation, [name]: true });
      }
    }

    if (name === "address") {
        if (formData[name] && (formData[name].length < 10 || formData[name].length > 100)) {
            setValidation({ ...validation, [name]: true });
        }
    }
  };

  const validatingFocusHandler = (name, value) => {
    
    if (value && value.length > 0) {
        setValidation(prevValidation => ({
            ...prevValidation,
            [name]: false, 
        }));
    } else {
        setValidation(prevValidation => ({
            ...prevValidation,
            [name]: true, 
        }));
    }

    if(name=="gender" ){
      setValidation(prevValidation => ({
        ...prevValidation,
        [name]: false, 
    }));
    }

    if(name=="languages"){
         if(formData.languages.length>0){
          console.log("languages=",formData.languages)
          setValidation(prevValidation => ({
            ...prevValidation,
            [name]: false, // Valid input
        }));
         }
    }
    if (name === "address") {
      if (formData[name] && (formData[name].length > 10 || formData[name].length < 100)) {
          setValidation({ ...validation, [name]: false });
      }
  }
};


const handleCheckboxChange = (event) => {
  if (!event || !event.target) return;

  const { value, checked } = event.target;

  setFormData((prevFormData) => {
    const updatedLanguages = checked
      ? [...prevFormData.languages, value] // Add value if checked
      : prevFormData.languages.filter((item) => item !== value); // Remove if unchecked

    // Update validation directly for languages
    setValidation((prevValidation) => ({
      ...prevValidation,
      languages: updatedLanguages.length === 0, // true if no language selected
    }));

    return {
      ...prevFormData,
      languages: updatedLanguages,
    };
  });
};



  // Submit function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let isValid = true; // Track the validity of the form
    let updatedValidation = { ...validation }; // Temporary object to store validation results
  
    // First Name and Last Name Validation
    if (formData.fname.length < 3) {
      updatedValidation.fname = true;
      isValid = false;
    }
    if (formData.lname.length < 3) {
      updatedValidation.lname = true;
      isValid = false;
    }
  
    if (formData.age < 0) {
      updatedValidation.age = true;
      isValid = false;
    }
  
    // Age Validation
    if (isNaN(formData.age) || formData.age === '') {
      updatedValidation.age = true;
      isValid = false;
    }
  
    if (formData.username === '') {
      updatedValidation.username = true;
      isValid = false;
    }
  
    // Gender Validation
    if (formData.gender === '') {
      updatedValidation.gender = true;
      isValid = false;
    }
  
    // Languages Validation
    if (formData.languages.length === 0) {
      updatedValidation.languages = true;
      isValid = false;
    }
  
    // Branch Validation
    if (formData.branch === 'none') {
      updatedValidation.branch = true;
      isValid = false;
    }
  
    // Password and Retype Password Validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      updatedValidation.password = true;
      isValid = false;
    }
    if (formData.retypepassword !== formData.password) {
      updatedValidation.retypepassword = true;
      isValid = false;
    }
  
    // Address Validation
    if (formData.address.length < 10 || formData.address.length > 100) {
      updatedValidation.address = true;
      isValid = false;
    }
  
    // Set validation state
    setValidation(updatedValidation);
  
    // If form is not valid, do not submit
    if (!isValid) {
      console.log("Form validation failed. Some fields are either invalid or empty.");
      return;
    }
    if(isValid){
  
    const { retypepassword, ...filteredData } = formData; // Exclude retypepassword
    const updateData = { ...filteredData, loggedIn: false };
  
    console.log("Form Data: ", updateData); // Debugging
  
    try {
      console.log("responsing=before");
      console.log("signupdata",updateData)
  
      
      //const {success,signupSuccess}=await signupHandler({updateData})

      // if(success){
      //   console.log("registeres=",signupSuccess)
      //   navigate("/login")
      // }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  
}

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-4">     
      <h2 className="text-center text-2xl font-semibold mb-4">Register</h2> 
      <form onSubmit={handleSubmit} className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        
        {/* First Name */}
        <div className="flex flex-col gap-y-2">
          <InputText
            placeholder="First Name"
            name="fname"
            value={formData.fname}
            onChange={(e) => handleInputChange("fname", e.target.value)}
            onBlur={() => validatingBlurHandler("fname")}
            onFocus={() => validatingFocusHandler("fname",formData.fname)}
            error={validation.fname}  
            errorName="FirstName"                      
          />          
        </div>
  
        {/* Last Name */}
        <div className="flex flex-col gap-y-2">
          <InputText
            placeholder="Last Name"
            name="lname"
            value={formData.lname}
            onChange={(e) => handleInputChange("lname", e.target.value)}
            onBlur={() => validatingBlurHandler("lname")}
            onFocus={() => validatingFocusHandler("lname",formData.lname)}
            className="w-full rounded-md px-3 py-2 bg-slate-100 placeholder:text-slate-500 focus:ring focus:ring-indigo-200"
            error={validation.lname}
            errorName="Last Name"
          />          
        </div>
  
        {/* username */}
        <div className="flex flex-col gap-y-2">
          <InputText
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            onBlur={() => validatingBlurHandler("username")}
            onFocus={() => validatingFocusHandler("username",formData.username)}
            error={validation.username}
            errorName="username"
          />          
        </div>
  
        {/* Age */}
        <div className="flex flex-col gap-y-2">
          <InputText
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            onBlur={() => validatingBlurHandler("age")}
            onFocus={() => validatingFocusHandler("age",formData.age)}            
            error={validation.age}
            errorName="Age"
          />          
        </div>
  
        {/* Gender */}
        <div className="col-span-2 sm:col-span-1 flex flex-col mt-2 ">
          <label className="mb-2 font-semibold">Gender:</label>
          <div className="flex space-x-4">
            {genderOptions.map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
                <label className="ml-2">{gender}</label>
              </div>
            ))}
          </div>
          {validation.gender && <p className="text-xs text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1" style={{ color: "#f50000" }}></i>
                    must enter gender
                  </p>}
        </div>
  
        {/* Languages */}
        <div className="col-span-2 flex flex-col mt-2 ">
          <label className="mb-2 font-semibold">Languages:</label>
          <div className="flex flex-wrap gap-3">
            {languageOptions.map((language) => (
              <div key={language} className="flex items-center">
                <input
                  type="checkbox"
                  value={language}
                  onChange={handleCheckboxChange}
                  onBlur={() => validatingBlurHandler("gender")}
                  onFocus={() => validatingFocusHandler("languages",formData.gender)}
                />
                <label className="ml-2">{language}</label>
              </div>
            ))}
          </div>
          {validation.languages && <p className="text-xs text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1" style={{ color: "#f50000" }}></i>
                     select atleast one language
                  </p>}
        </div>
  
        {/* Branch */}
        <div className="col-span-2">
          <label className="block font-semibold mb-2">Select Department</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={(e) => handleInputChange("branch", e.target.value)}
            className="w-full rounded-md px-3 py-2 bg-slate-100 focus:ring focus:ring-indigo-200"
            onBlur={() => validatingBlurHandler("branch")}
            onFocus={() => validatingFocusHandler("branch")}
          >
            {branchOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {validation.branch && <p className="text-xs text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1" style={{ color: "#f50000" }}></i>
                    enter a valid branch
                  </p>}
        </div>
  
        {/* Password */}
  <div className="flex flex-col gap-1 relative">
  <div className="relative">
    <InputText
      type={passwordVisible ? "text" : "password"}
      placeholder="Password"
      name="password"
      value={formData.password}
      onChange={(e) => handleInputChange("password", e.target.value)}
      onBlur={() => validatingBlurHandler("password")}
      onFocus={() => validatingFocusHandler("password")}
      
    />
    <span
      onMouseDown={(e) => {
        e.preventDefault(); // Prevents onBlur firing when icon is clicked
        setPasswordVisible(!passwordVisible);
      }}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
    >
      <i className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
    </span>
  </div>

  {/* Validation message below the input */}
  {validation.password && (
    <p className="text-xs text-red-600 flex items-center">
    <i className="fas fa-exclamation-circle mr-1" style={{ color: "#f50000" }}></i>
    password must be valid
  </p>
  )}
</div>

  
        {/* Retype Password */}
        <div className="flex flex-col gap-y-2">
          <InputText
            type="password"
            placeholder="Retype Password"
            name="retypepassword"
            value={formData.retypepassword}
            onChange={(e) => handleInputChange("retypepassword", e.target.value)}            
            error={validation.retypepassword}
            errorName="retpye password"
          />
          
        </div>
  
        {/* Address */}
        <div className="col-span-2">
          <textarea
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            rows={3}
            className="w-full rounded-md px-3 py-2 bg-slate-100 placeholder:text-slate-500 focus:ring focus:ring-indigo-200"
            onBlur={() => validatingBlurHandler("address")}
            onFocus={() => validatingFocusHandler("address")}
          />
          {validation.address && <p className="text-xs text-red-600 flex items-center">
                    <i className="fas fa-exclamation-circle mr-1" style={{ color: "#f50000" }}></i>
                    Address must be valid
                  </p>}
        </div>
  
        {/* Submit Button */}
        <div className="col-span-2 flex justify-center mt-4">
          <Button className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors">
            Register
          </Button>
        </div>
  
        {/* Login Link */}
        <div className="col-span-2 text-center mt-4">
          <p className="font-semibold">
            Already have an account?{" "}
            
          </p>
        </div>
      </form>
    </div>
  );
  
  
}
