"use client";

import { ClipboardList, Download } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

const visaTypes = {
  student: {
    name: "Student Visa",
    documents: [
      "Valid passport",
      "Acceptance letter from educational institution",
      "Proof of financial support",
      "Academic transcripts",
      "Language proficiency test results",
      "Passport-size photographs",
      "Medical examination results",
      "Police clearance certificate",
    ],
  },
  work: {
    name: "Work Visa",
    documents: [
      "Valid passport",
      "Job offer letter",
      "Employment contract",
      "Educational credentials",
      "Work experience letters",
      "Language proficiency test results",
      "Medical examination results",
      "Police clearance certificate",
      "Resume/CV",
      "Professional qualifications",
    ],
  },
  family: {
    name: "Family Sponsorship",
    documents: [
      "Valid passport",
      "Birth certificates",
      "Marriage certificate (if applicable)",
      "Proof of relationship",
      "Sponsor's documents",
      "Financial documents",
      "Medical examination results",
      "Police clearance certificate",
      "Photographs",
      "Affidavit of support",
    ],
  },
};

export default function DocumentChecklist() {
  const [selectedType, setSelectedType] = useState<string>("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCheckedItems([]);
  };

  const toggleDocument = (document: string) => {
    setCheckedItems((prev) =>
      prev.includes(document)
        ? prev.filter((item) => item !== document)
        : [...prev, document],
    );
  };

  const downloadChecklist = () => {
    const checklist =
      `${visaTypes[selectedType as keyof typeof visaTypes].name} Document Checklist\n\n` +
      visaTypes[selectedType as keyof typeof visaTypes].documents
        .map((doc) => `[${checkedItems.includes(doc) ? "x" : " "}] ${doc}`)
        .join("\n");

    const blob = new Blob([checklist], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "immigration-checklist.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container max-w-2xl py-12">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <ClipboardList className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Document Checklist Generator</h1>
            <p className="text-sm text-muted-foreground">
              Generate a personalized document checklist for your immigration
              application
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Select Visa/Immigration Type</Label>
            <Select onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose visa type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(visaTypes).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedType && (
            <>
              <div className="space-y-4">
                <h2 className="font-semibold">Required Documents:</h2>
                {visaTypes[
                  selectedType as keyof typeof visaTypes
                ].documents.map((document) => (
                  <div key={document} className="flex items-center space-x-2">
                    <Checkbox
                      id={document}
                      checked={checkedItems.includes(document)}
                      onCheckedChange={() => toggleDocument(document)}
                    />
                    <label
                      htmlFor={document}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {document}
                    </label>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">Progress:</span>
                  <span className="text-sm">
                    {checkedItems.length} of{" "}
                    {
                      visaTypes[selectedType as keyof typeof visaTypes]
                        .documents.length
                    }{" "}
                    complete
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div
                    className="bg-primary rounded-full h-2.5 transition-all"
                    style={{
                      width: `${(checkedItems.length / visaTypes[selectedType as keyof typeof visaTypes].documents.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={downloadChecklist}
                disabled={!selectedType}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Checklist
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
