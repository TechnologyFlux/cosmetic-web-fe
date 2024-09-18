import { useRouter } from "next/router";

import products from "../../../data/products.json";
import { getProductBySlug } from "../../../common/productSelect";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import InstagramTwo from "../../../components/Sections/Instagram/InstagramTwo";
import LayoutFour from "../../../components/Layout/LayoutFour";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "../../../components/Other/Breadcrumb";
import ProductSlideTwo from "../../../components/Sections/ProductThumb/ProductSlide/ProductSlideTwo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductDetail } from "../../../redux/actions/productAction";

export default function () {
  const dispatch = useDispatch();
  const dataProduct = useSelector((pReducer) => pReducer?.productReducer?.productDetail);
  console.log(dataProduct)
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug)
  
  let foundProduct = getProductBySlug(products, slug);
  const onReviewSubmit = (data) => {
    console.log(data);
  };
  console.log(dataProduct)

  useEffect(() => {
    dispatch(getProductDetail({ productId: slug }));
  }, []);



  return (
    foundProduct !== null && (
      <LayoutFour title={dataProduct?.displayProductDTO?.title}>
        <Breadcrumb title="Product Detail">
          <BreadcrumbItem name="Home" />
          <BreadcrumbItem name="Shop" />
          <BreadcrumbItem name={dataProduct?.displayProductDTO?.title} current />
        </Breadcrumb>
        <ProductDetail data={dataProduct} onReviewSubmit={onReviewSubmit} />
        {/* <ProductSlideTwo data={dataProduct} /> */}  
        <InstagramTwo />
      </LayoutFour>
    )
  );
}
