import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProxyy} from "../App";

function SonetLg() {
	const {id} = useParams();

	const [data, setData] = useState(null);

	useEffect(() => {
		axios
			.get(getProxyy() + "/sonet/" + id)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="max-w-lg mx-auto">
			<h1 className="text-xl text-center text-emerald-400 font-bold">Sonet</h1>
			<hr className="my-2" />

			{data && <div>
        Pentru
        </div>}
		</div>
	);
}

export default SonetLg;
