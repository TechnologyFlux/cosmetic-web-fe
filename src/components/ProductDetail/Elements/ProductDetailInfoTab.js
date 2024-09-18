import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useForm } from "react-hook-form";

import Review from "../../Control/Review";

export default function ProductDetailInfoTab({data, onReviewSubmit }) {
  const { register, handleSubmit, errors } = useForm();
  return (
    <div className="product-detail__tab">
      <Tabs className="product-detail__tab__content">
        <TabList className="tab__content__header">
          <Tab>Description</Tab>
          <Tab>Shipping & Returns</Tab>
          <Tab>Reviews ( {data?.productReviews?.length} )</Tab>
        </TabList>

        <TabPanel className="tab__content__item -description">
          <p>{data?.displayProductDTO?.description}</p>
        </TabPanel>
        <TabPanel className="tab__content__item -ship">
          <h5>
            <span>Ship to </span>
          </h5>
          <ul>
            <li>Your order will be delivered to you within 3 to 5 days.</li>
          </ul>
          <h5>Delivery & returns</h5>
          <p>
            Domestic delivery only. If there is any problem with the order,
            please record a video when unboxing the product so we can assist
            with the refund
          </p>
        </TabPanel>

        <TabPanel className="tab__content__item -review">
          {data?.productReviews?.map((review, index) => (
            <Review
              avatar="https://static.thenounproject.com/png/363640-200.png"
              name={review?.userName ? review?.userName : "Anonymous"}
              publicDate={review.createdDate}
              rate={review?.productRating}
            >
              {review?.content}
            </Review>
          ))}
        </TabPanel>
      </Tabs>
    </div>
  );
}
