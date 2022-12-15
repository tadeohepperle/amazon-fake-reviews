import type { Review } from "../functions/data";
import { rating_to_star_class } from "../functions/utils";

const CustomerReview = (review: Review) => {
  let formattedDate = review.date.toLocaleDateString();

  return (
    <div>
      <div
        id="customer_review-R213LBCPBSEGZ4"
        className="a-section celwidget snipcss-SXrks"
        data-csa-c-id="xotxdc-4ulzvr-41ch84-x7q85u"
        data-cel-widget="customer_review-R213LBCPBSEGZ4"
      >
        <div
          data-hook="genome-widget"
          className="a-row a-spacing-mini tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center"
        >
          <a className="a-profile" data-a-size="small">
            <div aria-hidden="true" className="a-profile-avatar-wrapper">
              <div className="a-profile-avatar">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                  className=""
                  data-src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"
                />
                <noscript>
                  <img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" />
                </noscript>
              </div>
            </div>
            <div className="a-profile-content">
              <span className="a-profile-name">{review.username}</span>
            </div>
          </a>
        </div>
        <div className="a-row">
          <a
            className="a-link-normal"
            title={`${review.rating} out of 5 stars`}
          >
            <i
              data-hook="review-star-rating"
              className={`a-icon a-icon-star ${rating_to_star_class(
                review.rating
              )} review-rating`}
            >
              <span className="a-icon-alt">
                {review.rating} out of 5 stars{" "}
              </span>
            </i>
          </a>
          <span className="a-letter-space"> </span>
          <a
            data-hook="review-title"
            className="a-size-base a-link-normal review-title a-color-base review-title-content a-text-bold"
          >
            <span className="tether-target-attached-top tether-element-attached-top tether-element-attached-center tether-target-attached-center">
              {review.title}
            </span>
          </a>
        </div>
        <div className="mb-2">
          <span
            data-hook="review-date"
            className="a-size-base a-color-secondary review-date"
          >
            Reviewed in the United States on {formattedDate}
          </span>

          {review.verified && (
            <>
              <i
                className="a-icon a-icon-text-separator"
                role="img"
                aria-label="|"
              >
                {" "}
              </i>
              <a className="a-link-normal" target="_blank" rel="noopener">
                <span
                  data-hook="avp-badge-linkless"
                  className="a-size-mini a-color-state a-text-bold"
                >
                  Verified Purchase
                </span>
              </a>
            </>
          )}
        </div>

        <div className="a-row a-spacing-small review-data">
          <span data-hook="review-body" className="a-size-base review-text">
            <div
              data-a-expander-name="review_text_read_more"
              data-a-expander-collapsed-height="300"
              className="a-expander-collapsed-height a-row a-expander-container a-expander-partial-collapse-container"
              style={{ maxHeight: 300 }}
            >
              <div
                data-hook="review-collapsed"
                aria-expanded="false"
                className="a-expander-content reviewText review-text-content a-expander-partial-collapse-content"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: review.text.replaceAll("\n", "<br />"),
                  }}
                ></span>
              </div>
              <div className="a-expander-header a-expander-partial-collapse-header hidden">
                <div className="a-expander-content-fade"></div>
                <a
                  data-csa-c-func-deps="aui-da-a-expander-toggle"
                  data-csa-c-type="widget"
                  data-csa-interaction-events="click"
                  data-hook="expand-collapse-read-more-less"
                  aria-label="Toggle full review text"
                  aria-expanded="false"
                  role="button"
                  data-action="a-expander-toggle"
                  className="a-declarative"
                  data-a-expander-toggle='{"allowLinkDefault":true, "expand_prompt":"Read more", "collapse_prompt":"Read less"}'
                  data-csa-c-id="7q1rih-o303j7-stwf9z-ptcdzr"
                >
                  <i className="a-icon a-icon-extender-expand"> </i>
                  <span className="a-expander-prompt"> Read more </span>
                </a>
              </div>
            </div>
          </span>
        </div>
        {review.helpful && (
          <div
            data-hook="review-comments"
            className="a-row review-comments cr-vote-action-bar"
          >
            <span className="cr-vote" data-hook="review-voting-widget">
              <div className="a-row a-spacing-small">
                <span
                  data-hook="helpful-vote-statement"
                  className="a-size-base a-color-tertiary cr-vote-text"
                >
                  {review.helpful} people found this helpful
                </span>
              </div>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerReview;
