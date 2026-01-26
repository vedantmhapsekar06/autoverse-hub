import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, Clock, Check } from 'lucide-react';
import { toast } from 'sonner';

const phoneNumbers = [
  '+91 9876543210',
  '+91 9123456780',
  '+91 9988776655',
  '+91 8899776655',
  '+91 9012345678',
  '+91 8765432109',
  '+91 9090909090',
  '+91 7000123456',
  '+91 8888888888',
  '+91 7777777777',
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    console.log({ name, email, message });
    setSubmitted(true);
    toast.success('Message sent successfully!');
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="section-container text-center">
          <h1 className="mb-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-primary-foreground/80">
            Have questions? We're here to help! Reach out to us through any of the channels
            below.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="mb-6 font-display text-2xl font-bold">Get in Touch</h2>

              <div className="mb-8 space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <a
                      href="mailto:autoverse@gmail.com"
                      className="text-accent hover:underline"
                    >
                      autoverse@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Auto Street, Tech Park
                      <br />
                      Bangalore - 560001, India
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Working Hours</h3>
                    <p className="text-muted-foreground">
                      Mon - Sat: 9:00 AM - 8:00 PM
                      <br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <Phone className="h-5 w-5 text-accent" />
                  Call Us
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {phoneNumbers.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="rounded-lg border border-border bg-card px-3 py-2 text-sm transition-all hover:border-accent hover:bg-accent/5"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-display text-xl font-semibold">Send us a Message</h2>

                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                      <Check className="h-8 w-8 text-success-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Message Sent!</h3>
                    <p className="mb-4 text-muted-foreground">
                      We'll get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setMessage('');
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="mt-1 resize-none"
                      />
                    </div>

                    <Button type="submit" className="btn-accent w-full" size="lg">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
