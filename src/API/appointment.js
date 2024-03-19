import axios from "axios";

// Randevuları listeleme
export const getAppointments = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments`
    );
    return data;
};

// Randevu oluşturma
export const createAppointment = async (appointment) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/createNewAppointment`,
        appointment
    );
    return data;
};

// Randevu güncelleme
export const updateAppointmentFunc = async (appointment) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/update/${appointment.id}`,
        appointment
    );
    return data;
};

// Randevu silme
export const deleteAppointment = async (id) => {
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/delete/${id}`
        );
        return data;
    } catch (error) {
        console.error("Randevu silinirken hata oluştu:", error);
        throw error;
    }
};

export const findDoctorByName = async (doctors, startDate, endDate) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}http://localhost:8080/api/v1/appointments/filter/byDoctorId?doctorId=${doctors.id}&startDate=${startDate}&endDate=${endDate}`
    );
    return data;
};



