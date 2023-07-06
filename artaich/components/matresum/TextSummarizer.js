import React, { useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { MattResumResp } from "../../util/api/MattResumResp";
import { UserContext } from "../../context/user/UserContext";
import { PromptContext } from "../../context/prompts/PromptContext";
import { useMatResume } from "../../hooks/useMattResume";
import { DocumentArrowDownIcon,DocumentIcon,ShareIcon } from "@heroicons/react/20/solid";
import {  HistoryIcon, VolumenSpeakerIcon } from '../icons/icons';

// Página del componente TextSummarizerPage
function TextSummarizerPage() {
  // Estado para el texto de entrada
  const [inputText, setInputText] = useState("");
  // Estado para el texto del resumen
  const [summaryText, setSummaryText] = useState("");
  // Estado para indicar si se está cargando un archivo
  const [isUploading, setIsUploading] = useState(false);
  // Estado para el contenido del archivo
  const [fileContent, setFileContent] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setPrompt, prompt, setResponse, setPromptTokens } =
    useContext(PromptContext);
  const { user } = useContext(UserContext);

  const { data, mutate } = useMatResume(user);

  // Maneja el cambio de texto
  const handleTextChange = (event) => {
    setInputText(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;

    // Limitar la altura máxima del textarea
    const maxHeight = 350; // Establece el valor máximo de altura deseado en píxeles
    if (event.target.scrollHeight > maxHeight) {
      event.target.style.height = `${maxHeight}px`;
      event.target.style.overflowY = "scroll";
    }
  };

  // Maneja el evento de arrastrar y soltar archivos
  const handleDrop = (acceptedFiles) => {
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
      setIsUploading(false);
    };

    reader.readAsText(acceptedFiles[0]);
  };

  const handleRequestSummary = async () => {
    if (!prompt) {
      setError("Please type something before submit");
    } else {
      setIsLoading(true);
      // Realiza la llamada a la API para obtener el resumen
      MattResumResp({
        prompt: inputText,
        language: "english",
        user: user,
      }).then((response) => {
        setResponse(response?.data?.data);
      });
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div className="container mx-auto py-5 h-screen">
  <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-6/10 h-full flex-grow -mr-1">
        <div className="bg-white rounded-lg shadow-lg p-6 h-full">
          <textarea
            className="w-full p-4 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
            value={fileContent || inputText}
            onChange={handleTextChange}
            placeholder="Écrivez votre texte ici"
            style={{
              resize: "none",
              overflow: "hidden",
            }}
          />
          <div
            className={`w-full h-40 flex items-center justify-center border border-dashed rounded mt-4 ${
              isUploading ? "bg-gray-200" : ""
            }`}
            {...getRootProps()}
          >
            {isUploading ? (
              <p className="text-gray-500">Cargando archivo...</p>
            ) : (
              <p className="text-gray-500">Glissez et déposez les fichiers ici.</p>
            )}
          </div>
          <div className="my-4">
          <nav className="flex" aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex space-x-4 rounded-md bg-gray-50 px-6 shadow"
        >
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>

            <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
              <div className="flex justify-center items-center">
                <HistoryIcon
                  className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">
                  {' '}
                  {' '}
                </span>
              </div>
            </button>
          </li>
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
              <div className="flex justify-center items-center">
                <DocumentArrowDownIcon
                  className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">
                  {' '}
                  PDF{' '}
                </span>
              </div>
            </button>
          </li>
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
              <div className="flex justify-center items-center">
                <DocumentIcon
                  className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">
                  {' '}
                  Word{' '}
                </span>
              </div>
            </button>
          </li>
          <li className="flex items-center">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-200"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>

            <button className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-800">
              <div className="flex justify-center items-center">
                <ShareIcon
                  className=" mr-2 h-4 w-4 text-gray-500 hover:text-gray-800 sm:hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="hidden sm:contents">
                  {' '}
                  Partager{' '}
                </span>
              </div>
            </button>
          </li>
        </ol>
      </nav>
          </div>
          <button
            className="mt-auto w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleRequestSummary}
          >
            Créer un résumé
          </button>
        </div>
      </div>
      <div className="w-screen md:w-6/10 px-4 mt-4 md:mt-0 h-full flex-grow">
        <div className="bg-white rounded-lg shadow-lg p-4 h-full -ml-2">
          <textarea
            className="w-full p-4 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-center placeholder-gray-400"
            style={{ height: "calc(100% - 2.5rem)" }}
            value={summaryText}
            readOnly
            placeholder="Votre résumé créé par MattResum apparaîtra ici."
          />
          {summaryText && (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCopySummary}
            >
              Copiar
            </button>
          )}
        </div>
      </div>
  </div>
</div>

  );
}

export default TextSummarizerPage;
