import axios from "axios";

export const getDoctors = async () => {
    const {data} = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors")
    return data;
}

export const deleteDoctor = async (id) => {
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/doctors/delete/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting doctor:", error);
        throw error;
    }
};

export const createDoctor = async (doctor) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/doctors/create`,
        doctor
    );
    return data;
};

export const updateDoctorFunc = async (doctor) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/doctors/update/${doctor.id}`,
        doctor
    );
    return data;
};