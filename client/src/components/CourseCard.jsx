const CourseCard = ({
  course = {
    thumbnail: "https://via.placeholder.com/300x180",
    title: "Default Course Title",
    instructor: "Default Instructor",
    details: ["Default detail 1", "Default detail 2"],
    notesType: "Default Notes Type",
    validity: "Default validity",
    price: 0,
    originalPrice: 0,
    discount: "Default Discount",
  },
}) => {
  const {
    thumbnail,
    title,
    instructor,
    details,
    notesType,
    validity,
    price,
    originalPrice,
    discount,
  } = course;

  return (
    <div className="border border-primary shadow-lg rounded-lg p-4 w-72 flex-shrink-0 bg-background">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-t-lg w-full h-40 object-cover"
        />
        <span className="absolute top-2 left-2 bg-accent text-primary text-xs font-bold px-2 py-1 rounded-md">
          {notesType}
        </span>
      </div>

      {/* Course Details */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-primary mb-2">{title}</h3>
        <p className="text-sm text-secondary mb-1">{instructor}</p>
        <ul className="text-sm text-secondary mb-2 space-y-1">
          {details.map((item, index) => (
            <li key={index}>&bull; {item}</li>
          ))}
        </ul>
        <p className="text-xs text-secondary mb-4">{validity}</p>

        {/* Discount Offer */}
        {discount && (
          <p className="text-sm text-accent font-bold mb-2">{discount}</p>
        )}

        {/* Pricing */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">₹{price}</span>
          <span className="text-sm text-secondary line-through">
            ₹{originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
