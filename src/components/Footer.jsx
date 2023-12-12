const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer">
      <button onClick={handleScrollToTop}>Back to top</button>
      <button>Contact us</button>
    </div>
  );
};

export default Footer;
