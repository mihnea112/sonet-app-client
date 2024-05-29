import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProxyy} from "../App";
import SonetLg from "./SonetLg";
import Edit from "./edit/Edit";

function SonetFromId() {
	const {id} = useParams();

	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get(getProxyy() + "/sonet/" + id + "?token=" + (localStorage.getItem("token") || ""))
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			{data && (
				<>{data.userCanEdit ? <Edit data={data} setData={setData} /> : <SonetLg data={data} setData={setData} />}</>
			)}
		</div>
	);
}

export default SonetFromId;
