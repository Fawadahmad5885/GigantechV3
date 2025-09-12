import Image from "next/image";
import Link from "next/link";
import image1 from "../../../public/about-us-1.png"
import image2 from "../../../public/about-us-2.png"
export default function AboutUsSection() {
  return (
    <section className="py-[5%] pb-[10%] ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-10">
          {/* Left Column - Images */}
          <div data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="1000"
         className="relative w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative w-[300px] h-[250px] md:w-[400px] md:h-[300px] rounded-xl overflow-hidden shadow-lg z-10">
              <Image
                src={image1}
                alt="Team Collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:top-auto md:bottom-0 md:left-auto md:right-0 w-[250px] h-[200px] md:w-[350px] md:h-[250px] rounded-xl overflow-hidden shadow-lg z-20">
              <Image
                src={image2}
                alt="Team Celebrating"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div data-aos="fade-left"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="1000" className="w-full md:w-1/2 text-center md:text-left mt-20 md:mt-0">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              About <span className="text-orange-500">Us</span>
              <div className="w-16 h-1 bg-orange-500 mx-auto md:mx-0 mt-1 rounded-full"></div>
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Accelerating <span className="text-orange-500">Growth</span> <br />
              Creating <span className="text-orange-500">Happiness</span>
            </h3>
            <p className="text-base md:text-lg text-gray-700 mb-4">
              The most trusted brand for online technology services.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-8">
              Founded in 2017, PiZone Infotech is driven by passion and integrity and is
              powered by talented professionals to provide you finest services in online
              technologies.
            </p>
            <Link
          href="#"
          className="inline-flex items-center w-fit tracking-wide justify-center whitespace-nowrap rounded-full bg-primaryColor px-10 py-3 text-lg font-medium text-white shadow-lg transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 animate-fade-in delay-300"
        >
          View More
        </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
