"use client";

import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Avatar } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Input } from "@/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";

const posts = [
  {
    id: 1,
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    title: "My Immigration Success Story",
    content: "After 2 years of hard work and dedication...",
    likes: 42,
    comments: 12,
    category: "success-stories",
  },
  // Add more posts
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">
            Connect with others on their immigration journey
          </p>
        </div>
        <Button>Create Post</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Posted by {post.author.name}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2">{post.content}</p>
                      <div className="mt-4 flex gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Popular Topics</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                #VisaApplication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                #StudyAbroad
              </Button>
              <Button variant="outline" className="w-full justify-start">
                #WorkPermit
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Community Guidelines</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Be respectful and supportive</li>
              <li>Share accurate information</li>
              <li>Protect personal information</li>
              <li>No spam or self-promotion</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
