'use client';
import { fetchAttendances } from "@/utils/data";
import { Attendance } from "@/utils/definitions";
import { mkConfig, generateCsv, download } from "export-to-csv";

export default function ExportCSV({data} : {data: Attendance[]}){
    const csvConfig = mkConfig({ useKeysAsHeaders: true, });

    const dataCsv = data.map((att: Attendance) => ({
      id: att.id,
      fecha: `${new Date(att.fecha).toLocaleString()}`,
      horaEntrada: `${new Date(att.horaEntrada).getHours().toString().padStart(2, "0")}:${new Date(att.horaEntrada).getMinutes().toString().padStart(2, "0")}:${new Date(att.horaEntrada).getSeconds().toString().padStart(2, "0")}`,
      horaSalida: `${new Date(att.horaSalida).getHours().toString().padStart(2, "0")}:${new Date(att.horaSalida).getMinutes().toString().padStart(2, "0")}:${new Date(att.horaSalida).getSeconds().toString().padStart(2, "0")}`,
      rutEmpleado: att.usuarioRut,
    }));

    // Converts your Array<Object> to a CsvOutput string based on the configs
    const csv = generateCsv(csvConfig)(dataCsv);

    function handleExportToCSV(){
        download(csvConfig)(csv);
    }
    return (
        <button className="button" onClick={handleExportToCSV}>
            <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21.17 3.25q.33 0 .59.25q.24.24.24.58v15.84q0 .34-.24.58q-.26.25-.59.25H7.83q-.33 0-.59-.25q-.24-.24-.24-.58V17H2.83q-.33 0-.59-.24Q2 16.5 2 16.17V7.83q0-.33.24-.59Q2.5 7 2.83 7H7V4.08q0-.34.24-.58q.26-.25.59-.25M7 13.06l1.18 2.22h1.79L8 12.06l1.93-3.17H8.22L7.13 10.9l-.04.06l-.03.07q-.26-.53-.56-1.07q-.25-.53-.53-1.07H4.16l1.89 3.19L4 15.28h1.78m8.1 4.22V17H8.25v2.5m5.63-3.75v-3.12H12v3.12m1.88-4.37V8.25H12v3.13M13.88 7V4.5H8.25V7m12.5 12.5V17h-5.62v2.5m5.62-3.75v-3.12h-5.62v3.12m5.62-4.37V8.25h-5.62v3.13M20.75 7V4.5h-5.62V7Z"/></svg>
            </span>
            <span>Exportar a CSV</span>
        </button>
    );
}