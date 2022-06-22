import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

import "./product.scss";
import { addItem } from "../../slice/cartSlice";
import { getProduct } from "../../slice/productSlice";
import publicURL from "../../utils/publicURL";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { product, relatedProducts } = useSelector((store) => store.product);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [src, setSrc] = useState("");
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toKRW = (num) => {
    if (num) return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    console.log('kdk');
    dispatch(getProduct(params.id));
  }, [params]);

  useEffect(() => {
    if (product?.productImgs)
      setSrc(publicURL(product?.productImgs[0]?.fileName));
  }, [product]);

  console.log("hi");
  useEffect(() => {
    if (isCartOpen) {
      const closeCartModal = setTimeout(() => {
        setIsCartOpen(false);
      }, 4000);
      return () => {
        clearTimeout(closeCartModal);
      };
    }
  }, [isCartOpen]);

  const addCart = () => {
    if (!size) return alert("사이즈를 선택하셔야 합니다.");

    const item = product.stock.find((v) => v.size === size);
    if (item?.qty < qty) {
      return alert(`${item.qty}개 이상으로 재고가 부족합니다.`);
    }

    dispatch(
      addItem({
        _id: product._id,
        name: product.name,
        img: product.productImgs[0].fileName,
        price: product.price * (1 - product?.discountPrice / 100),
        size,
        qty,
      })
    );
    return setIsCartOpen(true);
  };

  const otherColors = relatedProducts?.filter((v) => v._id !== product._id);

  return (
    <div className="product">
      <div className="product-left">
        <div className="product-left-img">
          {product?.productImgs?.map((productImg, i) => (
            <div
              key={i}
              className="img-wrapper"
              onClick={() => setSrc(publicURL(productImg.fileName))}
            >
              <img src={publicURL(productImg.fileName)} alt="" />
            </div>
          ))}
        </div>
        <div className="product-left-mainImg">
          <img src={src} alt="" />
        </div>
      </div>

      <div className="product-right">
        <div
          className="brand-button"
          onClick={() => navigate(`/brands/${product.brand.toLowerCase()}`)}
        >
          브랜드 홈 바로가기
        </div>
        <div className="product-right-brand">{product?.brand}</div>
        <div className="product-right-name">
          {product?.name} ({product?.color})
        </div>
        <div className={"product-right-price"}>
          <p className={`${product?.discountPrice ? "hasDiscount" : ""}`}>
            ₩ {toKRW(product?.price)}
          </p>
          {product?.discountPrice && (
            <p>
              ₩ {toKRW(product?.price * (1 - product?.discountPrice / 100))}{" "}
              <span>{product?.discountPrice}%</span>
            </p>
          )}
        </div>
        <div className="product-right-desc">
          <div
            className="descMenu"
            onClick={() => setIsDescOpen((prev) => !prev)}
          >
            <p>제품 상세정보</p>
            <p>
              {isDescOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </p>
          </div>
          <div className={`desc ${isDescOpen ? "descOpen" : ""}`}>
            {product?.description}
          </div>
        </div>
        <div className="product-right-color">
          <p>COLOR</p>
          <div className="color-wrapper">
            {otherColors?.map((relatedProduct, i) => (
              <Link
                className="img-wrapper"
                to={`/products/${relatedProduct._id}`}
                key={i}
              >
                <img
                  src={publicURL(relatedProduct.productImgs[0].fileName)}
                  alt="relatedProduct"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="product-right-size">
          <p>SIZE</p>
          <select
            onChange={(e) => setSize(e.target.value)}
            className="selection"
          >
            <option defaultValue hidden>
              - [필수] OPTIONS -
            </option>
            {product?.stock?.map((s) => (
              <option value={s.size} disabled={s.qty === 0} key={s._id}>
                {s.size}{" "}
                {s.qty === 0 ? "(SOLD OUT)" : s.qty === 1 ? "(LAST ONE)" : ""}
              </option>
            ))}
          </select>
          {size && (
            <div className="selection-info">
              <div>{size}</div>
              <div className="selection-info-qty">
                <div className="qty">
                  <button
                    onClick={() => {
                      if (qty <= 1) {
                        alert("최소 주문수량은 1개 입니다.");
                        return setQty(1);
                      }
                      setQty((prev) => --prev);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={0}
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    onBlur={(e) => {
                      if (e.target.value <= 1) {
                        alert("최소 주문수량은 1개 입니다.");
                        return setQty(1);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setQty((prev) => ++prev);
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="price">
                  ₩{" "}
                  {toKRW(
                    product?.price * (1 - product?.discountPrice / 100) * qty
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="product-right-button">
          {isCartOpen && (
            <div className="cart-alert">
              <div className="cart-alert-close">
                <CloseIcon
                  className="closeIcon"
                  onClick={() => setIsCartOpen(false)}
                />
              </div>
              <p>장바구니로 이동하시겠습니까?</p>
              <button onClick={() => navigate("/cart")}>장바구니 이동</button>
            </div>
          )}
          <button className="cart" onClick={addCart}>
            카트 담기
          </button>
          <button className="purchase">바로 구매</button>
        </div>
      </div>
    </div>
  );
}

export default Products;
