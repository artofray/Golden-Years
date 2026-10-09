import React, { useState, useEffect, useRef } from 'react';
import { DwellButton } from '../components/DwellButton';
import { useSpeech } from '../hooks/useSpeech';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export function VoiceAssistant() {
  const { speak, listen, stopListening, isListening, isSpeaking } = useSpeech();
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSpeechResult = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsProcessing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a friendly, patient, and helpful assistant for a senior citizen. Keep your answers very short, simple, and conversational. The user said: "${text}"`,
      });

      const reply = response.text || "I'm sorry, I didn't understand that.";
      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      speak(reply);
    } catch (error) {
      console.error("Gemini Error:", error);
      const errorMsg = "I'm having trouble connecting right now.";
      setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      listen(handleSpeechResult);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="flex-1 bg-white rounded-3xl shadow-sm p-8 mb-8 overflow-y-auto border-4 border-stone-200">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-stone-400">
            <Mic className="w-32 h-32 mb-6 opacity-20" />
            <p className="text-4xl font-medium text-center">Tap the microphone and say hello!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-6 rounded-3xl text-3xl leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-stone-100 text-stone-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <DwellButton
          onClick={toggleListening}
          disabled={isProcessing || isSpeaking}
          className={`rounded-full p-12 border-8 transition-all ${
            isListening 
              ? 'bg-rose-100 border-rose-500 text-rose-600 animate-pulse' 
              : isProcessing || isSpeaking
                ? 'bg-stone-100 border-stone-300 text-stone-400'
                : 'bg-blue-100 border-blue-500 text-blue-600 hover:bg-blue-200'
          }`}
          activeColor={isListening ? 'bg-rose-500' : 'bg-blue-500'}
        >
          {isProcessing ? (
            <Loader2 className="w-24 h-24 animate-spin" />
          ) : isListening ? (
            <MicOff className="w-24 h-24" />
          ) : (
            <Mic className="w-24 h-24" />
          )}
        </DwellButton>
      </div>
      <p className="text-center mt-6 text-2xl font-medium text-stone-500">
        {isListening ? "Listening..." : isProcessing ? "Thinking..." : isSpeaking ? "Speaking..." : "Tap to speak"}
      </p>
    </div>
  );
}
