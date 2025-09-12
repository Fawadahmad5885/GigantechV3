"use client";
import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "../../lib/api";

const OurClients = ({ clientsLogo }) => {
  useEffect(() => {
    Aos.init();
  }, []);

  const clients = clientsLogo[0]?.Client || [];
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="scroll-container  overflow-hidden w-full relative">
      <div className="scroll-content flex gap-4 ">
        {duplicatedClients.map((client, index) => {
          // Construct the full image URL
          const imageUrl = getStrapiMedia(client?.clientLogo?.url);
          // console.log(imageUrl);

          return (
            <div
              className="item rounded-lg flex mx-4 justify-center items-center"
              key={`${client.id}-${index}`}
            >
              <Link href={client.url} target="_blank">
                <Image
                  className="m-auto sm:w-52 mx-6 h-24 object-contain"
                  src={imageUrl || "/fallback-client.png"}
                  alt={client.alt || "Client logo"}
                  width={180}
                  height={180}
                  unoptimized={client.clientLogo?.url?.endsWith(".svg")} // Required for SVG
                  onError={(e) => {
                    e.target.src = "/fallback-client.png";
                  }}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurClients;
