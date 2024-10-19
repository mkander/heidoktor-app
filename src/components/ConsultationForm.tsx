import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, X, CheckCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Cloudinary } from 'cloudinary-core';

interface ConsultationFormProps {
  onSubmit: (formData: FormData) => void;
}

interface Media {
  file: File;
  type: 'image' | 'video';
  preview: string;
  progress: number;
}

const cloudinary = new Cloudinary({ cloud_name: 'dm897nueu', secure: true });

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [media, setMedia] = useState<Media[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [hints, setHints] = useState<string[]>([]);
  const [isLoadingHints, setIsLoadingHints] = useState(false);
  const [noMoreHints, setNoMoreHints] = useState(false);
  const navigate = useNavigate();
  const lastApiCallRef = useRef<number>(0);
  const sentenceCountRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const initialHintFetchedRef = useRef<boolean>(false);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMedia = files.map((file) => ({
      file,
      type: file.type.startsWith('image/') ? 'image' : 'video',
      preview: URL.createObjectURL(file),
      progress: 0,
    }));
    setMedia([...media, ...newMedia]);
  };

  const removeMedia = (index: number) => {
    const updatedMedia = [...media];
    URL.revokeObjectURL(updatedMedia[index].preview);
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
  };

  const uploadToCloudinary = useCallback(
    async (file: File, index: number): Promise<string> => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');

        const xhr = new XMLHttpRequest();
        xhr.open(
          'POST',
          `https://api.cloudinary.com/v1_1/${
            cloudinary.config().cloud_name
          }/auto/upload`,
          true
        );

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            setMedia((prevMedia) =>
              prevMedia.map((item, i) =>
                i === index ? { ...item, progress } : item
              )
            );
          }
        };

        xhr.onload = function () {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve(response.secure_url);
          } else {
            reject(new Error('Upload failed'));
          }
        };

        xhr.onerror = function () {
          reject(new Error('XHR error'));
        };

        xhr.send(formData);
      });
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Last opp mediefiler til Cloudinary
      const mediaUrls = await Promise.all(
        media.map((item, index) => uploadToCloudinary(item.file, index))
      );

      // Send data til API-et
      const response = await axios.post(
        'https://europe-north1-heidoktor.cloudfunctions.net/init-form',
        {
          question,
          mediaUrls,
        }
      );

      // Omdiriger til Vipps betalings-URL
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error('Error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setSubmitMessage(
            `Det oppstod en feil: ${
              error.response.data.message || 'Ukjent feil fra serveren'
            }`
          );
        } else if (error.request) {
          setSubmitMessage(
            'Kunne ikke nå serveren. Vennligst sjekk internettforbindelsen din og prøv igjen.'
          );
        } else {
          setSubmitMessage(`Det oppstod en feil: ${error.message}`);
        }
      } else {
        setSubmitMessage(
          'Det oppstod en uventet feil. Vennligst prøv igjen senere.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchHints = useCallback(async (text: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoadingHints(true);
    setNoMoreHints(false);

    try {
      const response = await axios.post(
        'https://europe-north1-heidoktor.cloudfunctions.net/form-hints',
        { text },
        { signal: abortControllerRef.current.signal }
      );

      let data;
      if (typeof response.data === 'string') {
        // Try to parse the response as JSON if it's a string
        try {
          data = JSON.parse(response.data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          data = { questions: [] };
        }
      } else {
        data = response.data;
      }

      if (data.questions && data.questions.length > 0) {
        setHints(data.questions);
      } else {
        setNoMoreHints(true);
        setHints([]);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error fetching hints:', error);
      }
    } finally {
      setIsLoadingHints(false);
    }
  }, []);

  useEffect(() => {
    const handleQuestionChange = (text: string) => {
      const currentTime = Date.now();
      const timeSinceLastCall = currentTime - lastApiCallRef.current;
      const sentences = text.split(/[.!?]+/).filter(Boolean);

      if (text.trim() === '') {
        setHints([]);
        setNoMoreHints(false);
        sentenceCountRef.current = 0;
        initialHintFetchedRef.current = false;
        return;
      }

      // Check for initial 50 characters
      if (!initialHintFetchedRef.current && text.length >= 50) {
        fetchHints(text);
        initialHintFetchedRef.current = true;
        lastApiCallRef.current = currentTime;
        sentenceCountRef.current = sentences.length;
        return;
      }

      // Check for subsequent hints
      if (
        initialHintFetchedRef.current &&
        sentences.length >= 3 &&
        (timeSinceLastCall > 15000 &&
        (sentences.length > sentenceCountRef.current + 1) || 
        timeSinceLastCall > 5000 &&
        (sentences.length > sentenceCountRef.current + 2))
      ) {
        fetchHints(text);
        lastApiCallRef.current = currentTime;
        sentenceCountRef.current = sentences.length;
      }
    };

    const debounceTimer = setTimeout(() => handleQuestionChange(question), 500);
    return () => clearTimeout(debounceTimer);
  }, [question, fetchHints]);

  return (
    <div
      id="consultation-form"
      className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Still ditt medisinske spørsmål
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Ditt medisinske spørsmål
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
          {isLoadingHints && (
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Henter forslag...
            </div>
          )}
          {noMoreHints && (
            <div className="mt-2 flex items-center text-sm text-green-500">
              <CheckCircle className="h-4 w-4 mr-2" />
              Ingen flere forslag. Du har gitt god informasjon!
            </div>
          )}
          {hints.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">Forslag til tilleggsinformasjon:</p>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-600">
                {hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label
            htmlFor="media"
            className="block text-sm font-medium text-gray-700"
          >
            Last opp bilder eller videoer (valgfritt)
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="media"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              multiple
              className="sr-only"
            />
            <label
              htmlFor="media"
              className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Upload className="h-5 w-5 text-gray-400 inline mr-2" />
              Velg filer
            </label>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {media.map((item, index) => (
              <div key={index} className="relative">
                {item.type === 'image' ? (
                  <img
                    src={item.preview}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                ) : (
                  <video
                    src={item.preview}
                    className="h-20 w-20 object-cover rounded"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
                {item.progress > 0 && item.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-2">
                    <div
                      className="bg-green-500 h-2"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dm897nueu/image/upload/v1729069410/lrscpptywtsiuxltzhqc.png"
              alt="Vipps logo"
              className="h-8 mr-2"
            />
            <span className="text-sm text-gray-600">Betal trygt med Vipps</span>
          </div>
          <button
            type="submit"
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sender...' : 'Send inn og betal 299 kr'}
          </button>
        </div>
      </form>
      {submitMessage && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {submitMessage}
        </div>
      )}
    </div>
  );
};

export default ConsultationForm;