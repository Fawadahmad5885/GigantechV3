import React from "react";

const FooterSteps = () => {
  
  const steps = [
    "An expert contacts you after having analyzed your requirements;",
    "If needed, we sign an NDA to ensure the highest privacy level;",
    "We submit a comprehensive project proposal with estimates, timelines, CVs, etc.",
  ];

  return (
    <div className="footer-steps space-y-4  p-3 ">
        {steps.map((step, index) => (
        <div key={index} className="single-step flex items-start space-x-4">
          <div className="step-count  text-white bg-secondaryColor border border-gray-300 rounded-full">
            <div className="flex w-8 h-8 items-center justify-center text-base font-poppins">{index + 1}</div>
          </div>
          <div className="step-content text-white font-poppins text-base ">
            {step}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterSteps;
