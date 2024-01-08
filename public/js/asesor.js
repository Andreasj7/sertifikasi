/* eslint-disable no-undef */
import {
    UserRole,
    closePopup,
    formattedDate,
    showPopupOnClick,
} from './utils.js';

const getPermohonanSertifikasiById = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`/api/cert-applications/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const permohonanSertifikasi = responsJson.data.certApplication;

    return permohonanSertifikasi;
};

const getDataAssesi = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch('/api/assesions?isProcessed=true', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responsJson = await response.json();
    const assesions = responsJson.data.assesions;

    return assesions;
};

const buildTable = () => {
    getDataAssesi().then((assesions) => {
        const values = assesions.map((assesion) => {
            const { schema } = assesion.schema;
            const { tukName } =
                assesion.assesmentImpl.sptAssesor.certApplication;
            const { noSptAssesor, assesorDate } =
                assesion.assesmentImpl.sptAssesor;
            const { lspAdmin } = assesion;
            const { assesorLead } = assesion;
            const { assesorName } = assesion;
            const { assesionNumber } = assesion;
            const assesorDt = formattedDate(
                new Date(assesion.assesmentImpl.sptAssesor.assesorDate)
            );
            const dtasesi = formattedDate(new Date(assesion.date));

            return {
                id: assesion.id, // <-- Define id here
                tukName,
                noDateSptAssesor:
                    noSptAssesor !== null || assesorDate !== null
                        ? `No. ${noSptAssesor} Tgl ${assesorDt}`
                        : '-',
                lspAdmin,
                assesorLead,
                assesorName,
                assesionNumber,
                schema,
                dtasesi,
            };
        });

        const dataTable = $('#dataTable').DataTable();
        values.forEach((value) => {
            const data = Object.entries(value)
                .filter(([key]) => key !== 'id')
                .map(([, val]) => val);
            dataTable.row.add(data);
        });

        dataTable.draw();

        const firstColumnNodes = dataTable.column(0).nodes();
        $(firstColumnNodes).addClass('expandable');
        $(firstColumnNodes).addClass('link-style');
        $('#dataTable tbody').on('click', 'tr', async function () {
            const rowData = dataTable.row(this).index();
            const id =
                assesions[rowData].assesmentImpl.sptAssesor.certApplication.id;
            console.log(id);

            const data = await getPermohonanSertifikasiById(id);
            await showPopupOnClick(data);
        });
        const user = JSON.parse(localStorage.getItem('user'));
        const role = user.role.role;

        $('#dataTable tbody').ready(function () {
            const lastColumnIndex = dataTable.columns().indexes().length - 1;
            dataTable
                .columns(lastColumnIndex)
                .visible(
                    role === UserRole.ADMIN_UJI || role === UserRole.ADMIN
                );
        });
    });
};

closePopup();
buildTable();
