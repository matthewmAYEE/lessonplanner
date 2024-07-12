import axios from "axios";

export const send = async (text, subject) => {
  const apiKey = "sk-proj-N3diNMVv2aozSQEFmacJT3BlbkFJ5iiTr4JNL2wujQRVtULF";
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": `application/json`,
    Authorization: `Bearer ${apiKey}`,
  };
  const prompt = `Given the following text delimited by triple brackets of a curriculum for that subject, return me detailed lesson plans for each individual subtopic.
  Make sure you take into account this attribute:
  learning_types: Students can be "Auditory", "Kinesthetic", "Visual","Interpersonal", or "Reading and Writing" learners. Generate a different version of each lesson plan for each learning type.
  Curriculum:
  <<<${text}>>>
  Do not buffer in between creating lesson plans and give all of them.`;
  const data = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a helpful teacher with years of experience in making lesson plans and you are also an expert in ${subject}`,
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 2000,
  };

  try {
    const res = await axios.post(url, data, { headers });
    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("Error with gpt", error);
    throw error;
  }
};
