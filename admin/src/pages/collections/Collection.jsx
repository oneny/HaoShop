import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCollection } from "../../slice/collectionSlice";
import publicURL from "../../utils/publicURL";

function Collection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const collection = location.state;
  const { _id } = collection;

  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description);
  const [brand, setBrand] = useState(collection.brand);
  const [launched, setLaunched] = useState(collection.launched);
  const [director, setDirector] = useState(collection.director);
  const [country, setCountry] = useState(collection.country);
  const [shop, setShop] = useState(collection.shop);
  const [banners, setBanners] = useState(collection.banners);
  const [cards, setCards] = useState(collection.cards);

  const bannerRef = useRef(null);
  const cardRef = useRef(null);
  const onClickBannerRef = () => {
    bannerRef.current.click();
  };
  const onClickcardRef = () => {
    cardRef.current.click();
  };


  const resetState = () => {
    setName(collection.name);
    setDescription(collection.description);
    setBrand(collection.brand);
    setLaunched(collection.launched);
    setDirector(collection.director);
    setCountry(collection.country);
    setShop(collection.shop);
    setBanners(collection.banners);
    setCards(collection.cards);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("_id", _id);
    form.append("name", name);
    form.append("description", description);
    form.append("brand", brand);
    form.append("launched", launched);
    form.append("director", director);
    form.append("country", country);
    form.append("shop", shop);

    for (let img of banners) {
      form.append("banners", img);
    }
    for (let img of cards) {
      form.append("cards", img);
    }

    dispatch(updateCollection(form));
    navigate(-1);
  };

  const handleBanners = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setBanners(files);
  };

  const handleCards = (fileList) => {
    let files = [];
    for (const key in fileList) {
      if (Object.hasOwnProperty.call(fileList, key)) {
        const value = fileList[key];
        files.push(value);
      }
    }
    setCards(files);
  };

  return (
    <div className="content">
      <div className="content-top">
        <div className="content-top-id">
          <p>CollectionId : {_id}</p>
        </div>
        <button onClick={() => navigate(-1)}>????????????</button>
      </div>

      <form onSubmit={handleSubmit} className="content-form">
        <div className="item">
          <label htmlFor="name" className="item-left">
            ????????????
          </label>
          <input
            className="relatedProducts"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="description" className="item-left">
            ??????
          </label>
          <textarea
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="brand" className="item-left">
            ?????????
          </label>
          <input
            id="brand"
            placeholder="brand"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="launched" className="item-left">
            ??????
          </label>
          <input
            id="launched"
            placeholder="launched"
            required
            value={launched}
            onChange={(e) => setLaunched(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="director" className="item-left">
            ?????????
          </label>
          <input
            id="director"
            placeholder="director"
            required
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="country" className="item-left">
            ??????
          </label>
          <input
            id="country"
            placeholder="country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="shop" className="item-left">
            ??????
          </label>
          <input
            id="shop"
            placeholder="shop"
            required
            value={shop}
            onChange={(e) => setShop(e.target.value)}
          />
        </div>

        <div className="item">
          <label htmlFor="" className="item-left">
            ?????? ?????????
          </label>
          <div className="item-img">
            {banners &&
              banners.map((banner, i) => (
                <div key={i} className="item-img-wrapper">
                  <img
                    src={
                      banner instanceof File
                        ? URL.createObjectURL(banner)
                        : publicURL(banner.img)
                    }
                    alt=""
                    height="50"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="item">
          <label htmlFor="" className="item-left"></label>
          <button type="button" className="item-btn" onClick={onClickBannerRef}>
            ?????? ?????? ??????
          </button>
          <input
            ref={bannerRef}
            type="file"
            id="file"
            multiple
            accept=".png, .jpeg, .jpg"
            onChange={(e) => {
              handleBanners(e.target.files);
            }}
          />
        </div>

        <div className="item">
          <label htmlFor="" className="item-left">
            ????????? ??????
          </label>
          <div className="item-img">
            {cards &&
              cards.map((card, i) => (
                <div key={i} className="item-img-wrapper">
                  <img
                    src={
                      card instanceof File
                        ? URL.createObjectURL(card)
                        : publicURL(card.img)
                    }
                    alt=""
                    height="50"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="item">
          <label htmlFor="" className="item-left"></label>
          <button type="button" className="item-btn" onClick={onClickcardRef}>
            ????????? ?????? ??????
          </button>
          <input
            ref={cardRef}
            type="file"
            id="file"
            multiple
            accept=".png, .jpeg, .jpg"
            onChange={(e) => {
              handleCards(e.target.files);
            }}
          />
        </div>

        <div className="btnWrapper">
          <button type="submit">??????</button>
          <button type="reset" onClick={resetState}>
            ??????
          </button>
        </div>
      </form>
    </div>
  );
}

export default Collection;
