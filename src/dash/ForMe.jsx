import React, {useContext, useEffect, useState} from "react";

import Balls from "../home/Balls";
import {Button, ButtonGroup} from "@mui/material";
import {getProxyy} from "../App";
import axios from "axios";
import SearchComponent from "../components/SearchComponent";
import SonetAccordion from "./SonetAccordion";
import { AlertContext } from "../AlertComponent";

function ForMe() {
	const [sonet, setSonet] = useState([]);
	const [search, setSearch] = useState("");
	const {handleAxiosError} = useContext(AlertContext)

	function updateSonets() {
		const token = localStorage.getItem("token");
		axios.get(getProxyy() + "/for-me?token=" + token).then((res) => {
			setSonet(res.data.sonete);
		}).catch(handleAxiosError);
	}

	useEffect(updateSonets, []);

	return (
		<section className="max-w-xl mx-auto py-3">
			<Balls></Balls>
			<div className="text-center">
				<h1
					className="text-5xl text-center md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-emerald-300"
					data-aos="zoom-y-out">
					Sonetele tale
				</h1>
				{sonet.length !== 0 && (
					<div>
						<SearchComponent search={search} setSearch={setSearch}></SearchComponent>

						{sonet
							.filter((son) => search === "" || son.fromName?.includes(search) || son.mesaj?.includes(search))
							.map((son) => (
								<SonetAccordion key={son._id} son={son} updateSonets={updateSonets} />
							))}
					</div>
				)}
			</div>
		</section>
	);
}

export default ForMe;
