import { Button } from "@/components/ui/button"; // Corrected import statement
import mockup from "../assets/homemockup.jpg";
import mockup2 from "../assets/mockup2.png";

function Home() {
  return (
    <div className="p-6 ">
      <section className="flex flex-col md:flex-row items-center justify-around">
        <div className="p-16 flex flex-col  items-center justify-center md:justify-start md:items-start gap-8 md:w-[50%] h-full">
          <h1 className="font-bold flex flex-col text-center md:text-start text-7xl md:text-7xl">
            <span>Streamline</span> <span>Your</span> <span>Project</span>
          </h1>
          <p className="md:text-start text-center text-gray-400">
            Elevate Your Productivity And Collaboration with our Intuitive
            Project Management Platform
          </p>{" "}
          {/* Corrected typo */}
          <div className="flex items-center gap-3">
            <Button className="bg-blue-600">Get Started</Button>
            <Button className="border text-blue-600 border-blue-600" variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="md:w-[40%] h-full">
          <img
            className="w-full h-full object-cover"
            src={mockup}
            alt="laptop mockup"
          />
        </div>
      </section>

      <section className="flex flex-col  items-center justify-around md:flex-row-reverse md:py-5">
        <div className="md:p-16 py-10 flex flex-col  items-center justify-center md:justify-start md:items-start gap-5 md:w-[40%] h-full">
          <h1 className="font-bold flex flex-col text-start text-3xl md:text-4xl">Empower Your Team To Achieve More With Our Platform</h1>
          <p className="text-start  ">
            Experience the Future of Project Management,Unparalleled Visibility,
            StreamLined Workflows, and Actionable Analytics to Drive Your Team's
            Success.
          </p>
          <span className="text-gray-400 text-sm">
            Unlock the Full Potential of Your Projects With Our Inovative
            Project Management Solution
          </span>
        </div>
        <div className="md:w-[45%] h-full">
          <img className="w-full h-full object-cover" src={mockup2} alt="mock up 2" />
        </div>
      </section>
      <section className="flex flex-col  items-center justify-around md:flex-row md:py-5">
        <div className="md:p-16 py-10  flex flex-col  items-center justify-center md:justify-start md:items-start gap-5 md:w-[50%] h-full">
          <h1 className="font-bold flex flex-col  md:text-start text-3xl md:text-4xl">Unlock the Full Potential of Your Projects</h1>
          <p className="text-start  ">
           Elevate YOur Project Management to New Heights With Our Comprehensive Solution.
          </p>
          <span className="text-gray-400 text-sm">
            Revolutionixe Your Project Delivery With Our Cutting-Edge Project Management Platform, Offering Unrivaled Visibility, Seamless Workflows.
          </span>
        </div>
        <div className="md:w-[40%] h-full">
          <img className="w-full h-full object-cover" src={mockup2} alt="mock up 2" />
        </div>
      </section>
    </div>
  );
}

export default Home;
