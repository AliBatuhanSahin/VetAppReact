// Müşterileri listeleme
import axios from "axios";

export const getCustomers = async () => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers`
    );
    return data;
};

// Müşteri oluşturma
export const createCustomer = async (customer) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/create`,
        customer
    );
    return data;
};

// Müşteri güncelleme
export const updateCustomerFunc = async (customer) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/update/${customer.id}`,
        customer
    );
    return data;
};

// Müşteri silme
export const deleteCustomer = async (id) => {
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/delete/${id}`
        );
        return data;
    } catch (error) {
        console.error("Müşteri silinirken hata oluştu:", error);
        throw error;
    }
};

// Müşteri ismine göre arama
export const findCustomerByName = async (name) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/findByName/${name}`
    );
    return data;
};
