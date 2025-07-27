"use client";

import { Calculator } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Label } from "@/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

const categories = {
  age: {
    "18-24": 15,
    "25-29": 25,
    "30-34": 20,
    "35-39": 15,
    "40-44": 10,
    "45-plus": 5,
  },
  education: {
    "high-school": 5,
    bachelors: 15,
    masters: 20,
    phd: 25,
  },
  experience: {
    "0-2": 5,
    "3-5": 10,
    "6-10": 15,
    "10-plus": 20,
  },
  language: {
    basic: 5,
    intermediate: 10,
    advanced: 15,
    native: 20,
  },
  adaptability: {
    none: 0,
    relative: 5,
    education: 10,
    work: 15,
  },
};

export default function PointsCalculator() {
  const [points, setPoints] = useState({
    age: "0",
    education: "0",
    experience: "0",
    language: "0",
    adaptability: "0",
  });

  const calculateTotal = () => {
    return Object.values(points).reduce((acc, val) => acc + Number(val), 0);
  };

  return (
    <div className="container max-w-2xl py-12">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Points Calculator</h1>
            <p className="text-sm text-muted-foreground">
              Calculate your points for skilled immigration programs
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Age</Label>
            <Select
              onValueChange={(value) => setPoints({ ...points, age: value })}
              defaultValue="0"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Select age group</SelectItem>
                {Object.entries(categories.age).map(([key, value]) => (
                  <SelectItem key={key} value={value.toString()}>
                    {key.replace("-", " to ")} ({value} points)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Education</Label>
            <Select
              onValueChange={(value) =>
                setPoints({ ...points, education: value })
              }
              defaultValue="0"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Select education level</SelectItem>
                {Object.entries(categories.education).map(([key, value]) => (
                  <SelectItem key={key} value={value.toString()}>
                    {key.replace("-", " ")} ({value} points)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Work Experience</Label>
            <Select
              onValueChange={(value) =>
                setPoints({ ...points, experience: value })
              }
              defaultValue="0"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Select years of experience</SelectItem>
                {Object.entries(categories.experience).map(([key, value]) => (
                  <SelectItem key={key} value={value.toString()}>
                    {key.replace("-", " to ")} years ({value} points)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Language Proficiency</Label>
            <Select
              onValueChange={(value) =>
                setPoints({ ...points, language: value })
              }
              defaultValue="0"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Select language level</SelectItem>
                {Object.entries(categories.language).map(([key, value]) => (
                  <SelectItem key={key} value={value.toString()}>
                    {key} ({value} points)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Adaptability Factors</Label>
            <Select
              onValueChange={(value) =>
                setPoints({ ...points, adaptability: value })
              }
              defaultValue="0"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select adaptability factors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Select adaptability factors</SelectItem>
                {Object.entries(categories.adaptability).map(([key, value]) => (
                  <SelectItem key={key} value={value.toString()}>
                    {key} ({value} points)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total Points:</span>
              <span className="text-2xl font-bold">{calculateTotal()}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {calculateTotal() >= 67 ? (
                <p className="text-green-600 dark:text-green-400">
                  You meet the minimum points requirement (67 points) for many
                  skilled immigration programs.
                </p>
              ) : (
                <p className="text-yellow-600 dark:text-yellow-400">
                  You need {67 - calculateTotal()} more points to meet the
                  minimum requirement of 67 points.
                </p>
              )}
            </div>
          </div>

          <Button
            className="w-full"
            onClick={() =>
              setPoints({
                age: "0",
                education: "0",
                experience: "0",
                language: "0",
                adaptability: "0",
              })
            }
          >
            Reset Calculator
          </Button>
        </div>
      </Card>
    </div>
  );
}
