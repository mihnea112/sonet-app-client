import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import QRCode from "react-qr-code";
import {Button} from "@mui/material";
import axios from "axios";
import {getProxyy} from "../App";

function SonetAccordion({son, updateSonets, manage}) {
	function deleteSonet() {
		const token = localStorage.getItem("token");
		axios
			.delete(getProxyy() + "/sonet/" + son._id + `?token=${token}`)
			.then(() => {
				updateSonets();
			})
			.catch((err) => {});
	}

	return (
		<div className="mx-auto m-3">
			<Accordion>
				<AccordionSummary expandIcon={<ArrowDownwardIcon />} aria-controls="panel1-content" id="panel1-header">
					<div className="flex gap-4 text-emerald-300 text-bold">
						{manage ? (
							<>{son.forName ? <h3 className="font-bold">{son.forName}</h3> : <p>[Empty]</p>}</>
						) : (
							<>{son.fromUserId.name ? <h3 className="font-bold">{son.fromUserId.name}</h3> : <p>[Empty]</p>}</>
						)}
						{son.mesaj ? <p className="italic">"{son.mesaj.substring(0, 25)}..."</p> : <p>[Mesaj]</p>}
					</div>
				</AccordionSummary>
				<AccordionDetails className="bg-zinc-500">
					<div key={son._id} className="p-2">
						{manage && (
							<div className="flex justify-end gap-4">
								<Button
									variant="outlined"
									color="primary"
									onClick={() => {
										window.location.href = "http://" + window.location.host + "/sonet/" + son._id;
									}}>
									Edit
								</Button>
								<Button variant="outlined" color="delete" onClick={deleteSonet}>
									Delete
								</Button>
							</div>
						)}
						<div className="text-center  text-emerald-300 flex justify-center gap-3 my-3">
							<>For: {son.forName ? <h3 className=" text-emerald-200 font-bold">{son.forName}</h3> : <p>[Empty]</p>}</>
						</div>
						<hr className="my-2" />

						<h3 className="font-bold text-emerald-300">Mesaj:</h3>
						<p className="text-emerald-100 italic">{son.mesaj}</p>
						<hr className="my-2" />

						{manage && (
							<div className="w-2/3 mx-auto p-3 bg-white my-5">
								<QRCode
									size={256}
									style={{
										height: "auto",
										maxWidth: "100%",
										width: "100%",
									}}
									value={"http://" + window.location.host + "/sonet/" + son._id}
									viewBox={`0 0 256 256`}
								/>
							</div>
						)}
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}

export default SonetAccordion;
