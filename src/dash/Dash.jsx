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
import SearchComponent from "../components/SearchComponent";
import QRCode from "react-qr-code";

function Dash() {
  const [sonet, setSonet] = useState([]);
  const [search, setSearch] = useState("");
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
    if (filter == "from") return (!son.fromName && son.mesaj);
    else if (filter == "mesaj") return (!son.mesaj);
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
            <SearchComponent
              search={search}
              setSearch={setSearch}
            ></SearchComponent>
            <div className="my-3">
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={() => setFilter("all")}>All</Button>
                <Button onClick={() => setFilter("mesaj")}>Empty</Button>
                <Button onClick={() => setFilter("from")}>Written</Button>
              </ButtonGroup>
            </div>
            {sonet
              .filter(filterSonet)
              .filter(
                (son) =>
                  son.fromName?.includes(search) || son.mesaj?.includes(search)
              )
              .map((son, i) => (
                <div className="m-3">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography className="text-emerald-300">
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
                    <AccordionDetails className="bg-zinc-500">
                      <div key={son._id} className="p-2">
                        {son.fromName && <h3>{son.fromName}</h3>}
                        <h3 className="font-bold text-emerald-300">Mesaj:</h3>
                        <p className="text-emerald-100 italic">{son.mesaj}</p>
                        <QRCode
                          size={256}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={
                            "http://" +
                            window.location.host +
                            "/sonet/" +
                            son._id
                          }
                          viewBox={`0 0 256 256`}
                        />
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
