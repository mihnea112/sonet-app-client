import React from "react";
import {useParams} from "react-router-dom";
import {getProxyy} from "../../App";
import axios from "axios";
import {Button} from "@mui/material";

function Edit({data, setData}) {
	const {id} = useParams();

	function save() {
		const token = localStorage.getItem("token");
		axios
			.patch(getProxyy() + "/sonet/" + data._id, {...data, token: token})
			.then((res) => {
				alert("OK");
			})
			.catch((err) => {
				alert("Err");
			});
	}

	function handleChange(e) {
		setData((prev) => ({...prev, [e.target.name]: e.target.value}));
	}

	return (
		<div>
			{data && (
				<div className="max-w-lg mx-auto text-emerald-300 p-5">
					<h1 className="text-center text-xl font-bold">Edit sonet</h1>
					<div className="my-5 flex">
						<div className="w-1/4 text-center py-auto">
							<span className="my-auto">Pentru: </span>
						</div>
						<div className="w-3/4">
							<input
								name="forName"
								onChange={handleChange}
								type="text"
								className="w-full p-2 rounded-lg bg-zinc-600"
								value={data.forName || ""}
							/>
						</div>
					</div>
					<h2 className="text-center text-lg font-bold">Mesaj</h2>
					<textarea
						onChange={handleChange}
						className="rounded-lg bg-zinc-600 w-full my-3 p-3 h-36"
						name="mesaj"
						value={data.mesaj}></textarea>
					<Button className="w-full" variant="outlined" color="primary" onClick={save}>
						Save
					</Button>
				</div>
			)}
		</div>
	);
}

export default Edit;
