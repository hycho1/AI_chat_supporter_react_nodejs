// # Clean
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI("AIzaSyDiylAH2Trv2vPJmXzrtBThNw9740qaYZs");

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// async function run() {
//     const input = "안녕하세요."

//     const result = await model.generateContent(input);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }

//   run();

import dotenv from 'dotenv';

// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.gemini_API_KEY;

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function gemini(input) {

  // const input = 
  const result = await model.generateContent(input);
  const response = await result.response;
  const text = await response.text();
  console.log(text);

  return text; //이걸 해줘야,, 응답이 실질적으로 send될 수 있다..
}


// run();