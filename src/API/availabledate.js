import axios from "axios";

export const getAvailableDates = async () => {
    const {data} = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/availableDate")
    return data;
}

export const deleteAvailableDate = async (id) => {
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/availableDate/delete/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting available date:", error);
        throw error;
    }
};

export const createAvailableDate = async (availableDate) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/availableDate/create`,
        availableDate
    );
    return data;
};

export const updateAvailableDateFunc = async (availableDate) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/availableDate/update/${availableDate.id}`,
        availableDate
    );
    return data;
};
