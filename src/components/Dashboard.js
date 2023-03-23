import React, { useState } from "react";

export default function Dashboard() {
  const [professionDescription, setProfessionDescription] = useState("");

  const [professionTitle, setProfessionTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [numWords, setNumWords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-zinc-500 rounded-lg">
      <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-12 ">
        <div className="">
          <form>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="professionTitle">
                Profession Title
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="professionTitle"
                placeholder="Profession Title"
                id="professionTitle"
                value={professionTitle}
                // onChange: This sets a callback function to be executed whenever the value changes. The function sets the professionTitle state variable to the new value of the input
                onChange={(e) => setProfessionTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="industry">
                Industry
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="industry"
                placeholder="Industry (Optional)"
                id="industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="keywords">
                KeyWords for AI (Optional)
              </label>
              <textarea
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                rows={7}
                name="keyWords"
                id="keyWords"
                placeholder="KeyWords for AI (Optional)"
                value={keyWords}
                onChange={(e) => setKeyWords(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <select
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="tone"
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="default">Select Tone (Optional)</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="professional">Professional</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="sr-only" htmlFor="numWords">
                Words (Optional)
              </label>
              <input
                type="number"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="words"
                placeholder="Number Of Words - Default 200 (Optional)"
                id="words"
                value={numWords}
                onChange={(e) => setNumWords(e.target.value)}
              />
            </div>

            <button
              // inline conditional expression that adds two CSS classes to the className string if either isGenerating is true or professionTitle is an empty string
              className={`bg-blue-600 w-full hover:bg-blue-700 text-white font-bold mt-6 py-2 px-4 rounded
              
                ${
                  isGenerating || professionTitle === ""
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              type="submit"
              //a boolean attribute that disables the button if either isGenerating is true or professionTitle is an empty string
              disabled={isGenerating || professionTitle === ""}
            >
              {/* text inside the button is determined by an inline conditional expression that displays either "Generating..." or "Generate Profession Description" depending on the value of isGenerating. If isGenerating is true, the button will display "Generating...". Otherwise, it will display "Generate Profession Description" */}
              {isGenerating
                ? "Generating..."
                : "Generate Profession Description"}
            </button>
          </form>
        </div>
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                professionDescription === ""
                  ? 12
                  : professionDescription.split("\\n").length + 12
              }
              name="output"
              onChange={(e) => setProfessionDescription(e.target.value)}
              value={professionDescription}
              disabled={professionDescription === ""}
              id="output"
              placeholder="AI Generated Job Description"
              className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={() => {}}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={professionDescription === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
