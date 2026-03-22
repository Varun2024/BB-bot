
"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
    PromptInput,
    PromptInputBody,
    PromptInputFooter,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { MessageResponse } from "@/components/ai-elements/message";
import { Dribbble, Trophy, ClipboardList } from "lucide-react";

export default function Chat() {
    const [input, setInput] = useState("");
    const { messages, sendMessage, error, status, stop } = useChat();

    const handleSubmit = (message: PromptInputMessage) => {
        if (!message.text) return;
        sendMessage(message);
        setInput("");
    };

    const isSending = status === "submitted" || status === "streaming";
    const canSubmit = input.trim().length > 0;

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-[#fcfaf7] relative overflow-hidden">
            {/* Background Decorations - Half Court Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute -top-20 -left-20 w-96 h-96 border-8 border-stone-900 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-px bg-stone-900" />
            </div>

            <div className="relative mx-auto flex h-[calc(100vh-6rem)] w-full max-w-5xl flex-col p-4 sm:p-6 lg:p-8">
                {/* Header / Scoreboard Style */}
                <div className="mb-6 flex items-center justify-between border-b-2 border-stone-900 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-600 p-2 rounded shadow-lg rotate-2">
                            <Dribbble className="text-white h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="font-black italic uppercase tracking-tighter text-2xl">Locker Room</h1>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600">Active Session // Varun&apos;s Playbook</p>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-stone-400">System Status</p>
                            <p className="text-xs font-bold text-emerald-600 uppercase">Ready to Assist</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col overflow-hidden rounded-xl border-2 border-stone-900 bg-white shadow-[12px_12px_0px_0px_rgba(28,25,23,0.05)]">
                    <Conversation className="min-h-0 flex-1">
                        <ConversationContent className="p-4 sm:p-8 space-y-8">
                            {messages.length === 0 && (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center max-w-sm">
                                        <div className="mb-6 inline-flex p-4 rounded-full bg-orange-50 text-orange-600 border-2 border-orange-100 animate-bounce-slow">
                                            <ClipboardList className="h-10 w-10" />
                                        </div>
                                        <h2 className="text-2xl font-black uppercase italic text-stone-900 ">Gameplan Ready</h2>
                                        <p className="mt-3 text-sm font-medium text-stone-500 leading-relaxed">
                                            &quot;You miss 100% of the shots you don&apos;t take.&quot; <br/> 
                                            Ask for a drill, analyze a set, or compare stats.
                                        </p>
                                    </div>
                                </div>
                            )}
                            
                            {messages.map((msg) => (
                                <div key={msg.id} className={`${msg.role === 'user' ? 'pl-12' : 'pr-12'}`}>
                                    {msg.parts.map((part, i) => {
                                        if (part.type !== "text") return null;
                                        return (
                                            <Message key={`${msg.id}-${i}`} from={msg.role} className="group">
                                                <div className={`flex items-center gap-2 mb-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                                                        {msg.role === 'user' ? 'Player / Varun' : 'Assistant / BB-Bot'}
                                                    </span>
                                                </div>
                                                <MessageContent className={`
                                                    ${msg.role === 'user' 
                                                        ? 'bg-stone-900 text-white rounded-tr-none' 
                                                        : 'bg-orange-50 border-2 border-orange-100 text-stone-800 rounded-tl-none'}
                                                    p-4 shadow-sm transition-all
                                                `}>
                                                    <MessageResponse className="font-medium leading-relaxed">{part.text}</MessageResponse>
                                                </MessageContent>
                                            </Message>
                                        );
                                    })}
                                </div>
                            ))}

                            {isSending && (
                                <div className="pr-12">
                                    <Message from="assistant">
                                        <MessageContent className="bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl rounded-tl-none p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex gap-1.5">
                                                    <div className="h-2 w-2 rounded-full bg-orange-500 animate-bounce"></div>
                                                    <div className="h-2 w-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]"></div>
                                                    <div className="h-2 w-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]"></div>
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-widest text-orange-600 italic">Drawing up a play...</span>
                                            </div>
                                        </MessageContent>
                                    </Message>
                                </div>
                            )}
                        </ConversationContent>
                        <ConversationScrollButton />
                    </Conversation>

                    {/* Footer / Input - "The Coaches Tablet" */}
                    <div className="border-t-2 border-stone-900 bg-stone-50 p-4">
                        <PromptInput onSubmit={handleSubmit}>
                            <PromptInputBody>
                                <PromptInputTextarea
                                    className="max-h-40 min-h-15 w-full rounded-lg border-2 border-stone-200 bg-white p-3 text-stone-900 placeholder:text-stone-400 focus:border-orange-500 focus:ring-0 transition-all text-sm font-medium"
                                    placeholder="Type your strategy or question..."
                                    disabled={isSending}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </PromptInputBody>
                            <PromptInputFooter className="flex justify-between items-center mt-3">
                                <div className="flex gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> Tactical Mode</span>
                                </div>
                                <PromptInputSubmit
                                    disabled={!canSubmit && !isSending}
                                    onStop={stop}
                                    status={status}
                                    className="bg-stone-900 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-xs px-6 py-2 transition-colors rounded shadow-lg"
                                />
                            </PromptInputFooter>
                        </PromptInput>
                    </div>
                </div>
            </div>
        </div>
    );
}