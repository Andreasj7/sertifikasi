import { UserRole } from './utils.js';
/* eslint-disable no-undef */
let currentScript = null;

const getLoggedUser = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        try {
            const response = await fetch('/api/auth/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const responseJson = await response.json();
            const fullname = responseJson.data.user.fullname;

            localStorage.setItem(
                'user',
                JSON.stringify(responseJson.data.user)
            );

            document.getElementById('user-fullname').innerText = fullname;
            const tambahBtn = document.getElementById('adminmenu');
            const user = responseJson.data.user;
            const role = user.role.role;
            if (role === UserRole.ADMIN) {
                tambahBtn.style.visibility = 'visible';
            } else {
                tambahBtn.style.visibility = 'hidden';
            }
        } catch (error) {
            window.location.href = 'login.html';
        }
    } else {
        window.location.href = 'login.html';
    }
};

const getNotProcessedSertifikasiPermohonan = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(
        '/api/cert-applications?isProcessed=false&isThreeMonth=true',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const responseJson = await response.json();
    const permohonan = responseJson.data.certApplications;

    const badge = document.getElementById('permohonan-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotApprovalSertifikasiPermohonan = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(
        '/api/cert-applications?isApproved=false&isThreeMonth=true',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const responseJson = await response.json();
    const permohonan = responseJson.data.certApplications;

    const badge = document.getElementById('approval-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotnodantanggalspt = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/spt-assesors?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.sptAssesors;

    const badge = document.getElementById('nodanspt-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotassesmenpelaksanaan = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/assesment-impls?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.assesmentImpls;

    const badge = document.getElementById('asesmenpelaksanaan-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotDataAsesi = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/assesions?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.assesions;

    const badge = document.getElementById('dataasesi-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotJadwalAsesmen = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/assesment-schedules?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.assesmentSchedules;

    const badge = document.getElementById('jadwalasesmen-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotPengisianBASK = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/ba-sk?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.listBaSk;

    const badge = document.getElementById('pengisianbask-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotTanggalKirimHasilUji = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/test-results?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.testResults;

    const badge = document.getElementById('tanggalhasiluji-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotDataPemeggangSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/cert-holders?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.certHolders;

    const badge = document.getElementById('datapemegangsertif-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotPermohonanSerahSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/blank-applications?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.blankApplications;

    const badge = document.getElementById('permohonanserahsertif-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getPendistribusianInvoice = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/invoice-dists?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.invoiceDists;

    const badge = document.getElementById('pendistribusianinvoice-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotCetakFoto = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/print-assesions?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.printAssesions;

    const badge = document.getElementById('cetakfoto-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotBlankoSertifikasi = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/print-blanks?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.printBlanks;

    const badge = document.getElementById('blankosertifikasi-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotCetakKartu = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/print-compensations?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.printCompensations;

    const badge = document.getElementById('cetakkartu-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotTandaTangan = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/directur-signs?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.directurSigns;

    const badge = document.getElementById('tandatangan-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotManagerSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/cert-managers?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.certManagers;

    const badge = document.getElementById('sertifmanager-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotStempelSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/cert-stamps?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.certStamps;

    const badge = document.getElementById('stempelsertif-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotScannerSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/cert-scanners?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.certScanners;

    const badge = document.getElementById('scanner-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotPenyimpanSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/cert-storages?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.certStorages;

    const badge = document.getElementById('penyimpansertif-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotLaporanHasil = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/system-miners?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.systemMinerss;

    const badge = document.getElementById('laporanhasil-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getKonfirmasiPembayaran = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(
        '/api/payment-confirmations?isProcessed=false',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const responseJson = await response.json();
    const permohonan = responseJson.data.paymentConfirmations;

    const badge = document.getElementById('konfirmasipembayran-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotPerintahKirim = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/send-commands?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.sendCommands;

    const badge = document.getElementById('perintahkirim-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotPacking = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/packings?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.packings;

    const badge = document.getElementById('packing-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotDistribusiKartu = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/card-dists?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.cardDists;

    const badge = document.getElementById('distribusikartu-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotDistribusiSertif = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/cert-dists?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.certDists;

    const badge = document.getElementById('distribusisertif-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotResi = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/receipts?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.receipts;

    const badge = document.getElementById('resi-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotPenerimaan = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/tuk-confirmations?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.tukConfirmations;

    const badge = document.getElementById('penerimaan-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotClosing = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(
        '/api/cert-applications?isProcessed=false&isThreeMonth=true',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const responseJson = await response.json();
    const permohonan = responseJson.data.certApplications;

    const badge = document.getElementById('closing-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotregisminerba = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/register-minerbas?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.minerbaDatas;

    const badge = document.getElementById('regisminerba-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const getNotdistminerba = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('/api/minerba-dists?isProcessed=false', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const responseJson = await response.json();
    const permohonan = responseJson.data.minerbaDists;

    const badge = document.getElementById('distminerba-badge');
    badge.innerText = permohonan.length;

    if (permohonan.length > 0) {
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
};

const loadContent = (url) => {
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            const contentElement = document.getElementById('page-content');
            contentElement.innerHTML = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

const loadScript = (url) => {
    const script = document.createElement('script');

    script.src = url;
    script.setAttribute('type', 'module');

    document.body.appendChild(script);
    return script;
};

const handleHashChange = () => {
    const hash = window.location.hash;
    const hashWithoutParams = hash.split('?')[0];

    if (
        currentScript &&
        currentScript.getAttribute('data-loaded') === 'false'
    ) {
        document.body.removeChild(currentScript);
    }

    switch (hashWithoutParams) {
        case '#dashboard':
            loadContent('home.html');
            currentScript = loadScript('js/home.js');
            break;
        case '#profile':
            loadContent('profile.html');
            currentScript = loadScript('js/profile.js');
            break;
        case '#permohonansertfikasi':
            loadContent('permohonansertfikasi.html');
            currentScript = loadScript('js/permohonanSertifikasi.js');
            break;
        case '#approvalsertifikasi':
            loadContent('approvalsertifikasi.html');
            currentScript = loadScript('js/approvalSertfikasi.js');
            break;
        case '#dataapproval':
            loadContent(`dataapproval.html`);
            currentScript = loadScript('js/dataapproval.js');
            break;
        case '#inputapproval':
            loadContent(`inputapproval.html`);
            currentScript = loadScript('js/inputApproval.js');
            break;
        case '#editapproval':
            loadContent(`editapproval.html`);
            currentScript = loadScript('js/editapproval.js');
            break;
        case '#inputpermohonansertifikasi':
            loadContent('inputpermohonansertifikasi.html');
            currentScript = loadScript('js/inputPermohonanSertifikasi.js');
            break;
        case '#nodantanggalasesor':
            loadContent(`nodantanggalasesor.html`);
            currentScript = loadScript('js/noDanTanggalAsesor.js');
            break;
        case '#dataujikompetensi':
            loadContent(`dataujikompetensi.html`);
            currentScript = loadScript('js/dataujikompetensi.js');
            break;
        case '#inputnodantanggalspt':
            loadContent(`inputnodantanggalspt.html`);
            currentScript = loadScript('js/inputNoDanTanggalAsesor.js');
            break;
        case '#editdataujikompetensi':
            loadContent(`editdataujikompetensi.html`);
            currentScript = loadScript('js/editdataujikompetensi.js');
            break;
        case '#asesmenpelaksanaan':
            loadContent(`asesmenpelaksanaan.html`);
            currentScript = loadScript('js/asesmenPelaksanaan.js');
            break;
        case '#dataasesmenpelaksanaan':
            loadContent(`dataasesmenpelaksanaan.html`);
            currentScript = loadScript('js/dataasesmenpelaksanaan.js');
            break;
        case '#inputasesor':
            loadContent(`inputasesor.html`);
            currentScript = loadScript('js/inputAsesor.js');
            break;
        case '#dataasesi':
            loadContent(`dataasesi.html`);
            currentScript = loadScript('js/dataasesi.js');
            break;
        case '#datadataasesi':
            loadContent(`datadataasesi.html`);
            currentScript = loadScript('js/datadataasesi.js');
            break;
        case '#inputdataasesi':
            loadContent(`inputdataasesi.html`);
            currentScript = loadScript('js/inputdataasesi.js');
            break;
        case '#jadwalasesment':
            loadContent(`jadwalasesment.html`);
            currentScript = loadScript('js/jadwalasesment.js');
            break;
        case '#datajadwalasesmen':
            loadContent(`datajadwalasesmen.html`);
            currentScript = loadScript('js/datajadwalasesmen.js');
            break;
        case '#editdatainputasesor':
            loadContent(`editdatainputasesor.html`);
            currentScript = loadScript('js/editdatainputasesor.js');
            break;
        case '#pengisianbadansk':
            loadContent(`pengisianbadansk.html`);
            currentScript = loadScript('js/pengisianbadansk.js');
            break;
        case '#datapengisianbadansk':
            loadContent(`datapengisianbadansk.html`);
            currentScript = loadScript('js/datapengisianbadansk.js');
            break;
        case '#tanggalhasiluji':
            loadContent(`tanggalhasiluji.html`);
            currentScript = loadScript('js/tanggalhasiluji.js');
            break;
        case '#datatanggalhasiluji':
            loadContent(`datatanggalhasiluji.html`);
            currentScript = loadScript('js/datatanggalhasiluji.js');
            break;
        case '#pendistribusianinvoice':
            loadContent(`pendistribusianinvoice.html`);
            currentScript = loadScript('js/pendistribusianinvoice.js');
            break;
        case '#inputpendistribusianinvoice':
            loadContent(`inputpendistribusianinvoice.html`);
            currentScript = loadScript('js/inputpendistribusianinvoice.js');
            break;
        case '#datapendistribusianinvoice':
            loadContent(`datapendistribusianinvoice.html`);
            currentScript = loadScript('js/datapendistribusianinvoice.js');
            break;
        case '#datapemegangsertif':
            loadContent(`datapemegangsertif.html`);
            currentScript = loadScript('js/datapemegangsertif.js');
            break;
        case '#datadatapemegangsertif':
            loadContent(`datadatapemegangsertif.html`);
            currentScript = loadScript('js/datadatapemegangsertif.js');
            break;
        case '#tanggalpermohonan':
            loadContent(`tanggalpermohonan.html`);
            currentScript = loadScript('js/tanggalpermohonan.js');
            break;
        case '#datatanggalpermohonan':
            loadContent(`datatanggalpermohonan.html`);
            currentScript = loadScript('js/datatanggalpermohonan.js');
            break;
        case '#inputjadwalasesmen':
            loadContent(`inputjadwalasesmen.html`);
            currentScript = loadScript('js/inputjadwalasesmen.js');
            break;
        case '#editjadwalasesmen':
            loadContent(`inputjadwalasesmen.html`);
            currentScript = loadScript('js/editjadwalasesmen.js');
            break;
        case '#inputpengisianbadansk':
            loadContent(`inputpengisianbadansk.html`);
            currentScript = loadScript('js/inputpengisianbadansk.js');
            break;
        case '#inputtanggalhasiluji':
            loadContent(`inputtanggalhasiluji.html`);
            currentScript = loadScript('js/inputtanggalhasiluji.js');
            break;
        case '#inputdatapemegangsertif':
            loadContent(`inputdatapemegangsertif.html`);
            currentScript = loadScript('js/inputdatapemegangsertif.js');
            break;
        case '#editdatapemegangsertif':
            loadContent(`inputdatapemegangsertif.html`);
            currentScript = loadScript('js/editdatapemegangsertif.js');
            break;
        case '#inputtanggalpermohonan':
            loadContent(`inputtanggalpermohonan.html`);
            currentScript = loadScript('js/inputtanggalpermohonan.js');
            break;
        case '#edittanggalpermohonan':
            loadContent(`inputtanggalpermohonan.html`);
            currentScript = loadScript('js/edittanggalpermohonan.js');
            break;
        case '#editdataasesi':
            loadContent(`editdataasesi.html`);
            currentScript = loadScript('js/editdataasesi.js');
            break;
        case '#cetakfoto':
            loadContent(`cetakfoto.html`);
            currentScript = loadScript('js/cetakfoto.js');
            break;
        case '#inputcetakfoto':
            loadContent(`inputcetakfoto.html`);
            currentScript = loadScript('js/inputcetakfoto.js');
            break;
        case '#datacetakfoto':
            loadContent(`datacetakfoto.html`);
            currentScript = loadScript('js/datacetakfoto.js');
            break;
        case '#cetakblanko':
            loadContent(`cetakblanko.html`);
            currentScript = loadScript('js/cetakblanko.js');
            break;
        case '#inputcetakblanko':
            loadContent(`inputcetakblanko.html`);
            currentScript = loadScript('js/inputcetakblanko.js');
            break;
        case '#datacetakblanko':
            loadContent(`datacetakblanko.html`);
            currentScript = loadScript('js/datacetakblanko.js');
            break;
        case '#cetakkartu':
            loadContent(`cetakkartu.html`);
            currentScript = loadScript('js/cetakkartu.js');
            break;
        case '#inputcetakkartu':
            loadContent(`inputcetakkartu.html`);
            currentScript = loadScript('js/inputcetakkartu.js');
            break;
        case '#datacetakkartu':
            loadContent(`datacetakkartu.html`);
            currentScript = loadScript('js/datacetakkartu.js');
            break;
        case '#tandatangan':
            loadContent(`tandatangan.html`);
            currentScript = loadScript('js/tandatangan.js');
            break;
        case '#inputtandatangan':
            loadContent(`inputtandatangan.html`);
            currentScript = loadScript('js/inputtandatangan.js');
            break;
        case '#datatandatangan':
            loadContent(`datatandatangan.html`);
            currentScript = loadScript('js/datatandatangan.js');
            break;
        case '#manajersertifikasi':
            loadContent(`manajersertifikasi.html`);
            currentScript = loadScript('js/manajersertifikasi.js');
            break;
        case '#inputmanajersertifikasi':
            loadContent(`inputmanajersertifikasi.html`);
            currentScript = loadScript('js/inputmanajersertifikasi.js');
            break;
        case '#datamanajersertifikasi':
            loadContent(`datamanajersertifikasi.html`);
            currentScript = loadScript('js/datamanajersertifikasi.js');
            break;
        case '#stempelsertifikasi':
            loadContent(`stempelsertifikasi.html`);
            currentScript = loadScript('js/stempelsertifikasi.js');
            break;
        case '#inputstempelsertifikasi':
            loadContent(`inputstempelsertifikasi.html`);
            currentScript = loadScript('js/inputstempelsertifikasi.js');
            break;
        case '#datastempelsertifikasi':
            loadContent(`datastempelsertifikasi.html`);
            currentScript = loadScript('js/datastempelsertifikasi.js');
            break;
        case '#scannersertifikasi':
            loadContent(`scannersertifikasi.html`);
            currentScript = loadScript('js/scannersertifikasi.js');
            break;
        case '#inputscannersertifikasi':
            loadContent(`inputscannersertifikasi.html`);
            currentScript = loadScript('js/inputscannersertifikasi.js');
            break;
        case '#datascannersertifikasi':
            loadContent(`datascannersertifikasi.html`);
            currentScript = loadScript('js/datascannersertifikasi.js');
            break;
        case '#penyimpansertifikasi':
            loadContent(`penyimpansertifikasi.html`);
            currentScript = loadScript('js/penyimpansertifikasi.js');
            break;
        case '#inputpenyimpansertifikasi':
            loadContent(`inputpenyimpansertifikasi.html`);
            currentScript = loadScript('js/inputpenyimpansertifikasi.js');
            break;
        case '#datapenyimpansertifikasi':
            loadContent(`datapenyimpansertifikasi.html`);
            currentScript = loadScript('js/datapenyimpansertifikasi.js');
            break;
        case '#laporanhasil':
            loadContent(`laporanhasil.html`);
            currentScript = loadScript('js/laporanhasil.js');
            break;
        case '#inputlaporanhasil':
            loadContent(`inputlaporanhasil.html`);
            currentScript = loadScript('js/inputlaporanhasil.js');
            break;
        case '#datalaporanhasil':
            loadContent(`datalaporanhasil.html`);
            currentScript = loadScript('js/datalaporanhasil.js');
            break;
        case '#konfirmasipembayaran':
            loadContent(`konfirmasipembayaran.html`);
            currentScript = loadScript('js/konfirmasipembayaran.js');
            break;
        case '#inputkonfirmasipembayaran':
            loadContent(`inputkonfirmasipembayaran.html`);
            currentScript = loadScript('js/inputkonfirmasipembayaran.js');
            break;
        case '#datakonfirmasipembayaran':
            loadContent(`datakonfirmasipembayaran.html`);
            currentScript = loadScript('js/datakonfirmasipembayaran.js');
            break;
        case '#perintahkirim':
            loadContent(`perintahkirim.html`);
            currentScript = loadScript('js/perintahkirim.js');
            break;
        case '#inputperintahkirim':
            loadContent(`inputperintahkirim.html`);
            currentScript = loadScript('js/inputperintahkirim.js');
            break;
        case '#dataperintahkirim':
            loadContent(`dataperintahkirim.html`);
            currentScript = loadScript('js/dataperintahkirim.js');
            break;
        case '#packing':
            loadContent(`packing.html`);
            currentScript = loadScript('js/packing.js');
            break;
        case '#inputpacking':
            loadContent(`inputpacking.html`);
            currentScript = loadScript('js/inputpacking.js');
            break;
        case '#datapacking':
            loadContent(`datapacking.html`);
            currentScript = loadScript('js/datapacking.js');
            break;
        case '#distribusikartu':
            loadContent(`distribusikartu.html`);
            currentScript = loadScript('js/distribusikartu.js');
            break;
        case '#inputdistribusikartu':
            loadContent(`inputdistribusikartu.html`);
            currentScript = loadScript('js/inputdistribusikartu.js');
            break;
        case '#datadistribusikartu':
            loadContent(`datadistribusikartu.html`);
            currentScript = loadScript('js/datadistribusikartu.js');
            break;
        case '#distribusisertifikat':
            loadContent(`distribusisertifikat.html`);
            currentScript = loadScript('js/distribusisertifikat.js');
            break;
        case '#inputdistribusisertifikat':
            loadContent(`inputdistribusisertifikat.html`);
            currentScript = loadScript('js/inputdistribusisertifikat.js');
            break;
        case '#datadistribusisertifikat':
            loadContent(`datadistribusisertifikat.html`);
            currentScript = loadScript('js/datadistribusisertifikat.js');
            break;
        case '#resipengiriman':
            loadContent(`resipengiriman.html`);
            currentScript = loadScript('js/resipengiriman.js');
            break;
        case '#inputresipengiriman':
            loadContent(`inputresipengiriman.html`);
            currentScript = loadScript('js/inputresipengiriman.js');
            break;
        case '#dataresipengiriman':
            loadContent(`dataresipengiriman.html`);
            currentScript = loadScript('js/dataresipengiriman.js');
            break;
        case '#konfimrasipenerimaan':
            loadContent(`konfimrasipenerimaan.html`);
            currentScript = loadScript('js/konfimrasipenerimaan.js');
            break;
        case '#inputkonfimrasipenerimaan':
            loadContent(`inputkonfimrasipenerimaan.html`);
            currentScript = loadScript('js/inputkonfimrasipenerimaan.js');
            break;
        case '#datakonfimrasipenerimaan':
            loadContent(`datakonfimrasipenerimaan.html`);
            currentScript = loadScript('js/datakonfimrasipenerimaan.js');
            break;
        case '#closing':
            loadContent(`closing.html`);
            currentScript = loadScript('js/closing.js');
            break;
        case '#inputclosing':
            loadContent(`inputclosing.html`);
            currentScript = loadScript('js/inputclosing.js');
            break;
        case '#dataclosing':
            loadContent(`dataclosing.html`);
            currentScript = loadScript('js/dataclosing.js');
            break;
        case '#pendataanminerba':
            loadContent(`pendataanminerba.html`);
            currentScript = loadScript('js/pendataanminerba.js');
            break;
        case '#inputpendataanminerba':
            loadContent(`inputpendataanminerba.html`);
            currentScript = loadScript('js/inputpendataanminerba.js');
            break;
        case '#datapendataanminerba':
            loadContent(`datapendataanminerba.html`);
            currentScript = loadScript('js/datapendataanminerba.js');
            break;
        case '#nodantanggalminerba':
            loadContent(`nodantanggalminerba.html`);
            currentScript = loadScript('js/nodantanggalminerba.js');
            break;
        case '#inputnodantanggalminerba':
            loadContent(`inputnodantanggalminerba.html`);
            currentScript = loadScript('js/inputnodantanggalminerba.js');
            break;
        case '#datanodantanggalminerba':
            loadContent(`datanodantanggalminerba.html`);
            currentScript = loadScript('js/datanodantanggalminerba.js');
            break;
        case '#adminsertifikasi':
            loadContent(`adminsertifikasi.html`);
            currentScript = loadScript('js/adminsertifikasi.js');
            break;
        case '#editadminsertifikasi':
            loadContent(`editadminsertifikasi.html`);
            currentScript = loadScript('js/editadminsertifikasi.js');
            break;
        case '#adminskema':
            loadContent(`adminskema.html`);
            currentScript = loadScript('js/adminskema.js');
            break;
        case '#editadminskema':
            loadContent(`editadminskema.html`);
            currentScript = loadScript('js/editadminskema.js');
            break;
        case '#adminuser':
            loadContent(`adminuser.html`);
            currentScript = loadScript('js/adminuser.js');
            break;
        case '#editadminuser':
            loadContent(`editadminuser.html`);
            currentScript = loadScript('js/editadminuser.js');
            break;
        case '#asesor':
            loadContent(`asesor.html`);
            currentScript = loadScript('js/asesor.js');
            break;
        case '#lihatkonfirmasipembayaran':
            loadContent(`lihatkonfirmasipembayaran.html`);
            currentScript = loadScript('js/lihatkonfirmasipembayaran.js');
            break;
        default:
            loadContent('home.html');
    }
};

const main = () => {
    window.addEventListener('hashchange', () => {
        location.reload();
        handleHashChange();
    });
    document.addEventListener('DOMContentLoaded', async () => {
        handleHashChange();
        await getLoggedUser();
        await getNotProcessedSertifikasiPermohonan();
        await getNotApprovalSertifikasiPermohonan();
        await getNotnodantanggalspt();
        await getNotassesmenpelaksanaan();
        await getNotDataAsesi();
        await getNotJadwalAsesmen();
        await getNotPengisianBASK();
        await getNotTanggalKirimHasilUji();
        await getNotDataPemeggangSertif();
        await getNotPermohonanSerahSertif();
        await getPendistribusianInvoice();
        await getNotCetakFoto();
        await getNotBlankoSertifikasi();
        await getNotCetakKartu();
        await getNotTandaTangan();
        await getNotManagerSertif();
        await getNotStempelSertif();
        await getNotScannerSertif();
        await getNotPenyimpanSertif();
        await getNotLaporanHasil();
        await getKonfirmasiPembayaran();
        await getNotPerintahKirim();
        await getNotPacking();
        await getNotDistribusiKartu();
        await getNotDistribusiSertif();
        await getNotResi();
        await getNotPenerimaan();
        await getNotClosing();
        await getNotregisminerba();
        await getNotdistminerba();
    });
};

main();
