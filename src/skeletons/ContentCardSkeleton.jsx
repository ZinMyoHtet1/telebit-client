function ContentCardSkeleton({ viewMode }) {
  // --- Render logic ---
  // File card
  return (
    <div className={`content_card_skeleton ${viewMode}`}>
      <div className="content_icon"></div>
      <div className="content_name"></div>
    </div>
  );
}

export default ContentCardSkeleton;
