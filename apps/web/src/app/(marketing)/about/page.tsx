import {
  Users,
  Globe,
  Award,
  CheckCircle,
  BarChart,
  Shield,
} from "lucide-react";
import Image from "next/image";

import { Card } from "@/components/ui/card";

const stats = [
  {
    value: "10K+",
    label: "Successful Applications",
    icon: CheckCircle,
  },
  {
    value: "50+",
    label: "Countries Served",
    icon: Globe,
  },
  {
    value: "95%",
    label: "Success Rate",
    icon: BarChart,
  },
];

const values = [
  {
    title: "Expert Guidance",
    description:
      "Our AI is trained on the latest immigration policies and procedures.",
    icon: Award,
  },
  {
    title: "User Privacy",
    description: "Your data is protected with enterprise-grade security.",
    icon: Shield,
  },
  {
    title: "Community Support",
    description: "Join thousands of others on their immigration journey.",
    icon: Users,
  },
];

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Hijraah</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Empowering immigrants worldwide with AI-powered guidance and support
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6">
            At Hijraah, we believe that everyone deserves access to clear,
            reliable immigration guidance. Our AI-powered platform makes the
            immigration process more accessible, efficient, and transparent.
          </p>
          <p className="text-lg text-muted-foreground">
            We combine cutting-edge technology with comprehensive immigration
            knowledge to provide personalized assistance at every step of your
            journey.
          </p>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
            alt="Team meeting"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 text-center">
            <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <Card key={value.title} className="p-6">
              <value.icon className="w-8 h-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Immigration Expert",
              image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            },
            {
              name: "Michael Chen",
              role: "AI Specialist",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            },
            {
              name: "Emily Rodriguez",
              role: "Legal Advisor",
              image:
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
            },
          ].map((member) => (
            <Card key={member.name} className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
