import axios from "axios";

// Aşıları listeleme
export const getVaccines = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines`
    );
    return data;
};

// Aşı oluşturma
export const createVaccine = async (vaccine) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/create`,
        vaccine
    );
    return data;
};

// Aşı güncelleme
export const updateVaccineFunc = async (vaccine) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/update/${vaccine.id}`,
        vaccine
    );
    return data;
};

// Aşı silme
export const deleteVaccine = async (id) => {
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/delete/${id}`
        );
        return data;
    } catch (error) {
        console.error("Aşı silinirken hata oluştu:", error);
        throw error;
    }
};

export const findAnimalByName = async (name) => {
    const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/${name}/vaccines`
        );
        return data;
};

export const findAnimalByEndDate = async (startDate, endDate) => {
    const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/upcomingVaccines?startDate=${startDate}&endDate=${endDate}`
        );
        return data;
};
