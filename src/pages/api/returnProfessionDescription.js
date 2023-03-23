const generateDescription = async ({
  professionTitle,
  industry,
  keyWords,
  tone,
  numWords,
}) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer: ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Describe the ${professionTitle} profession in ${
            industry ? `the ${industry} industry` : ""
          } that is around ${numWords || 200} words in a ${
            tone || "neutral"
          } tone. ${
            keyWords ? `Incorporate the following keywords: ${keyWords}` : ""
          }. The description should be able to help someone wanting to choose a profession and should be described in a ways that is SEO friendly, and highlight the salary range and the benefits`,
          max_token: 100,
          temperature: 0.5,
        }),
      }
    );
    const data = await response.json();
    return data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
};

//generateDescription function is used inside the NextJS API route handler
export default async function handler(req, res) {
  const { professionTitle, industry, keyWords, tone, numWords } = req.body;

  const professionDescription = await generateDescription({
    professionTitle,
    industry,
    keyWords,
    tone,
    numWords,
  });

  res.status(200).json({ professionDescription });
}
