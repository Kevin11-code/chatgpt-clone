import geminiModel from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
  try {
    // With Gemini API, we don't need to specify model in each call as we've already
    // configured it when initializing the model in chatgpt.ts
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (err: any) {
    return `ChatAI was unable to find an answer for that! (Error: ${err.message})`;
  }
};

export default query;
