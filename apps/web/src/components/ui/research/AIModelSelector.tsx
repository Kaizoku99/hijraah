"use client";

import { useTranslations } from "next-intl";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AIModel {
  id: string;
  nameKey: string;
  descriptionKey: string;
  capabilities: string[];
}

const availableModels: AIModel[] = [
  {
    id: "gpt-4",
    nameKey: "gpt4.name",
    descriptionKey: "gpt4.description",
    capabilities: [
      "Advanced reasoning",
      "Complex analysis",
      "Nuanced understanding",
    ],
  },
  {
    id: "gpt-3.5-turbo",
    nameKey: "gpt35.name",
    descriptionKey: "gpt35.description",
    capabilities: ["Quick analysis", "Good comprehension", "Cost effective"],
  },
  {
    id: "claude-3",
    nameKey: "claude3.name",
    descriptionKey: "claude3.description",
    capabilities: ["Academic focus", "Detailed citations", "Research oriented"],
  },
];

interface AIModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AIModelSelector({
  value,
  onChange,
  disabled,
}: AIModelSelectorProps) {
  const t = useTranslations("research.interface.aiModel");
  const selectedModel = availableModels.find((model) => model.id === value);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t("select")}>
          {selectedModel ? t(`models.${selectedModel.nameKey}`) : t("select")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {availableModels.map((model) => (
          <SelectItem key={model.id} value={model.id} className="relative">
            <div className="space-y-1">
              <div className="font-medium">{t(`models.${model.nameKey}`)}</div>
              <p className="text-xs text-muted-foreground">
                {t(`models.${model.descriptionKey}`)}
              </p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
