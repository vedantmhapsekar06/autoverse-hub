import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { StarRating } from '@/components/feedback/StarRating';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const Feedback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    // Mock submission - in real app would send to API
    console.log({ rating, review, user: user?.email });
    setSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-20">
          <div className="section-container max-w-md text-center">
            <div className="animate-scale-in rounded-xl border border-border bg-card p-8">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success">
                <Check className="h-8 w-8 text-success-foreground" />
              </div>
              <h1 className="mb-2 font-display text-2xl font-bold">Thank You!</h1>
              <p className="mb-6 text-muted-foreground">
                Your feedback helps us improve our service
              </p>
              <Button onClick={() => navigate('/')} className="btn-accent">
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16">
        <div className="section-container max-w-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <MessageSquare className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-display text-3xl font-bold">Share Your Feedback</h1>
            <p className="mt-2 text-muted-foreground">
              We value your opinion! Help us serve you better.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div className="text-center">
                <Label className="mb-4 block text-lg font-medium">
                  How would you rate your experience?
                </Label>
                <div className="flex justify-center">
                  <StarRating value={rating} onChange={setRating} size="lg" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {rating === 0
                    ? 'Click to rate'
                    : rating === 1
                    ? 'Poor'
                    : rating === 2
                    ? 'Fair'
                    : rating === 3
                    ? 'Good'
                    : rating === 4
                    ? 'Very Good'
                    : 'Excellent'}
                </p>
              </div>

              {/* Review */}
              <div>
                <Label htmlFor="review" className="mb-2 block">
                  Tell us more (optional)
                </Label>
                <Textarea
                  id="review"
                  placeholder="Share your experience, suggestions, or any feedback..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {!isAuthenticated && (
                <p className="text-center text-sm text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => navigate('/auth')}
                    className="text-accent underline"
                  >
                    Login
                  </button>{' '}
                  to save your feedback with your profile
                </p>
              )}

              <Button type="submit" className="btn-accent w-full" size="lg">
                Submit Feedback
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Feedback;
