import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { formatDate } from "../utils/authUtils";
import sign from "jwt-encode";

/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 */

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, username, password}
 */
export const signupHandler = function (schema, request) {
  const { username, password, ...rest } = JSON.parse(request.requestBody);
  try {
    // check if username already exists
    const foundUser = schema.users.findBy({ username: username });
    if (foundUser) {
      return new Response(
        422,
        {},
        {
          errors: ["Unprocessable Entity. Username Already Exists."],
        }
      );
    }
    const _id = uuid();

    const newUser = {
      _id,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      username,
      password,
      ...rest,
      followers: [],
      following: [],
      bookmarks: [],
    };
    const createdUser = schema.users.create(newUser);
    const encodedToken = sign(
      { _id, username },
      import.meta.env.VITE_JWT_SECRET
    );
    return new Response(201, {}, { createdUser, encodedToken });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};



// export const signupHandler = function (request) {
  
//   try {
//     console.log("Raw request body:", request.requestBody);// this is showuing undefined

//     // Parse the request body
//     if (!request.requestBody) {
//       throw new Error("Request body is missing or undefined");
//     }
//     const { username, password, ...rest } = JSON.parse(request.requestBody);
//     console.log("Parsed username:", username);
//     console.log("Other data:", rest);

//     // Existing logic remains the same
//     const users = JSON.parse(localStorage.getItem("users") || "[]");

//     const foundUser = users.find((user) => user.username === username);
//     if (foundUser) {
//       return {
//         status: 422,
//         body: {
//           errors: ["Username already exists. Please choose a different username."],
//         },
//       };
//     }

//     const newUser = {
//       id: uuid(),
//       username,
//       password,
//       ...rest,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       loggedIn: false,
//     };

//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));

//     return {
//       status: 201,
//       body: {
//         user: newUser,
//         message: "Signup successful!",
//       },
//     };
//   } catch (error) {
//     console.error("Error in signupHandler:", error.message);

//     return {
//       status: 500,
//       body: {
//         error: "Something went wrong during signup. Please try again later.",
//       },
//     };
//   }
// };





// export const signupHandler = function (schema, request) {
//   const { username, password, ...rest } = JSON.parse(request.requestBody);
//   try {
//     // Check if username already exists
//     const users=JSON.parse(localStorage.getItem('users'))||[]
//     const foundUser=users.filter((user)=>(
//       user.name===username
//     ))
//     console.log("founded=",foundUser)
//   /*  const foundUser = schema.users.findBy({ username: username });*/
//     if (foundUser.length>0) {
//       return new Response(
//         422,
//         {},
//         {
//           errors: ["Unprocessable Entity. Username Already Exists."],
//         }
//       );
//     }

//     // Create a new user
//     const _id = uuid();
//     const newUser = {
//       _id,
//       createdAt: formatDate(),
//       updatedAt: formatDate(),
//       username,
//       password,
//       ...rest,
//       followers: [],
//       following: [],
//       bookmarks: [],
//     };

//     const updatedUSers = users.push(newUser)
//     localStorage.setItem('users',JSON.stringify(updatedUSers))

//     // Export the users database to a file
//     //saveDataToFile(schema.users.all().models);

//     // Generate a JWT token
//     const encodedToken = sign(
//       { _id, username },
//       import.meta.env.VITE_JWT_SECRET
//     );
//       console.log(JSON.parse(localStorage.getItem('users')))
//     return new Response(201, {}, { createdUser, encodedToken });
//   } catch (error) {
//     return new Response(
//       500,
//       {},
//       {
//         error,
//       }
//     );
//   }
// };

/**
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {username, password}
 */

export const loginHandler = function (schema, request) {
  const { username, password } = JSON.parse(request.requestBody);
  console.log("username=",username )
  try {
    // Find the user by username
    const foundUser = schema.users.findBy({ username: username });

    if (!foundUser) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }

    if (password === foundUser.password) {
      // Export the users database to a file
      //saveDataToFile(schema.users.all().models);

      // Generate a JWT token
      const encodedToken = sign(
        { _id: foundUser._id, username },
        import.meta.env.VITE_JWT_SECRET
      );

      return new Response(200, {}, { foundUser, encodedToken });
    }

    return new Response(
      401,
      {},
      {
        errors: [
          "The credentials you entered are invalid. Unauthorized access error.",
        ],
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * Helper function to save data to a JSON file.
 */
function saveDataToFile(users) {
  const data = JSON.stringify(users, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Create a download link and trigger it
  const a = document.createElement("a");
  a.href = url;
  a.download = "users-database.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
