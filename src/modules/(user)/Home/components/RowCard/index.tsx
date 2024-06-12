import React from "react";
import { FaArrowRight } from "react-icons/fa";

import Button from "@/components/Button";
import CardComic from "@/components/CardComic";
import Container from "@/components/Container";
import Typography from "@/components/Typography";

const RowCard = () => {
  return (
    <Container noGrid>
      <div className="flex justify-between items-center">
        <Typography tag="h5" fontSize="lg" className="mb-[1.5rem]">
          Drama
        </Typography>

        <Button href="#" size="sm" variant="outline" className="flex items-center gap-[.5rem]">
          View all <FaArrowRight scale={0.4} />
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-[1rem]">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="col-span-2">
            <CardComic />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RowCard;
