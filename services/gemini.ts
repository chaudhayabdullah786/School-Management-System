
import { GoogleGenAI } from "@google/genai";

export async function getStudentInsights(studentData: any) {
  try {
    // Initializing with the environment variable directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Analyze the following student performance data and provide a concise summary with advice.
      Student Name: ${studentData.name}
      Class: ${studentData.class}
      Attendance: ${studentData.attendance}%
      GPA: ${studentData.gpa}
      Last Exam Result: ${studentData.lastExam}
      Fee Status: ${studentData.feesStatus}

      Provide a 3-point bulleted analysis focusing on academic progress, behavioral risk (based on attendance), and specific action items for teachers/parents.
      Keep it professional and encouraging.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        // Removed maxOutputTokens to avoid potential empty responses due to thinking budget consumption
      }
    });

    // Directly access the .text property of GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI insights currently unavailable. Please check your connection or API key.";
  }
}
