import axios from "axios";

export const getAnimals = async () => {
    const { data } = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals"
        );
    return data;
};

export const deleteAnimal = async (id) => {
    try {
        const { data } = await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/delete/${id}`);
        return data;
    } catch (error) {
        console.error("Error deleting animal:", error);
        throw error;
    }
};

export const createAnimal = async (animal) => {
    const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/create`, animal);
    return data;
};

export const updateAnimalFunc = async (animal) => {
    const { data } = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/update/${animal.id}`, animal);
    return data;
};

export const findAnimalByName = async (name) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/findByName/${name}`
    );
    return data;
};

export const findCustomerByName = async (name) => {
    const { data } = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/${name}/animals`
        );
        return data;
};

