import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

// Set the name of the model and the API key
const MODEL_NAME = "gemini-1.0-pro-001";
const API_KEY = "AIzaSyACDluTkiYSUqS5R5jb-Hr3tp-OQ0_7GY0";

// Function to run a chat with the Google Generative AI model
async function runChat(prompt) {
	// Initialize Google Generative AI with API key
	const genAI = new GoogleGenerativeAI(API_KEY);
	// Get the specified generative model
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	// Configuration for generation
	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048,
	};

	// Safety settings to block harmful content
	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	];

	// Start a chat session with specified configuration
	const chat = model.startChat({
		generationConfig,
		safetySettings,
		history: [],
	});

	// Send the prompt to the model and get the response
	const result = await chat.sendMessage(prompt);
	const response = result.response;

	// Log the response text and return it
	console.log(response.text());
	return response.text();
}

export default runChat;
