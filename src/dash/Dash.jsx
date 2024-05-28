import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Balls from "../home/Balls";
import { Button, ButtonGroup } from "@mui/material";
import { getProxyy } from "../App";
import axios from "axios";

function Dash() {
  const [sonet, setSonet] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(getProxyy() + "/sonete?token=" + token).then((res) => {
      setSonet(res.data.sonete);
    });
  }, []);
  function filterSonet(son) {
    console.log(filter);
      console.log(son.mesaj !== undefined);
    if (filter === "from") return (!son.fromName && son.mesaj);
    else if (filter === "mesaj") return (!son.mesaj);
    else return true;
  }
  return (
    <section className="max-w-xl mx-auto py-3">
      <Balls></Balls>
      <div className="text-center">
      <h1
          className="text-5xl text-center md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-emerald-300"
          data-aos="zoom-y-out"
        >
          Sonetele tale
        </h1>
        {sonet.lenght !== 0 && (
          <div>
            <div className="my-3">
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={() => setFilter("all")}>All</Button>
                <Button onClick={() => setFilter("mesaj")}>Empty</Button>
                <Button onClick={() => setFilter("from")}>Written</Button>
              </ButtonGroup>
            </div>
            {sonet
              .filter(filterSonet)
              .map((son, i) => (
                <div className="m-3">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>
                        <div className="flex gap-4">
                          {son.fromName ? (
                            <h3 className="font-bold">{son.fromName}</h3>
                          ) : (
                            <h3 className="font-bold">[Empty]</h3>
                          )}
                          {son.mesaj ? (
                            <p className="italic">
                              "{son.mesaj.substring(0, 25)}..."
                            </p>
                          ) : (
                            <p>[Mesaj]</p>
                          )}
                        </div>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div key={i}>
                        {son.fromName && <h3>{son.fromName}</h3>}
                        <h4>Mesaj:</h4>
                        <p>{son.mesaj}</p>
                        <button>QR</button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}{" "}
          </div>
        )}
      </div>
    </section>
  );
}

export default Dash;
