"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/ui/form';
import { Progress } from '@/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';



const questions = [
  {
    id: 'age',
    question: 'What is your age group?',
    options: [
      { value: '18-24', label: '18-24 years' },
      { value: '25-34', label: '25-34 years' },
      { value: '35-44', label: '35-44 years' },
      { value: '45-plus', label: '45 years or older' },
    ],
  },
  {
    id: 'education',
    question: 'What is your highest level of education?',
    options: [
      { value: 'high-school', label: 'High School' },
      { value: 'bachelors', label: 'Bachelor&apos;s Degree' },
      { value: 'masters', label: 'Master&apos;s Degree' },
      { value: 'phd', label: 'PhD or Doctorate' },
    ],
  },
  {
    id: 'experience',
    question: 'How many years of work experience do you have?',
    options: [
      { value: '0-2', label: '0-2 years' },
      { value: '3-5', label: '3-5 years' },
      { value: '6-10', label: '6-10 years' },
      { value: '10-plus', label: '10+ years' },
    ],
  },
  {
    id: 'language',
    question: 'What is your English language proficiency?',
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' },
      { value: 'native', label: 'Native/Bilingual' },
    ],
  },
];

const formSchema = z.object({
  age: z.string(),
  education: z.string(),
  experience: z.string(),
  language: z.string(),
});

export default function EligibilityAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getEligibilityScore = (values: any) => {
    let score = 0;
    // Simple scoring logic - can be made more complex based on requirements
    if (values.age === '25-34') score += 25;
    if (values.education === 'masters' || values.education === 'phd') score += 25;
    if (values.experience === '6-10' || values.experience === '10-plus') score += 25;
    if (values.language === 'advanced' || values.language === 'native') score += 25;
    return score;
  };

  return (
    <div className="container max-w-2xl py-12">
      <Card className="p-6">
        {!showResults ? (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Eligibility Assessment</h1>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name={questions[currentQuestion].id as any}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{questions[currentQuestion].question}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {questions[currentQuestion].options.map((option) => (
                            <FormItem
                              key={option.value}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={option.value} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              {getEligibilityScore(form.getValues()) >= 75 ? (
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              )}
              <h2 className="text-2xl font-bold mb-2">Assessment Results</h2>
              <p className="text-muted-foreground">
                Based on your responses, here&apos;s your eligibility assessment:
              </p>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold mb-2">
                {getEligibilityScore(form.getValues())}%
              </div>
              <p className="text-sm text-muted-foreground">Eligibility Score</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm">
                {getEligibilityScore(form.getValues()) >= 75
                  ? "You appear to be eligible for immigration programs. We recommend proceeding with your application."
                  : "You might need to improve certain aspects to increase your eligibility. Consider consulting with an immigration expert."}
              </p>
              <Button onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                form.reset();
              }}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}