import type { ProductRatings } from "../functions/data";
import { rating_to_star_class_medium } from "../functions/utils";

const AmazonReviewsSummary = (props: ProductRatings) => {
  let pr = props as any;
  return (
    <div style={{ width: 200 }}>
      <div className="a-fixed-left-grid-col a-col-left snipcss-ZdD9a">
        <div className="a-row">
          <h2 className="">Customer reviews</h2>
        </div>
        <div className="a-section a-spacing-none a-spacing-top-mini cr-widget-ACR">
          <div className="a-fixed-left-grid AverageCustomerReviews a-spacing-small">
            <div className="a-fixed-left-grid-inner">
              <div className="a-fixed-left-grid-col a-col-left">
                <i
                  data-hook="average-star-rating"
                  className={`a-icon a-icon-star-medium ${rating_to_star_class_medium(
                    props.rating_avg
                  )} averageStarRating`}
                >
                  <span className="a-icon-alt"> 4.8 out of 5 stars </span>
                </i>
              </div>
              <div
                data-hook="rating-out-of-text"
                className="a-size-medium a-color-base mt-2"
              >
                {props.rating_avg} out of 5
              </div>
            </div>
          </div>
          <div
            data-hook="total-review-count"
            className="a-row a-spacing-medium averageStarRatingNumerical"
          >
            <span className="a-size-base a-color-secondary">
              {props.rating_count.toLocaleString("en-US")} global ratings
            </span>
          </div>
        </div>
        <div className="cr-widget-Histogram">
          <div className="a-fixed-left-grid a-spacing-none">
            <div className="a-fixed-left-grid-inner">
              <div className="a-fixed-left-grid-col a-col-left">
                <span
                  className="a-declarative"
                  data-action="reviews:filter-action:push-state"
                  data-csa-c-type="widget"
                  data-csa-c-func-deps="aui-da-reviews:filter-action:push-state"
                  // data-reviews:filter-action:push-state='{"scrollToSelector":"#reviews-filter-info","allowLinkDefault":"1"}'
                  data-csa-c-id="3omhes-tv2wlu-39482k-l8mvdm"
                >
                  <table
                    id="histogramTable"
                    className="a-normal a-align-center a-spacing-base"
                  >
                    <tbody>
                      {["5", "4", "3", "2", "1"].map((i) => {
                        let val = pr[`rating${i}`];
                        return (
                          <tr
                            key={i}
                            data-reftag=""
                            data-reviews-state-param='{"filterByStar":"four_star", "pageNumber":"1"}'
                            aria-label="4 stars represent 9% of rating"
                            className="a-histogram-row a-align-center"
                          >
                            <td className="aok-nowrap">
                              <span className="a-size-base">
                                <a
                                  aria-disabled="true"
                                  className="a-link-normal 4star"
                                  title="4 stars represent 9% of rating"
                                >
                                  {i} star
                                </a>
                              </span>
                              <span className="a-letter-space"> </span>
                            </td>
                            <td className="a-span10">
                              <a
                                aria-disabled="true"
                                className="a-link-normal"
                                title="4 stars represent 9% of rating"
                              >
                                <div
                                  className="a-meter"
                                  role="progressbar"
                                  aria-valuenow={val}
                                >
                                  <div
                                    className="a-meter-bar a-meter-filled"
                                    style={{ width: `${val * 100}%` }}
                                  ></div>
                                </div>
                              </a>
                            </td>
                            <td className="a-text-right a-nowrap">
                              <span className="a-letter-space"> </span>
                              <span className="a-size-base">
                                <a
                                  aria-disabled="true"
                                  className="a-link-normal"
                                  title="4 stars represent 9% of rating"
                                  href="#"
                                >
                                  {`${Math.floor(val * 100)}%`}
                                </a>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonReviewsSummary;
