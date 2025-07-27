"use client";

import { useChat } from "ai/react";
import { useEffect } from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

export function ImmigrationComparison() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/ai/chat",
      id: "immigration-chat",
      body: {
        filters: {
          category: "visa",
        },
      },
    });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Immigration Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.role === "assistant" ? "bg-muted" : ""
              } p-4 rounded-lg`}
            >
              <div className="font-semibold">
                {message.role === "assistant" ? "AI" : "You"}
              </div>
              <div className="mt-1 whitespace-pre-wrap">{message.content}</div>
            </div>
          ))}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about immigration..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
