"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";
import { useCookies } from "next-client-cookies";
import * as React from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";

export interface ModelOption {
  id: string;
  name: string;
  description?: string;
  provider?: string;
}

// Define available models
const chatModels: ModelOption[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Most capable model for chat and reasoning",
  },
  {
    id: "claude-3-opus-20240229",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Highest quality model with advanced reasoning",
  },
  {
    id: "claude-3-sonnet-20240229",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    description: "Excellent balance of intelligence and speed",
  },
  {
    id: "gemini-1.0-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Google's most capable model for chat",
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek",
    provider: "DeepSeek",
    description: "Open model with strong reasoning capabilities",
  },
  {
    id: "mixtral-8x7b-instruct",
    name: "Mixtral 8x7B",
    provider: "Mixtral",
    description: "Open model with good performance",
  },
];

const reasoningModels: ModelOption[] = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Most reliable model for complex reasoning",
  },
  {
    id: "claude-3-opus-20240229",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Highest quality model with advanced reasoning",
  },
  {
    id: "claude-3-sonnet-20240229",
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    description: "Excellent balance of intelligence and speed",
  },
];

interface ModelSelectorProps extends PopoverProps {
  types?: Array<"chat" | "reasoning">;
  onChatModelSelect?: (modelId: string) => void;
  onReasoningModelSelect?: (modelId: string) => void;
  className?: string;
}

export function ModelSelector({
  types = ["chat", "reasoning"],
  onChatModelSelect,
  onReasoningModelSelect,
  className,
  ...props
}: ModelSelectorProps) {
  const cookies = useCookies();

  // Get default models from cookies or use defaults
  const defaultChatModel = cookies.get("preferred-chat-model") || "gpt-4o";
  const defaultReasoningModel =
    cookies.get("preferred-reasoning-model") || "gpt-4-turbo";

  const [chatModelOpen, setChatModelOpen] = React.useState(false);
  const [reasoningModelOpen, setReasoningModelOpen] = React.useState(false);
  const [selectedChatModel, setSelectedChatModel] = React.useState<ModelOption>(
    chatModels.find((model) => model.id === defaultChatModel) || chatModels[0]
  );
  const [selectedReasoningModel, setSelectedReasoningModel] =
    React.useState<ModelOption>(
      reasoningModels.find((model) => model.id === defaultReasoningModel) ||
        reasoningModels[0]
    );

  // Handle chat model selection
  const handleChatModelSelect = (model: ModelOption) => {
    setSelectedChatModel(model);
    setChatModelOpen(false);

    try {
      // Save preference in cookie
      cookies.set("preferred-chat-model", model.id);

      // Call the callback if provided
      if (onChatModelSelect) {
        onChatModelSelect(model.id);
      }
    } catch (error) {
      console.error("Failed to save model preference:", error);
      toast.error("Failed to save model preference");
    }
  };

  // Handle reasoning model selection
  const handleReasoningModelSelect = (model: ModelOption) => {
    setSelectedReasoningModel(model);
    setReasoningModelOpen(false);

    try {
      // Save preference in cookie
      cookies.set("preferred-reasoning-model", model.id);

      // Call the callback if provided
      if (onReasoningModelSelect) {
        onReasoningModelSelect(model.id);
      }
    } catch (error) {
      console.error("Failed to save model preference:", error);
      toast.error("Failed to save model preference");
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {types.includes("chat") && (
        <Popover
          open={chatModelOpen}
          onOpenChange={setChatModelOpen}
          {...props}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={chatModelOpen}
              aria-label="Select a chat model"
              className="justify-between min-w-[200px]"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="truncate">{selectedChatModel.name}</span>
                {selectedChatModel.provider && (
                  <span className="text-xs text-muted-foreground truncate">
                    ({selectedChatModel.provider})
                  </span>
                )}
              </div>
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search models..." className="h-9" />
              <CommandList>
                <CommandEmpty>No models found.</CommandEmpty>
                <CommandGroup>
                  {chatModels.map((model) => (
                    <CommandItem
                      key={model.id}
                      value={model.id}
                      onSelect={() => handleChatModelSelect(model)}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="mr-2">{model.name}</span>
                          {model.provider && (
                            <span className="text-xs text-muted-foreground">
                              ({model.provider})
                            </span>
                          )}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedChatModel.id === model.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </div>
                        {model.description && (
                          <span className="text-xs text-muted-foreground">
                            {model.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}

      {types.includes("reasoning") && (
        <Popover
          open={reasoningModelOpen}
          onOpenChange={setReasoningModelOpen}
          {...props}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={reasoningModelOpen}
              aria-label="Select a reasoning model"
              className="justify-between min-w-[200px]"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="truncate">{selectedReasoningModel.name}</span>
                {selectedReasoningModel.provider && (
                  <span className="text-xs text-muted-foreground truncate">
                    ({selectedReasoningModel.provider})
                  </span>
                )}
              </div>
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search models..." className="h-9" />
              <CommandList>
                <CommandEmpty>No models found.</CommandEmpty>
                <CommandGroup>
                  {reasoningModels.map((model) => (
                    <CommandItem
                      key={model.id}
                      value={model.id}
                      onSelect={() => handleReasoningModelSelect(model)}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="mr-2">{model.name}</span>
                          {model.provider && (
                            <span className="text-xs text-muted-foreground">
                              ({model.provider})
                            </span>
                          )}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedReasoningModel.id === model.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </div>
                        {model.description && (
                          <span className="text-xs text-muted-foreground">
                            {model.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
