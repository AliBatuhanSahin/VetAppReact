import axios from "axios";
// Raporları listeleme

export const getReports = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports`
    );
    return data;
};

// Rapor oluşturma
export const createReport = async (report) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/create`,
        report
    );
    return data;
};

// Rapor güncelleme
export const updateReportFunc = async (report) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/update/${report.id}`,
        report
    );
    return data;
};

// Rapor silme
export const deleteReport = async (id) => {
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/delete/${id}`
        );
        return data;
    } catch (error) {
        console.error("Rapor silinirken hata oluştu:", error);
        throw error;
    }
};

