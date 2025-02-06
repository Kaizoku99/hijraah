"use client";

import { useState } from 'react';
import { Button } from '@/app/_components/ui/button';
import { Card } from '@/app/_components/ui/card';
import { Input } from '@/app/_components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { Calendar } from '@/app/_components/ui/calendar';
import { Avatar } from '@/app/_components/ui/avatar';
import { Star, MapPin, Clock, Video } from 'lucide-react';
import Image from 'next/image';

const experts = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Immigration Law',
    rating: 4.9,
    reviews: 128,
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    availability: ['Monday', 'Wednesday', 'Friday'],
    hourlyRate: 150,
  },
  // Add more experts
];

export default function ExpertsPage() {
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Immigration Experts</h1>
          <p className="text-muted-foreground">
            Connect with verified immigration experts for personalized guidance
          </p>
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="law">Immigration Law</SelectItem>
              <SelectItem value="visa">Visa Processing</SelectItem>
              <SelectItem value="business">Business Immigration</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search experts..."
            className="w-[200px]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {experts.map((expert) => (
          <Card key={expert.id} className="p-6">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{expert.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {expert.specialization}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">
                      {expert.rating} ({expert.reviews})
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {expert.location}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      Available {expert.availability.join(', ')}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    ${expert.hourlyRate}/hour
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedExpert(expert.id)}
                  >
                    View Profile
                  </Button>
                  <Button className="flex-1">
                    <Video className="w-4 h-4 mr-2" />
                    Book Consultation
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedExpert && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-md border-l bg-background p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Book Consultation</h2>
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">9:00 AM</SelectItem>
                  <SelectItem value="10">10:00 AM</SelectItem>
                  <SelectItem value="11">11:00 AM</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Confirm Booking</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}