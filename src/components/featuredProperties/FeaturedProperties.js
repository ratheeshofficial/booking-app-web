import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/api/hotels/?featured=true&limit=4"
  );
  console.log("data1111111111111111", data);

  const images = [
    "https://gos3.ibcdn.com/85f70e62d50e11eba4c50242ac110002.jpg",
    "https://gos3.ibcdn.com/85f70e62d50e11eba4c50242ac110002.jpg",
    "https://gos3.ibcdn.com/85f70e62d50e11eba4c50242ac110002.jpg",
    "https://gos3.ibcdn.com/85f70e62d50e11eba4c50242ac110002.jpg",
  ];
  return (
    <div className="fp">
      {loading
        ? "loading..."
        : data.map((item, i) => (
            <>
              <div className="fpItem" key={item._id}>
                <img src={images[i]} alt="AltImage" className="fpImg" />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Starting from ₹ {item.cheapestPrice}
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            </>
          ))}
    </div>
  );
};

export default FeaturedProperties;
