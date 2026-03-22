import React from "react";

const Map = () => {
  return (
    <div className="my-6 flex justify-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d944.0886030800432!2d85.84599426958273!3d20.488881998814293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDI5JzIwLjAiTiA4NcKwNTAnNDcuOSJF!5e1!3m2!1sen!2sin!4v1746045823873!5m2!1sen!2sin"
        width="350"
        height="230"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Map;
