

export const apiRequest = async ({ method, url, body }) => {
  try {
    const encodedToken = localStorage.getItem("loggedIn");     
    
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${encodedToken}`, // Add the token to the headers
    };

    const requestBody = (method === "POST" || method === "PUT") && body ? JSON.stringify(body) : undefined;

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: requestBody,
    });

    if (!response.ok) {
      const errorText = await response.text(); // Read error response
      console.error(`API Error: ${response.status} - ${errorText}`);
      return { success: false, error: errorText }; // Include error details
    }

    const data = await response.json(); // Parse JSON response
    
    return { success: true, data };

  } catch (error) {
    console.error("API request failed:", error); // Log error
    return { success: false, error: error.message }; // Return failure with error message
  }
};
