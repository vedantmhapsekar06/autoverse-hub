interface QuoteBannerProps {
  quote: string;
}

export const QuoteBanner = ({ quote }: QuoteBannerProps) => {
  return (
    <div className="quote-banner">
      <div className="section-container">
        <p className="quote-text">"{quote}"</p>
      </div>
    </div>
  );
};
