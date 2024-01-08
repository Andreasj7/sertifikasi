/* eslint-disable no-undef */
export const UserRole = {
    ADMIN: 'Admin',
    IT: 'IT',
    SERTIFIKASI: 'Sertifikasi',
    ADMIN_UJI: 'Admin Uji',
    SEKRETARIS: 'Sekretaris',
    ADMINISTRASI: 'Administrasi',
    DIREKTUR: 'Direktur',
};

export const formattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const fDate = `${year}-${month}-${day}`;
    return fDate;
};

export function closePopup() {
    console.log('closePopup function called');
    var popup = document.getElementById('popup');
    var closepopup = document.getElementById('close-popup');
    closepopup.addEventListener('click',()=>{popup.style.display = 'none';})
}


const buildItemContent = (itemText) => {
    const li = document.createElement('li');

    const p = document.createElement('p');
    p.innerHTML = `<p>${itemText}</p>`;

    li.appendChild(p);
    return li;
};

const buildEmptyListAssesionContent = () => {
    return [
        `Admin LSP : -`,
        `Lead Asesor : -`,
        `Nama Asesor : -`,
        `Jumlah Asesi : -`,
        `Jenis Skema : -`,
        `Rekomendasi Asesor : -`,
        `Data Asesi : -`,
        `No & Tgl BA : -`,
        `No & Tgl SK : -`,
        `Tanggal SK/Pleno : -`,
        `Tgl Pembuatan BA : -`,
        `Tgl pembuatan SK : -`,
        'Tanggal kirim Surat Hasil Uji ke TUK / Perusahaan : -',
        'Pendistribusian Invoice : -',
        'Data Pemegang Sertifikat : -',
        'No & Tgl Surat Permohonan Blanko : -',
        'No & Tgl BA Serah Terima Blanko BNSP : -',
        'Tgl Terima Blanko BNSP : -',
        'Cetak Foto Asesi : -',
        'Cetak Blanko Sertifikat : -',
        'Cetak Kartu Kompetensi : -',
        'Tandatangan Direktur : -',
        'Manajer Sertifikasi : -',
        'Stempel Sertifikat : -',
        'Scanner Sertifikat : -',
        'Penyimpan Sertifikat : -',
        'Konfirmasi Pembayaran : -',
        'Perintah Kirim : -',
        'Packing : -',
        'Pendistribusian Kartu : -',
        'Pendistribusian Sertifkat : -',
        'Resi Pengiriman : -',
        'Konfirmasi Penerimaan ke TUK : -',
    ];
};

const buildListAssesionContent = (assesion) => {
    const assesmentSchedule = assesion?.assesmentSchedule ?? null;
    const baSk = assesmentSchedule?.baSk ?? null;
    const testResult = baSk?.assTestResult ?? null;
    const printAssesion = testResult?.printAssesion ?? null;
    const printBlank = printAssesion?.printBlank ?? null;
    const printCompensation = printBlank?.printCompensation ?? null;
    const directurSign = printBlank?.directurSign ?? null;
    const certManager = printBlank?.certManager ?? null;
    const certStamp = printBlank?.certStamp ?? null;
    const certScanner = printBlank?.certScanner ?? null;
    const certStorage = printBlank?.certStorage ?? null;
    const systemMiners = printBlank?.systemMiners ?? null;
    const sendCommand = systemMiners?.sendCommand ?? null;
    const packing = sendCommand?.packing ?? null;
    const cardDist = packing?.cardDist ?? null;
    const certDist = cardDist?.certDist ?? null;
    const receipt = certDist?.receipt ?? null;
    const tukConfirmation = receipt?.tukConfirmation ?? null;
    return [
        `Admin LSP : ${assesion?.lspAdmin || '-'}`,
        `Lead Asesor : ${assesion?.assesorLead || '-'}`,
        `Nama Asesor : ${assesion?.assesorName || '-'}`,
        `Jumlah Asesi : ${assesion?.assesionNumber || '-'}`,
        `Jenis Skema : ${assesion?.schema.schema || '-'}`,
        `Rekomendasi Asesor : ${assesion?.asesorRecommendation || '-'}`,
        `Data Asesi : ${assesion?.date || '-'}`,
        `Jadwal Assesment BNSP : ${
            assesmentSchedule ? assesmentSchedule.schedule || '-' : '-'
        }`,
        `No & Tgl BA : ${baSk ? baSk.noBaDate || '-' : '-'}`,
        `No & Tgl SK : ${baSk ? baSk.noSkDate || '-' : '-'}`,
        `Tanggal SK/Pleno : ${baSk ? baSk.plenoDate || '-' : '-'}`,
        `Tgl Pembuatan BA : ${baSk ? baSk.baDate || '-' : '-'}`,
        `Tgl pembuatan SK : ${baSk ? baSk.skDate || '-' : '-'}`,
        `Tanggal kirim Surat Hasil Uji ke TUK / Perusahaan : ${
            testResult ? testResult.date || '-' : '-'
        }`,
        `Cetak Foto Asesi : ${printAssesion ? printAssesion.date || '-' : '-'}`,
        `Cetak Blanko Sertifikat : ${
            printBlank ? printBlank.date || '-' : '-'
        }`,
        `Cetak Kartu Kompetensi : ${
            printCompensation ? printCompensation.date || '-' : '-'
        }`,
        `Tandatangan Direktur : ${
            directurSign ? directurSign.date || '-' : '-'
        }`,
        `Manajer Sertifikasi : ${certManager ? certManager.date || '-' : '-'}`,
        `Stempel Sertifikat : ${certStamp ? certStamp.date || '-' : '-'}`,
        `Scanner Sertifikat : ${certScanner ? certScanner.date || '-' : '-'}`,
        `Penyimpan Sertifikat : ${certStorage ? certStorage.date || '-' : '-'}`,
        `Perintah Kirim : ${sendCommand ? sendCommand.date || '-' : '-'}`,
        `Packing : ${packing ? packing.date || '-' : '-'}`,
        `Pendistribusian Kartu : ${cardDist ? cardDist.date || '-' : '-'}`,
        `Pendistribusian Sertifkat : ${certDist ? certDist.date || '-' : '-'}`,
        `Resi Pengiriman : ${receipt ? receipt.date || '-' : '-'}`,
        `Konfirmasi Penerimaan ke TUK : ${
            tukConfirmation ? tukConfirmation.date || '-' : '-'
        }`,
    ];
};

