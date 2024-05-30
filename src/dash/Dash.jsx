import React, { useContext, useEffect, useState } from "react";

import Balls from "../home/Balls";
import { Button, ButtonGroup } from "@mui/material";
import { getProxyy } from "../App";
import axios from "axios";
import SearchComponent from "../components/SearchComponent";
import SonetAccordion from "./SonetAccordion";
import { AlertContext } from "../AlertComponent";

function Dash() {
  const [sonet, setSonet] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [number, setNumber] = useState(1);

  const { handleAxiosError, handleError } = useContext(AlertContext);

  useEffect(updateSonets, []);

  function updateSonets() {
    const token = localStorage.getItem("token");
    axios
      .get(getProxyy() + "/sonete?token=" + token)
      .then((res) => {
        setSonet(res.data.sonete);
      })
      .catch(handleAxiosError);
  }

  function filterSonet(son) {
    if (filter === "from") return !son.fromName && son.mesaj;
    else if (filter === "mesaj") return !son.mesaj;
    else return true;
  }

  function addSonets() {
    const token = localStorage.getItem("token");
    axios
      .post(getProxyy() + "/id-sonete", { number: number, token: token })
      .then((res) => {
        setSonet(res.data.sonets);
        handleError("Added", "success");
      })
      .catch(handleAxiosError);
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
        <div className="flex gap-4 justify-center">
          <div className="flex my-3">
            <input
              type="number"
              className="h-full p-2 rounded-s-sm bg-zinc-600 text-emerald-300 border border-emerald-300 select-none"
              min={1}
              max={20}
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <button
              className="h-full px-3 rounded-e-sm bg-emerald-300 focus:outline-none"
              onClick={addSonets}
            >
              Add
            </button>
          </div>
        </div>
        {sonet.length !== 0 && (
          <div>
            <SearchComponent
              search={search}
              setSearch={setSearch}
            ></SearchComponent>
            <div className="flex gap-4 justify-center">
              <div className="my-3">
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                  <Button
                    onClick={() => setFilter("all")}
                    className={
                      filter === "all" ? " bg-emerald-900 text-white " : ""
                    }
                  >
                    All
                  </Button>
                  <Button
                    onClick={() => setFilter("mesaj")}
                    className={
                      filter === "mesaj" ? " bg-emerald-900 text-white " : ""
                    }
                  >
                    Empty
                  </Button>
                  <Button
                    onClick={() => setFilter("from")}
                    className={
                      filter === "from" ? " bg-emerald-900 text-white " : ""
                    }
                  >
                    Written
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            {sonet
              .filter(
                (son) =>
                  (search === "" ||
                    son.fromName?.includes(search) ||
                    son.mesaj?.includes(search)) &&
                  filterSonet(son)
              )
              .map((son) => (
                <SonetAccordion
                  key={son._id}
                  son={son}
                  updateSonets={updateSonets}
                  manage
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Dash;
