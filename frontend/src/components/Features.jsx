const features =[
    {
        title: "Monthly code challenge",
        description: "Participate in our monthly coding challenges to sharpen your skills and win exciting prizes."
    },
    {
        title: "Monthly code challenge",
        description: "Participate in our monthly coding challenges to sharpen your skills and win exciting prizes."
    },
    {
        title: "Monthly code challenge",
        description: "Participate in our monthly coding challenges to sharpen your skills and win exciting prizes."
    },
      {
        title: "Monthly code challenge",
        description: "Participate in our monthly coding challenges to sharpen your skills and win exciting prizes."
    },
    {
        title: "Monthly code challenge",
        description: "Participate in our monthly coding challenges to sharpen your skills and win exciting prizes."
    },
    {
        title: "Monthly code challenge",
        description: "Participate in our monthly coding challenges to sharpen your skills and win exciting prizes."
    }

]


const Features = () => {
  return (
   <div className="bg-white">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mb-10">
            <p className="text-lg font-semibold mb-10 ">Incentive</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
                {features.map((feature, index) => (
                    <div key={index}>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

    </div>
   </div> 
  );
};

export default Features;