const buildAssesionData = (data) => {
    const sptAssesor = data?.sptAssesor ?? null;
    const assesmentImpl = sptAssesor?.assesmentImpl ?? null;
    const assesions = assesmentImpl?.assesions ?? [];

    const assesmentData = document.createElement('div');

    assesions.forEach((assesion, index) => {
        const ul = document.createElement('ul');
        const listItemContent = buildListAssesionContent(assesion);
        const content = listItemContent.map((item) => buildItemContent(item));
        ul.append(...content);
        assesmentData.appendChild(ul);

        if (index !== assesions.length - 1) {
            assesmentData.appendChild(document.createElement('hr'));
        }
    });

    if (assesions.length === 0) {
        const listItemContent = buildEmptyListAssesionContent();
        const content = listItemContent.map((item) => buildItemContent(item));
        const ul = document.createElement('ul');
        ul.append(...content);
        assesmentData.appendChild(ul);
    }

    return assesmentData.innerHTML;
};



export const showPopupOnClick = async (data) => {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');

    const { approval } = data;
    const { certPurpose } = data;
    const certHolder = data?.certHolder ?? null;
    const blankApplication = data?.blankApplication ?? null;
    const invoiceDist = data?.invoiceDist ?? null;
    const paymentConfirmation = data?.paymentConfirmation ?? null;
    const sptAssesor = data?.sptAssesor ?? null;

    const assesionData = buildAssesionData(data);

    const listItemContent = [
        `Nama TUK/Provider : ${data.tukName || ' - '}`,
        `Tanggal Uji Kompetensi : ${data.assesmentDate || '-'}`,
        `No Surat Permohonan : ${data.referenceNumber || '-'}`,
        `Tanggal Terima Surat : ${data.receiptDate || '-'}`,
        `Tujuan Sertifikasi : ${certPurpose.purpose || '-'}`,
        `Tanggal Approval : ${
            approval.date ? formattedDate(new Date(approval.date)) : '-'
        }`,
        `No. & Tgl. SPT Asesor : ${
            sptAssesor !== null &&
            sptAssesor.noSptAssesor !== null &&
            sptAssesor.assesorDate !== null
                ? `No ${sptAssesor.noSptAssesor} Tgl ${sptAssesor.assesorDate}`
                : '-'
        }`,
        `Pendistribusian Invoice : ${
            invoiceDist ? invoiceDist.invoiceDate || '-' : '-'
        }`,
        `Data Pemegang Sertifikat : ${
            certHolder ? certHolder.certHolder || '-' : '-'
        }`,
        `No & Tgl Surat Permohonan Blanko : ${
            blankApplication !== null &&
            blankApplication.noBlank !== null &&
            blankApplication.dateBlank !== null
                ? `${blankApplication.noBlank} / ${blankApplication.dateBlank}` ||
                  '-'
                : '-'
        }`,
        `No & Tgl BA Serah Terima Blanko BNSP : ${
            blankApplication !== null &&
            blankApplication.noHandover !== null &&
            blankApplication.dateHandover !== null
                ? `${blankApplication.noHandover} / ${blankApplication.dateHandover}` ||
                  '-'
                : '-'
        }`,
        `Tgl Terima Blanko BNSP : ${
            blankApplication ? blankApplication.blankReceiptDate || '-' : '-'
        }`,
        `Konfirmasi Pembayaran : ${
            paymentConfirmation ? paymentConfirmation.date || '-' : '-'
        }`,
        `Pelaksanaan Assesmen : <br> ${assesionData}`,
    ];

    const ul = document.createElement('ul');
    const content = listItemContent.map((item) => buildItemContent(item));

    ul.append(...content);
    console.log(ul)
    popupText.innerHTML = ul.outerHTML;   
    popup.style.display = 'block';
};
