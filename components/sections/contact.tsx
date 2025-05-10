"use client";

import { useState, useTransition } from "react";
import { Map, Mail, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { sendEmail } from "@/app/actions/sendEmail";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await sendEmail(formData);

      if (result?.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Error!",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg">
            Ready to start your project? Contact us today and let&aois;s bring
            your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-border overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary flex-shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground mb-2">
                    For general inquiries and questions
                  </p>
                  <a
                    href="mailto:codingcanvasinfo@gmail.com"
                    className="text-primary hover:underline"
                  >
                    codingcanvasinfo@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground mb-2">
                    Mon-Fri from 9am to 6pm
                  </p>
                  <a
                    href="tel:+918080082175"
                    className="text-primary hover:underline"
                  >
                    (+91)80800 82175
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border overflow-hidden transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary flex-shrink-0">
                  <Map className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Visit Us</h3>
                  <p className="text-muted-foreground mb-2">
                    Our creative studio is located at
                  </p>
                  <address className="not-italic">
                    WW 125,Malibu town
                    <br />
                    Sector 47 122018
                  </address>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
