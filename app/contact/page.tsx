"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { Footer } from "@/components/pet-haven/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("sending")
    // Form submission - for now simulate success. Replace with your backend/API.
    await new Promise((r) => setTimeout(r, 800))
    setStatus("sent")
  }

  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />

      <section className="w-full bg-background py-8 md:py-12">
        <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
          {/* Header Card */}
          <div className="relative rounded-2xl md:rounded-3xl bg-card overflow-hidden mb-8 md:mb-10 min-h-[160px] md:min-h-[200px] flex items-center">
            <div className="relative z-10 p-6 md:p-12 max-w-[60%] md:max-w-md">
              <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-4">
                Contact Us
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Share your pet tale with us. We&apos;d love to hear from you.
              </p>
            </div>
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2"
              style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop"
                alt="Pet and owner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Send us a message
              </h2>
              {status === "sent" ? (
                <div className="rounded-lg bg-primary/10 border border-primary/20 p-6 text-center">
                  <p className="text-foreground font-medium mb-2">
                    Thank you for reaching out!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Your Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your phone number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Your Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="comment">Your Comment *</Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      placeholder="How can we help?"
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full md:w-auto"
                  >
                    {status === "sending" ? "Sending..." : "Submit"}
                  </Button>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Get in touch
              </h2>
              <p className="text-muted-foreground mb-6">
                Have a question, feedback, or a pet tale to share? We&apos;d
                love to hear from you. Follow us on our social media pages for
                additional health and safety information for your pets.
              </p>
              <div className="space-y-4">
                <Link
                  href="https://www.instagram.com/gigglingpawsandpets_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.facebook.com/GigglingPaws/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  Facebook
                </Link>
                <Link
                  href="https://www.tiktok.com/@gigglingpawsandpets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  TikTok
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
