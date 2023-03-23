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
    console.log(data);
    return data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
};

//generateDescription function is used inside the NextJS API route handler
// getGeneratedDescription is exported as the default handler for the api/returnProfessionalDescription
// When a client makes an HTTP POST request to this route, the getGeneratedDescription function is executed

// exports the getGeneratedDescription function as the default export of this module
export default async function getGeneratedDescription(req, res) {
  //extracts the relevant data from the req.body object through destructuring, which contains the data submitted in the POST request
  const { professionTitle, industry, keyWords, tone, numWords } = req.body;

  // calls the generateDescription function with the extracted data as arguments/inputs params and generates a description based on the inputs and returns the generated text as a string and stored in the professionDescription variable
  const professionDescription = await generateDescription({
    professionTitle,
    industry,
    keyWords,
    tone,
    numWords,
  });

  //sends a response to the client in the form of a JSON object containing the generated profession description
  //the status code of the response to 200 indicates the request was successful
  res.status(200).json({ professionDescription });
}
