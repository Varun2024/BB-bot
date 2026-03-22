"use client";

import { Fragment, useState } from "react";
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
import { Sparkles } from "lucide-react";


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

    return <div className="enter-fade min-h-[calc(100vh-4rem)] bg-stone-50 px-4 py-6 sm:px-6 sm:py-8">
        <div className="enter-fade-delay mx-auto flex h-[calc(100vh-8.5rem)] w-full max-w-4xl flex-col rounded-3xl border border-amber-100 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-6">
            <div className="flex flex-col h-full">
                <Conversation className="min-h-0 flex-1">
                    <ConversationContent>
                        {messages.length === 0 && (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center max-w-md">
                                    <div className="mb-4 flex justify-center">
                                        <Sparkles className="h-9 w-9 text-amber-500" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-black sm:text-2xl">Start a conversation</h2>
                                    <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                                        Ask directly. BB bot will answer with retrieval context when available.
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        {messages.map((msg) => (
                            <div key={msg.id} >
                                {msg.parts.map((part, i) => {
                                    switch (part.type) {
                                        case "text":
                                            if (typeof part.text !== "string") return null;
                                            return (
                                                <Fragment key={`${msg.id}-${i}`}>
                                                    <Message from={msg.role}>
                                                        <MessageContent>
                                                            <MessageResponse className="text-stone-800">{part.text}</MessageResponse>
                                                        </MessageContent>
                                                    </Message>
                                                </Fragment>
                                            )
                                        default:
                                            return null;
                                    }
                                })}
                            </div>
                        ))}

                        {(status === "submitted" || status === "streaming") && (
                            <Message from="assistant">
                                <MessageContent>
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <div className="h-2 w-2 rounded-full bg-stone-400 animate-pulse"></div>
                                            <div className="h-2 w-2 rounded-full bg-stone-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                                            <div className="h-2 w-2 rounded-full bg-stone-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                                        </div>
                                        <span className="text-sm text-stone-500">Drawing up a play</span>
                                    </div>
                                </MessageContent>
                            </Message>
                        )}

                        {error && (
                            <Message from="system">
                                <MessageContent>
                                    <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error.message}</div>
                                </MessageContent>
                            </Message>
                        )}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>
                <PromptInput onSubmit={handleSubmit} className="mt-6 shrink-0">
                        <PromptInputBody>
                        <PromptInputTextarea
                                className="max-h-40 min-h-12 rounded-2xl border border-amber-100 bg-stone-50 text-black placeholder:text-stone-400 focus:border-amber-300 focus:ring-amber-200"
                                placeholder="Ask anything about basketball or strategy"
                            disabled={isSending}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </PromptInputBody>
                    <PromptInputFooter>
                        <PromptInputSubmit
                            disabled={!canSubmit && !isSending}
                            onStop={stop}
                            status={status}
                        />
                    </PromptInputFooter>
                </PromptInput>
            </div>
        </div>
    </div>
}
