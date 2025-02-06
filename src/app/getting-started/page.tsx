'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, MessageSquare, FileText, Users } from 'lucide-react'
import Link from 'next/link'

export default function GettingStartedPage() {
  const steps = [
    {
      title: 'Start a Chat',
      description: 'Begin by chatting with our AI assistant to understand your immigration options.',
      icon: MessageSquare,
      href: '/chat',
      buttonText: 'Start Chat',
    },
    {
      title: 'Check Eligibility',
      description: 'Use our assessment tool to check your eligibility for different immigration programs.',
      icon: CheckCircle2,
      href: '/assessment',
      buttonText: 'Check Now',
    },
    {
      title: 'Prepare Documents',
      description: 'Get a personalized checklist of required documents for your immigration process.',
      icon: FileText,
      href: '/documents',
      buttonText: 'View Checklist',
    },
    {
      title: 'Join Community',
      description: 'Connect with others who are also going through the immigration process.',
      icon: Users,
      href: '/community',
      buttonText: 'Join Now',
    },
  ]

  return (
    <div className="container max-w-4xl py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Hijraah</h1>
        <p className="text-xl text-muted-foreground">
          Let&apos;s get you started on your immigration journey
        </p>
      </div>

      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <Button asChild>
                  <Link href={step.href}>
                    {step.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 