import axios from "axios";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProxyy} from "../App";
import {Button} from "@mui/material";

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

			{data && (
				<div>
					<div className="text-emerald-300 text-center my-10">
						<p>De la: </p>
						<p className="font-bold">{data.fromUserId.name}</p>
					</div>

					<div className="p-5 bg-zinc-600 my-10 text-emerald-300">
						<p>{data.mesaj}</p>
					</div>
					<h2 className="text-lg text-emerald-300 italic text-right">
						Pentru: <span className="font-bold">{data.forName}</span>
					</h2>
					<div className="my-10">
						<Button className="w-full " variant="outlined" color="primary">
							Adauga la sonete pentru mine...
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}

export default SonetLg;
