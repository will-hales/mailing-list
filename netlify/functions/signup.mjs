import axios from 'axios'

export default async (req, context) => {
    const scriptURL = process.env.GOOGLE_SHEET_URL;

    try {
        const requestBody = await req.json();
    
        if (!requestBody || !requestBody.data || !requestBody.data.name || !requestBody.data.email) {
            return new Response("Please provide name and email data in the request body.", { status: 400 });
        }
    
        const name = requestBody.data.name;
        const email = requestBody.data.email;
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
    
        const response = await axios.post(scriptURL, formData);
    
        if (response.status === 200) {
            return new Response("Thanks ☺️");
        } else {
            throw new Error('Failed to submit form');
        }
    } catch (error) {
        if (error instanceof SyntaxError && error.message === 'Unexpected end of JSON input') {
            return new Response("Invalid JSON format in the request body.", { status: 400 });
        } else {
            console.error('Error!', error.message);
            return new Response("Error occurred during form submission.", { status: 500 });
        }
    }
}