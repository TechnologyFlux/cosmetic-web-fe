import { useState } from "react";

export default function IntroductionTwo({ data, style }) {
  const [currentChoose, setCurrentChoose] = useState(data[0].name);
  const [currentImage, setCurrentImage] = useState(data[0].image);

  return (
    <div className="introduction-two flex flex-col lg:flex-row items-start lg:items-center" style={style}>
      <div className="introduction-two__content flex-1 p-4">
        <div className="container">
          {data.map((item, index) => (
            <div
              onMouseOver={() => {
                setCurrentChoose(item.name);
                setCurrentImage(item.image);
              }}
              key={index}
              className={`introduction-two__content__item my-2 p-2 cursor-pointer ${
                currentChoose === item.name ? "bg-gray-200" : ""
              }`}
            >
              {!item.description && <span className="mr-2">0{index + 1}.</span>}
              <a
                href={process.env.PUBLIC_URL + "#"}
                onClick={(e) => e.preventDefault()}
                className="text-lg font-semibold"
              >
                {item.name}
              </a>
              <p>{item.description && item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="introduction-two__image flex-1 p-4">
        <img src={currentImage} alt={currentChoose} className="max-w-full h-auto" />
      </div>
    </div>
  );
}
